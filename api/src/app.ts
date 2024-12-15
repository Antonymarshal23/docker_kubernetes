const express = require('express'); 
import * as bodyParser from 'body-parser';
import { useContainer as classValidatorUseContainer} from "class-validator";
import { useContainer as routingUseContainer, useExpressServer } from "routing-controllers";
import { Container } from 'typedi';
import { TestController } from './api/controllers/TestController';
import "reflect-metadata"

routingUseContainer(Container)
classValidatorUseContainer(Container)
  
const app = express();
    app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));
    const expressApp = useExpressServer(app, {
    //   cors: true,
    //   classTransformer: true,
      routePrefix: '/api',
    //   defaultErrorHandler: false,
    
      controllers: [TestController,],
    });
    expressApp.listen(5000, () => {
        console.log(`Example app listening on port ${5000}`)
      })

