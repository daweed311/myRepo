const allBooks = document.querySelector(".books");

const book = document.querySelectorAll(".book");
console.log(book);

const book2 = book[0];
const book3 = book[4];
const book5 = book[5];
const book6 = book[2];

const newElement = document.createElement("li");

const bookList = document.querySelectorAll("li");
console.log(bookList);

const bodyElement = document.querySelector("body");

const poster = document.querySelectorAll(".adv");

book[0].before(book[1]);
book[2].before(book[4]);
book[2].before(book[3]);
book[2].before(book[5]);

bodyElement.style.backgroundImage = "url(/image/you-dont-know-js.jpg)";

book3.querySelector("h2").textContent = "Книга 3. this и Прототипы Объектов";

poster[0].remove();

bookList[4].before(bookList[6]);
bookList[4].before(bookList[8]);

bookList[48].before(bookList[55]);
bookList[52].before(bookList[48]);

newElement.textContent = "Глава 8: За пределами ES6";
book6.querySelector("ul").append(newElement);
