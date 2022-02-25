"use strict";

const title = document.getElementsByTagName('h1')[0];
const screens = [...document.querySelectorAll('.screen')];
const maxScreens = screens[0].querySelector('select').length - 1;
let templateScreen;

const buttonPlus = document.querySelector('.screen-btn');
let minusBtn;

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRollback = document.querySelector('.rollback input');
const inputRollbackValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

const appData = {

  screens: [],
  maxTypeScreens: 100000,

  servicesPercent: {},
  servicesNumber: {},

  screenPrice: 0,
  screenCount: 0,

  servicePricesPercent: 0,
  servicePricesNumber: 0,

  fullPrice: 0,
  rollback: 0,
  servicePercentPrice: 0,

  init: function () {
    appData.initPage();

    buttonPlus.addEventListener('click', appData.addScreenBlock);
    minusBtn.addEventListener('click', appData.delScreenBlock);
    inputRollback.addEventListener('input', appData.getRollback);

  },

  initPage: () => {
    const input = screens[0].querySelector('input'), select = screens[0].querySelector('select');

    document.title = title.textContent;

    document.querySelector('h3').innerHTML +=
      '<br /><small><i>поля тип и количество экранов обязательны для заполнения' +
      '<br />количество экранов не более ' + appData.maxTypeScreens + '</i></small>';

    input.setAttribute('type', 'number');
    input.setAttribute('min', '0');
    input.setAttribute('max', appData.maxTypeScreens + '');
    input.setAttribute('max', appData.maxTypeScreens + '');
    input.setAttribute('onchange', 'appData.correctScreens()');
    select.setAttribute('onchange', 'appData.correctScreens()');
    [...document.querySelectorAll('.element input.custom-checkbox')].forEach((elem) => {
      elem.setAttribute('onchange', 'appData.stop()');
    });

    templateScreen = screens[0].cloneNode(true);

    minusBtn = buttonPlus.cloneNode();
    minusBtn.textContent = '-';
    minusBtn.style.marginLeft = '5px';
    buttonPlus.after(minusBtn);

    appData.statusScreensButton();
  },

  correctScreens: () => {
    let isCorrect = true;

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const value = +input.value;

      select.style.backgroundColor = '';
      input.style.backgroundColor = '';
      if (!select.selectedIndex) {
        select.style.backgroundColor = 'MistyRose';
        isCorrect = false;
      }
      if (!value || value < 1 || value > appData.maxTypeScreens) {
        input.style.backgroundColor = 'MistyRose';
        isCorrect = false;
      }
    });

    startBtn.removeEventListener('click', appData.start);
    if (isCorrect) {
      startBtn.style.opacity = '';
      startBtn.style.cursor = '';
      startBtn.addEventListener('click', appData.start);
    } else {
      startBtn.style.opacity = '0.5';
      startBtn.style.cursor = 'default';
    }
    appData.stop();
  },

  addScreenBlock: () => {
    let cloneScreen;

    if (screens.length < maxScreens) {
      cloneScreen = templateScreen.cloneNode(true);
      screens[screens.length - 1].after(cloneScreen);
      screens.push(cloneScreen);
      appData.statusScreensButton();
    }
  },

  delScreenBlock: () => {
    if (screens.length > 1) {
      screens[screens.length - 1].remove();
      screens.length--;
      appData.statusScreensButton();
    }
  },

  statusScreensButton: () => {
    switch (screens.length) {
      case 1:
        minusBtn.style.opacity = '0.5';
        break;
      case maxScreens:
        buttonPlus.style.opacity = '0.5';
        break;
      default:
        buttonPlus.style.opacity = '1';
        minusBtn.style.opacity = '1';
    }

    appData.correctScreens();
  },

  getRollback: (event) => {
    appData.rollback = event.target.value;
    appData.showInputRollback();

    if (appData.fullPrice) {
      appData.addPrices();
      appData.showResult();
    }
  },

  showInputRollback: () => {
    inputRollbackValue.textContent = appData.rollback + '%';
  },

  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
  },

  addScreens: () => {
    appData.screens.length = 0;

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },

  addServices: () => {
    const add = (item, typeValue) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      appData['services' + typeValue][label.textContent] = (check.checked) ? +input.value : 0;
    };

    otherItemsPercent.forEach((item) => { add(item, 'Percent'); });
    otherItemsNumber.forEach((item) => { add(item, 'Number'); });
  },

  addPrices: () => {
    appData.screenPrice = appData.screens.reduce((sum, screen) => sum + screen.price, 0);
    appData.screenCount = appData.screens.reduce((quantity, screen) => quantity + screen.count, 0);

    appData.servicePricesPercent = 0;
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * appData.servicesPercent[key] / 100;
    }

    appData.servicePricesNumber = 0;
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

    appData.servicePercentPrice = Math.ceil(appData.fullPrice * (100 - appData.rollback) / 100);
  },

  stop: function () {
    this.clear();
    this.showResult();
  },

  clear: () => {
    appData.screens.length = 0;
    appData.servicesPercent.length = 0;
    appData.servicesNumber.length = 0;
    appData.screenPrice = 0;
    appData.screenCount = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;
  },

  showResult: () => {
    total.value = appData.screenPrice;
    totalCount.value = appData.screenCount;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  }

};

appData.init();
