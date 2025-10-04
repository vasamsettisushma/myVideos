import {AiFillFire} from 'react-icons/ai'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

import Slider from '../Slider'
import TrendingVideoItem from '../TrendingVideoItem'
import {Container} from '../../StyledComponent'
import NextWatchContext from '../../context/NextWatchContext'

const apiStatusConstants = {
  success: 'success',
  fail: 'fail',
  load: 'load',
}
class Trending extends Component {
  state = {trendingVideosList: [], trendingApiStatus: 'initial'}

  componentDidMount = () => {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({trendingApiStatus: apiStatusConstants.load})
    try {
      const response = await fetch(
        'https://vasamsettisushma.github.io/myCompleteInformation/main/information.json',
      )
      const data = await response.json()
      const list = data.videos || []
      const receivedList = list.map(obj => ({
        channel: obj.channel,
        id: obj.id,
        title: obj.title,
        publishedAt: obj.published_at,
        thumbnailUrl: obj.thumbnail_url,
        viewsCount: obj.view_count,
      }))
      this.setState({
        trendingVideosList: receivedList,
        trendingApiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({trendingApiStatus: apiStatusConstants.fail})
    }
  }

  renderTrendingVideos = () => {
    const {trendingVideosList} = this.state

    return (
      <div className="trendingParentCon d-flex flex-column w-100 overflow-auto">
        <div
          className="banner w-100 d-flex align-items-center p-3"
          data-testid="banner"
        >
          <div className="d-flex justify-content-center align-items-center trendingIcon rounded-circle">
            <AiFillFire className="mb-0 h5 firelogo" />
          </div>
          <h1 className="h4 font-wight-bold ml-3 mb-0 text-dark">Trending</h1>
        </div>
        <ul className="list-unstyled">
          {trendingVideosList.map(obj => (
            <li key={obj.id} className="m-2">
              <TrendingVideoItem videoDetails={obj} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className=" d-flex align-items-center justify-content-center w-100 ">
      <div className="loader-container mt-5" data-testid="loader">
        <Loader type="ThreeDots" color="cyan" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="d-flex justify-content-center align-items-center text-center w-100">
      <div className="">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
          className="failureView"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>
          We are having some troubles to complete your request.Please try again.
        </p>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => this.getTrendingVideos()}
        >
          Retry
        </button>
      </div>
    </div>
  )

  decideWhatToSHow = () => {
    const {trendingApiStatus} = this.state
    switch (trendingApiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos()
      case apiStatusConstants.fail:
        return this.renderFailureView()
      case apiStatusConstants.load:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <Container
              className="vh-100 d-flex flex-column overflow-auto"
              data-testid="trending"
              bgColor={isDarkMode ? '#0f0f0f' : '#f9f9f9'}
            >
              <Header />
              <div className="d-flex HomeBottomSectionCon">
                <Slider />
                {this.decideWhatToSHow()}
              </div>
            </Container>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }
}

export default Trending
