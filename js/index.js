let number;
let block;
let count = 1;

loadNav()

function loadNav() {
  limit = count + 30;
  for (count; count < limit; count++) {
    block = document.createElement('li');
    block.innerHTML = (`Character ${count}`);
    block.className = (`${count}`);
    document.querySelector('.sov-character-list').appendChild(block);
  }
}


let first = document.getElementsByClassName('1').item(0);
clickEvent(first);

document.querySelector('.sov-character-list ').onclick = (event) => {
  clickEvent(event.target);
}

function clickEvent(element) {
  if (number)
    document.getElementsByClassName(`${number}`).item(0).classList.remove('active');
  number = parseInt((element.className));
  element.classList.add('active');
  number = `${number}`;

  httpRequest('GET', `https://anapioficeandfire.com/api/characters/${number}`)

  function httpRequest(method, url) {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        myFunction(JSON.parse(this.responseText))
      }
    }

    xhttp.open(method, url);
    xhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhttp.send();
  }


  function myFunction(data) {
    document.querySelector('.sov-name').innerHTML = `${data.name}`
    document.querySelector('.sov-info_character').innerHTML = `
                <li class="gender"><span>Gender: </span>${data.gender}</li>
                <li class="gender"><span>Culture: </span>${data.culture}</li>
                <li class="gender"><span>Born: </span>${data.born}</li>
                <li class="gender"><span>Died: </span>${data.died}</li>
                <li class="gender"><span>Title: </span>${data.titles}</li>
                <li class="gender"><span>Aliasees: </span>${data.aliases}</li>
                <li class="gender"><span>Father: </span>${data.father}</li>
                <li class="gender"><span>Mather: </span>${data.mother}</li>
                <li class="gender"><span>Spouse: </span>${data.spouse}</li>
                <li class="gender"><span>Books: </span>${data.books}</li>
                <li class="gender"><span>PovBooks: </span>${data.povBooks}</li>
                <li class="gender"><span>Played By: </span>${data.playedBy}</li>
   `
  }
}

document.querySelector('.nav_bar').addEventListener('scroll',()=>{
  if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
    loadNav();
  }
})
