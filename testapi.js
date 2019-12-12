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


//test
function GetSterrenbeeld(PersoonObj){
    var Datum = new Date(PersoonObj.GeboorteDatum);
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
var Persoon = {
   GeboorteDatum : "1999-06-28"
};
GetSterrenbeeld(Persoon);
