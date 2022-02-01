let projectName = prompt("Как называется ваш проект?").trim();
let screenPrice = +prompt("Сколько будет стоить данная работа?", 12000);
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = 99;
let priceForWork = rollback / 100;
let allServicePrice, servicePercentPrice, fullPrice, rollbackMessage;

const screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);

const getAllServicePrices = function (price1, price2) {
  return price1 + price2;
};

allServicePrice = getAllServicePrices(servicePrice1, servicePrice2);

function getFullPrice(screen, services) {
  return screen + services;
}

fullPrice = getFullPrice(screenPrice, allServicePrice);

function getTitle(projectName) {
  return projectName[0].toUpperCase() + projectName.substring(1);
}

title = getTitle(projectName);

const getServicePercentPrices = function (fullPrice, rollback) {
  return Math.ceil(fullPrice * rollback);
};

servicePercentPrice = getServicePercentPrices(fullPrice, priceForWork);
console.log(servicePercentPrice);

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

function getRollbackMessage(finalPrice) {
  if (finalPrice >= 30000) {
    return "Даем скидку в 10%";
  } else if (finalPrice >= 15000 && finalPrice < 30000) {
    return "Даем скидку в 5%";
  } else if (finalPrice < 15000 && finalPrice > 0) {
    return "Скидка не предусмотрена";
  } else if (finalPrice <= 0) {
    return "Что то пошло не так";
  }
}

rollbackMessage = getRollbackMessage(fullPrice);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens.split(" "));

console.log(rollbackMessage);

getServicePercentPrices(servicePercentPrice);
