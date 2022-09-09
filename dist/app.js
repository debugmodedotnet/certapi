"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const certficate_1 = require("./certficate");
const books_1 = require("./books");
const app = (0, express_1.default)();
var router = express_1.default.Router();
const certficate = new certficate_1.Certficate();
const books = new books_1.Books();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', router);
router.use((request, response, next) => {
    console.log('middleware');
    next();
});
router.route('/books').get((request, response) => {
    console.log("hey poonam");
    response.json(books.getBooks());
});
router.route('/books').post((request, response) => {
    let book = Object.assign({}, request.body);
    console.log(book);
    let bookadded = books.addBook(book);
    response.json(bookadded);
});
router.route('/books/:id').get((request, response) => {
    let id = request.params.id;
    console.log(id);
    let bookadded = books.getBookDetails(id);
    response.json(bookadded);
});
router.route('/certficate').post((request, response) => {
    let user = Object.assign({}, request.body);
    let userCert = certficate.getCertficate(user.Email);
    response.json(userCert);
});
var port = process.env.PORT || 9090;
app.listen(port);
console.log('Order API is runnning at ' + port);
//# sourceMappingURL=app.js.map