import React from "react";
import NewsList,{loadData} from '../client/pages/NewsListPage';

export default [
  {
    ...NewsList,
    path: '/news/:id',
  },
  {
    ...NewsList,
    path: '/',
  }
];
