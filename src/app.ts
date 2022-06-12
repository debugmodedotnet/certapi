import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Certficate } from './certficate';

const app = express();
var router = express.Router();
const certficate = new Certficate();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
});


router.route('/certficate').get((request, response) => {
      response.json(certficate.getCertficate("",""));
  })

  router.route('/certficate').post((request, response) => {
    let user = { ...request.body }
    let userCert = certficate.getCertficate(user.Email,user.Name);
    response.json(userCert);

  })
  



var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);

