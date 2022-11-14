let num = 0;
let arrForCharacter = [];

for (let i = 1; i <= 1100; i++) {
    const http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.status == 200) {
            HttRequestName(JSON.parse(this.responseText).name, i);
            // try {
            //     HttRequestName(JSON.parse(this.responseText).name, i);
            // } catch (e) {
            //     HttRequestName("noname", i);
            // }
            // JSON.parse(this.responseText).name != "" ? HttRequestName(JSON.parse(this.responseText).name, i) : HttRequestName("noname", i);
        }
    }
    http.open('GET', `https://anapioficeandfire.com/api/characters/${i}`, false);
    http.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    http.send();
}

function HttRequestName(name, i) {
    arrForCharacter += `<li class="${i}">Character (${name != "noname" ? name : i})</li>`;
}
console.log(arrForCharacter);
document.querySelector('.character-list').innerHTML = (arrForCharacter);

document.querySelector('.character-list ').onclick = (event) => {
    num = parseInt((event.target.className));
    console.log(num);

    const http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.status == 200) HttRequest(JSON.parse(this.responseText))
    }
    http.open('GET', `https://anapioficeandfire.com/api/characters/${num}`, false);
    http.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    http.send();

    function HttRequest(data) {
        document.querySelector('.name-info').innerHTML = `${data.name}`
        document.querySelector('.info_character').innerHTML = `
                 <li><span>Gender: </span>${data.gender}</li>
                 <li><span>Culture: </span>${data.culture}</li>
                 <li><span>Born: </span>${data.born}</li>
                 <li><span>Died: </span>${data.died}</li>
                 <li><span>Title: </span>${data.titles}</li>
                 <li><span>Aliasees: </span>${data.aliases}</li>
                 <li><span>Father: </span>${data.father}</li>
                 <li><span>Mather: </span>${data.mother}</li>
                 <li><span>Spouse: </span>${data.spouse}</li>
                 <li><span>Books: </span>${data.books}</li>
                 <li><span>PovBooks: </span>${data.povBooks}</li>
                 <li><span>Played By: </span>${data.playedBy}</li>            
    `
    }
}