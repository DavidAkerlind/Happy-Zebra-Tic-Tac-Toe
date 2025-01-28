let oGameData = {};

initGlobalObject();
prepGame();

function initGlobalObject() {
    //Datastruktur för vilka platser som är lediga respektive har brickor
    //Genom att fylla i här med antingen X eler O kan ni testa era rättningsfunktioner
    oGameData.gameField = ["", "", "", "", "", "", "", "", ""];
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = ["O", "O", "O", "", "", "", "", "", ""];
    // oGameData.gameField = ["X", "", "X", "X", "", "", "O", "", ""];
    //oGameData.gameField = ["X", "", "", "", "X", "", "", "", "X"];
    //oGameData.gameField = ["O", "", "", "", "O", "", "", "", "O"];
    // oGameData.gameField = ["", "", "X", "", "X", "", "X", "", ""];
    //oGameData.gameField = ["O", "O", "O", "O", "X", "X", "X", "X", "X"];
    //oGameData.gameField = ["X", "O", "X", "X", "X", "O", "O", "X", "O"];

    //-------------------------------------------------------------------
    // Här omvandlar vi alla LowerCase i gameField till UpperCase
    oGameData.gameField = oGameData.gameField.map(
        (cell) => (cell = cell.toUpperCase())
    );
    //-------------------------------------------------------------------

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //Antalet sekunder för timerfunktionen
    oGameData.seconds = 6;

    //Timerns ID
    oGameData.timerId = null;

    //Från start är timern inaktiverad
    oGameData.timerEnabled = false;

    oGameData.timerShow = null;

    //Referens till element för felmeddelanden
    oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad genom att anropa funktionen checkWinner() och checkForDraw().
 * Returnerar 0 om spelet skall fortsätta,
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */

function checkForGameOver() {
    if (checkWinner(oGameData.playerOne)) {
        return 1;
    } else if (checkWinner(oGameData.playerTwo)) {
        return 2;
    } else if (checkForDraw()) {
        return 3;
    }
    return 0;
}

// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkWinner(playerIn) {
    playerIn = playerIn.toUpperCase();
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        let arrray = winningCombinations[i];
        if (
            oGameData.gameField[arrray[0]] === playerIn &&
            oGameData.gameField[arrray[1]] === playerIn &&
            oGameData.gameField[arrray[2]] === playerIn
        ) {
            return true;
        }
    }
    return false;
}
// Alternativ 2 (chatGPT):
// return winningCombinations.some((combination) =>
//     combination.every((index) => oGameData.gameField[index] === playerIn)
// );

// Alternativ 3:
//     for (let winningTarget of winningCombinations) {
//         const [set_A, set_B, set_C] = winningTarget;
//         if (
//             oGameData.gameField[set_A] === playerIn &&
//             oGameData.gameField[set_B] === playerIn &&
//             oGameData.gameField[set_C] === playerIn
//         ) {
//             return true;
//         }
//     }
//     return false;
// }

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
    return oGameData.gameField.every((cell) => cell !== "");

    // Alternativ 2 - ursprungsversion
    //  let allCellsFilled = oGameData.gameField.every(
    //      (cell) => cell === "X" || cell === "O"
    //  );
    //  console.log(allCellsFilled);
    //  return allCellsFilled;
}

// Nedanstående funktioner väntar vi med!

function prepGame() {
    // Göm Spelplanen
    document.querySelector("#gameArea").classList.add("d-none");

    // Om starta spelet-knappen klickas -> kör initiateGame()
    document.querySelector("#newGame").addEventListener("click", () => {
        if (validateForm()) {
            initiateGame();
        }
    });
}

function validateForm() {
    console.log("validateForm");

    const nickNameP1 = document.querySelector("#nick1");
    const nickNameP2 = document.querySelector("#nick2");
    const colorP1 = document.querySelector("#color1");
    const colorP2 = document.querySelector("#color2");

    try {
        if (nickNameP1.value.length > 10 || nickNameP1.value.length < 3) {
            throw {
                message:
                    "Fel längd på anändarnamn för spelare 1. (Användarnamnet måste vara mellan 3 och 10 tecken långt.)",
                nodeRef: nickNameP1,
            };
        }
        if (nickNameP2.value.length > 10 || nickNameP2.value.length < 3) {
            throw {
                message:
                    "Fel längd på anändarnamn för spelare 2. (Användarnamnet måste vara mellan 3 och 10 tecken långt.)",
                nodeRef: nickNameP2,
            };
        }
        if (nickNameP1.value === nickNameP2.value) {
            throw {
                message:
                    "Nickname på spelare 1 får inte vara samma som spelare 2",
                nodeRef: nickNameP1,
            };
        }
        if (colorP1.value === "#ffffff" || colorP1.value === "#000000") {
            throw {
                message: "Färgen på spelare 1 får inte vara svart eller vit.",
                nodeRef: colorP1,
            };
        }
        if (colorP2.value === "#ffffff" || colorP2.value === "#000000") {
            throw {
                message: "Färgen på spelare 2 får inte vara svart eller vit.",
                nodeRef: colorP2,
            };
        }

        return true;
    } catch (error) {
        error.nodeRef.focus();
        document.querySelector("#errorMsg").textContent = error.message;

        return false;
    }
}

