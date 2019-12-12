"use strict";

document.getElementById("toevoegen").onclick = function(){
    let zoekurl="sexe=m";
    let teller=0;

    const zoektabelid = document.getElementById("uitvoerzoektabel");
    let url="https://scrumserver.tenobe.org/scrum/api/profiel/search.php?" + zoekurl;
                //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
                fetch(url)
                    .then(function (resp)   { return resp.json(); })
                    .then(function (data)   {for(const tmp of data) {
                        teller = teller +1;
                        if (teller > 20) {break;}
                      
                        
                        const tr = zoektabelid.insertRow();
                        const nicknamecell = tr.insertCell();
                        const voornaamcell = tr.insertCell();
                        const familienaamcell = tr.insertCell();
                        const geslachtcell = tr.insertCell();
                        const leeftijdcell = tr.insertCell();
                        const emailcell = tr.insertCell();
                        
                        

                        
                        const leeftijd = Math.floor((new Date() - new Date(tmp.geboortedatum).getTime()) / 3.15576e+10);

                        console.log(tmp); 
                        
                        voornaamcell.innerText=tmp.voornaam;
                        familienaamcell.innerText=tmp.familienaam;
                        leeftijdcell.innerText=leeftijd;
                        geslachtcell.innerText=tmp.sexe;
                        nicknamecell.innerText=tmp.nickname;
                        emailcell.cell=tmp.email;
                        
                        // leeftijdcell=toString(getAge("1994-06-14"));


                        
                    } })
                    .catch(function (error) { console.log(error); });



};