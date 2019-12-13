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
  toonDIV("login");
}


//Cicylo domain 
//---------------------------------------------------------------------------------------------------------------------
window.onload = function() {
 toonDIV("login");
 console.log("testdiv");
 document.getElementById('btnlogin').addEventListener('click', function (e) {
  console.log('Je hebt op de Login-knop geklikt');
  let nickname = document.getElementById('inputNick').value;
  let wachtwoord = document.getElementById('inputPassword').value;

  console.log('nickname = ' + nickname);
  console.log('wachtwoord = ' + wachtwoord);

  let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php';
  
  console.log('Backend API url = ' + url);

  let Data = {
      nickname: nickname,
      wachtwoord: wachtwoord
  }
  console.log('Deze data wordt verstuurd : ');
  console.log(Data);

  var request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(Data),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  });
  
  console.log('Deze request wordt verstuurd : ');
  console.log(request);

       let ID = "";  
  fetch(request)
      .then(function (resp) { return resp.json(); })
      .then(function (data) { ID = data.ID;
          if (data.message == 'Authorized') {
              console.log("Reactie van backend API : Correcte gegevens");                      
              window.location.href = "userDetail.html";
          } else {
              console.log("Reactie van backend API : Verkeerde gegevens");        
          }
      })
      .catch(function (error) { console.log(error); });
});




}

// Cicylo domain
//--------------------------------------------------------------------------------------------------------------------------------------

//Jan's Domain
//--------------------------------------------------------------------------------------------------------------------------------------

//Jan's Domain
//--------------------------------------------------------------------------------------------------------------------------------------



