
let books = [];
class Book{
    constructor(title, author, pages){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = false;
    }

    changeStatus(){
        this.status = !this.status;
    }

    addBookToBooks() {
      books.push(this);
    }

    bookStatus() {
      if(this.status === true) {
        return 'Read'
      } else {
        return 'Unread'
      }
    }
}

// Toggle new book form
const newBtn = document.querySelector('.new-btn');
const newForm = document.querySelector('.new-form');
newBtn.addEventListener('click', () => {
  newForm.classList.toggle('hidden');
});

// Create book from form
// const submitBtn = newForm.querySelector('.submit');
newForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let title = newForm.querySelector('#title');
  let author = newForm.querySelector('#author');
  let pages = newForm.querySelector('#pages');

  let book = new Book(title.value, author.value, pages.value);
  book.addBookToBooks();

  title.value = '';
  author.value = '';
  pages.value = '';
  newForm.classList.add('hidden')
  render(books);
});

// Render books
const tableRows = document.querySelector('.table-rows')
function render(books) {
  tableRows.innerHTML = '';
  books.forEach((book) => {
    let row =
    `<tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td><button class="btn btn-success">${book.bookStatus()}</button></td>
      <td><button class="btn btn-danger">Remove</button></td>
    </tr>`;
    tableRows.insertAdjacentHTML('beforeend', row);
  });
  
}
