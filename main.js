const btns = document.querySelectorAll(`[id*=-kick]`);

const character = {
  name: `Pikachu`,
  defaultHP: 100,
  damageHP: 100,
  elHP: document.querySelector(`#health-character`),
  elProgressBar: document.querySelector(`#progressbar-character`),
}

const enemy = {
  name: `Charmander`,
  defaultHP: 100,
  damageHP: 100,
  elHP: document.querySelector(`#health-enemy`),
  elProgressBar: document.querySelector(`#progressbar-enemy`),
}

function renderHPLife(person) {
  person.elHP.innerText = `${person.damageHP} / ${person.defaultHP}`;
}

function renderProgressBar(person) {
  person.elProgressBar.style.width = `${person.damageHP}%`;
}

function renderHP(person) {
  renderHPLife(person);
  renderProgressBar(person);
}

function changeHP(count, person) {
  if (person.damageHP <= count) {
    person.damageHP = 0;

    for (let btn of btns) {
      btn.removeEventListener(`click`, onButtonClick);
      btn.disabled = true;
    }

    // timeout необходим, что бы alert вывелся после отрисовки HP
    // но по хорошему лучше сделать через callback;

    setTimeout(() => {
      alert(`${person.name} Проиграл!`);
    }, 100);


  } else {
    person.damageHP -= count;
  }

  renderHP(person);
}

function randomDamage(num) {
  return Math.ceil(Math.random() * num);
}

function onButtonClick(event) {
  const currentPerson = event.target.id === `btn-kick` ? enemy : character;
  changeHP(randomDamage(20), currentPerson);
}

function init() {
  for (let btn of btns) {
    btn.addEventListener(`click`, onButtonClick);
  }

  renderHP(character);
  renderHP(enemy);
}

init();