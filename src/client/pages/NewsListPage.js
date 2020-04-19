import React, { Component } from "react";
import { connect } from "react-redux";
import {fetchNews} from '../actions';
import axios from 'axios';
import timeAgo from "node-time-ago";
import { withRouter } from 'react-router-dom';
import localStorage from 'localStorage';

const styles = {
    newslist: {
      margin: '0 auto',
      maxWidth: '85%',
      padding: '20px',
    },
    header: {
      backgroundColor: '#FF6600',
      color: '#fff',
      padding: '5px'
    },
    newsItemEven: {
      padding: '10px 30px',
      backgroundColor:'#f6f6ef'
    },
    newsItemOdd: {
      padding: '10px 30px',
      backgroundColor:'#f6f6ef'
    },
    newsPosition: {
      color: '#828282'
    },
    newsListSmall: {
      color: '#828282'
    },
    moreButton: {
      color: '#FF6600',
      backgroundColor: 'transparent',
      border: '0'
    }
}

class NewsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      upVotes: true,
      pageNumber: props.match.params.id ? parseInt(props.match.params.id): 1
    }
  }

  componentDidMount() {
    this.props.fetchNews(this.state.pageNumber);
  }

  handleUpvotes(id){
    this.setState({
      upVotes: !this.state.upVotes
    });
    localStorage.setItem(`Upvotes-${id}`, JSON.stringify(id));
  }

  handleHide(id){
    this.setState({
      hide: !this.state.hide
    });
    localStorage.setItem(`hide-${id}`, JSON.stringify(id));
  }

  renderNews(){
    const {news} = this.props;
    const dataJson = news ? news.hits : [{}];
    return dataJson.map((obj, index) => {
      return (
        !localStorage.getItem(`hide-${obj.objectID}`) ?
        <div key={index} style={parseInt(index) % 2 === 0 ? styles.newsItemEven : styles.newsItemOdd}>
          <span>{obj.num_comments ? obj.num_comments : 0}.</span>
          {localStorage.getItem(`Upvotes-${obj.objectID}`) ? <span style={styles.newsPosition}> ▲</span>: null} {obj.title ? obj.title : "No Available"}
          <small>(by {obj.author})</small>
          <small style={styles.newsListSmall}>
             {!localStorage.getItem(`Upvotes-${obj.objectID}`) ? <span onClick={() => this.handleUpvotes(obj.objectID)}>upvotes  |</span>: null}  <span onClick={() => this.handleHide(obj.objectID)}>hide</span> | {timeAgo(obj.created_at)}
          </small>
        </div>: null)
    })
  }

  handlePagination() {
    window.location.href = `/news/${this.state.pageNumber+1}`;
  }

  render() {
    return (
      <div style={styles.newslist}>
        <div style={styles.header}>
          <div className="header-title">
            <strong>New</strong>
          </div>
        </div>
        {this.renderNews()}
        <button style={styles.moreButton} onClick={() => this.handlePagination()}>More</button>
      </div>
    )
  }

}

function mapStateToProps(state){
  return {news: state.news};
}

function loadData(store) {
  return store.dispatch(fetchNews(1))
}


export default {
  loadData,
  component: withRouter(connect(mapStateToProps, { fetchNews })(NewsList))
}