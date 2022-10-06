import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country : 'in',
    pagesize: 6,
    category : 'general'
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1,
      totalResults:0

    }
    document.title= `${this.props.category}-News Monkey`;
  }

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db39215b4ee541a7be08ad7f4665189d&page=1&pagesize=${this.props.pagesize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }
 
  // previousclick = async ()=> {
  //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db39215b4ee541a7be08ad7f4665189d&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
  //   this.setState({loading: true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     articles: parsedData.articles,
  //     page: this.state.page - 1,
  //     loading : false
  //   })
  // }

  // nextclick = async () => {
  //   let url =
  //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db39215b4ee541a7be08ad7f4665189d&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
  //   this.setState({loading: true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     articles: parsedData.articles,
  //     page: this.state.page + 1,
  //     loading : false
  //   })
  // }

  fetchMoreData = async() => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    this.setState({page: this.state.page+1})
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db39215b4ee541a7be08ad7f4665189d&page=1&pagesize=${this.props.pagesize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })
  };

  render() {
    return (
      <>
        <div className="bi bi-emoji-smile">
        <h2 className="text-center" > Top {this.props.category} Headlines By Reporter Mrinal </h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          { this.state.articles.map((element)=> {
              return <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between ">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" 
            onClick={this.previousclick}>&larr; Previous</button>
          <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pagesize)} type="button"
           className="btn btn-dark" onClick={this.nextclick}>Next &rarr;</button>
        </div> */}
       </div>
      </>
    )
  }
}

export default News;
