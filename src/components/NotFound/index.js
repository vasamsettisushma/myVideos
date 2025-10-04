import './index.css'
import NextWatchContext from '../../context/NextWatchContext'

const NotFound = () => (
  <NextWatchContext.Consumer>
    {value => {
      const {isDarkMode} = value
      return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="text-center">
            <div className="">
              <img
                src={
                  isDarkMode
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                }
                alt="not found"
                className="notFound"
              />
            </div>
            <h1 className="h4 mt-3">Page Not Found</h1>
            <p>we are sorry, the page you requested could not be found.</p>
          </div>
        </div>
      )
    }}
  </NextWatchContext.Consumer>
)

export default NotFound
