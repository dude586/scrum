"use strict"
console.log("loading script");
//VARIABLES
let imgData;
let fotoName;
let foutmeldingspan = document.getElementById("foutmeldingspan");
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

  if(await checkIfUserExist()) {
    foutmeldingspan.innerText = "de bijnaam bestaat al";
    console.log("User Exist");
    return false;
  }

  if (await validateForm()) {
    await uploadPictureToApi(imgData);
    await requestApiCreate();
    console.log("it has been sended");
    console.log(user);
    foutmeldingspan.innerText ="";
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
 //Validate that inputs are not wrong so form is sended good.
 function validateForm() {
  

  const dateValue = document.getElementById("geboortedatum");
 const herhaalWachtwoord = document.getElementById("h-wachtwoord");
 const wachtwoord = document.getElementById("wachtwoord");
 if(dateValue.checkValidity() === false ){ /*er is ivalid invoer*/

    let labeltext = dateValue.id;
    foutmeldingspan.innerText= `een valid invoer is verplict bij ${labeltext}`;
    return false

  }
 
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
      foutmeldingspan.innerText="";
  for (var i = 0; i < 12; i++) {
    inputs[i].classList.remove('invalid-warning');
    if (inputs[i].checkValidity() === false) {
      // if(inputs[i].id["gewicht"] !== null) {
      //   foutmeldingspan.innerText="min 30 max 450";
      // }
      // if(inputs[i].id["grootte"] !== null) {
      //   foutmeldingspan.innerText="min 80 max 250";
      // }

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

async function checkIfUserExist() {
  const nickname = document.getElementById("nickname").value;
  let url = `https://scrumserver.tenobe.org/scrum/api/profiel/exists.php`;
  let data = {
   nickname: nickname
  }

  var request = new Request(url, {
   method: 'POST',                 //request methode
   body: JSON.stringify(data),     //body waar de data aan meegegeven wordt
   headers: new Headers({          //onze API verwacht application/json
  'Content-Type': 'application/json'
   })
  });
  const response = await (await fetch(request).catch()).json();
  console.log(response.message);

  if (response.message === "Profiel nickname niet beschikbaar") {
    return true;
  } else {
    return false;
  }
};

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

function checkDateInput() {
  const nu = new Date();
  const dag = nu.getDate();
  const dag2 = ((dag < 10) ? "0" : "") + dag;
  const maand = nu.getMonth() + 1;
  const maand2 = ((maand < 10) ? "0" : "") + maand;
  const jaar = nu.getFullYear()-18;
  document.getElementById("geboortedatum").max=`${jaar}-${maand2}-${dag2}`;
  console.log(dag); 
}

// Submit button VALIDATION MAIN FUNCTION
document.getElementById("button").onclick = mainFunction;
checkDateInput();









// "use strict"
// //testtttt delete
// // bepalen de max attribuut van de geboortedatum :leeftijd >=18 jaar
// const nu = new Date();
// const dag = nu.getDate();
// const dag2 = ((dag < 10) ? "0" : "") + dag;
// const maand = nu.getMonth() + 1;
// const maand2 = ((maand < 10) ? "0" : "") + maand;
// const jaar = nu.getFullYear()-18;
// document.getElementById("geboortedatum").max=`${jaar}-${maand2}-${dag2}`;


// //valideren bij onchang()
// const foutmeldingspan = document.getElementById("foutmeldingspan");

// const invalidElementen=document.querySelectorAll("input:not([type=file]),select");
// for(const element of invalidElementen){
//   element.onchange=function(){
//     if(element.checkValidity()){
//       foutmeldingspan.innerText="";
//     }
  
//   }
// }




// // valideren bij onclick()  
// function validateForm(){
//   let allesok=true;
  
//   const herhaalWachtwoord=document.getElementById("h-wachtwoord");
//   const img=document.getElementById("fotoToDiv");
  
//   //controleer eerst als alle gegeven werd ingevoerd
//   const eersteInvalid=document.querySelector("input:not([type=file]):invalid,select:invalid");
//    if (document.getElementById("fotoSrc").value === "") {
//     return false
//     console.log("there is no msg");
//     }
//   if(eersteInvalid !== null ){/*er is ivalid invoer*/
//       let labeltext=eersteInvalid.previousElementSibling.innerText;
//     foutmeldingspan.innerText=`een valid invoer is verplict bij ${labeltext}`;
//     allesok=false;

//   }else {
//     //controleer als de wachtwoord werd het zelfde herhaald
//       if(document.getElementById("wachtwoord").value !==herhaalWachtwoord.value){ //niet het zelfde
//       foutmeldingspan.innerText="de wachtwoord werd niet het zefde hehaald";
//       allesok=false;
//     }else {  
//           // controleer als de nicknaam al bestaat
//           const nickname=document.getElementById("nickname").value;
//           let url = `https://scrumserver.tenobe.org/scrum/api/profiel/exists.php`;
//           let data = {
//            nickname: nickname
//           }

//           var request = new Request(url, {
//            method: 'POST',                 //request methode
//            body: JSON.stringify(data),     //body waar de data aan meegegeven wordt
//            headers: new Headers({          //onze API verwacht application/json
//           'Content-Type': 'application/json'
//            })
//           });
      
//           fetch(request)
//           .then(function (response){return response.json();})
//           .then(verwerkdatainresponse)
//           .catch(function (error){console.log(error);});  

//           function verwerkdatainresponse(data){
      
//            if (data.message==="Profiel nickname niet beschikbaar"){
//             foutmeldingspan.innerText="de gekozen nickname bestaat al";
//             allesok=false;
//           }else{
//               //controleer als de foto werd geladen
//                 if(img.src==="#"){
//                 foutmeldingspan.innerText="kies een foto";
//                 allesok=false;
//               }else{
//                 foutmeldingspan.innerText="";               
//               }

//           }
//         }
      
//     }
//   }
//   return allesok;

// }