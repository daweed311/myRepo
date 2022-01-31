let title;
let screens;
let screenPrice;
let rollback;
let fullPrice;
let adaptive;

console.log("Any string");

alert("Сообщение с любым текстом)");
const title = "Project";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 33;
const rollback = 99;
const fullPrice = 1;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log(
  `“Стоимость верстки экранов ${screenPrice} рублей/ долларов/гривен/юани” и “Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юани”`
);

console.log(screens.toLocaleLowerCase().split(" "));

console.log(
  `Процент откуата посреднику за работу: ${fullPrice * (rollback / 100)}`
);
