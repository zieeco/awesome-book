const bookList = document.querySelector('#book-list');
const addBtn = document.querySelector('#add-btn');
let books = JSON.parse(localStorage.getItem('books'));

class Book {
  constructor (id, title, author) {
    this.id = id
    this.title = title
    this.author = author
  }

  addBook(){
    const {id, title, author} = this
    const bookObj = {id, title, author}
    books = JSON.parse(localStorage.getItem('books'));
    if (title === '' || author === '') {
    printErrorMsg('Please fill in all the fields');
  } else if (books !== null) {
    books.push(bookObj)
    localStorage.setItem('books', JSON.stringify(books));
    books = JSON.parse(localStorage.getItem('books'));
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }else {
    books = []
    books.push(bookObj)
    localStorage.setItem('books', JSON.stringify(books));
    books = JSON.parse(localStorage.getItem('books'));
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
  }
  removeBook(){
    const {id} = this
    books = books.filter((book) => {
      if (book.id !== id) {
        return true;
      }
      return false;
    });
  }
}

const displayBooks = (id, title, author) => {
  const li = document.createElement('li');
  const br = document.createElement('br');
  li.innerHTML = `
  <h3>${title}</h3>
  <h3>${author}</h3>
  <br>
  <hr>`;
  const removeBookBtn = document.createElement('button');
  removeBookBtn.textContent = 'Remove';
  li.insertBefore(removeBookBtn, li.lastElementChild);
  li.appendChild(br);
  bookList.appendChild(li);
  removeBookBtn.addEventListener('click', () => {
    id = removeBookBtn.id
    const book = new Book (id, title, author)
    book.removeBook()
    localStorage.setItem('books', JSON.stringify(books));
    li.remove();
  });
};

const printErrorMsg = (message) => {
  document.querySelector('.err-msg').innerHTML = message;
  setTimeout(() => {
    document.querySelector('.err-msg').innerHTML = '';
  }, 2000);
};

document.addEventListener('DOMContentLoaded', () => {
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const id = Date.now()
    const newBook = new Book (id, title, author)
    newBook.addBook()
    if (title && author) {
      displayBooks(book.id, book.title, book.author)
    }
  });
});

if (books !== null) {
  books.forEach((book) => {
    displayBooks(book.id, book.title, book.author);
  });
}