let balance = parseFloat(localStorage.getItem('balance')) || 0.0000; // Initialize balance from local storage
let clickBonus = 0.0001; // Default click bonus
let isBonusActive = false; // Track if bonus is active
let bonusDuration = 0; // Time left for bonus

// Daily bonus logic
const lastBonusDate = localStorage.getItem('lastBonusDate');
const today = new Date().toISOString().split('T')[0];

if (lastBonusDate !== today) {
    balance += 10; // Add daily bonus
    localStorage.setItem('lastBonusDate', today); // Update last bonus date
}

document.getElementById('balance').innerText = balance.toFixed(4); // Update displayed balance

document.getElementById('mineButton').addEventListener('click', () => {
    balance += 0.0001; // Increment balance by 0.0001 PKR
    localStorage.setItem('balance', balance); // Save balance to local storage
    document.getElementById('balance').innerText = balance.toFixed(4); // Update displayed balance
});

document.getElementById('withdrawButton').addEventListener('click', () => {
    const password = prompt("Enter password to withdraw:");
    if (password === "Naeem123") {
        const amount = parseFloat(prompt("Enter amount to withdraw (minimum 20 PKR):"));
        if (amount >= 20 && amount <= balance) {
            balance -= amount; // Deduct amount from balance
            alert(`You have withdrawn ${amount.toFixed(4)} PKR!`);
            localStorage.setItem('balance', balance); // Save balance to local storage
            document.getElementById('balance').innerText = balance.toFixed(4); // Update displayed balance
        } else {
            alert("Invalid amount or insufficient balance!");
        }
    } else {
        alert("Incorrect password!");
    }
});

document.getElementById('depositButton').addEventListener('click', () => {
    const password = prompt("Enter password to deposit:");
    if (password === "Naeem123") {
        const amount = parseFloat(prompt("Enter amount to deposit (minimum 20 PKR):"));
        if (amount >= 20) {
            balance += amount; // Add amount to balance
            alert(`You have deposited ${amount.toFixed(4)} PKR!`);
            localStorage.setItem('balance', balance); // Save balance to local storage
            document.getElementById('balance').innerText = balance.toFixed(4); // Update displayed balance
        } else {
            alert("Invalid amount!");
        }
    } else {
        alert("Incorrect password!");
    }
});

document.getElementById('buyPowerButton').addEventListener('click', () => {
    if (balance >= 100) {
        balance -= 100; // Deduct cost of power from balance
        clickBonus += 0.01; // Increase click bonus
        localStorage.setItem('balance', balance); // Save balance to local storage
        document.getElementById('balance').innerText = balance.toFixed(4); // Update displayed balance
        document.getElementById('bonus').innerText = clickBonus.toFixed(4); // Update bonus display
        alert("You purchased power for 2 hours! Bonus active.");
        
        // Start the bonus timer for 2 hours
        if (!isBonusActive) {
            isBonusActive = true;
            bonusDuration = 7200; // 2 hours in seconds
            const interval = setInterval(() => {
                if (bonusDuration <= 0) {
                    clearInterval(interval);
                    isBonusActive = false;
                    clickBonus -= 0.01; // Reset click bonus
                    document.getElementById('bonus').innerText = clickBonus.toFixed(4); // Update bonus display
                    alert("Your bonus has expired!");
                }
                bonusDuration--;
            }, 1000);
        }
    } else {
        alert("Insufficient balance to buy power!");
    }
});

// Menu Toggle Logic
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show'); // Toggle the menu visibility
});
