import {checkHP, renderLog, removeLog, renderLoseLog, renderWinLog, renderFinishLog} from '../utils.js';
import Pokemon from './Pokemon.js';
import Api from './Api.js';

class Game {
  constructor() {
    this._pokemons = null;
    this.player1 = null;
    this.player2 = null;
    this.btns = null;
    this._onButtonClick = this._onButtonClick.bind(this);
    this.restart = this.restart.bind(this);
    this.сancel = this.сancel.bind(this);

    this._api = new Api('https://reactmarathon-api.netlify.app/api/');
  };

  _addListener() {
    this.btns = document.querySelectorAll(`button`);

    for (let btn of this.btns) {
      btn.removeAttribute(`disabled`);
      btn.addEventListener(`click`, this._onButtonClick);
    }
  }

  _removeListener() {
    for (let btn of this.btns) {
      btn.removeEventListener(`click`, this._onButtonClick);
      btn.disabled = true;
    }
  }

  _attack = async (player1, player2, attackParam) => {
    const attack = await this._api.getAttack(attackParam);
    player2.changeHP(attack.kick.player1);
    player1.changeHP(attack.kick.player2);

    if (checkHP(player1)) {
      renderLog(player1, player2);
    } else {
      this._removeListener();
      player1.removeBtns();
      player1.handleRestart(this.restart, this.сancel);
    }

    if (checkHP(player2)) {
      renderLog(player2, player1);
    } else {
      this._removeListener();
      player1.lvl++;
      player1.renderLVL();
      player1.removeBtns();
      player1.handleСontinuation(this.continue, this.сancel);
      renderWinLog(player1);
    }
    if (!checkHP(player1)) {
      renderLoseLog(player1);
    }
  }

  _addClick(person, btn) {
    const currentAttack = person.attacks.find(item => item[`name`] === btn.dataset.name);
    if (currentAttack.maxCount > 0) {
      currentAttack.maxCount--;
      btn.dataset.count--;
      btn.innerText = `${btn.dataset.name} (${btn.dataset.count})`;
    }
    if (currentAttack.maxCount === 0) {
      btn.removeEventListener(`click`, this._onButtonClick);
      btn.disabled = true;
    }
  }

  _onButtonClick(event) {
    const currentAttack = this.player1.attacks.find(item => item[`name`] === event.target.dataset.name);
    const currentAttackParam = `player1id=${this.player1.id}&attackId=${currentAttack.id}&player2id=${this.player2.id}`;
    this._addClick(this.player1, event.target);
    this._attack(this.player1, this.player2, currentAttackParam);
  }

  _reset() {
    if (document.querySelector(`.log-bar`)) {
      removeLog();
    }

    const playersHealth = document.querySelectorAll(`.health`);

    for (let playerHealth of playersHealth) {
      if (playerHealth.classList.contains(`low`)) {
        playerHealth.classList.remove(`low`);
      }
      if (playerHealth.classList.contains(`critical`)) {
        playerHealth.classList.remove(`critical`);
      }
    }

    this._addListener();
  }

  сancel() {
    this.player1.removeBtns();
    renderFinishLog();
  }

  restart() {
    this.player1.removeBtns();
    this._reset();
    this.start();
  }

  continue = async () => {
    this.player1.removeBtns();
    this.player1.renderBtns();

    this._reset();
    this.player2 = new Pokemon({
      ...await this._api.getRandomPokemon(),
      selector: `player2`,
    });
  }

  start = async () => {
    this._reset();

    this.player1 = new Pokemon({
      ...await this._api.getRandomPokemon(),
      selector: `player1`,
    });

    this.player2 = new Pokemon({
      ...await this._api.getRandomPokemon(),
      selector: `player2`,
    });

    this._addListener();
  }
}

export default Game;
