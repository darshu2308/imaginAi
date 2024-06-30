document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signUpForm');
    const loginForm = document.getElementById('loginForm');
    const signInForm = document.getElementById('signInForm');
    const directSignInButton = document.getElementById('directSignIn');
  

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

    // Function to simulate signing in
    function signIn(user) {
        // Here you would typically set a session or token
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Welcome, ${user.username}!`);
        window.location.href = 'index.html'; // Redirect to the homepage
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
                signIn(user);
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
                signIn(user);
            } else {
                alert('Invalid email or password');
            }
        });
    }

    if (directSignInButton) {
        directSignInButton.addEventListener('click', () => {
            // For demonstration purposes, we'll use a default user
            // In a real application, you'd probably show a modal or form to enter credentials
            const defaultUser = { username: 'Demo User', email: 'demo@example.com', password: 'password123' };
            
            // Store the default user if it doesn't exist
            if (!checkUser(defaultUser.email, defaultUser.password)) {
                storeUser(defaultUser);
            }

            signIn(defaultUser);
        });
    }
});