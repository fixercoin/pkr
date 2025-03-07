 document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація облікових даних
    const accountId = localStorage.getItem('accountId') || generateUniqueId();
    localStorage.setItem('accountId', accountId);

    let coins = parseInt(localStorage.getItem(`${accountId}_coins`)) || 0;
    let energy = parseInt(localStorage.getItem(`${accountId}_energy`)) || 1000;
    let energyLimit = parseInt(localStorage.getItem(`${accountId}_energyLimit`)) || 1000;
    const energyCostPerClick = 5;

    const coinsText = document.getElementById('coins-text');
    const energyBar = document.getElementById('energy-bar');
    const energyText = document.getElementById('energy-text');
    const kittyCoin = document.getElementById('kitty-coin');
    const fullTankButton = document.getElementById('full-tank');

    let clickUpgradeMultiplier = parseInt(localStorage.getItem(`${accountId}_clickUpgradeMultiplier`)) || 1;
    let multitapClicks = parseInt(localStorage.getItem(`${accountId}_multitapClicks`)) || 1;
    let rechargingSpeed = parseInt(localStorage.getItem(`${accountId}_rechargingSpeed`)) || 5;
    let fullTankUsageCount = parseInt(localStorage.getItem(`${accountId}_fullTankUsageCount`)) || 0;
    const maxFullTankUsage = 6;
    let lastFullTankResetTime = new Date(localStorage.getItem(`${accountId}_lastFullTankResetTime`)) || new Date();

    let multitapCost = parseInt(localStorage.getItem(`${accountId}_multitapCost`)) || 150;
    let energyLimitCost = parseInt(localStorage.getItem(`${accountId}_energyLimitCost`)) || 300;
    let rechargingSpeedCost = parseInt(localStorage.getItem(`${accountId}_rechargingSpeedCost`)) || 250;

    let multitapLevel = parseInt(localStorage.getItem(`${accountId}_multitapLevel`)) || 0;
    let energyLimitLevel = parseInt(localStorage.getItem(`${accountId}_energyLimitLevel`)) || 0;
    let rechargingSpeedLevel = parseInt(localStorage.getItem(`${accountId}_rechargingSpeedLevel`)) || 0;

    // Реферальний механізм
    let referralCode = localStorage.getItem(`${accountId}_referralCode`) || generateReferralCode();
    const referralReward = 1000; // Сума винагороди за реферальний код
    const referralCodeInput = document.getElementById('referral-code');
    const applyReferralButton = document.getElementById('apply-referral');
    const referralMessage = document.getElementById('referral-message');
    const referralCodeDisplay = document.getElementById('referral-code-display');
    const copyCodeButton = document.getElementById('copy-code');

    // Перевіряє, чи код вже був використаний цим користувачем
    let usedReferralCodes = JSON.parse(localStorage.getItem(`${accountId}_usedReferralCodes`)) || [];
    // Зберігає коди, використані іншими акаунтами
    let usedReferralCodesByOthers = JSON.parse(localStorage.getItem(`${accountId}_usedReferralCodesByOthers`)) || [];

    function generateReferralCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    function applyReferralCode(code) {
        // Перевірка на використання власного реферального коду
        if (code === referralCode) {
            referralMessage.textContent = `You cannot use your own referral code.`;
            return false;
        }

        // Перевірка, чи код вже був використаний цим акаунтом або іншими акаунтами
        if (usedReferralCodes.includes(code) || usedReferralCodesByOthers.includes(code)) {
            referralMessage.textContent = `Referral code already used.`;
            return false;
        }

        // Перевірка на дійсність коду
        if (code.length === 6) {
            coins += referralReward;
            localStorage.setItem(`${accountId}_coins`, coins);
            usedReferralCodes.push(code);
            localStorage.setItem(`${accountId}_usedReferralCodes`, JSON.stringify(usedReferralCodes));
            usedReferralCodesByOthers.push(code);
            localStorage.setItem(`${accountId}_usedReferralCodesByOthers`, JSON.stringify(usedReferralCodesByOthers));
            return true;
        }
        return false;
    }

    function updateReferralCode() {
        referralCodeDisplay.value = referralCode;
    }

    applyReferralButton.addEventListener('click', function() {
        const enteredCode = referralCodeInput.value.trim().toUpperCase();
        if (enteredCode) {
            const success = applyReferralCode(enteredCode);
            if (success) {
                referralMessage.textContent = `Referral code applied! You have earned ${referralReward} KittyCoins.`;
                updateUI(); // Оновити UI після застосування коду
            } else {
                referralMessage.textContent = `Invalid referral code. Please try again.`;
            }
        } else {
            referralMessage.textContent = `Please enter a valid referral code.`;
        }
    });

    copyCodeButton.addEventListener('click', function() {
        referralCodeDisplay.select();
        document.execCommand('copy');
    });

    function updateEnergyLimit() {
        energyLimit = 1000 + (energyLimitLevel * 200);
    }

    function updateRechargingSpeed() {
        rechargingSpeed = rechargingSpeedLevel + 1;
    }

    function updateMultitapClicks() {
        multitapClicks = multitapLevel + 1;
    }

    function handleKittyClick() {
        if (energy >= energyCostPerClick) {
            energy -= energyCostPerClick;
            const totalClicks = multitapClicks;
            for (let i = 0; i < totalClicks; i++) {
                coins += clickUpgradeMultiplier;
            }
            energy = Math.min(energy, energyLimit);
            updateUI();
            kittyCoin.classList.add('zoomed');
            setTimeout(() => kittyCoin.classList.remove('zoomed'), 300);
            saveGameData();
        } else {
            showMessage("Not enough energy!");
        }
    }

    function showMessage(message) {
        document.getElementById('improvement-message').textContent = message;
    }

    function useFullTank() {
        const now = new Date();
        if (now - lastFullTankResetTime >= 24 * 60 * 60 * 1000) {
            fullTankUsageCount = 0;
            lastFullTankResetTime = now;
        }

        if (fullTankUsageCount < maxFullTankUsage) {
            energy = energyLimit;
            fullTankUsageCount++;
            updateUI();
            saveGameData();
        } else {
            showMessage("You have reached the daily limit of Full Tanks!");
        }
    }

    function updateFullTankButton() {
        const now = new Date();
        const timeElapsed = now - lastFullTankResetTime;
        const timeRemaining = Math.max(0, 24 * 60 * 60 * 1000 - timeElapsed);
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        const timerText = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (energy >= energyLimit) {
            if (fullTankUsageCount >= maxFullTankUsage) {
                fullTankButton.textContent = `Full Tank (Cooldown: ${timerText})`;
                fullTankButton.disabled = true;
            } else {
                fullTankButton.textContent = `Full Tank (Uses left: ${maxFullTankUsage - fullTankUsageCount})`;
                fullTankButton.disabled = false;
            }
        } else {
            fullTankButton.textContent = `Full Tank (Cooldown: ${timerText})`;
            fullTankButton.disabled = true;
        }
    }

    function checkFullTankCooldown() {
        const now = new Date();
        const timeElapsed = now - lastFullTankResetTime;
        if (timeElapsed >= 24 * 60 * 60 * 1000) {
            // Відновлення лічильника використання та часу
            fullTankUsageCount = 0;
            lastFullTankResetTime = now;
            saveGameData();
        }
        updateFullTankButton();
    }

    function updateUI() {
        updateEnergyLimit();
        updateRechargingSpeed();
        updateMultitapClicks();
        checkFullTankCooldown();

        coinsText.textContent = `KittyCoins: ${coins}`;
        energyBar.style.width = `${(energy / energyLimit) * 100}%`;
        energyText.textContent = `Energy: ${energy}/${energyLimit}`;

        document.getElementById('multitap').innerText = `Multitap (Level ${multitapLevel}) - ${multitapCost} Coins`;
        document.getElementById('energy-limit').innerText = `Energy Limit (Level ${energyLimitLevel}) - ${energyLimitCost} Coins`;
        document.getElementById('recharging-speed').innerText = `Recharging Speed (Level ${rechargingSpeedLevel}) - ${rechargingSpeedCost} Coins`;
        document.getElementById('improvement-message').textContent = '';

        updateReferralCode(); // Оновлює реферальний код в UI
    }

    function regenerateEnergy() {
        if (energy < energyLimit) {
            energy += rechargingSpeed;
            energy = Math.min(energy, energyLimit);
            updateUI();
        }
    }

    function saveGameData() {
        localStorage.setItem(`${accountId}_coins`, coins);
        localStorage.setItem(`${accountId}_energy`, energy);
        localStorage.setItem(`${accountId}_clickUpgradeMultiplier`, clickUpgradeMultiplier);
        localStorage.setItem(`${accountId}_multitapClicks`, multitapClicks);
        localStorage.setItem(`${accountId}_energyLimit`, energyLimit);
        localStorage.setItem(`${accountId}_rechargingSpeed`, rechargingSpeed);
        localStorage.setItem(`${accountId}_multitapCost`, multitapCost);
        localStorage.setItem(`${accountId}_energyLimitCost`, energyLimitCost);
        localStorage.setItem(`${accountId}_rechargingSpeedCost`, rechargingSpeedCost);
        localStorage.setItem(`${accountId}_multitapLevel`, multitapLevel);
        localStorage.setItem(`${accountId}_energyLimitLevel`, energyLimitLevel);
        localStorage.setItem(`${accountId}_rechargingSpeedLevel`, rechargingSpeedLevel);
        localStorage.setItem(`${accountId}_fullTankUsageCount`, fullTankUsageCount);
        localStorage.setItem(`${accountId}_lastFullTankResetTime`, lastFullTankResetTime.toISOString());
        localStorage.setItem(`${accountId}_referralCode`, referralCode); // Зберігає реферальний код
        localStorage.setItem(`${accountId}_usedReferralCodes`, JSON.stringify(usedReferralCodes)); // Зберігає використані реферальні коди
        localStorage.setItem(`${accountId}_usedReferralCodesByOthers`, JSON.stringify(usedReferralCodesByOthers)); // Зберігає використані реферальні коди іншими акаунтами
    }

    function buyImprovement(improvement) {
        let cost;
        switch (improvement) {
            case 'multitap':
                cost = multitapCost;
                if (coins >= cost) {
                    coins -= cost;
                    multitapLevel++;
                    updateMultitapClicks();
                    multitapCost *= 2;
                } else {
                    showMessage("Not enough coins!");
                }
                break;
            case 'energy-limit':
                cost = energyLimitCost;
                if (coins >= cost) {
                    coins -= cost;
                    energyLimitLevel++;
                    energyLimitCost *= 2;
                } else {
                    showMessage("Not enough coins!");
                }
                break;
            case 'recharging-speed':
                cost = rechargingSpeedCost;
                if (coins >= cost) {
                    coins -= cost;
                    rechargingSpeedLevel++;
                    rechargingSpeedCost *= 2;
                    updateRechargingSpeed();
                } else {
                    showMessage("Not enough coins!");
                }
                break;
        }
        updateUI();
        saveGameData();
    }

    function generateUniqueId() {
        return 'account_' + Math.random().toString(36).substr(2, 9);
    }

    document.getElementById('multitap').addEventListener('click', () => buyImprovement('multitap'));
    document.getElementById('energy-limit').addEventListener('click', () => buyImprovement('energy-limit'));
    document.getElementById('recharging-speed').addEventListener('click', () => buyImprovement('recharging-speed'));
    fullTankButton.addEventListener('click', useFullTank);
    kittyCoin.addEventListener('click', handleKittyClick);

    // Додаємо таймери для перевірки відновлення енергії та кнопки "Full Tank"
    setInterval(regenerateEnergy, 1000);
    setInterval(updateFullTankButton, 1000);

    // Обробка перемикання між модальними вікнами
    document.querySelectorAll('.bottom-menu button').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            document.querySelectorAll('.modal-section').forEach(section => {
                section.style.display = 'none';
            });
            const targetSection = document.getElementById(targetId);
            targetSection.style.display = 'flex';

            if (targetId === 'games-section') {
                const roulette = document.getElementById('roulette');
                roulette.style.backgroundImage = "url('https://i.pinimg.com/originals/35/49/10/3549102105cc0dba52619c09038b3288.png')";
            }
        });
    });

    // Обробка закриття модальних вікон
    document.querySelectorAll('.close').forEach(closeButton => {
        closeButton.addEventListener('click', function() {
            this.closest('.modal-section').style.display = 'none';
        });
    });

    // Обробка обертання рулетки
    const roulette = document.getElementById('roulette');
    const spinButton = document.getElementById('spin-roulette-btn');
    const rouletteResult = document.getElementById('roulette-info');
    let spinning = false;

    spinButton.addEventListener('click', function() {
        if (spinning) return;

        spinning = true;
        const randomDegree = Math.floor(Math.random() * 360);
        const spinDuration = 4000;
        const spinStartTime = Date.now();

        roulette.style.transition = `transform ${spinDuration}ms ease-out`;
        roulette.style.transform = `rotate(${randomDegree + 360 * 5}deg)`;

        const updateInterval = 100;
        const interval = setInterval(() => {
            if (Date.now() - spinStartTime >= spinDuration) {
                clearInterval(interval);
                const winningNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const color = getColorForNumber(winningNumber);
                rouletteResult.textContent = `Winnings: ${winningNumber}`;
                rouletteResult.style.color = color;
                coins += winningNumber;
                saveGameData();
                updateUI();
                spinning = false;
            } else {
                const randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
                const color = getColorForNumber(randomNumber);
                rouletteResult.textContent = `Winnings: ${randomNumber}`;
                rouletteResult.style.color = color;
            }
        }, updateInterval);
    });

    function getColorForNumber(number) {
        const colors = ['#FF5733', '#33FF57', '#5733FF', '#F0F033', '#FF33F0', '#33F0FF', '#FF8C33', '#33FF8C', '#8C33FF', '#F0F0F0', '#FF3333', '#33FF33'];
        return colors[number % colors.length] || '#000000';
    }

    updateUI();

    // Анімація тексту з кольорами
    const textElement = document.getElementById('hello-text');
    const text = textElement.textContent;
    const colors = ['#FF6347', '#FF4500', '#FFD700', '#32CD32', '#1E90FF', '#8A2BE2', '#FF1493', '#FF69B4'];
    let coloredText = '';
    let animationCount = 0;

    // Функція для генерації випадкових кольорів для анімації
    function getRandomColors() {
        return [
            colors[Math.floor(Math.random() * colors.length)],
            colors[Math.floor(Math.random() * colors.length)],
            colors[Math.floor(Math.random() * colors.length)],
            colors[Math.floor(Math.random() * colors.length)]
        ];
    }

    // Функція для створення ключових кадрів для анімації
    function createAnimation(color1, color2, color3, color4) {
        return `
            @keyframes colorChange${animationCount} {
                0% {
                    color: ${color1};
                }
                25% {
                    color: ${color2};
                }
                50% {
                    color: ${color3};
                }
                75% {
                    color: ${color4};
                }
                100% {
                    color: ${color1};
                }
            }
        `;
    }

    // Додаємо стилі для анімацій у <style> елемент
    const style = document.createElement('style');
    document.head.appendChild(style);

    // Розбиваємо текст на окремі букви і додаємо стилі
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== ' ') {
            const [color1, color2, color3, color4] = getRandomColors();
            style.sheet.insertRule(createAnimation(color1, color2, color3, color4), style.sheet.cssRules.length);

            coloredText += `<span class="letter" style="animation: colorChange${animationCount} 5s linear infinite;">${text[i]}</span>`;
            animationCount++;
        } else {
            coloredText += ' ';
        }
    }

    textElement.innerHTML = coloredText;
});

const codeEditor = document.querySelector('replit-code-editor');
if (codeEditor) {
  const textarea = codeEditor.shadowRoot.querySelector('textarea');
  if (textarea) {
    textarea.value += codeToInsert;
  } else {
    console.error("Textarea not found in code editor.");
  }
} else {
  console.error("Code editor not found.");
}

