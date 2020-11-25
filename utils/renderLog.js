import getLog from './getLog.js';
import checkHP from './checkHP.js';

const playground = document.querySelector(`.playground`);
const logBar = document.createElement(`div`);
let logBarInit = false;

logBar.classList.add(`log-bar`);

export default function renderLog(hittingPerson, targetPerson) {
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