class Selectors {
  constructor(name) {
    this.elHP = document.querySelector(`#health-${name}`);
    this.elProgressBar = document.querySelector(`#progressbar-${name}`);
  }
}

export default Selectors;