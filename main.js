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
  changeHP,
  renderHP,
  renderHPLife,
  renderProgressBar,
  clickCount: 0,
  maxClickQuantity: 6,
}

const enemy = {
  name: `Charmander`,
  defaultHP: 200,
  damageHP: 200,
  elHP: getElement(`#health-enemy`),
  elProgressBar: getElement(`#progressbar-enemy`),
  changeHP,
  renderHP,
  renderHPLife,
  renderProgressBar,
  clickCount: 0,
  maxClickQuantity: 6,
}

function getElement(id) {
  return document.querySelector(id);
}

function getEnding(number, txt) {
  var cases = [2, 0, 1, 1, 1, 2];
  return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
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

function addClick(person, btn) {
  if (person.clickCount < person.maxClickQuantity - 1) {
    console.log(++person.clickCount);
    console.log(`у ${person.name} осталось ${person.maxClickQuantity - person.clickCount} ${getEnding((person.maxClickQuantity - person.clickCount), ['удар', 'удара', 'ударов'])}`)

  } else {
    console.log(++person.clickCount);
    console.log(`Ударов больше нет!`);
    btn.removeEventListener(`click`, onButtonClick);
    btn.disabled = true;
  }
}

function onButtonClick(event) {
  const currentBtn = event.target;
  const currentHittingPerson = event.target.id === `btn-kick` ? character : enemy;
  const currentTargetPerson = event.target.id === `btn-kick` ? enemy : character;
  currentTargetPerson.changeHP(randomNumber(20));

  addClick(currentHittingPerson, currentBtn);
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