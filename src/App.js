import React from 'react';
import axios from 'axios';
import _ from 'lodash';

const url = 'https://jsonplaceholder.typicode.com/photos'
const limit = 10;

class App extends React.Component{
  
  state={
    loading: true,
    page: 1,
    data: [],
    loadmore: false
  }

  componentDidMount(){
    axios.get(`${url}?_limit=${limit}&_page=1`)
    .then(res => res.data)
    .then(data => this.setState({data, loading: false}))
    .catch(err => console.log('err',err))

    window.addEventListener('scroll', _.throttle(this.handleScroll, 500), { passive: true })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight){
      this.getImages();
    }
  }

  scrollTop = () => {
    window.scrollTo(0,0)
  }

  getImages = () => {
    if(!this.state.loading){
      this.setState({ page: this.state.page + 1, loadmore: true }, 
        ()=> {
          setTimeout(
            axios.get(`${url}?_limit=${limit}&_page=${this.state.page}`)
            .then(res => res.data)
            .then(data => this.setState({data: [ ...this.state.data, ...data ], loading: false, loadmore: false}))
            .catch(err => console.log('err',err))
          ,3000)
        })
    }
  }

  render(){
    return (
      <div className="container my-3">
        <a className="position-fixed scroll-top" onClick={this.scrollTop} href="#!">
          <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-arrow-up-square-fill" fill="currentColor">
            <path fillRule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 8.354a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 6.207V11a.5.5 0 0 1-1 0V6.207L5.354 8.354z"/>
          </svg>
        </a>
        <h4 className="text-center display-4 my-3">React Infinite Scroller</h4>
        {this.state.loading 
        ? <p className="text-center">Loading...</p>
        : <><div className="row">
            {this.state.data.length && this.state.data.map(p => {
              return (
                <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <figure>
                    <img alt="data img"
                      src={p.url}
                      className="img img-fluid"
                      style={{ width: '350px', height: '200px' }} />
                  </figure>
                </div>
              )})
            }
          </div>
          {this.state.loadmore && <h4 className="text-center display-4 my-3 more-images">More images loading...</h4>}</>
        }
      </div>
    )
  }
}

export default App