"use strict"

//Update img url to img tag.
var testing;
function readURL(input) {
	let self = this;
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			document.getElementById("fotoToDiv").src = e.target.result;
		}
		reader.readAsDataURL(input.files[0]);
		
	}

}
 
document.getElementById("fotoSrc").onchange = function() {
   readURL(this);
   var tst = document.getElementById("fotoToDiv").src;
	
};


// bepalen de max attribuut van de geboortedatum :leeftijd >=18 jaar
const nu = new Date();
const dag = nu.getDate();
const dag2 = ((dag < 10) ? "0" : "") + dag;
const maand = nu.getMonth() + 1;
const maand2 = ((maand < 10) ? "0" : "") + maand;
const jaar = nu.getFullYear()-18;
document.getElementById("geboortedatum").max=`${jaar}-${maand2}-${dag2}`;

//verzenden button onclick
document.getElementById("button").onclick=function(){
	
	//valideren
	const foutmeldingspan=document.getElementById("foutmeldingspan");
	
	const herhaalWachtwoord=document.getElementById("h-wachtwoord");
	const img=document.getElementById("fotoToDiv");

	
	//controleer eerst als alle gegeven werd ingevoerd
	const eersteInvalid=document.querySelector("input:not([type=file]):invalid,select:invalid");
	if(eersteInvalid !==null ){ /*er is ivalid invoer*/
	    let labeltext=eersteInvalid.previousElementSibling.innerText;
		foutmeldingspan.innerText=`een valid invoer is verplict bij ${labeltext}`;

	}else{
		//controleer als de wachtwoord werd het zelfde herhaald
	    if(document.getElementById("wachtwoord").value !==herhaalWachtwoord.value){ //niet het zelfde
                   foutmeldingspan.innerText="de wachtwoord werd niet het zefde hehaald";
		}else{	
			    // controleer als de nicknaam al bestaat
			    const nickname=document.getElementById("nickname").value;
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
						foutmeldingspan.innerText="de gekozen nickname bestaat al";
					}else{
						  //controleer als de foto werd geladen
					      if(img.src==="#"){
							  foutmeldingspan.innerText="kies een foto";
							}else{
								foutmeldingspan.innerText="";								
								// hier alles ok stuur de gegevens
							}
					}
				}
			
		}
	}
}

