import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, url, author, publishedTime } = this.props;
    let date = new Date(publishedTime);
    return (
      <div className="my-3">
        <div className="card" style={{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
          <img className="card-img-top" src={imgUrl} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a
              href={url}
              rel="noreferrer"
              target="_blank"
              className="btn btn-info"
            >
              More Info
            </a>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              By {author ? author : "Unknown"} on {date.toUTCString()}{" "}
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
