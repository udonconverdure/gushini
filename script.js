console.log("Script loaded successfully!");

const passcode = "5555";
const startDate = new Date("2024-10-15T00:00:00");

const typingText = `Gush, ho provato a farti questo piccolo sito web perchè una delle mie love language è fare nerdate. Grazie per sopportarmi ogni giorno (soprattutto quando gioco a scacchi) e per farmi sempre sentire a casa.`;

let cronometerStarted = false;
let enteredPasscode = "";

document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", () => {
        const value = key.textContent.trim();

        if (key.classList.contains("clear")) {
            enteredPasscode = "";
            updateDots();
        } else if (enteredPasscode.length < 4) {
            enteredPasscode += value;
            updateDots();

            if (enteredPasscode.length === 4) {
                if (enteredPasscode === passcode) {
                    document.getElementById("passcode-screen").style.display = "none";
                    document.getElementById("main-content").style.display = "block";
                    enteredPasscode = "";
                    startTypingAnimation();
                    if (!cronometerStarted) {
                        startCronometer();
                        cronometerStarted = true;
                    }
                } else {
                    alert("Passcode incorrect!");
                    enteredPasscode = "";
                    updateDots();
                }
            }
        }
    });
});

function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        if (index < enteredPasscode.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }
    });
}

function startTypingAnimation() {
    const typingElement = document.getElementById("typing-text");
    typingElement.innerHTML = "";
    const lines = typingText.split(", ");
    let lineIndex = 0;

    function typeLine() {
        if (lineIndex < lines.length) {
            const line = document.createElement("p");
            line.textContent = "";
            typingElement.appendChild(line);

            let charIndex = 0;
            const interval = setInterval(() => {
                if (charIndex < lines[lineIndex].length) {
                    line.textContent += lines[lineIndex][charIndex];
                    charIndex++;
                } else {
                    clearInterval(interval);
                    lineIndex++;
                    setTimeout(typeLine, 500);
                }
            }, 100);
        }
    }

    typeLine();
}

function startCronometer() {
    const cronometerElement = document.getElementById("cronometer");
    setInterval(() => {
        const now = new Date();
        const diff = now - startDate;

        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        cronometerElement.textContent = `${months} mesi, ${days} giorni, ${hours} ore, ${minutes} minuti, ${seconds} secondi`;
    }, 1000);
}

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    document.getElementById("floating-hearts").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

document.getElementById("envelope").addEventListener("click", () => {
    const envelope = document.getElementById("envelope");
    envelope.classList.toggle("open");
});

function createStars() {
    const passcodeScreen = document.getElementById("passcode-screen");
    for (let i = 0; i < 100; i++) { // Add 100 stars
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = Math.random() * 100 + "vh"; // Random vertical position
        star.style.left = Math.random() * 100 + "vw"; // Random horizontal position
        star.style.animationDelay = Math.random() * 5 + "s"; // Randomize twinkle timing
        star.style.animationDuration = Math.random() * 2 + 1.5 + "s"; // Randomize twinkle speed
        passcodeScreen.appendChild(star);
    }
}

createStars(); // Call the function to generate stars
