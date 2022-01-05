const addBtn = document.querySelector('#add-btn');
let books = JSON.parse(localStorage.getItem('books'));

const printErrorMsg = (message) => {
  const errMsg = document.querySelector('.err-msg');
  errMsg.style.color = 'red';
  document.querySelector('.err-msg').textContent = message;
  setTimeout(() => {
    document.querySelector('.err-msg').textContent = '';
  }, 2000);
};

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addBook() {
    const { id, title, author } = this;
    const bookObj = { id, title, author };
    books = JSON.parse(localStorage.getItem('books'));
    if (title === '' || author === '') {
      printErrorMsg('Please fill in all the fields');
    } else if (books !== null) {
      books.push(bookObj);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
    } else {
      books = [];
      books.push(bookObj);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
    }
  }

  removeBook() {
    const { id } = this;
    books = books.filter((book) => {
      if (book.id !== id) {
        return true;
      }
      return false;
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

const displayBook = (id, title, author) => {
  const bookList = document.querySelector('#book-list');
  bookList.classList.add('border');
  const li = document.createElement('li');
  li.innerHTML = `<div class="d-flex-only">
  <h2><q>${title}</q></h2>
  <span>by</span>
  <h2>${author}</h2>
  </div>`;
  const removeBookBtn = document.createElement('button');
  removeBookBtn.textContent = 'Remove';
  li.appendChild(removeBookBtn);
  bookList.appendChild(li);
  removeBookBtn.addEventListener('click', () => {
    const book = new Book(id, title, author);
    id = removeBookBtn.id;
    book.removeBook();
    if (li.previousElementSibling === null && li.nextElementSibling === null) {
      bookList.classList.remove('border');
      li.remove();
    } else {
      li.remove();
    }
  });
};

if (books !== null) {
  books.forEach((book) => {
    displayBook(book.id, book.title, book.author);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const toTitleCase = (str) => str.toLowerCase().split(' ').map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
    const id = Date.now();
    const book = new Book(id, toTitleCase(title), toTitleCase(author));
    book.addBook();
    if (title && author) {
      displayBook(book.id, book.title, book.author);
    }
  });
});

const seeListsOfBooks = document.getElementById('list-of-books');
const addNewBook = document.getElementById('add-new-link');
const contactLink = document.getElementById('contact-link');

seeListsOfBooks.addEventListener('click', () => {
  seeListsOfBooks.classList.add('active');
  addNewBook.classList.remove('active');
  contactLink.classList.remove('active');
  document.getElementById('awesome-books').classList.remove('hide');
  document.getElementById('add-book').classList.add('hide');
  document.getElementById('contact-us').classList.add('hide');
});

addNewBook.addEventListener('click', () => {
  seeListsOfBooks.classList.remove('active');
  addNewBook.classList.add('active');
  contactLink.classList.remove('active');
  document.getElementById('add-book').classList.remove('hide');
  document.getElementById('awesome-books').classList.add('hide');
});

contactLink.addEventListener('click', () => {
  seeListsOfBooks.classList.remove('active');
  addNewBook.classList.remove('active');
  contactLink.classList.add('active');
});
