let users = []; // Array to store user registrations

// Initialize votes from localStorage or default to 0
let votes = JSON.parse(localStorage.getItem("votes")) || {
    'Candidate A': 0,
    'Candidate B': 0,
    'Candidate C': 0
};

// Save votes to localStorage
function saveVotes() {
    localStorage.setItem("votes", JSON.stringify(votes));
}

// Switch to the registration form
function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

// Switch to the login form
function showLogin() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

// Register a new user
function register() {
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (username && password) {
        // Check if username already exists
        if (users.some(user => user.username === username)) {
            alert("Username already exists. Please choose another.");
            return;
        }

        users.push({ username, password });
        alert("Registration successful! Please log in.");
        showLogin();
    } else {
        alert("Please fill in all fields.");
    }
}

// Log in a user
function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert("Login successful!");
        document.getElementById("forms").style.display = "none";
        document.getElementById("voting").style.display = "block";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Cast a vote for a candidate
function vote(candidate) {
    votes[candidate]++;
    saveVotes(); // Save updated votes to localStorage
    alert(`You voted for ${candidate}!`);
    document.getElementById("voting").style.display = "none";
    displayResults();
}

// Display voting results with a pie chart
function displayResults() {
    document.getElementById("results").style.display = "block";

    const ctx = document.getElementById("result-chart").getContext("2d");
    const labels = Object.keys(votes);
    const data = Object.values(votes);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                },
            ],
        },
    });
}
