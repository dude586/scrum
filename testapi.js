function testapi() {
   
    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/search.php?voornaam=david';
    fetch(url)
        .then(function (response){return response.json();})
        .then(function (data){console.log(data)})
        .catch(function (error){console.log(error);})

        let tmpdata=fetch(url).arrayBuffer; 
//   console.log(datatmp);  
 console.log(tmpdata); 
  

}
document.addEventListener("DOMContentLoaded", testapi);

// test 