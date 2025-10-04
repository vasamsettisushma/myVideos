import {Component} from 'react'
import './index.css'

class ContactUs extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <p className="h6 mb-3">CONTACT US</p>
        <div className="d-flex contactLogoCon mb-3">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="mr-2"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="mr-2"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="mr-2"
          />
        </div>
        <p className="small">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    )
  }
}

export default ContactUs
