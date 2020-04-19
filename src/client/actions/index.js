import axios from 'axios';

export const FETCH_NEWS = 'fetch_news';
export const fetchNews = (page) => async dispatch => {
  const url = `http://hn.algolia.com/api/v1/search_by_date?page=${page}`;
  const res = await axios.get(url);

  dispatch({
    type: FETCH_NEWS,
    payload: res
  })
}

