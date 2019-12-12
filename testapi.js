const rooturl = 'https://scrumserver.tenobe.org/scrum/api';

let allPersons = [];

async function zoekURL(zoekURLstring) {
    
    let url = rooturl + "/profiel/search.php?" + zoekURLstring;

    console.log(url);

    await fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            getArrayOfPersons(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getArrayOfPersons(data) {
    for (const el of data) {
        let person = {};
        person.voornaam = el.voornaam;
        person.familienaam = el.familienaam;
        person.oogkleur = el.oogkleur;
        allPersons.push(person);
    }
}



function testapi() {

    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < 8000);

    zoekURL("oogkleur=groen");
    for(const p of allPersons){
        console.log(p);
    }

}

document.getElementById("toevoegen").addEventListener("click", testapi);