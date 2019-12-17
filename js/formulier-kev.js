"use strict"
console.log("loading script");
//VARIABLES
const foutmeldingspan = document.getElementById("foutmeldingspan");
let imgData;
let fotoName;
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
  await uploadPictureToApi(imgData);

  if (await validateForm()) {
    await requestApiCreate();
    console.log("it has been sended");
    console.log(user);   
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

 async function uploadPictureToApi(base64String) {
            console.log('•Foto wordt doorgestuurd naar de API.');
            let naam = fotoName;
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
            const response = await fetch(request);
                const users = await response.json();
                console.log(users);
                user.foto = users.fileName;
                console.log(users.fileName);
                // .catch(function (error) { console.log(error); return false; });

                return true;
        }
        
  //  .then(function (data) {
  //                   console.log('==> OK (Foto te vinden op url = ' + data.fileURL + ')');
  //                   console.log('• Foto inladen in IMG, OK');
  //                   user.foto = data.fileName;           
  //               })
  // user.id = users[users.length-1].id;

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
        fotoName = this.files[0].name;    
    }
   
});


// Submit button VALIDATION MAIN FUNCTION
document.getElementById("button").onclick = mainFunction;

