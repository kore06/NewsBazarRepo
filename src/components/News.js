import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      pageSize: 9,
      loading: false,
      totalResults: 0,
    };
    document.title = `NewsBazar-${this.capatilizeFirst(this.props.category)}`;
  }
  capatilizeFirst(str) {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  }
/*
  handleNextClick = async () => {
    let urll = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=5de37454e75c4fdf97e93d947b27c1e1&page=${
      this.state.page + 1
    }&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(urll);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData,
    });
  };
*/
/*
  handlePrevClick = async () => {
    let urll = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=5de37454e75c4fdf97e93d947b27c1e1&page=${
      this.state.page - 1
    }&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(urll);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
      totalResults: parsedData,
    });
  }; 
*/
  async componentDidMount() {
    this.props.setProgress(10);
    let urll = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(urll);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData,
    });
    this.props.setProgress(100);
  }
  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    let urll = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.state.pageSize}`;
    let data = await fetch(urll);
    let parsedData = await data.json();
    this.setState({ articles: this.state.articles.concat(parsedData.articles),
                    loading: false,
                    totalResults: parsedData
                  });
  }
  render() {
    return (
      <>
        <h2
          style={{ textAlign: "center", marginTop: 60, fontFamily: "cursive" }}
        >
          <b>NewsBazar - Top Headlines</b>
        </h2>
        <div className="container my-3">
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.totalResults}
            loader={<Spinner />}
          >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 60) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imgUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://media.zenfs.com/en/reuters-finance.com/3ca71dda20263daa6b2378d36b3fed30"
                      }
                      url={element.url}
                      author={element.author}
                      publishedTime={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
            </div>
          </InfiniteScroll>
          {/*<div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
              disabled={this.state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
              disabled={this.state.page + 1 > 8}
            >
              Next &rarr;
            </button>
            </div> */}
        </div>
      </>
    );
  }
}
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};
export default News;
