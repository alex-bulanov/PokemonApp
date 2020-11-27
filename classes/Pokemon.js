import Selectors from './Selectors.js';

class Pokemon extends Selectors {
  constructor({name, hp, type, selector}) {
    super(selector);
    this.name = name;
    this.hp = {
      current: hp,
      total: hp
    };

    this.clickCount = 0;
    this.maxClickQuantity = 20;
    this.type = type;

    this.renderHP();
  }

  changeHP = (count) => {
    this.hp.current -= count;

    if (this.hp.current <= 0) {
      this.hp.current = 0;
    }

    this.renderHP();
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
  }
}

export default Pokemon;