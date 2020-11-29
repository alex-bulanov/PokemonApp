import Selectors from './Selectors.js';

const hpLevel = {
  LOW: 60,
  CRITICAL: 20
}

class Pokemon extends Selectors {
  constructor({name, img, hp, type, selector, attacks}) {
    super(selector);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp
    };

    this.lvl = 1;

    this.selector = selector;
    this.img = img;
    this.type = type;
    this.attacks = attacks;

    if (selector === `player1`) {
      this.renderBtn();
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

  renderBtn = () => {
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
}

export default Pokemon;