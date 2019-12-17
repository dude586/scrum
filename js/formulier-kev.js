"use strict"

//VARIABLES
const foutmeldingspan = document.getElementById("foutmeldingspan");
let imgData;

//USER object.
let user = {
  id: "",
  familienaam: "",
  voornaam: "",
  geboortedatum: "",
  email: "",
  nickname: "",
  foto: "",
  beroep: "",
  sexe: "",
  haarkleur: "",
  oogkleur: "",
  grootte: "",
  gewicht: "",
  wachtwoord: "",
  lovecoins: "3"
}

//ASYNC FUNCTION
async function mainFunction() {
  await getUserId();
  //add values from input to user object
  const input = document.getElementsByTagName("input");
  user.familienaam = input['familienaam'].value;
  user.voornaam = input['voornaam'].value;
  user.geboortedatum = input['geboortedatum'].value;
  user.email = input['email'].value;
  user.beroep = input['beroep'].value;
  const sexe = document.getElementById('sexe');
  const sexeValue = sexe.options[sexe.selectedIndex].value;
  user.sexe = sexeValue;
  user.oogkleur = input['oogkleur'].value;
  user.gewicht = input['gewicht'].value;
  user.haarkleur = input['haarkleur'].value;
  user.grootte = input['grootte'].value;
  user.nickname = input['nickname'].value;
  user.wachtwoord = input['wachtwoord'].value;
  //await uploadPictureToApi(imgData);  

  if (validateForm()) {
    console.log("it has been sended");
    console.log(user);

    if(await uploadPictureToApi(imgData)) {    
    requestApiCreate();
    } else {
      console.log("Error in uploading img");
      return false;
    }
          
} else { 
  console.log("Error validateForm");
  return false;
  };  
              
//end mainFunction
};

////////////////FUNCTIONS/////////////////////
function requestApiCreate() {
  //convert object to JSON
 var request = new Request('https://scrumserver.tenobe.org/scrum/api/profiel/create.php', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: new Headers({
          'Content-Type': 'application/json'
          })
            });
                  
            fetch(request)
                .then( function (resp)  { return resp.json(); })
                .then( function (user)  { console.log(user);  })
                .catch(function (error) { console.log(error); return false;}); 
                return true;
 }               

 function uploadPictureToApi(base64String) {
            console.log('•Foto wordt doorgestuurd naar de API.');
            let naam = user.foto;
            let afbeelding = base64String;
            let url = 'https://scrumserver.tenobe.org/scrum/api/image/upload.php';
            let data = {
                naam: naam,
                afbeelding: afbeelding
            }
            var request = new Request(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            fetch(request)
                .then(function (resp) { return resp.json(); })
                .then(function (data) {
                    console.log('==> OK (Foto te vinden op url = ' + data.fileURL + ')');
                    console.log('• Foto inladen in IMG');
                    console.log('==> OK');
                    console.log('==> Klaar');
                    user.foto = data.fileName;
                    //user.foto = test.split('/').pop();               
                })
                .catch(function (error) { console.log(error); return false; });

                return true;
        }

 // Validate that inputs are not wrong so form is sended good.
 function validateForm() {
 //Validate het zelfde wachtwoord
 const herhaalWachtwoord = document.getElementById("h-wachtwoord");
 const wachtwoord = document.getElementById("wachtwoord");
  if ( herhaalWachtwoord.value !== wachtwoord.value && wachtwoord.value !== "" && herhaalWachtwoord.value !== ""){        
      herhaalWachtwoord.classList.add("fout");
      foutmeldingspan.innerText="de wachtwoord werd niet het zefde hehaald";
      return false; 
    }
  else if (herhaalWachtwoord.value === wachtwoord.value) {
    herhaalWachtwoord.classList.remove("fout");
    foutmeldingspan.innerText="";
  }

//Validate that inputs are not empty
  let inputs = document.getElementsByTagName("input");
  
  for (var i = 0; i < 12; i++) {
    inputs[i].classList.remove('invalid-warning');
    if (inputs[i].value == "") {
    inputs[i].focus();
    inputs[i].classList.toggle('invalid-warning');
      return false;
    }
  }
  return true;

//End ValidateForm  
}

//Fetch data from server.
async function getUserId() {
  const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read.php");
  const users = await response.json();
  user.id = users[users.length-1].id;
}

//SYNC FUNCTION
//Update img url to img tag.
document.getElementById("fotoSrc").addEventListener("change", function() {
   if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("fotoToDiv").src = e.target.result;
            
            
            imgData = e.target.result;
        }
        reader.readAsDataURL(this.files[0]);  
        user.foto = this.files[0].name;    
    }
   
});


// Submit button VALIDATION MAIN FUNCTION
document.getElementById("button").onclick = mainFunction;

