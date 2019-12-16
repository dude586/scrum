if ((IDminGr === "") && (IDmaxGr === "") && (IDminLeeftijd === "") && (IDmaxLeeftijd === "") && (IDKleurHaar === "") && (IDKLeurOgen === "") && (IDgeslacht === "")) {
    alert('invullen die handel');
} else {
    if( IDminGr !== ""){
        if(IDminGr < 80 || IDminGr < 250){
            alert("Min grootte moet tussen 80 en 250 cm liggen.");
        }
    }
    if( IDmaxGr !== ""){
        if(IDmaxgr < 80 || IDmaxGr < 250){
            alert("Max grootte moet tussen 80 en 250 cm liggen.");
        }
    }


  
}

if (IDminGr !== "") { zoekurl = zoekurl + "rangeMinGrootte=" + IDminGr + "&"; }
if (IDmaxGr !== "") { zoekurl = zoekurl + "rangeMaxGrootte=" + IDminGr + "&"; }
if (IDminLeeftijd !== "") { zoekurl = zoekurl + "rangeMinGrootte=" + IDminLeeftijd + "&"; }
if (IDmaxLeeftijd !== "") { zoekurl = zoekurl + "rangeMinGrootte=" + IDmaxLeeftijd + "&"; }
if (IDKleurHaar !== "") { zoekurl = zoekurl + "haarkleur=" + IDKleurHaar + "&"; }
if (IDKLeurOgen !== "") { zoekurl = zoekurl + "oogkleur=" + IDKLeurOgen + "&"; }
if (IDgeslacht !== "") { zoekurl = zoekurl + "sexe=" + IDgeslacht + "&"; }
zoekurl= zoekurl.substring(0, zoekurl.length - 1);
