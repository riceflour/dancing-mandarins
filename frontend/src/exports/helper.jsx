import SYMBOLS from './symbols'

export function get_symbol_image(symbol_key, is_active) {
    const symbol = SYMBOLS[symbol_key];
    if (!symbol) return null;

    if (symbol.gold && is_active) {
        return symbol.gold;
    }

    return symbol.normal;
}