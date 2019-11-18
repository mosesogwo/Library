
let books = [];
class Book{
    constructor(title, author, pages, status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    changeStatus(){
        this.status = !this.status;
    }
}




