// import express from 'express';
// import jwt from 'jsonwebtoken';
// var router = express.Router();
// router.use((request, response, next) => {
//     console.log('middleware');
//     var token = request.headers['x-access-token'];
//     console.log(token);
//     if (token) {
//         jwt.verify(token, global.config.secretKey,
//             {
//                 algorithm: global.config.algorithm
//             }, function (err, decoded) {
//                 if (err) {
//                     let errordata = {
//                         message: err.message,
//                         expiredAt: err.expiredAt
//                     };
//                     console.log(errordata);
//                     return response.status(401).json({
//                         message: 'Unauthorized Access'
//                     });
//                 }
//                // request.decoded = decoded;
//                 console.log(decoded);
//                 next();
//             });
//     } else {
//         return response.status(403).json({
//             message: 'Forbidden Access'
//         });
//     }
//     //next();
// });
// module.exports = router; 
//# sourceMappingURL=verifytoken.js.map