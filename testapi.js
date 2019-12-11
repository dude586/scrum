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