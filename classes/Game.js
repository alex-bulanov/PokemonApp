import Pokemon from './Pokemon.js';
import {randomInteger, checkHP, renderLog, getRandomAttack} from '../utils.js';

class Game {
  constructor(pokemons) {
    this._pokemons = pokemons;
    this.player1 = null;
    this.player2 = null;
    this.btns = null;
    this._onButtonClick = this._onButtonClick.bind(this);
    this._playersSet = null;
  };

  _getPlayer() {
    for (let i = 0; i < this._pokemons.length; i++) {
      const currentNewPlayer = this._pokemons[randomInteger(0, this._pokemons.length - 1)];
      if (!this._playersSet.has(currentNewPlayer)) {
        this._playersSet.add(currentNewPlayer);
        return currentNewPlayer;
      }
    }
  }

  _attack(hittingPerson, targetPerson, attack) {
    targetPerson.changeHP(randomInteger(attack.minDamage, attack.maxDamage));

    if (checkHP(targetPerson)) {
      renderLog(hittingPerson, targetPerson);
    } else {
      renderLog(hittingPerson, targetPerson);

      if (targetPerson.selector === `player1`) {
        setTimeout(() => {
          if (confirm(`Оууу Поражение! Максимальный уровень ${targetPerson.lvl} ! Играем снова?`)) {
            this.start();
          }
        }, 100);
      }

      for (let btn of this.btns) {
        btn.removeEventListener(`click`, this._onButtonClick);
        btn.disabled = true;
      }
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
    const currentBtn = event.target;
    const currentHittingPerson = event.target.dataset.player === `player1` ? this.player1 : this.player2;
    const currentTargetPerson = event.target.dataset.player === `player1` ? this.player2 : this.player1;

    const currentHittingPersonAttack = currentHittingPerson.attacks.find(item => item[`name`] === currentBtn.dataset.name);

    this._addClick(currentHittingPerson, currentBtn);

    this._attack(currentHittingPerson, currentTargetPerson, currentHittingPersonAttack);

    if (checkHP(currentTargetPerson)) {
      this._attack(currentTargetPerson, currentHittingPerson, getRandomAttack(currentTargetPerson));
    } else {
      setTimeout(() => {
        currentHittingPerson.lvl++;
        currentHittingPerson.renderLVL();
        if (confirm(`Победа! Продолжаем играть?`)) {
          this._resume()
        }
      }, 100)
    }
  }

  _resume() {
    this._reset();
    this.player2 = new Pokemon({
      ...this._getPlayer(),
      selector: `player2`,
    });
  }

  _reset() {
    const playersHealth = document.querySelectorAll(`.health`);

    for (let playerHealth of playersHealth) {
      if (playerHealth.classList.contains(`low`)) {
        playerHealth.classList.remove(`low`);
      }
      if (playerHealth.classList.contains(`critical`)) {
        playerHealth.classList.remove(`critical`);
      }
    }

    this.btns = document.querySelectorAll(`button`);

    for (let btn of this.btns) {
      btn.removeAttribute(`disabled`);
      btn.addEventListener(`click`, this._onButtonClick);
    }
  }

  start() {
    this._playersSet = new Set();
    this._reset();

    this.player1 = new Pokemon({
      ...this._getPlayer(),
      selector: `player1`,
    });

    this.player2 = new Pokemon({
      ...this._getPlayer(),
      selector: `player2`,
    });

    this.btns = document.querySelectorAll(`button`);

    for (let btn of this.btns) {
      btn.removeAttribute(`disabled`);
      btn.addEventListener(`click`, this._onButtonClick);
    }
  }
}

export default Game;