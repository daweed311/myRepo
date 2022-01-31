"use strict";

const rollback = 99;

const title = prompt("Как называется ваш проект?");

const screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);

const screenPrice = +prompt("Сколько будет стоить данная работа?", 12000);

const adaptive = confirm("Нужен ли адаптив на сайте?");

const service1 = prompt("Какой дополнительный тип услуги нужен?");

const servicePrice1 = +prompt("Сколько это будет стоить?");

const service2 = prompt("Какой дополнительный тип услуги нужен?");

const servicePrice2 = +prompt("Сколько это будет стоить?");

const fullPrice = screenPrice + servicePrice1 + servicePrice2;

const servicePercentPrice = Math.ceil(fullPrice * (rollback / 100));
console.log(servicePercentPrice);

if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice < 15000 && fullPrice > 0) {
  console.log("Скидка не предусмотрена");
} else if (fullPrice <= 0) {
  console.log("Что то пошло не так");
}
