const screenPrice = +prompt("Сколько будет стоить данная работа?", 12000);
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
const rollback = 99;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let title = prompt("Как называется ваш проект?").trim();
const screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);

const getAllServicePrices = function (price1, price2) {
  allServicePrices = price1 + price2;
};

getAllServicePrices(servicePrice1, servicePrice2);

const getFullPrice = function (screen, services) {
  fullPrice = screen + services;
};

getFullPrice(screenPrice, allServicePrices);

function getTitle(projectName) {
  title = projectName[0].toUpperCase() + projectName.substring(1);
}

getTitle(title);

const getServicePercentPrices = function (percentPrice) {
  percentPrice = Math.ceil(fullPrice * (rollback / 100));
  console.log(percentPrice);
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (finalPrice) {
  if (finalPrice >= 30000) {
    console.log("Даем скидку в 10%");
  } else if (finalPrice >= 15000 && finalPrice < 30000) {
    console.log("Даем скидку в 5%");
  } else if (finalPrice < 15000 && finalPrice > 0) {
    console.log("Скидка не предусмотрена");
  } else if (finalPrice <= 0) {
    console.log("Что то пошло не так");
  }
};

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens.split(" "));

getRollbackMessage(fullPrice);

getServicePercentPrices(servicePercentPrice);
