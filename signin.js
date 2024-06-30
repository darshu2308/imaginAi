document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signUpForm');
    const loginForm = document.getElementById('loginForm');
    const signInForm = document.getElementById('signInForm');

    // Function to store user data in local storage
    function storeUser(userData) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Function to check if user exists and password is correct
    function checkUser(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(user => user.email === email && user.password === password);
    }

    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            const userData = { username, email, password };
            storeUser(userData);
            alert('Account created successfully! Please log in.');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const user = checkUser(email, password);
            if (user) {
                alert(`Welcome back, ${user.username}!`);
                // Here you would typically set a session or token
                window.location.href = 'dashboard.html'; // Redirect to a dashboard or main page
            } else {
                alert('Invalid email or password');
            }
        });
    }

    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signInEmail').value;
            const password = document.getElementById('signInPassword').value;

            const user = checkUser(email, password);
            if (user) {
                alert(`Welcome, ${user.username}!`);
                // Here you would typically set a session or token
                window.location.href = 'index.html'; // Redirect to a dashboard or main page
            } else {
                alert('Invalid email or password');
            }
        });
    }
});
