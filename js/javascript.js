"use strict"
let alleDivid = ["login","profiel","zoek","zoekresults"];

function toonDIV(divid)
{   for (let teller = 0; teller < alleDivid.length; teller++) 
     {const elemDividtmp = document.getElementById(alleDivid[teller]);
      console.log(alleDivid[teller]);
      elemDividtmp.style.display="none";}
    if (divid !== "none" ) {const elemDivid = document.getElementById(divid);
    elemDivid.style.display="block";}
    

     
}


const buttontest1 = document.getElementById("test1");
const buttontest2 = document.getElementById("test2");

buttontest1.onclick = function() {
  toonDIV("none");
}


buttontest2.onclick = function() {
  toonDIV("zoek");
}