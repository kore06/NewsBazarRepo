import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      pageSize: 9,
      loading: false,
    };
  }
  handleNextClick = async () => {
    console.log("next clicked", this.state.page);
    let urll = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5de37454e75c4fdf97e93d947b27c1e1&page=${
      this.state.page + 1
    }&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(urll);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handlePrevClick = async () => {
    let urll = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5de37454e75c4fdf97e93d947b27c1e1&page=${
      this.state.page - 1
    }&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(urll);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };
  async componentDidMount() {
    let urll = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5de37454e75c4fdf97e93d947b27c1e1&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(urll);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, loading: false });
  }
  render() {
    return (
      <>
        <h2 style={{ textAlign: "center", marginTop:20, fontFamily:"cursive"}}><b>NewsBazar - Top Headlines</b></h2>
        {this.state.loading && <Spinner />}
        <div className="container my-3">
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              console.log(element)
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
          <div className="d-flex justify-content-between">
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
          </div>
        </div>
      </>
    );
  }
}
News.propTypes={
  country: PropTypes.string,
  category: PropTypes.string
}
export default News;
