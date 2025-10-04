import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {IoLogoGameControllerB} from 'react-icons/io'
import {Link} from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'

import Slider from '../Slider'
import {Container} from '../../StyledComponent'
import NextWatchContext from '../../context/NextWatchContext'

const apiStatusConstants = {
  success: 'success',
  fail: 'fail',
  load: 'load',
}

class Gaming extends Component {
  state = {GameDetailsApiStatus: 'initial', gamesList: []}

  componentDidMount = () => {
    this.getGameDetails()
  }

  getGameDetails = async () => {
    this.setState({GameDetailsApiStatus: apiStatusConstants.load})
    try {
      const response = await fetch(
        'https://vasamsettisushma.github.io/myCompleteInformation/main/information.json',
      )
      const data = await response.json()
      const list = data.videos || []
      const receivedList = list.map(obj => ({
        id: obj.id,
        title: obj.title,
        thumbnailUrl: obj.thumbnail_url,
        viewsCount: obj.view_count,
      }))
      this.setState({
        gamesList: receivedList,
        GameDetailsApiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({GameDetailsApiStatus: apiStatusConstants.fail})
    }
  }

  renderLoadingView = () => (
    <div className=" d-flex align-items-center justify-content-center w-100 ">
      <div className="loader-container mt-5" data-testid="loader">
        <Loader type="ThreeDots" color="cyan" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = isDarkMode => (
    <div className="d-flex justify-content-center align-items-center text-center w-100">
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
          onClick={() => this.getGameDetails()}
        >
          Retry
        </button>
      </div>
    </div>
  )

  gameCard = obj => {
    const {thumbnailUrl, viewsCount, id} = obj
    return (
      <Link to={`/videos/${id}`} className="link">
        <div className="card p-2 m-2 cardGame text-dark">
          <div className="">
            <img src={thumbnailUrl} alt="" className=" w-100" />
          </div>
          <div className="mt-3">
            <p>{`${viewsCount} Watching Worldwide`}</p>
          </div>
        </div>
      </Link>
    )
  }

  renderGames = () => {
    const {gamesList} = this.state
    return (
      <div className="trendingParentCon d-flex flex-column w-100 overflow-auto">
        <div
          className="banner w-100 d-flex align-items-center p-3"
          data-testid="banner"
        >
          <div className="d-flex justify-content-center align-items-center trendingIcon rounded-circle">
            <IoLogoGameControllerB className="mb-0 h5 firelogo" />
          </div>
          <h1 className="h4 font-wight-bold ml-3 mb-0 text-dark">Gaming</h1>
        </div>

        <ul className="list-unstyled d-flex flex-wrap flex-row p-2">
          {gamesList.map(obj => (
            <li key={obj.id} className="col-3">
              {this.gameCard(obj)}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  decideWhatToSHow = isDarkMode => {
    const {GameDetailsApiStatus} = this.state

    switch (GameDetailsApiStatus) {
      case apiStatusConstants.success:
        return this.renderGames()
      case apiStatusConstants.fail:
        return this.renderFailureView(isDarkMode)
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
              bgColor={isDarkMode ? ' #0f0f0f' : '#f9f9f9'}
              data-testid="gaming"
            >
              <Header />
              <div className="d-flex HomeBottomSectionCon">
                <Slider />
                {this.decideWhatToSHow(isDarkMode)}
              </div>
            </Container>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }
}

export default Gaming
