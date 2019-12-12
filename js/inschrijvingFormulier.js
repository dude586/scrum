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

			//hier stuur de gegevens
	

		}
		  
	}

	
	
}
