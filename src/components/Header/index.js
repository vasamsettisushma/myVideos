import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {HiMoon} from 'react-icons/hi'
import {BsSun} from 'react-icons/bs'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'
import './index.css'
import NextWatchContext from '../../context/NextWatchContext'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  render() {
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {updateIsDarkMode, isDarkMode} = value
          return (
            <div className="headerCon d-flex justify-content-center">
              <div className="mainHeaderCon d-flex justify-content-between align-items-center">
                <div className="logoCon">
                  <Link to="/">
                    <img
                      src={
                        isDarkMode
                          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      }
                      alt="website logo"
                      className="websiteLogoInHeader"
                    />
                  </Link>
                </div>
                <div className="d-flex align-self-center">
                  <button
                    type="button"
                    className="buttonRoute  mr-3 mb-0"
                    data-testid="theme"
                    onClick={updateIsDarkMode}
                  >
                    {isDarkMode ? (
                      <BsSun className="h3 text-warning" />
                    ) : (
                      <HiMoon className="h3" />
                    )}
                  </button>
                  <div className=" mr-3">
                    <button type="button" className="buttonRoute">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                        alt="profile"
                        className="profile"
                      />
                    </button>
                  </div>

                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        className="btn btn-outline-info btn-sm"
                      >
                        Logout
                      </button>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <div className="">
                        <div className="">
                          <p className="h4 text-center">
                            Are you sure, you want to logout?
                          </p>
                          <div className="d-flex justify-content-around mt-5">
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={close}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={this.onClickLogout}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }
}

export default withRouter(Header)
