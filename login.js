
    
         window.onload = function () {

            document.getElementById('btnlogin').addEventListener('click', function (e) {
                console.log('Je hebt op de Login-knop geklikt');
                let nickname = document.getElementById('inputNick').value;
                let wachtwoord = document.getElementById('inputPassword').value;

                console.log('nickname = ' + nickname);
                console.log('wachtwoord = ' + wachtwoord);

                let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php';
                
                console.log('Backend API url = ' + url);

                let data = {
                    nickname: nickname,
                    wachtwoord: wachtwoord
                }
                console.log('Deze data wordt verstuurd : ');
                console.log(data);

                var request = new Request(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                
                console.log('Deze request wordt verstuurd : ');
                console.log(request);
let id;

                fetch(request)
                    .then(function (resp) { return resp.json(); })
                    .then(function (Data) {id = Data.id;
                        if (Data.message == 'Authorized') {
                        
                            console.log("Reactie van backend API : Correcte gegevens");                      
                            alert("JAAAA");
                        } else {
                            console.log("Reactie van backend API : Verkeerde gegevens");        
                        }
                    })
                    .catch(function (error) { console.log(error); });
                    console.log(id);
            
                });
console.log(id);
        };






        function test(){
            console.log(id);


        };