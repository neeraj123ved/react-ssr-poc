import 'babel-polyfill';
import express from "express";
import { matchRoutes } from "react-router-config";
import Routes from './client/Routes';
import render from './helpers/render';
import createStore from './helpers/createStore';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {

  const store = createStore();
  console.log("req", req.query);
  const promises = matchRoutes(Routes, req.path).map(({route}) => {
    console.log("req", route);
    return route.loadData? route.loadData(store): null;
  });

  Promise.all(promises).then(() => {
    res.send(render(req, store));
  });
});

app.listen(3000, () => {
 console.log('listening on port 3000');
});