const playground = document.querySelector(`.playground`);
const logBar = document.createElement(`div`);
let logBarInit = false;

logBar.classList.add(`log-bar`);

// const getEnding = (number, txt) => {
//   const cases = [2, 0, 1, 1, 1, 2];
//   return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
// }

const getLog = (hitting, recipient) => {
  const {name: hittingName} = hitting;
  const {name: recipientName} = recipient;

  const logs = [
    `${recipientName} вспомнил что-то важное, но неожиданно ${hittingName}, не помня себя от испуга, ударил в предплечье врага.`,
    `${recipientName} поперхнулся, и за это ${hittingName} с испугу приложил прямой удар коленом в лоб врага.`,
    `${recipientName} забылся, но в это время наглый ${hittingName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${recipientName} пришел в себя, но неожиданно ${hittingName} случайно нанес мощнейший удар.`,
    `${recipientName} поперхнулся, но в это время ${hittingName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${recipientName} удивился, а ${hittingName} пошатнувшись влепил подлый удар.`,
    `${recipientName} высморкался, но неожиданно ${hittingName} провел дробящий удар.`,
    `${recipientName} пошатнулся, и внезапно наглый ${hittingName} беспричинно ударил в ногу противника`,
    `${recipientName} расстроился, как вдруг, неожиданно ${hittingName} случайно влепил стопой в живот соперника.`,
    `${recipientName} пытался что-то сказать, но вдруг, неожиданно ${hittingName} со скуки, разбил бровь сопернику.`
  ];

  return logs[randomInteger(0, logs.length - 1)];
}

export const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const checkHP = (person) => {
  return person.hp.current > 0 ? true : false;
};


export const renderLog = (hittingPerson, targetPerson) => {
  const paragraph = document.createElement(`p`);
  const log = getLog(hittingPerson, targetPerson);

  paragraph.innerText = `${log} теперь у ${targetPerson.name} [${targetPerson.hp.current}/${targetPerson.hp.total}] очков здоровья`;

  if (!logBarInit) {
    playground.after(logBar);
    logBarInit = true;
  }

  logBar.insertBefore(paragraph, logBar.children[0]);
  if (!checkHP(targetPerson)) {
    paragraph.innerText = `${targetPerson.name} проиграл!`;
    logBar.insertBefore(paragraph, logBar.children[0]);
  }
}

export const getRandomAttack = (person) => {
  let currentAttack = person.attacks[randomInteger(0, person.attacks.length - 1)];
  if (currentAttack.maxCount > 0) {
    currentAttack.maxCount;
    return currentAttack;
  } else {
    getRandomAttack(person);
  }
}
