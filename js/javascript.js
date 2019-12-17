"use strict"


// bepalen de max attribuut van de geboortedatum :leeftijd >=18 jaar
const nu = new Date();
const dag = nu.getDate();
const dag2 = ((dag < 10) ? "0" : "") + dag;
const maand = nu.getMonth() + 1;
const maand2 = ((maand < 10) ? "0" : "") + maand;
const jaar = nu.getFullYear() - 18;
document.getElementById("detailGeboortedatum").max = `${jaar}-${maand2}-${dag2}`;


// Globale Scope variabelen
let alleDivid = ["login",
    "profiel",
    "zoek",
    "zoekresults",
    "toonprofiel",
    "techprobleem",
    "techprobleemdatabank",
    "registreernieuwegebruiker",
    "loginerrormessage"];

let superuserid = "";

// Toont de juiste div in de stagin area




function toonDIV(divid) {
    for (let teller = 0; teller < alleDivid.length; teller++) {
        const elemDividtmp = document.getElementById(alleDivid[teller]);
        console.log(alleDivid[teller]);
        elemDividtmp.style.display = "none";
    }
    if (divid !== "none") {
        const elemDivid = document.getElementById(divid);
        elemDivid.style.display = "block";
    }



}

function toonaddDIV(divid) {

    if (divid !== "none") {
        const elemDivid = document.getElementById(divid);
        elemDivid.style.display = "block";
    }



}


//Checkt of er een verbinding is

function checkVerbinding() {
    // let ok = true;
    const rooturl = 'https://scrumserver.tenobe.org/scrum/api';
    let url = rooturl + '/profiel/read.php';


    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {


        })
        .catch(function (error) {
            toonDIV("techprobleemdatabank");
            ok = false;
            throw new Error('Error in the Database');
        });

}

function booleanCheckVerbinding() {
    let ok = true;
    const rooturl = 'https://scrumserver.tenobe.org/scrum/api';
    let url = rooturl + '/profiel/read.php';

    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {


        })
        .catch(function (error) {
            toonDIV("techprobleemdatabank");
            ok = false;

        });
    return ok;
}

let menuDIVid = ["ingelogdmenu", "nietingelogdmenu"];

//Toont het juiste linkermenu

function toonmenuDIV(divid) {
    for (let teller = 0; teller < menuDIVid.length; teller++) {
        const elemDividtmp = document.getElementById(menuDIVid[teller]);
        console.log(menuDIVid[teller]);
        elemDividtmp.style.display = "none";
    }
    if (divid !== "none") {
        const elemDivid = document.getElementById(divid);
        elemDivid.style.display = "block";
    }

}

let userID = "";




//David domain 
//---------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------------
//Kevin en Mai domain




//Kenny en Mai domain
//---------------------------------------------------------------------------------------------------------------------




function betaalLovecoinstoonprofiel(id)

{let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + superuserid;
let profielData;
let lovecoins;
                    fetch(url)
                        .then(function (resp) { return resp.json(); })
                        .then(function (data) {

                            profielData = data;

                            lovecoins=profielData.lovecoins;
                            console.log("lovecoins");
                            console.log(lovecoins);
                            if (lovecoins === 0) {alert("U heeft geen lovecoins!")}
                            else {      

                            
                            
                            let urlUpdate = 'https://scrumserver.tenobe.org/scrum/api/profiel/update.php';

                            profielData.lovecoins = lovecoins - 1;

                         let request = new Request(urlUpdate, {
                                            method: 'PUT',
                                            body: JSON.stringify(profielData),
                                            headers: new Headers({
                                                'Content-Type': 'application/json'
                                            })
                                        })



                           fetch(request)
                            .then(function (resp)   { return resp.json(); })
                            .then(function (data)   { console.log(data);  })
                            .catch(function (error) { console.log(error); });
                            document.getElementById('toonlovecoins').value=lovecoins-1;
    
                            toonprofiel(id);}
                          
                        })
                        .catch(function (error) { console.log(error); });
    

}

document.getElementById('menulogout').addEventListener('click', function (e) {
    document.location.reload(true);


})






document.getElementById('mijnprofiel').addEventListener('click', function (e) {
    toonDIV("profiel");

})

document.getElementById('menulucky').addEventListener('click', function (e) {
    let randomID = Math.floor(Math.random() * 5000) + 1;
    let idTekst = randomID.toString();
    toonprofiel(idTekst);

    console.log(randomID);
    console.log(idTekst);

})

