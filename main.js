import Game from './classes/Game.js';
import {pokemons} from './pokemons.js';

function init() {
  const game = new Game(pokemons);
  game.start();
}

init();