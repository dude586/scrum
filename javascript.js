"use strict";
let url = 'https://scrumserver.tenobe.org/scrum/api/bericht/read.php?profielId=2';
fetch(url)
    .then(function (response){return response.json();})
    .then(function (data){console.log(data);});