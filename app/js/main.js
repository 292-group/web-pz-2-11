let characterCounter = {counter:0}

$(document).ready(function(){
  let page = 1;
  if(page==1){
    $(".prev").css("visibility", "hidden")
  }
  Load(page, 1);

  $(".next").click(function (){
    page++;
    if(page==1){
      $(".prev").css("visibility", "hidden")
    }else{ $(".prev").css("visibility", "visible")}
    isNextAvailable(page, 1)
    panelClick()
  })

  $(".prev").click(function (){
    if(page-1>0)
    page--;
    if(page==1){
      $(".prev").css("visibility", "hidden")
    }else{ $(".prev").css("visibility", "visible")}
    isNextAvailable(page, 0)
    panelClick()
  })

  panelClick()
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

  function Load(page, type){
    let def;
    let characterArray='';
    let data;
    let buf;

    let xhr = new XMLHttpRequest();
    xhr.open("GET",`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=20` , false);
    xhr.onreadystatechange = function() {
      if (this.readyState==4&&this.status==200) {
        data = JSON.parse(xhr.responseText)
        if (type===1){
          buf = characterCounter.counter+1
        }
        else{
          buf = characterCounter.counter-data.length
          console.log("loging: "+characterCounter.counter+", "+data.length)
          characterCounter.counter-=JSON.parse(xhr.responseText).length*2
          console.log("after decrement "+characterCounter.counter+", buf:"+buf)
        }

        for (let i = 0; i < data.length; i++) {
          characterCounter.counter++
          if(i==0)
            def = data[i];
          if(data[i].name!='')
            characterArray +=`<li id='${characterCounter.counter}' class="character-panel_id">Character ${characterCounter.counter} (${data[i].name}) </li>`;
          else
            characterArray +=`<li id='${characterCounter.counter}' class="character-panel_id">Character ${characterCounter.counter} (No name) </li>`;
        }
        console.log("after increment: "+characterCounter.counter+", buf:"+buf)
      }
    }
    xhr.send();

    $(".characters").html(characterArray)
    HttRequest(def)
    //console.log("buf: "+buf)
    $(`#${buf}`).addClass("active")

  }
function isNextAvailable(page, type) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=1`, false);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (JSON.parse(xhr.responseText).length === 0&&type==1) {
          $(".next").css("visibility", "hidden")
      }
      else {
        $(".next").css("visibility", "visible")
        Load(page,type);
        }
    }

  }
  xhr.send();
}

function panelClick(){
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
  })
}

