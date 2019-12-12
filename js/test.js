
const deKnop = document.getElementById("verstuur");




deKnop.onclick = function (){
    

let IDminGr = document.getElementById("minGrootte").value;
let IDmaxGr = document.getElementById("maxGrootte").value;
let IDminLeeftijd = document.getElementById("minLeeftijd").value;
let IDmaxLeeftijd = document.getElementById("maxLeeftijd").value;

    if ((IDminGr === "") && (IDmaxGr === "") &&(IDminLeeftijd === "") && (IDmaxLeeftijd === "")){
        alert('invullen die handel');
    }
   

}


