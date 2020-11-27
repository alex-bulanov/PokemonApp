import Pokemon from './classes/Pokemon.js';
import renderLog from './utils/renderLog.js';
import getRandomNumber from './utils/getRandomNumber.js';
import getEnding from './utils/getEnding.js';
import checkHP from './utils/checkHP.js';

const character = new Pokemon({
  name: `Pikachu`,
  type: `electric`,
  hp: 200,
  selector: `character`,
});

const charmander = new Pokemon({
  name: `Charmander`,
  type: `fire`,
  hp: 100,
  selector: `enemy`,
});

const btns = document.querySelectorAll(`[id*=-kick]`);


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
  const currentHittingPerson = event.target.id === `btn-kick` ? character : charmander;
  const currentTargetPerson = event.target.id === `btn-kick` ? charmander : character;
  currentTargetPerson.changeHP(getRandomNumber(20));
  if (checkHP(currentTargetPerson)) {
    renderLog(currentHittingPerson, currentTargetPerson);
  } else {
    renderLog(currentHittingPerson, currentTargetPerson);
    for (let btn of btns) {
      btn.removeEventListener(`click`, onButtonClick);
      btn.disabled = true;
    }
  }

  addClick(currentHittingPerson, currentBtn);
}

function init() {
  for (let btn of btns) {
    btn.addEventListener(`click`, onButtonClick);
  }
}

init();