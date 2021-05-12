import express, { Request, Response } from "express";
import axios from 'axios';
import { get } from "http";

//local
const registry: { [key: string]: any } = require("./registry.json");
const routes = express.Router();

// this is probably where you can put in entry to service registry. 
routes.all("/:apiName", (req: Request, res: Response) => {
  if (!registry.services[req.params.apiName]) {
    res.send("API Name does not exist");
  }
  const url = registry.services[req.params.apiName].url
  const methodType: any = req.method
  axios({
    method: methodType,
    url,
    headers: req.headers,
    data: req.body
  }).then(response => res.send(response.data))
});

routes.all("/:apiName/:path", (req: Request, res: Response) => {
  if (!registry.services[req.params.apiName]) {
    res.send("API Name does not exist");
  }
  const url = registry.services[req.params.apiName].url + '/' + req.params.path
  const methodType: any = req.method
  axios({
    method: methodType,
    url,
    headers: req.headers,
    data: req.body
  }).then(response => {
    const url = `https://hooks.slack.com/services/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`
    axios({
      method: 'POST',
      url,
      headers: req.body,
      data: response
    })
    // res.send(response.data)
  })
});
export default routes

//need an endpoint
// need a database
// need a service 

// amqp, it's still just a queue, needs something to turn it into messages and create an endpoint. 

// do not connect your rabbitmq directly from apiGateway

// right a lamda authorization service that can be found in the apigateway
// it can be held inside the apigateway. the abstraction layer is all done here.

// all client messages needs to communicate w/ the apigateway. The apigateway messages all services

// all ms that need to communicated w/ each other, is done through msbus. 

//grpc protocal
//http protocal
//amqp protocal 

//take data and send it back

//event sourcing pattern 
//topic based exchange
// event stream

//microservice patterns, domain driven design, event sourcing, 

// orchastration services -= just get data from services