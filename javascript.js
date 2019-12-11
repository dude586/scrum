

function GetSterrenbeeld(PersoonObj){
    var Datum = new Date(PersoonObj.GeboorteDatum);
  console.log(Datum.getDate())
    console.log(Datum.getMonth());
    SterrenbeeldDatum(Datum);
}
function SterrenbeeldDatum(Datum)
{
    if((Datum >= new Date(Datum.getFullYear() + "-12-22") && Datum <=new Date(Datum.getFullYear() + "-01-19")))
        console.log("steenbok");
    
     if((Datum >= new Date(Datum.getFullYear() + "-01-20") && Datum <=new Date(Datum.getFullYear() + "-02-19")))
        console.log("Waterman");
    
     if((Datum >= new Date(Datum.getFullYear() + "-02-20") && Datum <=new Date(Datum.getFullYear() + "-03-20")))
        console.log("Vissen");
    
     if((Datum >= new Date(Datum.getFullYear() + "-03-21") && Datum <=new Date(Datum.getFullYear() + "-04-20")))
        console.log("Ram");
    
     if((Datum >= new Date(Datum.getFullYear() + "-04-21") && Datum <=new Date(Datum.getFullYear() + "-05-20")))
        console.log("Stier");
    
     if((Datum >= new Date(Datum.getFullYear() + "-05-21") && Datum <=new Date(Datum.getFullYear() + "-06-21")))
        console.log("Tweeling");
    
     if((Datum >= new Date(Datum.getFullYear() + "-06-21") && Datum <=new Date(Datum.getFullYear() + "-07-12")))
        console.log("Kreeft");
    
     if((Datum >= new Date(Datum.getFullYear() + "-07-23") && Datum <=new Date(Datum.getFullYear() + "-08-23")))
        console.log("Leeuw");
    
     if((Datum >= new Date(Datum.getFullYear() + "-08-24") && Datum <=new Date(Datum.getFullYear() + "-09-23")))
        console.log("Maagd");
    
     if((Datum >= new Date(Datum.getFullYear() + "-09-24") && Datum <=new Date(Datum.getFullYear() + "-10-23")))
        console.log("Weegschaal");

     if((Datum >= new Date(Datum.getFullYear() + "-10-24") && Datum <=new Date(Datum.getFullYear() + "-11-22")))
        console.log("schorpioen");

    if((Datum >= new Date(Datum.getFullYear() + "-11-23") && Datum <=new Date(Datum.getFullYear() + "-12-21")))
        console.log("Boogschutter");
}
var Persoon = {
   GeboorteDatum : "1999-8-28"
};
GetSterrenbeeld(Persoon);