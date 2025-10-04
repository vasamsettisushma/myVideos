import {Component} from 'react'
import {IoIosClose} from 'react-icons/io'

import './index.css'
import AllVideosList from '../AllVideosList'
import Container from './StyledComponent'

class AllVideos extends Component {
  state = {showBanner: true}

  onClickClose = () => {
    this.setState({showBanner: false})
  }

  renderBanner = () => (
    <Container
      className="card d-flex flex-column align-items-start p-2 homeBanner pl-3 "
      data-testid="banner"
      bgImage="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
    >
      <div className="mb-3 mt-2 d-flex justify-content-between w-100">
        <img
          className=" websiteLogoInHeader "
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <button
          className="buttonRoute"
          type="button"
          data-testid="close"
          onClick={this.onClickClose}
        >
          <IoIosClose className="h4 text-dark" />
        </button>
      </div>

      <p className="card-text mb-3 text-dark">
        Buy Nxt Watch Premium Prepaid Plans With UPI
      </p>
      <button className="btn btn-outline-success btn-sm mb-2" type="button">
        GET IT NOW
      </button>
    </Container>
  )

  renderVideos = () => {
    console.log()
    return (
      <div className="videosParentCon d-flex flex-column">
        <AllVideosList />
      </div>
    )
  }

  render() {
    const {showBanner} = this.state

    return (
      <div className="pl-2 col-10 overflow-auto allVideosCon">
        {showBanner && this.renderBanner()}
        {this.renderVideos()}
      </div>
    )
  }
}

export default AllVideos