function initiateGame() {
    console.log("initiateGame()");

    // Gömmer input-formulär.
    document.querySelector("#theForm").classList.add("d-none");

    // Visar spelplanen.
    document.querySelector("#gameArea").classList.remove("d-none");

    //Hämtar namn från användare 1.
    oGameData.nickNamePlayerOne = document.querySelector("#nick1").value;
    console.log(oGameData.nickNamePlayerOne);

    //Hämtar namn från användare 2.
    oGameData.nickNamePlayerTwo = document.querySelector("#nick2").value;
    console.log(oGameData.nickNamePlayerTwo);

    //Hämtar färg från användare 1.
    oGameData.colorPlayerOne = document.querySelector("#color1").value;
    console.log(oGameData.colorPlayerOne);

    //Hämtar färg från användare 2.
    oGameData.colorPlayerTwo = document.querySelector("#color2").value;
    console.log(oGameData.colorPlayerTwo);

    //Hämtar alla td-element som är spelrutor.
    let gameTdRefs = document.querySelectorAll(".ml-auto tr td");

    //Rensar spelplanen.
    gameTdRefs.forEach((field) => {
        field.textContent = "";
        field.style.backgroundColor = "#ffffff";
    });

    //Slumpar fram en startspelare.
    let playerChar;
    let playerName;

    let randomNumber = Math.random();

    if (randomNumber < 0.5) {
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    } else {
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
    }

    document.querySelector(
        ".jumbotron h1"
    ).textContent = `Aktuell spelare är ${playerName}`;

    document
        .querySelector("#gameArea table")
        .addEventListener("click", executeMove);
}

function executeMove(event) {
    //Kontrollerar att klickad cell är tom.
    if (event.target.textContent === "") {
        oGameData.gameField[event.target.getAttribute("data-id")] =
            oGameData.currentPlayer;

        // Kollar vem som är aktuell spelare och lägger in den färg och tecken på den ruta som klickades
        if (oGameData.currentPlayer === oGameData.playerOne) {
            event.target.style.backgroundColor = oGameData.colorPlayerOne;
            event.target.textContent = oGameData.playerOne;
            oGameData.currentPlayer = oGameData.playerTwo;
            document.querySelector(".jumbotron h1").textContent =
                `Aktuell spelare är ` + oGameData.nickNamePlayerTwo;
        } else {
            event.target.style.backgroundColor = oGameData.colorPlayerTwo;
            event.target.textContent = oGameData.playerTwo;
            oGameData.currentPlayer = oGameData.playerOne;
            document.querySelector(".jumbotron h1").textContent =
                `Aktuell spelare är ` + oGameData.nickNamePlayerOne;
        }

        //Om checkForGameOver inte är 0 så är spelet över och vi kör gameOver()
        if (checkForGameOver() !== 0) {
            gameOver(checkForGameOver());
        } else {
            timer();
        }
    }
}
function changePlayer(player) {
    clearTimeout(oGameData.timerId);
    console.log("changePlayer()");
    oGameData.currentPlayer = player;
}

function timer() {
    console.log("timer()");

    let timeLeft = 5; // Startvärde för nedräkning

    clearInterval(oGameData.timerShow);
    oGameData.timerShow = null;
    // Starta nedräkningen
    oGameData.timerShow = setInterval(() => {
        oGameData.timeRef.textContent = `Skynda! du har bara: ${timeLeft} sekunder kvar`;
        console.log(timeLeft); // Visa aktuellt värde
        timeLeft--; // Minska tiden med 1

        // Kontrollera om tiden nått 0
        if (timeLeft === -1) {
            clearInterval(oGameData.timerShow); // Stoppa timern
        }
    }, 1000);

    //Rensar tidigare timer
    clearTimeout(oGameData.timerId);
    oGameData.timerId = null;

    oGameData.timerId = setTimeout(() => {
        console.log(
            `${oGameData.currentPlayer}s tur är slut! byter spelare...`
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
        timer();
    }, oGameData.seconds * 1000);
}

function gameOver(result) {
    clearInterval(oGameData.timerShow);
    clearTimeout(oGameData.timerId);

    oGameData.timeRef.textContent = "";

    // Visar vem som vann spelet i jumbotronen
    if (result === 1) {
        document.querySelector(
            ".jumbotron h1"
        ).textContent = `${oGameData.nickNamePlayerOne} vinner! Spela igen?`;
    } else if (result === 2) {
        document.querySelector(
            ".jumbotron h1"
        ).textContent = `${oGameData.nickNamePlayerTwo} vinner! Spela igen?`;
    } else if (result === 3) {
        document.querySelector(".jumbotron h1").textContent = `Oavgjort!`;
    }

    // Tar bort addEventListener på rutbrädet
    document
        .querySelector("#gameArea table")
        .removeEventListener("click", executeMove);

    // Gömmer Spelplanen och tar fram formuläret för att välja namn och färg samt starta spelet, med delay 3 sekunder.
    setTimeout(() => {
        document.querySelector("#gameArea").classList.add("d-none");
        document.querySelector("#theForm").classList.remove("d-none");
    }, 3000);

    // Återställer vårat globala objekt för att köra ett nytt spel
    initGlobalObject();
}
