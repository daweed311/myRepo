"use strict";

let title;
let screenPrice;
let screens;
let adaptive;
let rollback;
let priceForWork;

let allServicePrice;
let fullPrice;
let servicePercentPrice;
let rollbackMessage;
let service1;
let service2;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки").trim();

  screenPrice = prompt("Сколько будет стоить данная работа?", 15000);

  while (!isNumber(screenPrice)) {
    screenPrice = prompt("Сколько будет стоить данная работа?", 15000);
  }

  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
  );
  adaptive = confirm("Нужен ли адаптив на сайте?");
  rollback = 99;
  priceForWork = rollback / 100;
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i == 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }
    sum += +prompt("Сколько это будет стоить?");
  }
  return sum;
};

function getFullPrice(screen, services) {
  return screen + services;
}

const getTitle = function () {
  return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
};

const getServicePercentPrices = function (fullPrice, rollback) {
  return Math.ceil(fullPrice * rollback);
};

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

asking();

allServicePrice = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrice);
servicePercentPrice = getServicePercentPrices(fullPrice, priceForWork);
console.log(servicePercentPrice);

title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServie price = " + allServicePrice);

rollbackMessage = getRollbackMessage(fullPrice);

console.log(screens.split(" "));

console.log(rollbackMessage);

getServicePercentPrices(servicePercentPrice);
