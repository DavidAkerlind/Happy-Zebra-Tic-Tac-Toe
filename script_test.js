//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
    let allCellsFilled = oGameData.gameField.every(
        (cell) => cell === "X" || cell === "O"
    );
    return allCellsFilled;
}

oGameData.gameField = ["", "", "", "", "", "", "", "", ""];
// ["X", "X", "X",] - Array 1
// ["X", "O", "X",] - Array 2
// ["X", "O", "O",] - Array 3

//SPLIT oGameData.gameField i 3st Array för varje rad: ['0','1','2']

//OM alla tecken är lika i Array => VINST
//OM alla tecken är lika på samma index => VINST
//OM index 0 i array 1 index 1 array 2 och index 2 i array 3 har samma tecken (diagonal) => VINST
