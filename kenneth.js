// AFBEELDING UPLOADEN op server:
let naam;
let afbeelding;
let dataAfbeelding;
let img = document.querySelector('img');

document.querySelector('input[type="file"]').addEventListener('change', function () {
    if (this.files && this.files[0]) {

        const file = this.files[0];
        console.log(file);
        naam = file.name;

        img.src = URL.createObjectURL(this.files[0]); // set src to blob ur

        img.addEventListener("load", () => {
            var c = document.createElement('canvas');
            c.height = img.naturalHeight;
            c.width = img.naturalWidth;
            var ctx = c.getContext('2d');

            ctx.drawImage(img, 0, 0, c.width, c.height);
            var base64String = c.toDataURL("image/png");
            console.log(base64String);

            afbeelding = base64String;
            let url = 'https://scrumserver.tenobe.org/scrum/api/image/upload.php';
            dataAfbeelding = {
                naam: naam,
                afbeelding: afbeelding
            }
            const request = new Request(url, {
                method: 'POST',
                body: JSON.stringify(dataAfbeelding),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

            postImageToApi(request)
        });
    }

});

function postImageToApi(request) {
    fetch(request)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {

            console.log(data.fileName);
 

            img.src = data.fileURL;

            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}


// ZOEKEN OP RANGE (Geboortedatum): 
const zoek = document.getElementById("zoek");

zoek.addEventListener("click", () => {

    let rangeMinGeboortedatum = document.getElementById('min').value;
    let rangeMaxGeboortedatum = document.getElementById('max').value;
    

    let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/search.php'
    url += '?geboortedatumOperator=range&rangeMinGeboortedatum=' + rangeMinGeboortedatum + '&rangeMaxGeboortedatum=' + rangeMaxGeboortedatum;

    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
});