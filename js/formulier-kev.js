"use strict"
/*valideren onchange**********************/

const foutmeldingspan = document.getElementById("foutmeldingspan");

//Create user object.
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
  	await getData();
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

	if (validateForm() === false) {
		console.log("false validateForm");
		console.log(user);
		
	} else {
	console.log("it has been sended");
	console.log(user);
	//Check user object
	//console.log(user);
	//console.log(JSON.stringify(user));

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
                    .catch(function (error) { console.log(error); });
    
      uploadPicture(document.getElementById("fotoToDiv").src);              
    
    //end else
    };  
              
//end mainFunction
};


 //FUNCTIONS!!!!

 function uploadPicture(base64String) {
            console.log('• Foto wordt doorgestuurd naar de API.');
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
                    console.log(data.fileURL);
                    
                    //user.foto = data.fileURL;
                    //user.foto = input_string.replace(.*(_),'');
                })
                .catch(function (error) { console.log(error); });
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
  for (var i = 1; i < 12; i++) {
  	if (inputs[i].value == "") {
 		inputs[i].focus();
    	return false;
  	}
  }
  return true;

//End ValidateForm  
}

//Fetch data from server.
async function getData() {
  const response = await fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read.php");
  const users = await response.json();
  user.id = users[users.length-1].id;
}

//Update img url to img tag.
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("fotoToDiv").src = e.target.result;
            user.foto = "foto.jpg"
            console.log(document.getElementById("fotoToDiv").src);
        }
        reader.readAsDataURL(input.files[0]);      
    }
}


//SYNC FUNCTION
document.getElementById("fotoSrc").onchange = function() {
   readURL(this);
   
};


// Submit button VALIDATION
document.getElementById("button").onclick = mainFunction;














//OLD CODE!!!
// const invoerelementen = document.querySelectorAll("input[type=text],input[type=number],select");
// for(const element of invoerelementen){
//     element.onchange = function(){
//         if(this.checkValidity()){
// 			this.classList.remove("fout");
// 			foutmeldingspan.innerText="";
//         }else{
// 			this.classList.add("fout");
// 			foutmeldingspan.innerText="invalid invoer verplict";
// 		}
//     }
// }






	//CODE SHE

	//valideren
	//const eersteInvalid=document.querySelector("input[type=text]:invalid,input[type=number]:invalid,select:invalid");
	
	// const nicknaam = document.getElementById("nickname");

	// //controleer eerst als alle gegeven werd ingevoerd
	// if(eersteInvalid !==null ){ /*er is ivalid invoer*/

	// 	eersteInvalid.classList.add("fout"); 
	// 	foutmeldingspan.innerText="invalid invoer verplict";
		
	// } else {

	// 	//controleer als de wachtwoord werd het zelfde herhaald

	//     if (document.getElementById("wachtwoord").value !==herhaalWachtwoord.value){ //niet het zelfde
	     	
	// 		herhaalWachtwoord.classList.add("fout");
	// 		foutmeldingspan.innerText="de wachtwoord werd niet het zefde hehaald";
			
	// 	} else {
				
	// 		herhaalWachtwoord.classList.remove("fout");
	// 		foutmeldingspan.innerText="";
	// 		// controleer als de nicknaam al bestaat
	// 		const nickname=document.getElementById("nickname").value;
	// 		console.log(nickname);
			
	// 		let url = "https://scrumserver.tenobe.org/scrum/api/profiel/exists.php";

	// 		let data = {
	// 			nickname: nickname		
	// 		}
			
	// 		var request = new Request(url, {
	// 			method: 'POST',                 //request methode
	// 			body: JSON.stringify(data),     //body waar de data aan meegegeven wordt
	// 			headers: new Headers({          //onze API verwacht application/json
	// 				'Content-Type': 'application/json'
	// 			})
	// 		});
			
	// 		fetch(request)
	// 		.then(function (response){return response.json();})
	// 		.then(verwerkdatainresponse)
	// 		.catch(function (error){console.log(error);});	

	// 		function verwerkdatainresponse(data){
			
	// 			if (data.message==="Profiel nickname niet beschikbaar"){

	// 				nicknaam.classList.add("fout");
	// 				foutmeldingspan.innerText="de gekozen nickname bestaat al";
	// 			} else {
					
	// 				nicknaam.classList.remove("fout");
	// 				foutmeldingspan.innerText="";
	// 				//controleer als de foto werd geladen
	// 				console.log(img.src);
	// 		        if(img.src==="#"){
						
	// 					foutmeldingspan.innerText="kies een foto";
	// 					img.parentElement.style.borderColor="#f00"
 //                    } else {
	// 					foutmeldingspan.innerText="";
	// 					img.parentElement.style.borderColor="";
	// 				}
	// 			}
	// 			//end function verwerkdatainresponse
	// 		}
	// 	}
	// }
