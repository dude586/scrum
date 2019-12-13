"use strict"

/*valideren onchange**********************/

const invoerelementen=document.querySelectorAll("input,select");
for(const element of invoerelementen){
    element.onchange=function(){
        if(this.checkValidity()){
            this.classList.remove("fout");
        }else{this.classList.add("fout");}//this.style.borderColor="#f00";

        
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

	
	//controleer eerst als alle gegeven werd ingevoerd
	if(eersteInvalid !==null ){ /*er is ivalid invoer*/
	 
		eersteInvalid.classList.add("fout"); 
		
	}else{
		
		//controleer als de wachtwoord werd het zelfde herhaald
	    
	    if(document.getElementById("wachtwoord").value !==herhaalWachtwoord.value){ //niet het zelde
	     	
			herhaalWachtwoord.classList.add("fout");
			
		}else{
		
			herhaalWachtwoord.classList.remove("fout");
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
			.then(function (data){console.log(data);})
			.catch(function (error){console.log(error);});	
			

			//hier stuur de gegevens
	

		}
		  
	}

	
	
}
