import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Certficate } from './certficate';
import { Books } from './books';

const app = express();
var router = express.Router();
const certficate = new Certficate();
const books = new Books();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
});


router.route('/books').get((request, response) => {
      console.log("hey poonam");
      response.json(books.getBooks());
  })

  router.route('/books').post((request, response) => {
    let book = { ...request.body }
    console.log(book);
    let bookadded  = books.addBook(book);
    response.json(bookadded);

  })

  router.route('/books/:id').get((request, response) => {
    let id = request.params.id;
    console.log(id);
    let bookadded  = books.getBookDetails(id);
    response.json(bookadded);

  })

  router.route('/certficate').post((request, response) => {
    let user = { ...request.body }
    let userCert = certficate.getCertficate(user.Email);
    response.json(userCert);

  })



  



var port = process.env.PORT || 9090;
app.listen(port);
console.log('Order API is runnning at ' + port);

