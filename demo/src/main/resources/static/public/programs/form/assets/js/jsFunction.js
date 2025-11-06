document.addEventListener("DOMContentLoaded", function () {
    const eyeiconPasswd = document.getElementById('eye-pass');
    const password = document.getElementById('passwd');
    const eyeiconCpasswd = document.getElementById('eye-cpass');
    const cpassword = document.getElementById('Cpasswd');

    // Debug check
    console.log("Password field:", password);

    // === Toggle Password Visibility ===
    if (eyeiconPasswd && password) {
        eyeiconPasswd.onclick = function () {
            if (password.value.length) {
                if (password.type === "password") {
                    password.type = "text";
                    eyeiconPasswd.classList.replace("fa-eye-slash", "fa-eye");
                } else {
                    password.type = "password";
                    eyeiconPasswd.classList.replace("fa-eye", "fa-eye-slash");
                }
            }
        };
    }

    if (eyeiconCpasswd && cpassword) {
        eyeiconCpasswd.onclick = function () {
            if (cpassword.value.length) {
                if (cpassword.type === "password") {
                    cpassword.type = "text";
                    eyeiconCpasswd.classList.replace("fa-eye-slash", "fa-eye");
                } else {
                    cpassword.type = "password";
                    eyeiconCpasswd.classList.replace("fa-eye", "fa-eye-slash");
                }
            }
        };
    }

    // === Password Validation Popup ===
    if (password) {
        password.onfocusin = function () {
            const popup = document.getElementById('ListPopOn');
            if (!popup) return;
            popup.style.display = 'block';

            const lowercase = document.querySelector('.lower-case i');
            const uppercase = document.querySelector('.upper-case i');
            const number = document.querySelector('.number-digits i');
            const special = document.querySelector('.special-characters i');
            const atleast = document.querySelector('.AtLeast-Eight i');

            const lower = document.querySelector('.list-group-item .lower-case');
            const upper = document.querySelector('.list-group-item .upper-case');
            const digit = document.querySelector('.list-group-item .number-digits');
            const char = document.querySelector('.list-group-item .special-characters');
            const len = document.querySelector('.list-group-item .AtLeast-Eight');

            password.oninput = function () {
                // Lowercase
                if (password.value.match(/[a-z]/)) {
                    lowercase.classList.replace('fa-times-circle', 'fa-check-circle');
                    lower.classList.replace('invalid', 'valid');
                } else {
                    lowercase.classList.replace('fa-check-circle', 'fa-times-circle');
                    lower.classList.replace('valid', 'invalid');
                }

                // Uppercase
                if (password.value.match(/[A-Z]/)) {
                    uppercase.classList.replace('fa-times-circle', 'fa-check-circle');
                    upper.classList.replace('invalid', 'valid');
                } else {
                    uppercase.classList.replace('fa-check-circle', 'fa-times-circle');
                    upper.classList.replace('valid', 'invalid');
                }

                // Number
                if (password.value.match(/[0-9]/)) {
                    number.classList.replace('fa-times-circle', 'fa-check-circle');
                    digit.classList.replace('invalid', 'valid');
                } else {
                    number.classList.replace('fa-check-circle', 'fa-times-circle');
                    digit.classList.replace('valid', 'invalid');
                }

                // Special Character
                if (password.value.match(/[!@#$%^&*]/)) {
                    special.classList.replace('fa-times-circle', 'fa-check-circle');
                    char.classList.replace('invalid', 'valid');
                } else {
                    special.classList.replace('fa-check-circle', 'fa-times-circle');
                    char.classList.replace('valid', 'invalid');
                }

                // Length
                if (password.value.length >= 8) {
                    atleast.classList.replace('fa-times-circle', 'fa-check-circle');
                    len.classList.replace('invalid', 'valid');
                } else {
                    atleast.classList.replace('fa-check-circle', 'fa-times-circle');
                    len.classList.replace('valid', 'invalid');
                }
            };
        };

        password.onfocusout = function () {
            const popup = document.getElementById('ListPopOn');
            if (popup) popup.style.display = 'none';
        };
    }
});
