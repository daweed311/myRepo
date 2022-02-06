"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  fullPrice: 0,
  servicePercentPrice: 0,
  allServicePrices: 0,
  service1: "",
  service2: "",
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  start: function () {
    this.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(
      appData.screenPrice,
      appData.allServicePrices
    );
    appData.title = appData.getTitle(appData.title);
    appData.servicePercentPrice = appData.getServicePercentPrice(
      appData.fullPrice,
      appData.rollback
    );
    this.logger();
  },
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");

    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Интерактивные"
    );

    console.log(appData.screens.split(" "));

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!appData.isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }
      sum += (() => {
        let n = 0;
        do {
          n = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(n));
        return +n;
      })();
    }
    return sum;
  },

  getFullPrice: function (screen, allServices) {
    return Number(screen) + Number(allServices);
  },

  getTitle: function (string) {
    return string.trim().charAt(0).toUpperCase() + string.slice(1);
  },

  getServicePercentPrice: function (price, rb) {
    return Math.ceil(price - price * (rb / 100));
  },

  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даём скидку 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даём скидку 5%";
    } else if (price < 15000 && price >= 0) {
      return "Скидка не предусмотрена";
    } else if (price < 0) {
      return "Что-то пошло не так";
    }
  },
  logger: function () {
    for (let key in appData) {
      console.log(key + " " + appData[key]);
    }
  },
};

appData.start();
