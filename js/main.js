const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';


function getRow(firstRow, secondRow, char = 'а') {
  let firstCount = 0;
  let secondCound = 0;


  let rezult = 'Обе строки пустые или не содежат искомого символа :( ';

  if (firstRow != null) {
    for (let i = 0; i <= firstRow.length; i++) {
      if (firstRow.charAt(i) === char) {
        firstCount++;
      }
    }
  }

  if (secondRow != null) {
    for (let j = 0; j <= secondRow.length; j++) {
      if (secondRow.charAt(j) === char) {
        secondCound++;
      }
    }
  }

  if (firstCount > secondCound) {
    rezult = firstRow;
  } else if (firstCount < secondCound) {
    rezult = secondRow;
  }

  return rezult;
}

// console.log(getRow(firstRow, secondRow)); // мама мыла раму

// # задание под звездочкой 
const desiredChar = prompt('Какой символ ищим ?', 'а');
const firstString = prompt('Введите первую строку', '');
const secondString = prompt('Введите втрорую строку', '');

alert(getRow(firstString, secondString, desiredChar));

// # 2 

// вспомогательная ф-ция

function getFormattedNumber(phoneNumber) {
  let format = '';

  for (let i = 0; i <= phoneNumber.length; i++) {
    if (i === 2) {
      format += ' (' + phoneNumber.charAt(i);
    } else if (i === 5) {
      format += ') ' + phoneNumber.charAt(i);
    } else if (i === 8 || i === 10) {
      format += '-' + phoneNumber.charAt(i);
    }
    else {
      format += phoneNumber.charAt(i);
    }
  }

  return format;
}

function formattedPhone(phone) {

  let formattedPhone = 'неверный формат';

  if (phone.length < 10 || phone.length > 12) {
    return formattedPhone;
  }

  if (phone.length === 10) {
    phone = '+7' + phone;
    formattedPhone = getFormattedNumber(phone);
  } else if (phone.length === 12) {
    formattedPhone = getFormattedNumber(phone);
  } else if (phone.length === 11 && +phone.charAt(0) === 8) {
    phone = phone.slice(1);
    phone = '+7' + phone;
    formattedPhone = getFormattedNumber(phone);
  }

  return formattedPhone;

}

console.log(formattedPhone('+71234567890')); // +7 (123) 456-78-90

// # задание под звездочкой 

const currentPhoneNumber = prompt('Введите телефонный номер в формате 9211234567  или 89211234567', '');
alert(formattedPhone(currentPhoneNumber));