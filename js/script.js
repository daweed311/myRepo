"use strict";

const title = document.getElementsByTagName("h1")[0];

const priceBtn = document.getElementsByClassName("handler_btn");

const plusBtn = document.querySelector(".screen-btn");

const other = document.querySelectorAll(".other-items");

const otherPercent = [other[0], other[1]];
const otherNumber = [other[2], other[3], other[4], other[5], other[6]];

console.log(otherPercent);

// let otherPercent = [];
// let otherNumber = [];
// other.forEach((node) => {
//   if (node.classList.contains("percent")) {
//     otherPercent.push(node);
//   } else if (node.classList.contains("number")) {
//     otherNumber.push(node);
//   }
// });

console.log(otherNumber);
const rangeInput = document.querySelector(".rollback > div > input");

const rangeSpan = document.querySelector(".rollback > div > span");

const totalInput = document.getElementsByClassName("total-input");

let totalInputArr = [];

for (let i = 0; i < totalInput.length; i++) {
  totalInputArr.push(totalInput[i]);
}

let allScreens = document.querySelectorAll(".screen");

// const isNumber = function (num) {
//   return !isNaN(parseFloat(num)) && isFinite(num);
// };

// const getString = function (question) {
//   let result;
//   do {
//     result = prompt(question);
//   } while (result == false && +result === NaN);
//   return result;
// };

// const appData = {
//   title: "",
//   screens: [],
//   screenPrice: 0,
//   adaptive: true,
//   rollback: 10,
//   fullPrice: 0,
//   servicePercentPrice: 0,
//   allServicePrices: 0,
//   services: {},
//   start: function () {
//     appData.asking();
//     appData.addPrices();
//     appData.getFullPrice();
//     appData.getTitle();
//     appData.getServicePercentPrice();

//     appData.logger();
//   },
//   asking: function () {
//     appData.title = getString("Как называется ваш проект?");

//     for (let i = 0; i < 2; i++) {

//       let name = getString("Какие типы экранов нужно разработать?");
//       let price = 0;

//       do {
//         price = prompt("Сколько будет стоить данная работа?");
//       } while (!isNumber(price));

//       appData.screens.push({id: i, name: name, price: price})
//     }

//     do {
//       let name = getString("Какой дополнительный тип услуги нужен?");
//       let priceService;
//       if (name === null) {
//         break;
//       }
//       do {
//         priceService = prompt("Сколько это будет стоить?");
//       } while (!isNumber(priceService));
//       appData.services[name] = +priceService;
//     } while (true);
//     appData.adaptive = confirm("Нужен ли адаптив на сайте?");
//   },

//   addPrices: function () {
//     for (let screen of appData.screens) {
//       appData.screenPrice += +screen.price;
//     }
//     for (let key in appData.services) {
//       appData.allServicePrices += appData.services[key];
//     }
//   },

//   getFullPrice: function () {
//     appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
//   },

//   getTitle: function () {
//     appData.title =
//       appData.title.trim()[0].toUpperCase() +
//       appData.title.trim().substr(1).toLowerCase();
//   },

//   getServicePercentPrice: function () {
//     appData.servicePercentPrice =
//       appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
//   },

//   getRollbackMessage: function (price) {
//     if (price >= 30000) {
//       return "Даём скидку 10%";
//     } else if (price >= 15000 && price < 30000) {
//       return "Даём скидку 5%";
//     } else if (price < 15000 && price >= 0) {
//       return "Скидка не предусмотрена";
//     } else if (price < 0) {
//       return "Что-то пошло не так";
//     }
//   },

//   logger: function () {
//     console.log(appData.fullPrice);
//     console.log(appData.servicePercentPrice);
//     console.log(appData.screens);
//     console.log(appData.getRollbackMessage(appData.fullPrice));
//   },
// };

// appData.start();
