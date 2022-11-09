let number,characterList='';

for(let i=1;i<=2138;i++) characterList+=`<li class='${i}'>Character ${i}</li>`;
document.querySelector('.character-list').innerHTML=(characterList)

document.querySelector('.character-list ').onclick=(event)=>{
    number=parseInt((event.target.className));
    const xhttp= new XMLHttpRequest();

xhttp.onreadystatechange=function(){
    if (this.readyState==4&&this.status==200){
        HttRequest(JSON.parse(this.responseText))
    }
}
xhttp.open('GET',`https://anapioficeandfire.com/api/characters/${number}`);
xhttp.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
xhttp.send();

function HttRequest(data){
    document.querySelector('.name').innerHTML=`${data.name}`
    document.querySelector('.info_character').innerHTML=`
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