const booksSection = document.querySelector(".books");

const book = document.querySelectorAll(".book");
console.log(book);

const newElement = document.createElement("li");

const poster = document.querySelector(".adv");

book[0].before(book[1]);
book[2].before(book[4]);
book[2].before(book[3]);
book[2].before(book[5]);

document.body.style.backgroundImage = "url(/image/you-dont-know-js.jpg)";

book[4].querySelector("h2").textContent = "Книга 3. this и Прототипы Объектов";

poster.remove();

newElement.textContent = "Глава 8: За пределами ES6";
book[2].querySelector("ul").append(newElement);

const secondBookList = book[0].querySelectorAll("li")

secondBookList[4].before(secondBookList[8])
secondBookList[8].before(secondBookList[6])

const fifthBookList = book[5].querySelectorAll("li")

fifthBookList[3].before(fifthBookList[9])
fifthBookList[6].before(fifthBookList[2])

const sixthBookList = book[2].querySelectorAll("li")

console.log(sixthBookList);
sixthBookList[9].before(sixthBookList[10])
