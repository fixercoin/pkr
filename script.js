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
var element = $('.floating-chat');
var myStorage = localStorage;

if (!myStorage.getItem('chatID')) {
    myStorage.setItem('chatID', createUUID());
}

setTimeout(function() {
    element.addClass('enter');
}, 1000);

element.click(openElement);

function openElement() {
    var messages = element.find('.messages');
    var textInput = element.find('.text-box');
    element.find('>i').hide();
    element.addClass('expand');
    element.find('.chat').addClass('enter');
    var strLength = textInput.val().length * 2;
    textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();
    element.off('click', openElement);
    element.find('.header button').click(closeElement);
    element.find('#sendMessage').click(sendNewMessage);
    messages.scrollTop(messages.prop("scrollHeight"));
}

function closeElement() {
    element.find('.chat').removeClass('enter').hide();
    element.find('>i').show();
    element.removeClass('expand');
    element.find('.header button').off('click', closeElement);
    element.find('#sendMessage').off('click', sendNewMessage);
    element.find('.text-box').off('keydown', onMetaAndEnter).prop("disabled", true).blur();
    setTimeout(function() {
        element.find('.chat').removeClass('enter').show()
        element.click(openElement);
    }, 500);
}

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function sendNewMessage() {
    var userInput = $('.text-box');
    var newMessage = userInput.html().replace(/\<div\>|\<br.*?\>/ig, '\n').replace(/\<\/div\>/g, '').trim().replace(/\n/g, '<br>');

    if (!newMessage) return;

    var messagesContainer = $('.messages');

    messagesContainer.append([
        '<li class="self">',
        newMessage,
        '</li>'
    ].join(''));

    // clean out old message
    userInput.html('');
    // focus on input
    userInput.focus();

    messagesContainer.finish().animate({
        scrollTop: messagesContainer.prop("scrollHeight")
    }, 250);
}

function onMetaAndEnter(event) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
        sendNewMessage();
    }
        }
