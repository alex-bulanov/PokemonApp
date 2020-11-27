import getRandomNumber from './getRandomNumber.js';

export default function getLog(hitting, recipient) {
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

  return logs[getRandomNumber(logs.length) - 1];
}
