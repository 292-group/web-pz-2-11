
$(document).ready(function(){
let characterArray='';
let def;
for(let i=1;i<=2138;i++) {
    (function() {
      let xhr = new XMLHttpRequest();
      xhr.open("GET",`https://anapioficeandfire.com/api/characters/${i}` , false);
      xhr.onreadystatechange = function() {
        if (this.readyState==4&&this.status==200) {
          let data = JSON.parse(xhr.responseText)
          if(i==1)
          def = data;
          if(data.name!='')
          characterArray +=`<li id='${i}' class="character-panel_id">Character ${i} (${data.name}) </li>`;
          else
            characterArray +=`<li id='${i}' class="character-panel_id">Character ${i} (No name) </li>`;
        }
      }
      xhr.send();
    })();
}
  $(".characters").html(characterArray)
  HttRequest(def)
  $("#1").addClass("active")

    $(".character-panel_id").click(function (){
      $(".character-panel_id").removeClass("active")
        let id = $(this).attr("id");
        $(this).addClass("active")
      const xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function(){
          if (this.readyState==4&&this.status==200){
            HttRequest(JSON.parse(this.responseText))
          }
        }
        xhr.open('GET',`https://anapioficeandfire.com/api/characters/${id}`);
        xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        xhr.send();
      }
    )
});
function HttRequest(data){
  if(data.name!='')
    $('.name').text(`${data.name}`)
  else
    $('.name').text('No name')
    $('.data').html(`
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
    `)
  }

