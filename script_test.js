function validateForm() {
    console.log("validateForm");

    const nickNameP1 = document.querySelector("#nick1");
    const nickNameP2 = document.querySelector("#nick2");
    const colorP1 = document.querySelector("#color1");
    const colorP2 = document.querySelector("#color2");
    console.log(colorP1.value, colorP2.value);

    try {
        // Kontrollera användarnamnens längd
        if (nickNameP1.value.length > 10 || nickNameP1.value.length < 3) {
            throw {
                message:
                    "Fel längd på användarnamn för spelare 1. (Användarnamnet måste vara mellan 3 och 10 tecken långt.)",
                nodeRef: nickNameP1,
            };
        }
        if (nickNameP2.value.length > 10 || nickNameP2.value.length < 3) {
            throw {
                message:
                    "Fel längd på användarnamn för spelare 2. (Användarnamnet måste vara mellan 3 och 10 tecken långt.)",
                nodeRef: nickNameP2,
            };
        }

        // Kontrollera att färger inte är för nära svart (#000000) eller vitt (#ffffff)
        if (
            isColorTooCloseTo(colorP1.value, "#000000") ||
            isColorTooCloseTo(colorP1.value, "#ffffff")
        ) {
            throw {
                message:
                    "Färgen på spelare 1 får inte vara för nära svart eller vit.",
                nodeRef: colorP1,
            };
        }
        if (
            isColorTooCloseTo(colorP2.value, "#000000") ||
            isColorTooCloseTo(colorP2.value, "#ffffff")
        ) {
            throw {
                message:
                    "Färgen på spelare 2 får inte vara för nära svart eller vit.",
                nodeRef: colorP2,
            };
        }

        // Kontrollera att färgerna inte är samma
        if (colorP1.value === colorP2.value) {
            throw {
                message: "Spelarna får inte välja samma färg.",
                nodeRef: colorP2,
            };
        }
    } catch (error) {
        error.nodeRef.focus();
        document.querySelector("#errorMsg").textContent = error.message;
        return; // Stoppa valideringen här
    }

    initiateGame(); // Starta spelet om allt är OK
}

/**
 * Funktion som kontrollerar om en färg är "för nära" en referensfärg.
 * @param {string} color1 - Färgen som ska kontrolleras (i hex-format, t.ex. "#ff0000").
 * @param {string} color2 - Referensfärgen (i hex-format, t.ex. "#ffffff").
 * @returns {boolean} - Returnerar true om färgerna är för nära varandra, annars false.
 */
function isColorTooCloseTo(color1, color2) {
    // Omvandla hex-färger till RGB
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    // Beräkna avståndet mellan färgerna
    const distance = Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
            Math.pow(rgb1.g - rgb2.g, 2) +
            Math.pow(rgb1.b - rgb2.b, 2)
    );

    // Bestäm ett tröskelvärde (t.ex. 50 för att undvika för ljusa/mörka färger)
    return distance < 50;
}

/**
 * Konverterar en hex-färg (t.ex. "#ff0000") till ett RGB-objekt.
 * @param {string} hex - Färgen i hex-format.
 * @returns {object} - Ett objekt med r, g och b värden.
 */
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

function changePlayer() {
    function changePlayer(player) {
        log("changePlayer()");
        oGameData.currentPlayer = player;
    }
}

//-------------------------------------------------------------------------------------------------

function timer() {
    console.log("timer()");

    // Rensar tidigare timer om en sådan finns
    if (oGameData.timerId) {
        clearTimeout(oGameData.timerId);
        oGameData.timerId = null;
    }

    // Startar en ny timer och lagrar dess ID
    oGameData.timerId = setTimeout(() => {
        console.log(
            `${oGameData.currentPlayer}s tur är slut! Byter spelare...`
        );
        if (oGameData.currentPlayer === oGameData.playerOne) {
            changePlayer(oGameData.playerTwo);
            document.querySelector(
                ".jumbotron h1"
            ).textContent = `${oGameData.nickNamePlayerTwo}s tur nu`;
        } else {
            changePlayer(oGameData.playerOne);
            document.querySelector(
                ".jumbotron h1"
            ).textContent = `${oGameData.nickNamePlayerOne}s tur nu`;
        }
        // Starta om timern efter spelare har bytts
        timer();
    }, oGameData.seconds * 1000);
}

//--------------------------------------------------------------------------

let activeTimer = null; // Läggs utanför funktioner (global variabel)

function timer() {
    console.log("timer()");

    // Rensar tidigare timer om det finns en aktiv (utan att behöva ett ID)
    if (activeTimer !== null) {
        clearTimeout(activeTimer);
        activeTimer = null;
    }

    // Startar ny timer
    activeTimer = setTimeout(() => {
        console.log(
            `${oGameData.currentPlayer}s tur är slut! Byter spelare...`
        );

        // Byt spelare
        if (oGameData.currentPlayer === oGameData.playerOne) {
            oGameData.currentPlayer = oGameData.playerTwo;
            document.querySelector(
                ".jumbotron h1"
            ).textContent = `${oGameData.nickNamePlayerTwo}s tur nu`;
        } else {
            oGameData.currentPlayer = oGameData.playerOne;
            document.querySelector(
                ".jumbotron h1"
            ).textContent = `${oGameData.nickNamePlayerOne}s tur nu`;
        }

        // Starta om timern för den nya spelaren
        timer();
    }, oGameData.seconds * 1000);
}
//-----------------------------------------------------------------------------------
let timeLeft = 5; // Startvärde för nedräkning

// Starta nedräkningen
const timer = setInterval(() => {
    console.log(timeLeft); // Visa aktuellt värde
    timeLeft--; // Minska tiden med 1

    // Kontrollera om tiden nått 0
    if (timeLeft < 0) {
        clearInterval(timer); // Stoppa timern
        console.log("Tiden är ute!");
    }
}, 1000);

__________________________________________________________________________________;
oGameData.timeRef.textContent = "Timer startad!";
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        oGameData.timeRef.textContent = `Timer startad! : ${i} `;
    }, i * 1000);
}
