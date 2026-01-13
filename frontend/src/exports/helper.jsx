import SYMBOLS from './symbols'

export function get_symbol_image(symbol_key, is_active) {
    const symbol = SYMBOLS[symbol_key];
    if (!symbol) return null;

    if (symbol.gold && is_active) {
        return symbol.gold;
    }

    return symbol.normal;
}

export function return_win(symbol_key, goldSymbols, columnsMatched) {
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

