"use strict"
let alleDivid = ["login","profiel","zoek","zoekresults","nieuwegebruiker"];

function toonDIV(divid)
{   for (let teller = 0; teller < alleDivid.length; teller++) 
     {const elemDividtmp = document.getElementById(alleDivid[teller]);
      console.log(alleDivid[teller]);
      elemDividtmp.style.display="none";}
    if (divid !== "none" ) {const elemDivid = document.getElementById(divid);
    elemDivid.style.display="block";}
    

     
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
  console.log("id");
 

     //  let ID = "";  
       let ID="";


  fetch(request)
      .then(function (resp) { return resp.json(); })
      .then(function (data) { tmpID = data.id;
          console.log(data.id);
          if (data.message == 'Authorized') {
              console.log("Reactie van backend API : Correcte gegevens");                      
              toonDIV("profiel");
    





            // toont profiel, html wordt dan aangepast








            

    let profielData;
            
console.log("id "+tmpID);
    let profielId = "8";
    //let profielId = Math.floor(Math.random() * 7)+1; //random profiel van 0 - 7

    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + profielId;

    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {

            profielData = data;

            document.getElementById('detailNick').value = profielData.nickname;
            document.getElementById('detailFnaam').value = profielData.familienaam;
            document.getElementById('detailVnaam').value = profielData.voornaam;
            document.getElementById('detailGeboortedatum').value = profielData.geboortedatum;
            document.getElementById('detailHaarkleur').value = profielData.haarkleur;
            document.getElementById('detailBeroep').value = profielData.beroep;
            document.getElementById('detailEmail').value = profielData.email;
            document.getElementById('detailLovecoins').value = profielData.lovecoins;
            document.getElementById('detailFoto').setAttribute('src', 'https://scrumserver.tenobe.org/scrum/img/' + profielData.foto);
            document.getElementById('detailFoto').setAttribute('alt', 'foto van ' + profielData.voornaam + ' ' + profielData.familienaam);
            document.getElementById('profielVan').innerText = 'Details van ' + profielData.voornaam + ' ' + profielData.familienaam;

            console.log("TESTING");
            GetSterrenbeeld(profielData.geboortedatum);
        })
        .catch(function (error) { console.log(error); });


    document.getElementById('btnSubmit').addEventListener('click', function (e) {
        let urlUpdate = 'https://scrumserver.tenobe.org/scrum/api/profiel/update.php';

        profielData.nickname = document.getElementById('detailNick').value;
        profielData.familienaam = document.getElementById('detailFnaam').value;
        profielData.voornaam = document.getElementById('detailVnaam').value;
        profielData.geboortedatum = document.getElementById('detailGeboortedatum').value;
        profielData.haarkleur = document.getElementById('detailHaarkleur').value;
        profielData.beroep = document.getElementById('detailBeroep').value;
        profielData.email = document.getElementById('detailEmail').value;
        profielData.lovecoins = document.getElementById('detailLovecoins').value;
       
        var request = new Request(urlUpdate, {
            method: 'PUT',
            body: JSON.stringify(profielData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then(function (resp) { return resp.json(); })
            .then(function (data) { console.log(data); })
            .catch(function (error) { console.log(error); });

    });         

    // scope test later
    //

function GetSterrenbeeld(PersoonObj){
    console.log("test");
    console.log(PersoonObj);
    var Datum = new Date(PersoonObj);
    SterrenbeeldDatum(Datum);
}



function SterrenbeeldDatum(Datum)
{
    if((Datum >= new Date(Datum.getFullYear() + "-11-23") || Datum <=new Date(Datum.getFullYear() + "-01-19")))
    ToonSterrenbeeldFoto("steenbok");

     else if((Datum >= new Date(Datum.getFullYear() + "-01-20") && Datum <=new Date(Datum.getFullYear() + "-02-19")))
       ToonSterrenbeeldFoto("waterman");
    
     else if((Datum >= new Date(Datum.getFullYear() + "-02-20") && Datum <=new Date(Datum.getFullYear() + "-03-20")))
     ToonSterrenbeeldFoto("vissen");
    
     else if((Datum >= new Date(Datum.getFullYear() + "-03-21") && Datum <=new Date(Datum.getFullYear() + "-04-20")))
     ToonSterrenbeeldFoto("ram");
    
     else if((Datum >= new Date(Datum.getFullYear() + "-04-21") && Datum <=new Date(Datum.getFullYear() + "-05-20")))
     ToonSterrenbeeldFoto("stier");
    
     else if((Datum >= new Date(Datum.getFullYear() + "-05-21") && Datum <=new Date(Datum.getFullYear() + "-06-21")))
     ToonSterrenbeeldFoto("tweeling");
    
     else if((Datum >= new Date(Datum.getFullYear() + "-06-21") && Datum <=new Date(Datum.getFullYear() + "-07-12")))
        ToonSterrenbeeldFoto("kreeft");
    
     else if((Datum >= new Date(Datum.getFullYear() + "-07-23") && Datum <=new Date(Datum.getFullYear() + "-08-23")))
     ToonSterrenbeeldFoto("leeuw");
    
     else if((Datum >= new Date(Datum.getFullYear() + "-08-24") && Datum <=new Date(Datum.getFullYear() + "-09-23")))
       ToonSterrenbeeldFoto("maagd");
    
     else if((Datum >= new Date(Datum.getFullYear() + "-09-24") && Datum <=new Date(Datum.getFullYear() + "-10-23")))
     ToonSterrenbeeldFoto("weegschaal");

     else if((Datum >= new Date(Datum.getFullYear() + "-10-24") && Datum <=new Date(Datum.getFullYear() + "-11-22")))
     ToonSterrenbeeldFoto("schorpioen");

     else if((Datum >= new Date(Datum.getFullYear() + "-11-23") && Datum <=new Date(Datum.getFullYear() + "-12-21")))
    ToonSterrenbeeldFoto("boogschutter");
}

function ToonSterrenbeeldFoto(Sterrenbeeld)
{
   var URL = "img/" + Sterrenbeeld + ".png";
   document.getElementById("Sterrenbeeldimg").src = URL;
   document.getElementById("SterrenbeeldLabel").textContent = Sterrenbeeld;
}
              
          




















          } else {
              console.log("Reactie van backend API : Verkeerde gegevens");        
          }
      })
      .catch(function (error) { console.log(error); });
});




}

