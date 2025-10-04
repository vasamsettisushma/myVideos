import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GoSearch} from 'react-icons/go'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import AllVideosListItem from '../AllVideosListItem'
import NextWatchContext from '../../context/NextWatchContext'

const apiStatusConstants = {
  success: 'success',
  fail: 'fail',
  load: 'load',
}
let tempSearch = ''
class AllVideosList extends Component {
  state = {videosList: [], videosListApiStatus: 'initial', searchInput: ''}

  componentDidMount = () => {
    this.getVideosList()
  }

  onSearchInputChange = event => {
    tempSearch = event.target.value

    if (event.target.value === '') {
      this.setState({searchInput: ''}, this.getVideosList)
    }
  }

  getVideosList = async () => {
    this.setState({videosListApiStatus: apiStatusConstants.load})
    const {searchInput} = this.state
    try {
      const response = await fetch(
        'https://vasamsettisushma.github.io/myCompleteInformation/main/information.json',
      )
      const data = await response.json()
      let videos = data.videos || []
      // Filter videos by searchInput (case-insensitive)
      if (searchInput) {
        const searchLower = searchInput.toLowerCase()
        videos = videos.filter(v => v.title.toLowerCase().includes(searchLower))
      }
      // Map to expected format
      const receivedList = videos.map(obj => ({
        channel: obj.channel,
        id: obj.id,
        title: obj.title,
        publishedAt: obj.published_at,
        thumbnailUrl: obj.thumbnail_url,
        viewsCount: obj.view_count,
      }))
      this.setState({
        videosList: receivedList,
        videosListApiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({
        videosListApiStatus: apiStatusConstants.fail,
      })
    }
  }

  searchVideo = () => {
    this.setState({searchInput: tempSearch}, this.getVideosList)
  }

  renderSearchInput = () => {
    console.log()
    return (
      <div className="input-group w-25 align-self-end mt-2">
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          onChange={this.onSearchInputChange}
        />
        <div className="input-group-append">
          <button
            type="button"
            className="buttonRoute"
            onClick={this.searchVideo}
            data-testid="searchButton"
          >
            <span
              className="input-group-text bg-white border border-0"
              id="basic-addon1"
            >
              <GoSearch />
            </span>
          </button>
        </div>
      </div>
    )
  }

  renderSuccessView = () => {
    const {videosList} = this.state
    const emptyView = videosList.length === 0
    return (
      <>
        {emptyView ? (
          this.renderNoResultsView()
        ) : (
          <ul className="list-unstyled p-2 d-flex flex-wrap">
            {videosList.map(obj => (
              <li className="col-3 mb-2" key={obj.id}>
                <AllVideosListItem videoItem={obj} />
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  renderLoadingView = () => (
    <div className=" d-flex align-items-center justify-content-center">
      <div className="loader-container mt-5" data-testid="loader">
        <Loader type="ThreeDots" color="cyan" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = isDarkMode => (
    <div className="d-flex justify-content-center align-items-center text-center">
      <div className="">
        <img
          src={
            isDarkMode
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          }
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
          onClick={() => this.getVideosList()}
        >
          Retry
        </button>
      </div>
    </div>
  )

  decideResultUi = isDarkMode => {
    const {videosListApiStatus} = this.state
    switch (videosListApiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.fail:
        return this.renderFailureView(isDarkMode)

      case apiStatusConstants.load:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  renderNoResultsView = () => (
    <div className="text-center mt-2">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        className="failureView"
        alt="no videos"
      />
      <h1>No search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button
        className="btn btn-outline-info"
        type="button"
        onClick={this.getVideosList}
      >
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <>
              {this.renderSearchInput()}

              {this.decideResultUi(isDarkMode)}
            </>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }
}

export default AllVideosList
