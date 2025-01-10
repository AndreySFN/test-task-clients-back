/* eslint-disable */
const bcrypt = require('bcrypt');
const readline = require('readline');

async function getInput(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function hashString() {
  const password = await getInput('Введите пароль: ');
  const confirmPassword = await getInput('Подтвердите пароль: ');

  if (password !== confirmPassword) {
    console.error('Ошибка: Пароли не совпадают!');
    return;
  }

  const saltRounds = 10; // Рекомендуемое значение для разработки
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  console.log(`Пароль успешно захеширован:`);
  console.log(`Хэш: ${hashedPassword}`);
}

hashString();
