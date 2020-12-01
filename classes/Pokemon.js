import Selectors from './Selectors.js';

const hpLevel = {
  LOW: 60,
  CRITICAL: 20
}

class Pokemon extends Selectors {
  constructor({name, img, hp, type, selector, attacks, id}) {
    super(selector);
    this.id = id;
    this.name = name;
    this.hp = {
      current: hp,
      total: hp
    };

    this._eventBtnOk = null;
    this._eventBtnCancel = null;

    this._callback1 = null;
    this._callback2 = null;

    this.lvl = 1;
    this.selector = selector;
    this.img = img;
    this.type = type;
    this.attacks = attacks;

    if (selector === `player1`) {
      this.renderBtns();
    }

    this.renderName();
    this.renderHP();
    this.renderIMG();
    this.renderLVL();
  }

  changeHP = (count) => {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
    }

    this.renderHP();
  }

  renderLVL = () => {
    this.elLvl.innerText = `Lv. ${this.lvl}`;
  }

  renderIMG = () => {
    this.elImg.src = this.img;
  }

  renderName = () => {
    this.elName.innerText = this.name;
  }

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressBar();
  }

  renderHPLife = () => {
    this.elHP.innerText = `${this.hp.current} / ${this.hp.total}`;
  }

  renderProgressBar = () => {
    this.elProgressBar.style.width = `${(this.hp.current / this.hp.total) * 100}%`;

    if (this.hp.current < hpLevel.LOW && this.hp.current > hpLevel.CRITICAL) {
      this.elProgressBar.classList.add(`low`)
    } else if (this.hp.current <= hpLevel.CRITICAL) {
      this.elProgressBar.classList.remove(`low`)
      this.elProgressBar.classList.add(`critical`)
    }
  }

  renderBtns = () => {
    this.control.innerText = ``;
    this.attacks.forEach(element => {
      const btn = document.createElement(`button`);
      btn.classList.add(`button`);
      btn.innerText = `${element.name} (${element.maxCount})`;
      btn.dataset.player = this.selector;
      btn.dataset.name = element.name;
      btn.dataset.count = element.maxCount;
      this.control.appendChild(btn);
    })
  }

  removeBtns = () => {
    this.control.innerText = ``;
  }

  _onBtnOkClick = () => {
    this._callback1();
    this._eventBtnOk.removeEventListener(`click`, this._onBtnOkClick);
    this._eventBtnCancel.removeEventListener(`click`, this._onBtnCancelClick);
  }

  _onBtnCancelClick = () => {
    this._callback2();
    this._eventBtnOk.removeEventListener(`click`, this._onBtnOkClick);
    this._eventBtnCancel.removeEventListener(`click`, this._onBtnCancelClick);
  }

  _createRestartBtn = () => {
    this._eventBtnOk = document.createElement(`button`);
    this._eventBtnOk.classList.add(`button`);
    this._eventBtnOk.innerText = `restart`;
    this.control.appendChild(this._eventBtnOk);
  }

  _createCancelBtn = () => {
    this._eventBtnCancel = document.createElement(`button`);
    this._eventBtnCancel.classList.add(`button`);
    this._eventBtnCancel.innerText = `cancel`;
    this.control.appendChild(this._eventBtnCancel);
  }

  _createContinueBtn = () => {
    this._eventBtnOk = document.createElement(`button`);
    this._eventBtnOk.classList.add(`button`);
    this._eventBtnOk.innerText = `continue`;
    this.control.appendChild(this._eventBtnOk);
  }

  handleRestart = (callback1, callback2) => {
    this._createRestartBtn();
    this._createCancelBtn();

    this._callback1 = callback1;
    this._callback2 = callback2;

    this._eventBtnOk.addEventListener(`click`, this._onBtnOkClick);
    this._eventBtnCancel.addEventListener(`click`, this._onBtnCancelClick);
  }

  handleСontinuation = (callback1, callback2) => {
    this._createContinueBtn();
    this._createCancelBtn();

    this._callback1 = callback1;
    this._callback2 = callback2;

    this._eventBtnOk.addEventListener(`click`, this._onBtnOkClick);
    this._eventBtnCancel.addEventListener(`click`, this._onBtnCancelClick);
  }
}

export default Pokemon;