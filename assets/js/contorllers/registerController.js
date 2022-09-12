(function () {

    let registerForm = document.getElementById('registerForm');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');
    let userExistsError = document.getElementById('userExistsError');
    let passError = document.getElementById('passError');
    let registerBtn = document.getElementById('registerBtn');
    let regUsername = document.getElementById('regUsername');

    userExistsError.style.display = 'none';
    passError.style.display = 'none';

    registerForm.addEventListener('submit', function (event) {

        event.preventDefault();
        const { username: { value: username }, password: { value: password } } = this.elements;

        if (userManager.addUser(username, password)) {
            location.hash = 'login';
        } else {
            userExistsError.style.display = 'block';
        };

        this.reset();

    });

    registerForm.addEventListener('input', validateForm);

    function validateForm() {
        const regUsernameValue = regUsername.value;
        const passwordValue = password.value;
        const confirmPassValue = confirmPassword.value;

        if (regUsernameValue && passwordValue && confirmPassValue) {
            registerBtn.removeAttribute('disabled');
        } else {
            registerBtn.setAttribute('disabled', true);
        }

        if (passwordValue && confirmPassValue && passwordValue !== confirmPassValue) {
            passError.style.display = 'block';
            registerBtn.setAttribute('disabled', true);
        } else {
            passError.style.display = 'none';
        }

    }
})();