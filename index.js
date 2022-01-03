const bookList = document.querySelector('#book-list');
const addBtn = document.querySelector('#add-btn');
let books = [];

const displayBooks = (id, title, author) => {
  const li = document.createElement('li');
  const br = document.createElement('br');
  li.innerHTML = `
  <h2>${title}</h2>
  <h2>${author}</h2>
  <hr>`;
  const removeBookBtn = document.createElement('button');
  removeBookBtn.textContent = 'Remove';
  li.insertBefore(removeBookBtn, li.lastElementChild);
  li.appendChild(br);
  bookList.appendChild(li);
  removeBookBtn.addEventListener('click', () => {
    books = books.filter((book) => {
      if (book.id !== id) {
        return true
      }else {
        return false
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
    li.remove()
  })
};

const printErrorMsg = (message) => {
  document.querySelector('.err-msg').innerHTML = message;
  setTimeout(() => {
    document.querySelector('.err-msg').innerHTML = '';
  }, 2000);
};

const addBook = (title, author) => {
  const id = Date.now();
  const bookObj = { id, title, author };
  if (title === '' || author === '') {
    printErrorMsg('Please fill in all the fields');
  } else {
    books.push(bookObj);
    localStorage.setItem('books', JSON.stringify(books))
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    displayBooks(bookObj.id, bookObj.title, bookObj.author);
  }
};

  const getBookFromStorage = JSON.parse(localStorage.getItem('books'))
  if(getBookFromStorage) {
    books = getBookFromStorage;
  }

books.forEach((book) => {
  displayBooks(book.id, book.title, book.author);
});

document.addEventListener('DOMContentLoaded', () => {
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    addBook(title, author);
  });
});