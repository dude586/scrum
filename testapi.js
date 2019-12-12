const rooturl = 'https://scrumserver.tenobe.org/scrum/api';
async function zoekURL(zoekURLstring) {

let url = rooturl + "/profiel/search.php?"+zoekURLstring;

let allPersons = [];
console.log(url);

await fetch(url)
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


    return await allPersons;
}
function getArrayOfPersons(data) {
    let person = {
        voornaam : "",  
        familienaam : "",
        oogkleur : ""

    }

    let array = [];
    for (const el of data) {
        person.voornaam = el.voornaam;
        person.familienaam = el.familienaam;
        person.oogkleur= el.oogkleur;
        array.push(person);
    }
    console.log(array);
    return array;

}





function testapi() {
  
   const zoekresultaten = zoekURL("sexe=v&haarkleur=Goudblond");
   const tester=(zoekresultaten);
   
   console.log(zoekresultaten);
   console.log(tester);
   // console.log(zoekresultaten[0].voornaam);

}

document.getElementById("toevoegen").addEventListener("click",testapi);

