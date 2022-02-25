"use strict";

const title = document.getElementsByTagName("h1")[0];
const screens = [...document.querySelectorAll(".screen")];
const maxScreens = screens[0].querySelector("select").length - 1;
let templateScreen;

const buttonPlus = document.querySelector(".screen-btn");
let buttonMinus;

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const cmsOpen = document.getElementById("cms-open");
const hiddenCmsVariants = document.querySelector(".hidden-cms-variants");

const inputRollback = document.querySelector(".rollback input");
const inputRollbackValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

const appData = {
  screens: [],
  maxTypeScreens: 100000,

  status: {
    calculated: false,
    screens: false,
    inputCMS: false,
  },

  servicesPercent: {},
  servicesNumber: {},

  screenPrice: 0,
  screenCount: 0,

  servicePricesPercent: 0,
  servicePricesNumber: 0,

  percentCMS: 0,
  maxPercentCMS: 100,
  servicePriceCMS: 0,

  fullPrice: 0,
  rollback: 0,
  servicePercentPrice: 0,

  isNumber: (input, int = 9, dec = 2) => {
    const regexp = new RegExp(
      `(^0$)` +
        (dec > 0 ? `|(^0(\\.|,)\\d{0,${dec - 1}}\\d$)` : ``) +
        `|(^[1-9]\\d{0,${(1, int - 1)}}$)` +
        (dec > 0
          ? `|(^[1-9]\\d{0,${(1, int - 1)}}(\\.|,)\\d{0,${dec - 1}}\\d$)`
          : ``)
    );

    return regexp.test((input + "").trim());
  },

  toNumber: (strInput) => +strInput.replace(/[,]/g, ".").trim(),

  init() {
    this.initPage();

    buttonPlus.addEventListener("click", () => this.addScreenBlock());
    buttonMinus.addEventListener("click", () => this.delScreenBlock());
    inputRollback.addEventListener("input", (event) => this.getRollback(event));
    startBtn.addEventListener("click", () => this.calculate());
    resetBtn.addEventListener("click", () => this.cleaning());
    cmsOpen.addEventListener("change", (event) => this.checkCMS(event));
    hiddenCmsVariants.addEventListener("change", (event) =>
      this.selectCMS(event)
    );
  },

  initPage() {
    const input = screens[0].querySelector("input"),
      select = screens[0].querySelector("select"),
      selectCMS = hiddenCmsVariants.querySelector("select"),
      inputCMS = hiddenCmsVariants.querySelector("input"),
      spanCMS = document.createElement("span");

    document.title = title.textContent;

    document.querySelector("h3").innerHTML +=
      "<br /><small><i>поля тип и количество экранов обязательны для заполнения" +
      "<br />количество экранов не более " +
      this.maxTypeScreens +
      "</i></small>";

    input.setAttribute("type", "number");
    input.setAttribute("min", "0");
    input.setAttribute("max", this.maxTypeScreens + "");
    input.appThis = this;
    input.setAttribute("onchange", "this.appThis.reachStartBtn()");
    select.appThis = this;
    select.setAttribute("onchange", "this.appThis.reachStartBtn()");
    [...document.querySelectorAll(".element input.custom-checkbox")].forEach(
      (elem) => {
        elem.appThis = this;
        elem.setAttribute("onchange", "this.appThis.checkServices()");
      }
    );

    templateScreen = screens[0].cloneNode(true);

    buttonMinus = buttonPlus.cloneNode();
    buttonMinus.textContent = "-";
    buttonMinus.style.marginLeft = "5px";
    buttonPlus.after(buttonMinus);

    spanCMS.innerHTML = `<br /><small>(число от 0 до ${this.maxPercentCMS})</small>`;
    inputCMS.parentElement.append(spanCMS);

    selectCMS.appThis = this;
    selectCMS.setAttribute("onchange", "this.appThis.reachStartBtn()");
    inputCMS.appThis = this;
    inputCMS.setAttribute("onchange", "this.appThis.reachStartBtn()");

    this.reachStartBtn();
    this.statusScreensButton();
  },

  reachStartBtn() {
    let reach;

    this.statusScreens();
    reach = this.status.screens;

    this.statusCMS();
    if (reach) {
      reach = this.status.inputCMS;
    }

    startBtn.disabled = !reach;
    startBtn.style.opacity = reach ? "" : "0.5";
    startBtn.style.cursor = reach ? "" : "default";
  },

  addScreenBlock() {
    let cloneScreen;

    if (screens.length < maxScreens) {
      cloneScreen = templateScreen.cloneNode(true);
      cloneScreen.querySelector("input").appThis = this;
      cloneScreen.querySelector("select").appThis = this;

      screens[screens.length - 1].after(cloneScreen);

      screens.push(cloneScreen);

      this.reachStartBtn();
      this.statusScreensButton();
    }
  },

  delScreenBlock() {
    if (screens.length > 1) {
      screens[screens.length - 1].remove();
      screens.length--;

      this.reachStartBtn();
      this.statusScreensButton();
    }
  },

  statusScreens() {
    let correct = true;

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const calculated = this.status.calculated;

      select.disabled = calculated;
      select.style.cursor = calculated ? "default" : "";
      input.disabled = calculated;
      input.style.cursor = calculated ? "default" : "";

      if (!calculated) {
        const value = +input.value;
        const noSelect = !select.selectedIndex;
        const noInput = !value || value < 1 || value > this.maxTypeScreens;

        select.style.backgroundColor = noSelect ? "MistyRose" : "";
        input.style.backgroundColor = noInput ? "MistyRose" : "";

        if (noSelect || noInput) {
          correct = false;
        }
      }
      this.status.screens = correct;
    });
  },

  statusScreensButton() {
    const noPlus = screens.length === maxScreens || this.status.calculated;
    const noMinus = screens.length === 1 || this.status.calculated;

    buttonPlus.disabled = noPlus;
    buttonPlus.style.opacity = noPlus ? "0.5" : "1";
    buttonPlus.style.cursor = noPlus ? "default" : "";

    buttonMinus.disabled = noMinus;
    buttonMinus.style.opacity = noMinus ? "0.5" : "1";
    buttonMinus.style.cursor = noMinus ? "default" : "";
  },

  statusCMS() {
    const calculated = this.status.calculated,
      select = hiddenCmsVariants.querySelector("select"),
      input = hiddenCmsVariants.querySelector("input");
    const correct = (() => {
      let valid = true;
      if (
        cmsOpen.checked &&
        select.options[select.selectedIndex].value === "other"
      ) {
        valid =
          input.value.trim() === "" ||
          (this.isNumber(input.value, 3, 0) &&
            input.value >= 0 &&
            input.value <= this.maxPercentCMS);
      }
      return valid;
    })();

    select.disabled = calculated;
    select.style.cursor = calculated ? "default" : "";
    input.disabled = calculated;
    input.style.cursor = calculated ? "default" : "";
    input.style.backgroundColor = correct ? "" : "MistyRose";

    this.status.inputCMS = correct;
  },

  checkServices() {
    if (this.status.calculated) {
      this.start();
    }
  },

  checkCMS(event) {
    if (event.target.checked) {
      hiddenCmsVariants.style.display = "flex";
    } else {
      hiddenCmsVariants.style.display = "none";
    }

    if (this.status.calculated) {
      this.statusCMS();
      if (this.status.inputCMS) {
        this.start();
      }
    } else {
      this.reachStartBtn();
    }
  },

  delCMS() {
    cmsOpen.checked = false;
    hiddenCmsVariants.style.display = "none";

    hiddenCmsVariants.querySelector("select").selectedIndex = 0;
    hiddenCmsVariants.querySelector(".main-controls__input").style.display =
      "none";
    hiddenCmsVariants.querySelector("input").value = "";

    this.percentCMS = 0;
  },

  selectCMS(event) {
    const block = event.currentTarget;
    const select = event.target;

    if (select.id === "cms-select") {
      block.querySelector(".main-controls__input").style.display =
        select.value === "other" ? "block" : "none";
    }
  },

  getRollback(event) {
    this.rollback = event.target.value;
    this.showInputRollback();

    if (this.status.calculated) {
      this.start();
    }
  },

  delRollback() {
    this.rollback = 0;
    inputRollback.value = 0;
    this.showInputRollback();
  },

  showInputRollback() {
    inputRollbackValue.textContent = this.rollback + "%";
  },

  calculate() {
    this.start();

    this.status.calculated = true;

    this.statusScreens();
    this.statusScreensButton();
    this.statusCMS();

    startBtn.style.display = "none";
    resetBtn.style.display = "";
  },

  cleaning() {
    this.reset();

    this.status.calculated = false;

    this.reachStartBtn();
    this.statusScreensButton();
    this.statusCMS();

    resetBtn.style.display = "none";
    startBtn.style.display = "";
  },

  start() {
    this.addScreens();
    this.addServices();
    this.addPercentCMS();
    this.addPrices();
    this.showResult();
  },

  reset() {
    this.delScreens();
    this.delServices();
    this.delCMS();
    this.delRollback();
    this.delPrices();
    this.showResult();
  },

  addScreens() {
    this.screens.length = 0;

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },

  delScreens() {
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      if (index) {
        screen.remove();
      } else {
        select.selectedIndex = 0;
        input.value = "";
      }
    });

    screens.length = 1;
    this.screens.length = 0;
  },

  addServices() {
    const add = (item, typeValue) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      this["services" + typeValue][label.textContent] = check.checked
        ? +input.value
        : 0;
    };

    otherItemsPercent.forEach((item) => add(item, "Percent"));
    otherItemsNumber.forEach((item) => add(item, "Number"));
  },

  delServices() {
    const clear = (item, typeValue) => {
      const check = item.querySelector("input[type=checkbox]");

      check.checked = false;
    };

    otherItemsPercent.forEach((item) => clear(item, "Percent"));
    otherItemsNumber.forEach((item) => clear(item, "Number"));

    this.servicesPercent.length = 0;
    this.servicesNumber.length = 0;
  },

  addPercentCMS() {
    const select = hiddenCmsVariants.querySelector("select");
    const input = hiddenCmsVariants.querySelector("input");

    let value = "0";
    if (cmsOpen.checked) {
      value = select.options[select.selectedIndex].value;
      if (value === "other") {
        value = input.value;
      }
    }

    this.percentCMS = +value;
  },

  addPrices() {
    this.screenPrice = this.screens.reduce(
      (sum, screen) => sum + screen.price,
      0
    );
    this.screenCount = this.screens.reduce(
      (quantity, screen) => quantity + screen.count,
      0
    );

    this.servicePricesPercent = 0;
    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        (this.screenPrice * this.servicesPercent[key]) / 100;
    }

    this.servicePricesNumber = 0;
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    this.fullPrice =
      this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePriceCMS = Math.round((this.fullPrice * this.percentCMS) / 100);
    this.fullPrice += this.servicePriceCMS;

    this.servicePercentPrice = Math.ceil(
      (this.fullPrice * (100 - this.rollback)) / 100
    );
  },

  delPrices() {
    this.screenPrice = 0;
    this.screenCount = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.servicePriceCMS = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
  },

  showResult() {
    total.value = this.screenPrice;
    totalCount.value = this.screenCount;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
};

appData.init();
