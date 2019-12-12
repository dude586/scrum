const rooturl = 'https://scrumserver.tenobe.org/scrum/api';
function zoekURL(zoekURLstring) {

let url = rooturl + "/profiel/search.php?"+zoekURLstring;

let allPersons = [];
console.log(url);

fetch(url)
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        console.log(data);
        allPersons = getArrayOfPersons(data);
    })
    .catch(function (error) {
        console.log(error);
    });
    console.log(allPersons);
    return allPersons;
}
function getArrayOfPersons(data) {
    let person = {
        voornaam : "",  
        familienaam : ""

    }

    let array = [];
    for (const el of data) {
        person.voornaam = el.voornaam;
        person.familienaam = el.familienaam;
        array.push(person);
    }
    console.log(array);
    return array;

}





function testapi() {
  
   const zoekresultaten = zoekURL("sexe=m");
   console.log(zoekresultaten);
   console.log(zoekresultaten[0].voornaam);

}
document.addEventListener("DOMContentLoaded", testapi);

// test 