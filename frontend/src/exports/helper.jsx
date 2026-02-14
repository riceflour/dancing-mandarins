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

export function return_array_of_wins(results, goldSymbols) {
    console.log(`received ${results}`)
    // must consider case of fu 
    let isFu = false;
    const waysArray = [];
    for (let j = 0; j < 3; j++) {
        let curr = results[0][j];
        // if the symbol appears in first 3 columns
        let columnsMatched = 1;
        let ways = 1;
        if (curr === "fu") isFu = true;

        // go through to see if next column contains this
        for (let i = 1; i < 5; i++) {
            // if it doesnt include curr symbol break (fu counts too)
            (!(results[i].includes("fu"))) ? isFu = false : isFu = true;

            if (!(results[i].includes(curr) || results[i].includes("fu")) || isFu) {
                break;
            }
            // if it does, columns matched ++ and see how many times it appears
            columnsMatched++;

            // fu also counts as 1
            ways *= results[i].filter(item => item === curr || item === "fu").length;
        }

        // does not even count if columns matched < 3 :(
        if (columnsMatched < 3) continue;
        const creditsWon = return_win(curr, goldSymbols, columnsMatched);
        // check if columns matched >= 3
        waysArray.push([ways, ways * creditsWon])
        // win is calculated via every symbol ways * their wweight + every other symbol
    }
    return waysArray;
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
                if (i < 3) {
                    // didn't exceed third column
                    console.log(`${symbol} finished at ${i} column did not make it :(`);
                    return;
                } else {
                    const creditsWon = return_win(symbol, goldSymbols, colsMatched);
                    returnArray.push([ways, ways* creditsWon])
                    return;
                }
            } 
            ways *= matches.length;
            colsMatched++;
        }
        const creditsWon = return_win(symbol, goldSymbols, colsMatched);
        returnArray.push([ways, ways* creditsWon])
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