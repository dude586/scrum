"use strict"
/*valideren onchange**********************/

const foutmeldingspan=document.getElementById("foutmeldingspan");

const invoerelementen=document.querySelectorAll("input,select");
for(const element of invoerelementen){
    element.onchange=function(){
        if(this.checkValidity()){
			this.classList.remove("fout");
			foutmeldingspan.innerText="";
        }else{
			this.classList.add("fout");
			foutmeldingspan.innerText="invalid invoer verplict";
		}

        
    }
}

//upload button onclick
document.getElementById("upload").onclick=function(){
window.open("https://scrumserver.tenobe.org/scrum/frontend/fotoWebcam.html");
}

//verzenden button onclick
document.getElementById("submit").onclick=function(){
	
	//valideren
	const eersteInvalid=document.querySelector("input:invalid,select:invalid");
	const herhaalWachtwoord=document.getElementById("h-wachtwoord");
	const nicknaam=document.getElementById("nickname");

	
	//controleer eerst als alle gegeven werd ingevoerd
	if(eersteInvalid !==null ){ /*er is ivalid invoer*/
	 
		eersteInvalid.classList.add("fout"); 
		foutmeldingspan.innerText="invalid invoer verplict";

		
	}else{
		
		//controleer als de wachtwoord werd het zelfde herhaald
	    
	    if(document.getElementById("wachtwoord").value !==herhaalWachtwoord.value){ //niet het zelfde
	     	
			herhaalWachtwoord.classList.add("fout");
			foutmeldingspan.innerText="de wachtwoord werd niet het zefde hehaald";
			
		}else{
		
			herhaalWachtwoord.classList.remove("fout");
			foutmeldingspan.innerText="";
			// controleer als de nicknaam al bestaat
			const nickname=document.getElementById("nickname").value;
			console.log(nickname);
			
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
			
			fetch(request)
			.then(function (response){return response.json();})
			.then(verwerkdatainresponse)
			.catch(function (error){console.log(error);});	

			function verwerkdatainresponse(data){
			
				if (data.message==="Profiel nickname niet beschikbaar"){

					nicknaam.classList.add("fout");
					foutmeldingspan.innerText="de gekozen nickname bestaat al";
				}else{
					nicknaam.classList.remove("fout");
					foutmeldingspan.innerText="";
					// hier alles ok stuur de gegevens
					/*/--------------------------------------------------------------------------------------------------
					let user = {
						voornaam: "",
						geboortedatum: "",
						email: "",
						nickname: "",
						foto: "sdqddqs.png", // change to http again
						beroep: "",
						sexe: "",
						haarkleur: "",
						oogkleur: "",
						grootte: "",
						gewicht: "",
						wachtwoord: "",
						lovecoins: "3"
					}
										
					//Update img url to img tag.
					var testing;
					function readURL(input) {
						let self = this;
						if (input.files && input.files[0]) {
							var reader = new FileReader();
					
							reader.onload = function (e) {
								document.getElementById("fotoToDiv").src = e.target.result;
								self.imageData = e.target.result;
							   var testing = FileReader.result;
							   console.log(testing);
							}
						//	let test = reader.readAsDataURL(file);
					//      console.log(test);
							reader.readAsDataURL(input.files[0]);
							
						}
					
					}
					 
					document.getElementById("fotoSrc").onchange = function() {
					   readURL(this);
					   var tst = document.getElementById("fotoToDiv").src;
						console.log(tst);
					};
					
					
					//handleForm
					
					const handleFormSubmit = function() {
						//FETCH HOW MANY USER IDs there are and use that number++ to add id to this new user
					
					
						// let users;
						// fetch('https://scrumserver.tenobe.org/scrum/api/profiel/read.php')
					 //    .then(function (response){return response.json();})
					 //    .then(data => {users = data 
					 //    console.log(users);})
						
						// user.id = users.length;
					
						user.id = "5003";
					
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
					
						//Chech user object
						console.log(user);
						console.log(JSON.stringify(user));
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
					
					
					};
					
					document.getElementById("submit").onclick = handleFormSubmit;
					
					


					//--------------------------------------------------------------------------------------------------	
				*/	
				}

			}


        }
		  
     }


}

