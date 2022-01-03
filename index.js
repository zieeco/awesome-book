const bookList = document.querySelector('#book-list');
const AddBtn = document.querySelector('#add-btn');
let books = [];

const displayBooks = (id, title, author) => {
  const li = document.createElement('li');
  li.innerHTML = `
  <h2>${title}</h2>
  <p>${author}</p>
  <hr>`;
  const removeBookBtn = document.createElement('button');
  removeBookBtn.textContent = 'Remove';
  li.insertBefore(removeBookBtn, li.lastElementChild);
  bookList.appendChild(li);
};

const addBook = (title, author) => {
  const bookId = Date.now();
  const bookObj = {
    id: bookId,
    title,
    author,
  };
  if (title === '' || author === '') {
    const errMsg = document.querySelector('.err-msg');
    errMsg.textContent = 'Please fill in all fields';
  } else {
    books.push(bookObj);
    displayBooks(bookObj.bookId, bookObj.title, bookObj.author);
    document.querySelector('.err.msg').textContent = '';
  }
};

books.forEach((book) => {
  displayBooks(book.id, book.title, book.author);
});

document.addEventListener('DOMContentLoaded', () => {
  AddBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    addBook(title, author);
  });
});