function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    localStorage.setItem("username",username);
    localStorage.setItem('password',password);
    if(username == 'user' && password == 'password'){
        window.location = 'resume.html';
    }else{
        const errorDiv = document.getElementById('invalidCredentials');
        errorDiv.textContent='Invalid username/password';
        errorDiv.style.color='red';
        document.getElementById('username').value='';
        document.getElementById('password').value='';
    }
}

function preventBack() {
    window.history.forward();
}

setTimeout("preventBack()", 0);

window.onunload = function () { null };