document.getElementById('menulogin').addEventListener('click', function (e) {
    toonDIV("login");

})

function toonprofiel(profielid) {
    toonDIV("toonprofiel");


    let profielData;

    //let profielId = Math.floor(Math.random() * 7)+1; //random profiel van 0 - 7

    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + profielid;
    console.log(url);
    checkVerbinding();
    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {

            profielData = data;


            document.getElementById('toondetailNick').value = profielData.nickname;
            document.getElementById('toondetailFnaam').value = profielData.familienaam;
            document.getElementById('toondetailVnaam').value = profielData.voornaam;
            document.getElementById('toondetailGeboortedatum').value = profielData.geboortedatum;
            document.getElementById('toondetailHaarkleur').value = profielData.haarkleur;
            document.getElementById('toondetailBeroep').value = profielData.beroep;
            document.getElementById('toondetailEmail').value = profielData.email;
            // document.getElementById('detailLovecoins').value = profielData.lovecoins;
            document.getElementById('toondetailFoto').setAttribute('src', 'https://scrumserver.tenobe.org/scrum/img/' + profielData.foto);
            document.getElementById('toondetailFoto').setAttribute('alt', 'foto van ' + profielData.voornaam + ' ' + profielData.familienaam);
            document.getElementById('toonprofielVan').innerText = 'Details van ' + profielData.voornaam + ' ' + profielData.familienaam;

            console.log("TESTING");
            GetSterrenbeeld(profielData.geboortedatum);
        })
        .catch(function (error) { console.log(error); });

    function GetSterrenbeeld(PersoonObj) {
        console.log("test");
        console.log(PersoonObj);
        var Datum = new Date(PersoonObj);
        SterrenbeeldDatum(Datum);
    }



    function SterrenbeeldDatum(Datum) {
        if ((Datum >= new Date(Datum.getFullYear() + "-11-23") || Datum <= new Date(Datum.getFullYear() + "-01-19")))
            ToonSterrenbeeldFoto("steenbok");

        else if ((Datum >= new Date(Datum.getFullYear() + "-01-20") && Datum <= new Date(Datum.getFullYear() + "-02-19")))
            ToonSterrenbeeldFoto("waterman");

        else if ((Datum >= new Date(Datum.getFullYear() + "-02-20") && Datum <= new Date(Datum.getFullYear() + "-03-20")))
            ToonSterrenbeeldFoto("vissen");

        else if ((Datum >= new Date(Datum.getFullYear() + "-03-21") && Datum <= new Date(Datum.getFullYear() + "-04-20")))
            ToonSterrenbeeldFoto("ram");

        else if ((Datum >= new Date(Datum.getFullYear() + "-04-21") && Datum <= new Date(Datum.getFullYear() + "-05-20")))
            ToonSterrenbeeldFoto("stier");

        else if ((Datum >= new Date(Datum.getFullYear() + "-05-21") && Datum <= new Date(Datum.getFullYear() + "-06-21")))
            ToonSterrenbeeldFoto("tweeling");

        else if ((Datum >= new Date(Datum.getFullYear() + "-06-21") && Datum <= new Date(Datum.getFullYear() + "-07-22")))
            ToonSterrenbeeldFoto("kreeft");

        else if ((Datum >= new Date(Datum.getFullYear() + "-07-23") && Datum <= new Date(Datum.getFullYear() + "-08-23")))
            ToonSterrenbeeldFoto("leeuw");

        else if ((Datum >= new Date(Datum.getFullYear() + "-08-24") && Datum <= new Date(Datum.getFullYear() + "-09-23")))
            ToonSterrenbeeldFoto("maagd");

        else if ((Datum >= new Date(Datum.getFullYear() + "-09-24") && Datum <= new Date(Datum.getFullYear() + "-10-23")))
            ToonSterrenbeeldFoto("weegschaal");

        else if ((Datum >= new Date(Datum.getFullYear() + "-10-24") && Datum <= new Date(Datum.getFullYear() + "-11-22")))
            ToonSterrenbeeldFoto("schorpioen");

        else if ((Datum >= new Date(Datum.getFullYear() + "-11-23") && Datum <= new Date(Datum.getFullYear() + "-12-21")))
            ToonSterrenbeeldFoto("boogschutter");
    }

    function ToonSterrenbeeldFoto(Sterrenbeeld) {
        var URL = "img/" + Sterrenbeeld + ".png";
        document.getElementById("toonSterrenbeeldimg").src = URL;
        document.getElementById("toonSterrenbeeldLabel").textContent = Sterrenbeeld;
    }

}
//---------------------------------------------------------------------------------------------------------------------
//Cicylo domain 
//---------------------------------------------------------------------------------------------------------------------







