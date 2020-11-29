class Selectors {
  constructor(name) {
    this.elImg = document.querySelector(`.${name} .sprite`);
    this.elLvl = document.querySelector(`.${name} .lvl`);
    this.elName = document.querySelector(`#name-${name}`);
    this.elHP = document.querySelector(`#health-${name}`);
    this.elProgressBar = document.querySelector(`#progressbar-${name}`);
    this.control = document.querySelector(`#control-${name}`)
  }
}

export default Selectors;