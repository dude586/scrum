
        window.onload = function () {
       
            document.getElementById('btnlogin').addEventListener('click', function (e) {
                console.log('Je hebt op de Login-knop geklikt');
                let nickname = document.getElementById('inputEmail').value;
                let wachtwoord = document.getElementById('inputPassword').value;

                console.log('nickname = ' + nickname);
                console.log('wachtwoord = ' + wachtwoord);

                let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php';
                
                console.log('Backend API url = ' + url);

                let Data = {
                    nickname: nickname,
                    wachtwoord: wachtwoord
                }
                console.log('Deze data wordt verstuurd : ');
                console.log(Data);

                var request = new Request(url, {
                    method: 'POST',
                    body: JSON.stringify(Data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                
                console.log('Deze request wordt verstuurd : ');
                console.log(request);

                     let ID = "";  
                fetch(request)
                    .then(function (resp) { return resp.json(); })
                    .then(function (data) { ID = data.ID;
                        if (data.message == 'Authorized') {
                            console.log("Reactie van backend API : Correcte gegevens");                      
                            window.location.href = "userDetail.html";
                        } else {
                            console.log("Reactie van backend API : Verkeerde gegevens");        
                        }
                    })
                    .catch(function (error) { console.log(error); });
            });
    //

        };
    
