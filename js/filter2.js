"use strict"
function filterInitialisatie(){
const deKnop = document.getElementById("verstuur");
deKnop.onclick = function () {
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
        zoekurl= zoekurl.substring(0, zoekurl.length - 1);
        
    }


    let teller = 0;

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

        alert(zoekurl);    
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
}
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

filterInitialisatie();

//test
















