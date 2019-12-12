window.onload = function () {
    let profielData;

    let profielId = ID;
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

            
};

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
