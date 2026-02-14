import SYMBOLS from './symbols'

export function get_symbol_image(symbol_key, is_active) {
    const symbol = SYMBOLS[symbol_key];
    if (!symbol) return null;

    if (symbol.gold && is_active) {
        return symbol.gold;
    }

    return symbol.normal;
}

function return_win(symbol_key, goldSymbols, columnsMatched) {
    const normal = ["ten", "symbol_a","symbol_j","symbol_k","symbol_q","nine"];
    const gold = ["coins","bao","tree","boat","chingling"]
    const special = ["fu","drums"]

    if (normal.includes(symbol_key)) {
        if (columnsMatched === 5) return 75; 
        if (columnsMatched === 4) return 30; 
        return 15; // CONFIRMED
    };

    if(special.includes(symbol_key)) {
        if (symbol_key === "drums") {
            if (columnsMatched === 3 && goldSymbols === 5) return 590; // CONFIRMED
        }

        return 300;
    }; 

    // gold
    if (symbol_key === "chingling") {
        if (goldSymbols === 5) {
            if (columnsMatched === 5) return 530; 
            if (columnsMatched === 4) return 200; // CONFIRMED
            return 100; // CONFIRMED
        }
        return 15; 
    } else if (symbol_key === "boat") {
        if (goldSymbols >= 4) {
            if (columnsMatched === 5) return 400; // CONFIRMED
            if (columnsMatched === 4) return 150; // maybe 400 / 2.66666
            return 60; // probably (col 5 value / 6.66 or 6)
        }
        return 15; 
    } else if (symbol_key === "tree") {
        if (goldSymbols >= 3) {
            if (columnsMatched === 5) return 200; // CONFIRMED
            if (columnsMatched === 4) return 75; // CONFIRMED
            return 30; // CONFIRMED
        }
        return 15;
    } else if (symbol_key === "bao") {
        if (goldSymbols >= 2) {
            if (columnsMatched === 5) return 150; // CONFIRMED
            if (columnsMatched === 4) return 60;
            return 25; // CONFIRMED
        }
    } else if (symbol_key === "coins") {
        if (columnsMatched === 5) return 100; // CONFIRMED
        if (columnsMatched === 4) return 25; // CONFIRMED
        return 15; // CONFIRMED
    } 

    return 15;

        
}


export function creditCost(goldSymbols) {
    return goldSymbols === 5 ? 88 : goldSymbols === 4 ? 68 : goldSymbols === 3 ? 38 : goldSymbols === 2 ? 18 : 8;  
}

export function returnPointsEarned(results, goldSymbols) {
    console.log(`received ${results}`)
    
// ['coins', 'bao', 'chingling']
//  ['nine', 'chingling', 'bao']
//  ['tree', 'fu', 'symbol_j']
//  ['boat', 'symbol_j', 'bao']
//  ['nine', 'tree', 'coins']
    const returnArray = []; // string[][], [[ways, ways * creditsWon]]
    // function calculatePoints(symbol, index, results, ways, columnsMatched) {
    function calculatePoints(symbol) {
        let ways = 1;
        let colsMatched = 0;
        for (let i = 0; i < 5; i++) {
            const matches = results[i].filter(
                item => item === symbol || item === "fu"
            )

            if (matches.length === 0) {
                break;
            }
            ways *= matches.length;
            colsMatched++;
        }
        if (colsMatched < 3) {
            console.log(`${symbol} finished at ${colsMatched} column did not make it :(`);
            return;
        }
        const creditsWon = return_win(symbol, goldSymbols, colsMatched);
        returnArray.push([ways, ways* creditsWon])
        return;
    }


    const symbolsToMatch = []; // symbols check
    // function to identify all symbols to calculate
    function pushEverySymbolInCol(columnArr) {
        for (let i = 0; i < 3; i++) {
            // skip fu
            if (columnArr[i] === "fu") continue; // we gotta add symbols from col 2 as well

            // check if symbol is alreayd inside
            if (symbolsToMatch.includes(columnArr[i])) continue;
            symbolsToMatch.push(columnArr[i]);

        }
    }
    // function to identify all symbols to calculate
    // a function to calcluate those symbols
    let col = 0;
    // push every symbol in col 1
    // if columns have fu, push symbols 
    while (col == 0 || results[col - 1].includes("fu")) {
        pushEverySymbolInCol(results[col])
        col++;
    }
    console.log(`${symbolsToMatch} symbols to match`)
    for (let i = 0; i < symbolsToMatch.length; i++) {
        calculatePoints(symbolsToMatch[i]);
    }


    return returnArray;
}