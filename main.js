const playground = document.querySelector(`.playground`);
const btns = document.querySelectorAll(`[id*=-kick]`);
const logBar = document.createElement(`div`);
logBar.classList.add(`log-bar`);

let logBarInit = false;


const character = {
  name: `Pikachu`,
  defaultHP: 100,
  damageHP: 100,
  elHP: getElement(`#health-character`),
  elProgressBar: getElement(`#progressbar-character`),
  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressBar: renderProgressBar,
}

const enemy = {
  name: `Charmander`,
  defaultHP: 200,
  damageHP: 200,
  elHP: getElement(`#health-enemy`),
  elProgressBar: getElement(`#progressbar-enemy`),
  changeHP: changeHP,
  renderHP: renderHP,
  renderHPLife: renderHPLife,
  renderProgressBar: renderProgressBar,
}

function getElement(id) {
  return document.querySelector(id);
}

function renderHPLife() {
  this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
}

function renderProgressBar() {
  this.elProgressBar.style.width = `${(this.damageHP / this.defaultHP) * 100}%`;
}

function renderHP() {
  this.renderHPLife();
  this.renderProgressBar();
}

function changeHP(count) {
  if (!logBarInit) {
    playground.after(logBar);
    logBarInit = true;
  }

  this.damageHP -= count;

  const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);
  const paragraph = document.createElement(`p`);
  paragraph.innerText = `${log} теперь у ${this.name} [${this.damageHP}/${this.defaultHP}] очков здоровья`;

  logBar.insertBefore(paragraph, logBar.children[0]);

  if (this.damageHP <= 0) {
    this.damageHP = 0;

    for (let btn of btns) {
      btn.removeEventListener(`click`, onButtonClick);
      btn.disabled = true;
    }

    paragraph.innerText = `${this.name} Проиграл!`;
    logBar.insertBefore(paragraph, logBar.children[0]);
  }

  this.renderHP();
}

function randomNumber(num) {
  return Math.ceil(Math.random() * num);
}

function onButtonClick(event) {
  const currentPerson = event.target.id === `btn-kick` ? enemy : character;
  currentPerson.changeHP(randomNumber(20));
}

function generateLog(firstPerson, secondPerson) {
  const {name: firstName} = firstPerson;
  const {name: secondName} = secondPerson;

  const logs = [
    `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага.`,
    `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага.`,
    `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар.`,
    `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар.`,
    `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар.`,
    `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника`,
    `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника.`,
    `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику.`
  ];

  return logs[randomNumber(logs.length) - 1];
}


function init() {
  for (let btn of btns) {
    btn.addEventListener(`click`, onButtonClick);
  }
  character.renderHP();
  enemy.renderHP();
}

init();