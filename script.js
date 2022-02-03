"use strict";

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 99;
let fullPrice;
let servicePercentPrice;
let allServicePrices;
let service1;
let service2;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
  );
  console.log(screens.split(" "));

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
    }
    sum += (() => {
      let n = 0;
      do {
        n = prompt("Сколько это будет стоить?");
      } while (!isNumber(n));
      return +n;
    })();
  }
  return sum;
};

function getFullPrice(screen, allServices) {
  return Number(screen) + Number(allServices);
}

function getTitle(someString) {
  return someString.trim().charAt(0).toUpperCase() + someString.slice(1);
}

function getServicePercentPrice(finalPrice, roll) {
  return Math.ceil(finalPrice - finalPrice * (roll / 100));
}

const showTypeOf = function (someVar) {
  console.log(someVar, typeof someVar);
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даём скидку 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даём скидку 5%";
  } else if (price < 15000 && price >= 0) {
    return "Скидка не предусмотрена";
  } else if (price < 0) {
    return "Что-то пошло не так";
  }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
title = getTitle(title);
servicePercentPrice = getServicePercentPrice(fullPrice, rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(allServicePrices);
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrice(fullPrice, rollback));
