import {Component} from 'react'
import './index.css'
import Header from '../Header'
import Slider from '../Slider'
import AllVideos from '../AllVideos'
import {Container} from '../../StyledComponent'
import NextWatchContext from '../../context/NextWatchContext'

class Home extends Component {
  render() {
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <Container
              className="vh-100 d-flex flex-column overflow-auto"
              data-testid="home"
              bgColor={isDarkMode ? '#181818' : '#f9f9f9'}
            >
              <Header />
              <div className="d-flex HomeBottomSectionCon">
                <Slider />
                <AllVideos />
              </div>
            </Container>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }
}

export default Home
