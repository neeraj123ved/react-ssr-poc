import React from 'react';
import {renderToString} from "react-dom/server";
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { renderRoutes } from "react-router-config";
import Routes from '../client/Routes';

export default (req, store) => {
  const content = renderToString(
      <Provider store={store}><StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter></Provider>
    );

  return `<html>
      <head>
      <link href='https://d3nb9u6x572n0.cloudfront.net/assets/favicon-f54903568e0e9777f2e4db164b19e76ac961d1c283d9dbbff6cc8276188e5179.ico' rel='shortcut icon'>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>News</title>
      <style>body {margin: 0 }</style>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.INITIAL_STATE = ${JSON.stringify(store.getState())}</script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}