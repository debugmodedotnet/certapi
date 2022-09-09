"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
class Books {
    getBooks() {
        return Books.books;
    }
    addBook(book) {
        let plength = Books.books.length;
        let nlength = Books.books.push(book);
        if (nlength > plength) {
            return true;
        }
        else {
            return false;
        }
    }
    getBookDetails(Id) {
        let data = Books.books.findIndex(c => c.Id == Id);
        if (data != -1) {
            return Books.books[data];
        }
        else {
            return null;
        }
    }
}
exports.Books = Books;
Books.books = [
    {
        Id: "1",
        Title: "Angular Essentials",
        Price: 200,
        inStock: true
    },
    {
        Id: "2",
        Title: "JavaScript",
        Price: 100,
        inStock: true
    },
    {
        Id: "3",
        Title: "Silverlight",
        Price: 300,
        inStock: false
    },
    {
        Id: "4",
        Title: "Java",
        Price: 200,
        inStock: false
    },
    {
        Id: "5",
        Title: "WCF",
        Price: 500,
        inStock: false
    },
];
//# sourceMappingURL=books.js.map