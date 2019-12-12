        window.onload = function () {

            document.getElementById('btnLogin').addEventListener('click', function (e) {
                console.log('Je hebt op de Login-knop geklikt');
                let nickname = document.getElementById('loginNick').value;
                let wachtwoord = document.getElementById('loginPas').value;

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


                fetch(request)
                    .then(function (resp) { return resp.json(); })
                    .then(function (data) {
                        if (data.message == 'Authorized') {
                            console.log("Reactie van backend API : Correcte gegevens");                      
                            window.location.href = "userDetail.html";
                        } else {
                            console.log("Reactie van backend API : Verkeerde gegevens");        
                        }
                    })
                    .catch(function (error) { console.log(error); });
            });