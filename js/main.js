let number;
let block;
for(let i=1;i<=15;i++){
    block=document.createElement('li');
    block.innerHTML=(`Character ${i}`);
    block.className=(`${i}`);
    document.querySelector('.character-list').appendChild(block);
}
document.querySelector('.character-list ').onclick=(event)=>{
    number=parseInt((event.target.className));
    number=`${number+50}`;
  
    const xhttp= new XMLHttpRequest();

xhttp.onreadystatechange=function(){
    if (this.readyState==4&&this.status==200){
        myFunction(JSON.parse(this.responseText) )
    }
}
xhttp.open('GET',`https://anapioficeandfire.com/api/characters/${number}`);
xhttp.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
xhttp.send();

function myFunction(data){
   document.querySelector('.name').innerHTML=`${data.name}`
   document.querySelector('.info_character').innerHTML=`
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