window.onload = function () {


    toonDIV("login");

    toonmenuDIV("nietingelogdmenu");

    document.getElementById('btnlogin').addEventListener('click', function (e) {
        // toonmenuDIV("ingelogdmenu");
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
        let tmpID = "";

        checkVerbinding();
        fetch(request)
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
                tmpID = data.id;
                userID = tmpID;
                console.log(data.id);
                if (data.message == 'Authorized') {
                    toonmenuDIV("ingelogdmenu");
                    console.log("Reactie van backend API : Correcte gegevens");
                    toonDIV("profiel");
                    let profielData;
                    let profielNickData;
                    let profielDateData;
                    console.log("id " + tmpID);
                    superuserid = tmpID;

                    console.log(superuserid);

                    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + tmpID;

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
                            document.getElementById('toonlovecoins').value = profielData.lovecoins;
                            document.getElementById('detailFoto').setAttribute('src', 'https://scrumserver.tenobe.org/scrum/img/' + profielData.foto);
                            document.getElementById('detailFoto').setAttribute('alt', 'foto van ' + profielData.voornaam + ' ' + profielData.familienaam);
                            document.getElementById('profielVan').innerText = 'Details van ' + profielData.voornaam + ' ' + profielData.familienaam;
                            profielNickData = profielData.nickname;
                            profielDateData = profielData.geboortedatum
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
                        // profielData.lovecoins = document.getElementById('detailLovecoins').value;
                        let url = `https://scrumserver.tenobe.org/scrum/api/profiel/exists.php`;

                        let data = {
                            nickname: profielData.nickname

                        }
                        if (document.getElementById("detailGeboortedatum").checkValidity() === false) {
                            alert("u geeft een invalid datum in, u moet minstens 18 zijn");
                            document.getElementById('detailGeboortedatum').value = profielDateData;
                        }
                        else {

                            var request = new Request(url, {
                                method: 'POST',                 //request methode
                                body: JSON.stringify(data),     //body waar de data aan meegegeven wordt
                                headers: new Headers({          //onze API verwacht application/json
                                    'Content-Type': 'application/json'
                                })
                            });
                            let GekozenNicknaam = false;
                            checkVerbinding();
                            fetch(request)
                                .then(function (response) { return response.json(); })
                                .then(function (data) {
                                    if (data.message == "Profiel nickname beschikbaar") { } else { GekozenNicknaam = true }
                                    if (GekozenNicknaam == true && profielNickData !== profielData.nickname) {
                                        alert("u zal een andere nicknaam moeten kiezen");
                                        document.getElementById('detailNick').value = profielNickData
                                    }
                                    else {
                                        profielNickData = document.getElementById('detailNick').value;


                                        // profielData.lovecoins = document.getElementById('detailLovecoins').value;
                                        let email = profielData.email;
                                        if (email.includes("@") !== true) {
                                            alert("uw email adres zit in een fout formaat");

                                        } else {






                                            var request = new Request(urlUpdate, {
                                                method: 'PUT',
                                                body: JSON.stringify(profielData),
                                                headers: new Headers({
                                                    'Content-Type': 'application/json'
                                                })
                                            });
                                            checkVerbinding();
                                            fetch(request)
                                                .then(function (resp) { return resp.json(); })
                                                .then(function (data) { alert("Uw wijzigingen zijn correct opgeslagen"); })
                                                .catch(function (error) { console.log(error); });
                                        }
                                    }

                                })
                                .catch(function (error) { console.log(error); });
                        }



                    });



                    // scope test later
                    //

                    function GetSterrenbeeld(PersoonObj) {
                        console.log("test");
                        console.log(PersoonObj);
                        var Datum = new Date(PersoonObj);
                        SterrenbeeldDatum(Datum);
                    }



                    function SterrenbeeldDatum(Datum) {
                        if ((Datum >= new Date(Datum.getFullYear() + "-11-23") || Datum <= new Date(Datum.getFullYear() + "-01-19")))
                            ToonSterrenbeeldFoto("steenbok");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-01-20") && Datum <= new Date(Datum.getFullYear() + "-02-19")))
                            ToonSterrenbeeldFoto("waterman");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-02-20") && Datum <= new Date(Datum.getFullYear() + "-03-20")))
                            ToonSterrenbeeldFoto("vissen");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-03-21") && Datum <= new Date(Datum.getFullYear() + "-04-20")))
                            ToonSterrenbeeldFoto("ram");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-04-21") && Datum <= new Date(Datum.getFullYear() + "-05-20")))
                            ToonSterrenbeeldFoto("stier");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-05-21") && Datum <= new Date(Datum.getFullYear() + "-06-21")))
                            ToonSterrenbeeldFoto("tweeling");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-06-21") && Datum <= new Date(Datum.getFullYear() + "-07-22")))
                            ToonSterrenbeeldFoto("kreeft");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-07-23") && Datum <= new Date(Datum.getFullYear() + "-08-23")))
                            ToonSterrenbeeldFoto("leeuw");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-08-24") && Datum <= new Date(Datum.getFullYear() + "-09-23")))
                            ToonSterrenbeeldFoto("maagd");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-09-24") && Datum <= new Date(Datum.getFullYear() + "-10-23")))
                            ToonSterrenbeeldFoto("weegschaal");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-10-24") && Datum <= new Date(Datum.getFullYear() + "-11-22")))
                            ToonSterrenbeeldFoto("schorpioen");

                        else if ((Datum >= new Date(Datum.getFullYear() + "-11-23") && Datum <= new Date(Datum.getFullYear() + "-12-21")))
                            ToonSterrenbeeldFoto("boogschutter");
                    }

                    function ToonSterrenbeeldFoto(Sterrenbeeld) {
                        var URL = "img/" + Sterrenbeeld + ".png";
                        document.getElementById("Sterrenbeeldimg").src = URL;
                        document.getElementById("SterrenbeeldLabel").textContent = Sterrenbeeld;
                    }






















                } else {
                    toonDIV("loginerrormessage");
                    toonaddDIV("login");
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

    else if ((Datum >= new Date(Datum.getFullYear() + "-06-21") && Datum <= new Date(Datum.getFullYear() + "-07-22")))
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



document.getElementById('zoekformulier').addEventListener('click', function () {
    //console.log("zoekformulier");
    document.getElementById("geslacht").value = "";

    toonDIV("zoek");
    const deKnop = document.getElementById("verstuur");
    deKnop.onclick = function () {



        toonDIV("zoekresults");
        let IDminGr = document.getElementById("minGrootte").value;
        let IDmaxGr = document.getElementById("maxGrootte").value;
        let IDminLeeftijd = document.getElementById("minLeeftijd").value;
        let IDmaxLeeftijd = document.getElementById("maxLeeftijd").value;
        let IDKleurHaar = document.getElementById("kleurHaar").value;
        let IDKLeurOgen = document.getElementById("kleurOgen").value;
        let IDgeslacht = document.getElementById("geslacht").value;

        let zoekurl = "";
        let checkTeller = 0



        if ((IDminGr === "") && (IDmaxGr === "") && (IDminLeeftijd === "") && (IDmaxLeeftijd === "") && (IDKleurHaar === "") && (IDKLeurOgen === "") && (IDgeslacht === "")) {
            alert('invullen die handel');
            toonDIV("zoek");
        } else {
            if (IDminGr !== "") {
                if (IDminGr < 80 || IDminGr > 250) {
                    alert("Min grootte moet tussen 80 en 250 cm liggen.");
                    checkTeller = 1;
                    toonDIV("zoek");
                }

            }
            if (IDmaxGr !== "") {
                if (IDmaxGr < 80 || IDmaxGr > 250) {
                    alert("Max grootte moet tussen 80 en 250 cm liggen.");
                    checkTeller = 1;
                    toonDIV("zoek");
                }
            }
            if (IDminLeeftijd !== "") {
                if (IDminLeeftijd < 18 || IDminLeeftijd > 100) {
                    alert("Min leeftijd moet tussen 18 en 100 jaar liggen.");
                    checkTeller = 1;
                    toonDIV("zoek");
                }

            }
            if (IDmaxLeeftijd !== "") {
                if (IDmaxLeeftijd < 18 || IDmaxLeeftijd > 100) {
                    alert("Max leeftijd moet tussen 18 en 100 jaar liggen.");
                    checkTeller = 1;
                    toonDIV("zoek");
                }
            }

            //console.log(IDmaxLeeftijd);
            //console.log(IDminLeeftijd);

            if (checkTeller === 0) {
                var date = new Date();
                date.setFullYear(date.getFullYear() - IDmaxLeeftijd);
                var dd = date.getDate();
                var mm = date.getMonth() + 1;
                var yyyy = date.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                date = yyyy + '-' + mm + '-' + dd;
                //console.log(date);
                var date2 = new Date();
                date2.setFullYear(date2.getFullYear() - IDminLeeftijd);
                var dd2 = date2.getDate();
                var mm2 = date2.getMonth() + 1;
                var yyyy2 = date2.getFullYear();
                if (dd2 < 10) {
                    dd2 = '0' + dd2;
                }
                if (mm2 < 10) {
                    mm2 = '0' + mm2;
                }
                date2 = yyyy2 + '-' + mm2 + '-' + dd2;

                //url += '?geboortedatumOperator=range&rangeMinGeboortedatum=' + rangeMinGeboortedatum + '&rangeMaxGeboortedatum=' + rangeMaxGeboortedatum;


                if (IDminLeeftijd !== "") { zoekurl = zoekurl + "geboortedatumOperator=range&rangeMinGeboortedatum=" + date + '&'; }
                if (IDmaxLeeftijd !== "") { zoekurl = zoekurl + "rangeMaxGeboortedatum=" + date2 + '&'; }

                if (IDminGr !== "") { zoekurl = zoekurl + "grootteOperator=range&rangeMinGrootte=" + IDminGr + '&'; }
                if (IDmaxGr !== "") { zoekurl = zoekurl + "rangeMaxGrootte=" + IDmaxGr + '&'; }
                if (IDKleurHaar !== "") { zoekurl = zoekurl + "haarkleur=" + IDKleurHaar + '&'; }
                if (IDKLeurOgen !== "") { zoekurl = zoekurl + "oogkleur=" + IDKLeurOgen + '&'; }
                if (IDgeslacht !== "") { zoekurl = zoekurl + "sexe=" + IDgeslacht + '&'; }
                zoekurl = zoekurl.substring(0, zoekurl.length - 1);
                let checkTeller = 0;


                let teller = 0;

                const zoektabelid = document.getElementById("uitvoerzoektabel");
                let url = "https://scrumserver.tenobe.org/scrum/api/profiel/search.php?" + zoekurl;
                //console.log(url);
                //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
                checkVerbinding();
                let profielIDs = [];
                fetch(url)
                    .then(function (resp) { return resp.json(); })
                    .then(function (data) {
                        //console.log(data);
                        if (data.message === "Geen profielen gevonden.") {

                            alert('geen overeenkomsten gevonden');
                            toonDIV("zoek");
                        } else {
                            for (const tmp of data) {
                                teller = teller + 1;
                                if (teller > 20) { break; }


                                const tr = zoektabelid.insertRow();
                                const favbuttoncell = tr.insertCell();
                                const nicknamecell = tr.insertCell();
                                const voornaamcell = tr.insertCell();
                                const familienaamcell = tr.insertCell();
                                const geslachtcell = tr.insertCell();
                                const leeftijdcell = tr.insertCell();
                                const emailcell = tr.insertCell();
                                const sterrenbeeldcell = tr.insertCell();




                                const leeftijd = Math.floor((new Date() - new Date(tmp.geboortedatum).getTime()) / 3.15576e+10);

                                console.log(tmp);

                                let buttonhtml = document.createElement("BUTTON"); 
                                buttonhtml.innerHTML = "Profiel";

                                let tekstteller=teller.toString()
                                buttonhtml.id = "favbutton"+tekstteller;
                                console.log(tekstteller);
                                buttonhtml.value = tmp.id;

                                profielIDs.push(tmp.id);

                                favbuttoncell.appendChild(buttonhtml);

                                voornaamcell.innerText = tmp.voornaam;
                                familienaamcell.innerText = tmp.familienaam;
                                leeftijdcell.innerText = leeftijd;
                                geslachtcell.innerText = tmp.sexe;
                                nicknamecell.innerText = tmp.nickname;
                                emailcell.innerText = tmp.email;
                                // sterrenbeeldcell.innerText=sterrenBeeldNaarJpeg(tmp.geboortedatum);
                                const datumDatumformaat = new Date(tmp.geboortedatum);
                                // sterrenbeeldcell.innerText = sterrenBeeldNaarJpeg(datumDatumformaat);

                                sterrenbeeldcell.innerHTML = sterrenBeeldNaarJpeg(datumDatumformaat);
                                let img = document.createElement('img');
                                img.width = 50;
                                // img.className("smallogo-img");
                                img.src = "img/" + sterrenBeeldNaarJpeg(datumDatumformaat) + ".png";
                                sterrenbeeldcell.appendChild(img);

                                // leeftijdcell=toString(getAge("1994-06-14"));
                               //console.log(teller);
                               // document.getElementById('favbutton'+teller.toString()).addEventListener('click', function (e)
                               //   {  const v=Math.floor(Math.random() * 5000) + 1;
                               //        alert(v.toString())})


                            }
                            // for (var x = 0; x < teller; x++)
                            //  {const y=x+1;
                            //   const tekstx=y.toString();
                            //   console.log(tekstx);
                            //   document.getElementById('favbutton'+tekstx).addEventListener('click', function (e)
                            //   {betaalLovecoinstoonprofiel(profielIDs[x]);})    

                            //  }
                    
                            
                            
                            
                            document.getElementById('favbutton1').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[0]);})
                            document.getElementById('favbutton2').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[1]);})
                            document.getElementById('favbutton3').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[2]);})
                            document.getElementById('favbutton4').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[3]);})
                            document.getElementById('favbutton5').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[4]);})
                            document.getElementById('favbutton6').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[5]);})
                            document.getElementById('favbutton7').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[6]);})
                            document.getElementById('favbutton8').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[7]);})
                            document.getElementById('favbutton9').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[8]);})
                            document.getElementById('favbutton10').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[9]);})
                            document.getElementById('favbutton11').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[10]);})
                            document.getElementById('favbutton12').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[11]);})
                            document.getElementById('favbutton13').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[12]);})
                            document.getElementById('favbutton14').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[13]);})
                            document.getElementById('favbutton15').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[14]);})
                            document.getElementById('favbutton16').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[15]);})
                            document.getElementById('favbutton17').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[16]);})
                            document.getElementById('favbutton18').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[17]);})
                            document.getElementById('favbutton19').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[18]);})
                            document.getElementById('favbutton20').addEventListener('click', function (e) {betaalLovecoinstoonprofiel(profielIDs[19]);})
                           

                         

                            
                        }


                    })
                    .catch(function (error) { console.log(error); });
            }

        }






        console.log(zoekurl);
    }


    const rooturl = 'https://scrumserver.tenobe.org/scrum/api';

    let url = rooturl + '/profiel/read.php';
    checkVerbinding();
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
        while (select.hasChildNodes()) {
            select.removeChild(select.firstChild);
        }
        let legeOPtie3 = document.createElement("option");
        legeOPtie3.value = "";
        legeOPtie3.innerText = "Kies een kleur van haar";
        select.appendChild(legeOPtie3);
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
        while (select2.hasChildNodes()) {
            select2.removeChild(select2.firstChild);
        }
        let legeOPtie = document.createElement("option");
        legeOPtie.value = "";
        legeOPtie.innerText = "Kies een kleur van ogen";
        select2.appendChild(legeOPtie);
        for (const el of data) {
            let kleurOgen = el.oogkleur;
            arrayOgen.push(kleurOgen);
        }
        let unique2 = [...new Set(arrayOgen)];
        for (const el2 of unique2) {
            let option2 = new Option(el2);
            select2.appendChild(option2);
        }

        const selectSexe = document.getElementById("geslacht");
        let arraySexe = [];
        while (selectSexe.hasChildNodes()) {
            selectSexe.removeChild(selectSexe.firstChild);
        }
        let legeOPtie2 = document.createElement("option");
        legeOPtie2.value = "";
        legeOPtie2.innerText = "Kies een geslacht";
        selectSexe.appendChild(legeOPtie2);
        for (const elSexe of data) {
            let optionSexe = elSexe.sexe;
            arraySexe.push(optionSexe);
        }
        console.log(arraySexe);
        //Unieke idexen removen
        let unique3 = [...new Set(arraySexe)];
        for (const el3 of unique3) {
            let option3 = new Option(el3);
            selectSexe.appendChild(option3);
        }

    }








})












//Jan's Domain & David's Domain
//--------------------------------------------------------------------------------------------------------------------------------------


