"use strict";

document.getElementById("knoptesten").onclick = function(){
    let url='https://scrumserver.tenobe.org/scrum/api/profiel/search.php?sexe=m';
                //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
                fetch(url)
                    .then(function (resp)   { return resp.json(); })
                    .then(function (data)   { console.log(data[0].voornaam);  })
                    .catch(function (error) { console.log(error); });
};
