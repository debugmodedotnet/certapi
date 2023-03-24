import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { Certficate } from './certficate';
import { Books } from './books';
import { AuthConfig } from './auth.config';
// import {router} from './verifytoken';

const app = express();
var router = express.Router();
const certficate = new Certficate();
const books = new Books();
const authconfig = new AuthConfig();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
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
})

router.route('/books').post((request, response) => {
  let book = { ...request.body }
  console.log(book);
  let bookadded = books.addBook(book);
  response.json(bookadded);

})

router.route('/books/:id').get((request, response) => {
  let id = request.params.id;
  console.log(id);
  let bookadded = books.getBookDetails(id);
  response.json(bookadded);

})

router.route('/certficate').post((request, response) => {
  console.log(request);
  let user = { ...request.body }
  let userCert = certficate.getCertficate(user.email);
  response.json(userCert);

})

router.route('/login').post((request, response) => {

  console.log('abc');
  console.log(request);
  let user = { ...request.body }

  if (user.Email == "abc@abc.com" && user.Password == "1234") {
    console.log(user);
    let token = jwt.sign(user, authconfig.secretKey, {
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
})







var port = process.env.PORT || 9090;
app.listen(port);
console.log('Order API is runnning at ' + port);

