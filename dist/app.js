"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const certficate_1 = require("./certficate");
const books_1 = require("./books");
const auth_config_1 = require("./auth.config");
// import {router} from './verifytoken';
const app = (0, express_1.default)();
var router = express_1.default.Router();
const certficate = new certficate_1.Certficate();
const books = new books_1.Books();
const authconfig = new auth_config_1.AuthConfig();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', router);
router.use((request, response, next) => {
    console.log('middleware');
    next();
    // var token = request.headers['x-access-token'];
    // console.log(token);
    // next();
    // if (!request.url.includes('books')) 
    // {
    //   var token = request.headers['x-access-token'];
    //   if (token) {
    //     jwt.verify(token, global.config.secretKey,
    //       {
    //         algorithm: global.config.algorithm
    //       }, function (err, decoded) {
    //         if (err) {
    //           let errordata = {
    //             message: err.message,
    //             expiredAt: err.expiredAt
    //           };
    //           console.log(errordata);
    //           return response.status(401).json({
    //             message: 'Unauthorized Access'
    //           });
    //         }
    //         // request.decoded = decoded;
    //         console.log(decoded);
    //         next();
    //       });
    //   }
    //    else {
    //     return response.status(403).json({
    //       message: 'Forbidden Access'
    //     });
    //   }
    // }
    // else {
    //   next();
    // }
});
router.route('/books').get((request, response) => {
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
    console.log('dhananjay');
    let user = Object.assign({}, request.body);
    let userCert = certficate.getCertficate(user.email);
    response.json(userCert);
});
router.route('/login').post((request, response) => {
    console.log('abc');
    console.log(request);
    let user = Object.assign({}, request.body);
    if (user.Email == "abc@abc.com" && user.Password == "1234") {
        console.log(user);
        let token = jsonwebtoken_1.default.sign(user, authconfig.secretKey, {
            algorithm: authconfig.algorithm,
            expiresIn: '1m'
        });
        response.status(200).json({
            message: 'Login Successful',
            jwtoken: token
        });
    }
    else {
        response.status(401).json({
            message: 'Login Failed'
        });
    }
});
var port = process.env.PORT || 9090;
app.listen(port);
console.log('Order API is runnning at ' + port);
//# sourceMappingURL=app.js.map