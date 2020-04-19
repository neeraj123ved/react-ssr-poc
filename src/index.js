import 'babel-polyfill';
import express from "express";
import { matchRoutes } from "react-router-config";
import Routes from './client/Routes';
import render from './helpers/render';
import createStore from './helpers/createStore';

const app = express();

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

const port = app.get('port');

app.get('*', (req, res) => {

  const store = createStore();
  const pageId = req.url.match('/news') ? parseInt(req.url.split("/")[2]): 1;
  const promises = matchRoutes(Routes, req.path).map(({route}) => {
    return route.loadData? route.loadData(store, pageId): null;
  });

  Promise.all(promises).then(() => {
    res.send(render(req, store));
  }).catch((err) => {
    console.log(err);
  })
});

app.listen(port, () => {
 console.log('listening on port', port);
});