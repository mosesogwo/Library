/* eslint-env browser */

const books = [];
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = false;
  }

  changeStatus() {
    this.status = !this.status;
  }

  addBookToBooks() {
    books.push(this);
  }

  bookStatus() {
    if (this.status === true) {
      return 'Read';
    }
    return 'Unread';
  }
}

const tableRows = document.querySelector('.table-rows');
function render() {
  tableRows.innerHTML = '';
  books.forEach((book, idx) => {
    const row = `<tr class="book-row" data-idx=${idx}>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td><button class="btn btn-success status-toggle">${book.bookStatus()}</button></td>
      <td><button class="btn btn-danger del-book">Remove</button></td>
    </tr>`;
    tableRows.insertAdjacentHTML('beforeend', row);
  });
}

function showMessage(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const messageContainer = document.querySelector('.container');
  const form = document.querySelector('.new-form');
  messageContainer.insertBefore(div, form);
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

const newBtn = document.querySelector('.new-btn');
const newForm = document.querySelector('.new-form');
newBtn.addEventListener('click', () => {
  newForm.classList.toggle('hidden');
});

newForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = newForm.querySelector('#title');
  const author = newForm.querySelector('#author');
  const pages = newForm.querySelector('#pages');

  if (title.value === '' || author.value === '' || pages.value === '') {
    showMessage('Please fill all fields', 'danger');
  } else {
    const book = new Book(title.value, author.value, pages.value);
    book.addBookToBooks();
    title.value = '';
    author.value = '';
    pages.value = '';
    newForm.classList.add('hidden');
    showMessage('Book added successfully', 'success');
    render();
  }
});

tableRows.addEventListener('click', (event) => {
  if (event.target.classList.contains('status-toggle')) {
    const { idx } = event.target.parentElement.parentElement.dataset;
    books[idx].changeStatus();
    render();
  }

  if (event.target.classList.contains('del-book')) {
    const { idx } = event.target.parentElement.parentElement.dataset;
    books.splice(idx, 1);
    render();
  }
});
