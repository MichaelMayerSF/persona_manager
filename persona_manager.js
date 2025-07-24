// ==UserScript==
// @name         Persona Manager
// @version      1.0.0
// @description  Script to add a small persona picture on the bottom left of the screen
// @author       Michael Mayer
// @match        https://*.lightning.force.com/*
// @icon         https://www.google.com/s2/favicons?domain=force.com
// @grant        none
// @noframes
// ==/UserScript==

var personaList = [
    {
    'url':'https://trailsignup-5a20c4ee191a2d.file.force.com/sfc/servlet.shepherd/version/renditionDownload?rendition=ORIGINAL_Png&versionId=068J600000CYbpY&operationContext=CHATTER&contentId=05TJ600000YlLoK',
    'name':'Marie',
    'color': 'blue'
    },
    {
    'url':'https://trailsignup-5a20c4ee191a2d.file.force.com/sfc/servlet.shepherd/version/renditionDownload?rendition=ORIGINAL_Png&versionId=068J600000CYbpe&operationContext=CHATTER&contentId=05TJ600000YlLoe',
    'name':'Astro',
    'color': 'green'
    },
    {
    'url':'https://trailsignup-5a20c4ee191a2d.file.force.com/sfc/servlet.shepherd/version/renditionDownload?rendition=ORIGINAL_Png&versionId=068J600000CYbpd&operationContext=CHATTER&contentId=05TJ600000YlLoP',
    'name':'Marc',
    'color': 'orange'
    }
    ];
var currentPersona = 0;
var shownSelectorPersona = false;

(function() {

    const $ = document.querySelector.bind(document);
    setTimeout(() => {
        $('body').insertAdjacentHTML('afterbegin', init_html() );
        $('body').insertAdjacentHTML('afterbegin', create_persona_list() );
        $('body').insertAdjacentHTML('afterbegin', init_css() );
        document.querySelector('#custPersona').addEventListener('click', toggle);
        for(var i=0;i<personaList.length;i++) {
            document.querySelector('#personaSelector'+i).addEventListener('click', togglePersona);
        }
        document.querySelector('#personaSelectorRemove').addEventListener('click', removePersona);
    },1500);

})();

function init_html(){
    return '<div id="custPersona"></div>';
}

function toggle(){
    let el = document.querySelector('#personaList');
    if(shownSelectorPersona) {
        el.style.display = "none";
    }
    else {
        el.style.display = "block";
    }
    shownSelectorPersona = !shownSelectorPersona;
}

function togglePersona(evt){
    currentPersona = evt.target.dataset.index;
    let el = document.querySelector('#personaList');
    if(shownSelectorPersona) {
        el.style.display = "none";
    }
    else {
        el.style.display = "block";
    }
    shownSelectorPersona = !shownSelectorPersona;
    let elpers = document.querySelector('#custPersona');
    elpers.style.backgroundImage = 'url("'+personaList[currentPersona].url+'")';
    elpers.style.borderColor = personaList[currentPersona].color;
}

function removePersona(evt){
    let elpers = document.querySelector('#custPersona');
    elpers.style.display = "none";
    let el = document.querySelector('#personaList');
    el.style.display = "none";
}

function create_persona_list() {
  let htmlList = '<ul>';
  personaList.forEach((item, index) => {
    // Add a data-index attribute to store the item's index
    htmlList += `<li id="personaSelector${index}" data-index="${index}">${item.name}</li>`;
  });
  htmlList += '<li id="personaSelectorRemove" data-index="99">Remove</li></ul>';
  return '<div id="personaList">'+htmlList+'</div>';
}

function init_css(){
    return `
        <style>
            #custPersona{
              z-index:99999999;
              width:150px;
              height:150px;
              background-image: url("`+personaList[currentPersona].url+`");
              background-repeat: no-repeat;
              position: fixed;
              bottom: 50px;
              left: 50px;
              border-radius: 75px;
              background-position: center;
              border-style: solid;
              border-color: `+personaList[currentPersona].color+`;
              background-size: contain;
              background-color:white;
            }
            #personaList{
              padding: 5px;
              margin: 5px;
              border-color: black;
              border-style: solid;
              z-index:999999999;
              position: fixed;
              bottom: 80px;
              left: 80px;
              background-color: white;
              display:none;
              cursor: pointer;
            }
        </style>
        `;
}
