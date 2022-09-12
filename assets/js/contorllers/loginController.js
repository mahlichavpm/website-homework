(function () {

    let loginForm = document.getElementById('login-form');    
    let loginError = document.getElementById('login-error');
    
    loginError.style.display = 'none';
        
    loginForm.addEventListener('submit', function (event) {

        event.preventDefault();
        const { username: { value: username }, password: { value: password } } = this.elements;
    
       
        
        if (userManager.validateCredentials(username, password)) {
            location.hash = 'main-page';
        } else {
            loginError.style.display = 'block';
        };

        this.reset();

    });

})();