// Cicylo domain
//--------------------------------------------------------------------------------------------------------------------------------------

//Jan's Domain & David's Domain
//--------------------------------------------------------------------------------------------------------------------------------------
function sterrenBeeldNaarJpeg(Datum) {
    let jpegnaam = "";
    if ((Datum >= new Date(Datum.getFullYear() + "-11-23") || Datum <= new Date(Datum.getFullYear() + "-01-19")))
        jpegnaam = "steenbok";

    else if ((Datum >= new Date(Datum.getFullYear() + "-01-20") && Datum <= new Date(Datum.getFullYear() + "-02-19")))
        jpegnaam = "waterman";

    else if ((Datum >= new Date(Datum.getFullYear() + "-02-20") && Datum <= new Date(Datum.getFullYear() + "-03-20")))
        jpegnaam = "vissen";

    else if ((Datum >= new Date(Datum.getFullYear() + "-03-21") && Datum <= new Date(Datum.getFullYear() + "-04-20")))
        jpegnaam = "ram";

    else if ((Datum >= new Date(Datum.getFullYear() + "-04-21") && Datum <= new Date(Datum.getFullYear() + "-05-20")))
        jpegnaam = "stier";

    else if ((Datum >= new Date(Datum.getFullYear() + "-05-21") && Datum <= new Date(Datum.getFullYear() + "-06-21")))
        jpegnaam = "tweeling";

    else if ((Datum >= new Date(Datum.getFullYear() + "-06-21") && Datum <= new Date(Datum.getFullYear() + "-07-12")))
        jpegnaam = "kreeft";

    else if ((Datum >= new Date(Datum.getFullYear() + "-07-23") && Datum <= new Date(Datum.getFullYear() + "-08-23")))
        jpegnaam = "leeuw";

    else if ((Datum >= new Date(Datum.getFullYear() + "-08-24") && Datum <= new Date(Datum.getFullYear() + "-09-23")))
        jpegnaam = "maagd";

    else if ((Datum >= new Date(Datum.getFullYear() + "-09-24") && Datum <= new Date(Datum.getFullYear() + "-10-23")))
        jpegnaam = "weegschaal";

    else if ((Datum >= new Date(Datum.getFullYear() + "-10-24") && Datum <= new Date(Datum.getFullYear() + "-11-22")))
        jpegnaam = "schorpioen";

    else if ((Datum >= new Date(Datum.getFullYear() + "-11-23") && Datum <= new Date(Datum.getFullYear() + "-12-21")))
        jpegnaam = "boogschutter";

    return jpegnaam;
}



