"use strict";
let zoekresultaten = [];

document.getElementById("toevoegen").onclick = function(){
    let url='https://scrumserver.tenobe.org/scrum/api/profiel/search.php?sexe=m';
                //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
                fetch(url)
                    .then(function (resp)   { return resp.json(); })
                    .then(function (data)   {  for(const p of data){
                        zoekresultaten.push = p;
                    } })
                    .catch(function (error) { console.log(error); });
};
console.log(zoekresultaten);