"use strict"
const deKnop = document.getElementById("verstuur");
deKnop.onclick = function () {
    let IDminGr = document.getElementById("minGrootte").value;
    let IDmaxGr = document.getElementById("maxGrootte").value;
    let IDminLeeftijd = document.getElementById("minLeeftijd").value;
    let IDmaxLeeftijd = document.getElementById("maxLeeftijd").value;
    let IDKleurHaar = document.getElementById("kleurHaar").value;
    let IDKLeurOgen = document.getElementById("kleurOgen").value;
    let IDgeslacht = document.getElementById("geslacht").value;

    if ((IDminGr === "") && (IDmaxGr === "") && (IDminLeeftijd === "") && (IDmaxLeeftijd === "") && (IDKleurHaar === "") && (IDKLeurOgen === "") && (IDgeslacht === "")) {
        alert('invullen die handel');
    }


}

const rooturl = 'https://scrumserver.tenobe.org/scrum/api';

let url = rooturl + '/profiel/read.php';
let haar = {

}
let haarkleuren = [];
//console.log(haarkleuren);
fetch(url)
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        console.log(data);
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
        //console.log(kleur);
        arrayHaar.push(kleurHaar);
    }
    let unique = [...new Set(arrayHaar)];
    console.log(unique);
    for (const el of unique) {
        let option = new Option(el);
        select.appendChild(option);
    }

    const select2 = document.getElementById("kleurOgen");
    let arrayOgen = [];
    for (const el of data) {
        let kleurOgen = el.oogkleur;
        //console.log(kleur);
        arrayOgen.push(kleurOgen);
    }
    let unique2 = [...new Set(arrayOgen)];
    console.log(unique2);
    //console.log(unique);
    for (const el2 of unique2) {
        let option2 = new Option(el2);
        select2.appendChild(option2);
    }

}
















