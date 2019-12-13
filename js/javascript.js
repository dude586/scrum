"use strict"
alleDivid = ["login","profiel",zoek","uitvoer"];

function toonDIV(divid);
{   for (let teller = 0; teller < alleDivid.length; teller++) 
     {const elemDividtmp = document.getElementById(alleDivid[teller]);
      elemDividtmp.style.display="none";}
    const elemDivid = document.getElementById(divid);
    elemDivid.style.display="block";
    

     
}

