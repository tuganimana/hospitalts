import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";


createConnection().then(async connection => {

    // create express app
    const app = express();
    var cookieParser = require('cookie-parser')
    var logger =require('morgan')
    var path = require('path');
    var bodyParser = require('body-parser')
    app.use(bodyParser.json());
    app.use(cookieParser())
    var createError = require('http-errors');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(function(req, res,err, next) {
//   next(createError(404));
// });
// cors headers
// app.use((req:any,res:any)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization')
//    if(req.method ==='OPTIONS'){
//      res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE','GET')
//     return res.status(200).json({})
//    }
//   })

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

   
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));

