function testapi() {let url = 'https://scrumserver.tenobe.org/scrum/api/favoriet/like.php';

let data = {
    mijnId: 3,
    anderId: 9
}

var request = new Request(url, {
    method: 'POST',                 //request methode
    body: JSON.stringify(data),     //body waar de data aan meegegeven wordt
    headers: new Headers({          //onze API verwacht application/json
        'Content-Type': 'application/json'
    })
});
fetch(request)
    .then(function (response){return response.json();})
    .then(function (data){console.log(data);})
    .catch(function (error){console.log(error);});

console.log("test");

url = 'https://scrumserver.tenobe.org/scrum/api/bericht/read.php';
fetch(url).then(function (response){console.log(response);})
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
}
var Persoon = {
   GeboorteDatum : "1999-06-28"
};
GetSterrenbeeld(Persoon);