document.getElementById('zoekformulier').addEventListener('click', function () 
 { console.log("zoekformulier");


    toonDIV("zoek");
    const deKnop = document.getElementById("verstuur");
    deKnop.onclick = function () {
        console.log("test");

        toonDIV("zoekresults");
        let IDminGr = document.getElementById("minGrootte").value;
        let IDmaxGr = document.getElementById("maxGrootte").value;
        let IDminLeeftijd = document.getElementById("minLeeftijd").value;
        let IDmaxLeeftijd = document.getElementById("maxLeeftijd").value;
        let IDKleurHaar = document.getElementById("kleurHaar").value;
        let IDKLeurOgen = document.getElementById("kleurOgen").value;
        let IDgeslacht = document.getElementById("geslacht").value;

        let zoekurl = "";



        if ((IDminGr === "") && (IDmaxGr === "") && (IDminLeeftijd === "") && (IDmaxLeeftijd === "") && (IDKleurHaar === "") && (IDKLeurOgen === "") && (IDgeslacht === "")) {
            alert('invullen die handel');
        } else {

            if (IDminGr !== "") { zoekurl = zoekurl + "rangeMinGrootte=" + IDminGr + "&"; }
            if (IDmaxGr !== "") { zoekurl = zoekurl + "rangeMaxGrootte=" + IDminGr + "&"; }
            if (IDminLeeftijd !== "") { zoekurl = zoekurl + "rangeMinGrootte=" + IDminLeeftijd + "&"; }
            if (IDmaxLeeftijd !== "") { zoekurl = zoekurl + "rangeMinGrootte=" + IDmaxLeeftijd + "&"; }
            if (IDKleurHaar !== "") { zoekurl = zoekurl + "haarkleur=" + IDKleurHaar + "&"; }
            if (IDKLeurOgen !== "") { zoekurl = zoekurl + "oogkleur=" + IDKLeurOgen + "&"; }
            if (IDgeslacht !== "") { zoekurl = zoekurl + "sexe=" + IDgeslacht + "&"; }
            zoekurl = zoekurl.substring(0, zoekurl.length - 1);

        }


        let teller = 0;
        console.log(zoekurl);
        const zoektabelid = document.getElementById("uitvoerzoektabel");
        let url = "https://scrumserver.tenobe.org/scrum/api/profiel/search.php?" + zoekurl;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
                for (const tmp of data) {
                    teller = teller + 1;
                    if (teller > 20) { break; }


                    const tr = zoektabelid.insertRow();
                    const nicknamecell = tr.insertCell();
                    const voornaamcell = tr.insertCell();
                    const familienaamcell = tr.insertCell();
                    const geslachtcell = tr.insertCell();
                    const leeftijdcell = tr.insertCell();
                    const emailcell = tr.insertCell();
                    const sterrenbeeldcell = tr.insertCell();




                    const leeftijd = Math.floor((new Date() - new Date(tmp.geboortedatum).getTime()) / 3.15576e+10);

                    console.log(tmp);

                    voornaamcell.innerText = tmp.voornaam;
                    familienaamcell.innerText = tmp.familienaam;
                    leeftijdcell.innerText = leeftijd;
                    geslachtcell.innerText = tmp.sexe;
                    nicknamecell.innerText = tmp.nickname;
                    emailcell.innerText = tmp.email;
                    // sterrenbeeldcell.innerText=sterrenBeeldNaarJpeg(tmp.geboortedatum);
                    const datumDatumformaat = new Date(tmp.geboortedatum);
                    sterrenbeeldcell.innerText = sterrenBeeldNaarJpeg(datumDatumformaat);


                    // leeftijdcell=toString(getAge("1994-06-14"));



                }


            })
            .catch(function (error) { console.log(error); });

        console.log(zoekurl);
    }


    const rooturl = 'https://scrumserver.tenobe.org/scrum/api';

    let url = rooturl + '/profiel/read.php';

    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            // console.log(data);
            getArrayOfPersons(data);

        })
        .catch(function (error) {
            console.log(error)
        });

    function getArrayOfPersons(data) {
        const select = document.getElementById("kleurHaar");
        let arrayHaar = [];
        for (const el of data) {
            let kleurHaar = el.haarkleur;
            arrayHaar.push(kleurHaar);
        }
        //haal de unieke indexen uit de array
        let unique = [...new Set(arrayHaar)];
        for (const el of unique) {
            let option = new Option(el);
            select.appendChild(option);
        }

        const select2 = document.getElementById("kleurOgen");
        let arrayOgen = [];
        for (const el of data) {
            let kleurOgen = el.oogkleur;
            arrayOgen.push(kleurOgen);
        }
        let unique2 = [...new Set(arrayOgen)];
        for (const el2 of unique2) {
            let option2 = new Option(el2);
            select2.appendChild(option2);
        }

    }








 })












//Jan's Domain & David's Domain
//--------------------------------------------------------------------------------------------------------------------------------------



