// normal
import bao from '../assets/icons/normal/symbol_bao.png';
import boat from '../assets/icons/normal/symbol_boat.png';
import chingling from '../assets/icons/normal/symbol_chingling.png';
import tree from '../assets/icons/normal/symbol_tree.png';
import coins from '../assets/icons/symbol_coins.png'

// gold
import bao_gold from '../assets/icons/gold/symbol_bao_gold.png';
import boat_gold from '../assets/icons/gold/symbol_boat_gold.png';
import chingling_gold from '../assets/icons/gold/symbol_chingling_gold.png';
import tree_gold from '../assets/icons/gold/symbol_tree_gold.png';

// trash 
import ten from '../assets/icons/symbol_10.jpg'
import nine from '../assets/icons/symbol_9.jpg'

import symbol_a from '../assets/icons/symbol_a.jpg'
import symbol_j from '../assets/icons/symbol_j.jpg'
import symbol_k from '../assets/icons/symbol_k.jpg'
import symbol_q from '../assets/icons/symbol_q.jpg'


// special
import fu from '../assets/icons/symbol_fu.png';
import drums from '../assets/icons/taiko.png';



const SYMBOLS = { 
  ten: {
    normal: ten
  },
  nine: {
    normal: nine
  },
  symbol_a: {
    normal: symbol_a
  },
  symbol_j: {
    normal: symbol_j
  },
  symbol_k: {
    normal: symbol_k
  },
  symbol_q: {
    normal: symbol_q
  },
  fu: {
    normal: fu
  },
  drums: {
    normal: drums
  },
  coins: {
    normal: coins,
  },
  bao: {
    normal: bao,
    gold: bao_gold,
  },
  tree: {
    normal: tree,
    gold: tree_gold,
  },
  boat: {
    normal: boat,
    gold: boat_gold,
  },
  chingling: {
    normal: chingling,
    gold: chingling_gold,
  },
}

export default SYMBOLS;