/* eslint-disable no-lonely-if */
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import {Container} from './StyledComponent'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import NextWatchContext from './context/NextWatchContext'
import Gaming from './components/Gaming'

class App extends Component {
  state = {
    activeRoute: 'HOME',
    savedVideosList: [],
    likedList: [],
    disLikedList: [],
    isDarkMode: false,
  }

  updateIsDarkMode = () => {
    const {isDarkMode} = this.state
    this.setState({isDarkMode: !isDarkMode})
  }

  updateActiveRoute = id => {
    this.setState({activeRoute: id})
  }

  updateSavedList = selVideo => {
    const {savedVideosList} = this.state
    const isExits =
      savedVideosList.filter(obj => obj.id === selVideo.id).length === 0
    if (!isExits) {
      const ind = savedVideosList.findIndex(obj => obj.id === selVideo.id)
      savedVideosList.splice(ind, 1)
      this.setState({savedVideosList})
    } else {
      savedVideosList.push(selVideo)
      this.setState({savedVideosList})
    }
  }

  updateLikedList = videoDetails => {
    const {likedList, disLikedList} = this.state
    const isExitsL =
      likedList.filter(obj => obj.id === videoDetails.id).length !== 0
    const isExitsD =
      disLikedList.filter(obj => obj.id === videoDetails.id).length !== 0
    if (!isExitsL) {
      if (isExitsD) {
        const ind = disLikedList.findIndex(obj => obj.id === videoDetails.id)
        disLikedList.splice(ind, 1)
        likedList.push(videoDetails)
        this.setState({disLikedList, likedList})
      } else {
        likedList.push(videoDetails)
        this.setState({disLikedList, likedList})
      }
    } else {
      const ind = likedList.findIndex(obj => obj.id === videoDetails.id)
      likedList.splice(ind, 1)
      this.setState({likedList})
    }
  }

  updateDislikedList = videoDetails => {
    const {likedList, disLikedList} = this.state
    const isExitsL =
      likedList.filter(obj => obj.id === videoDetails.id).length !== 0
    const isExitsD =
      disLikedList.filter(obj => obj.id === videoDetails.id).length !== 0
    if (!isExitsD) {
      if (isExitsL) {
        const ind = likedList.findIndex(obj => obj.id === videoDetails.id)
        likedList.splice(ind, 1)
        disLikedList.push(videoDetails)
        this.setState({disLikedList, likedList})
      } else {
        disLikedList.push(videoDetails)
        this.setState({disLikedList, likedList})
      }
    } else {
      const ind = disLikedList.findIndex(obj => obj.id === videoDetails.id)
      disLikedList.splice(ind, 1)
      this.setState({disLikedList})
    }
  }

  render() {
    const {
      activeRoute,
      savedVideosList,
      disLikedList,
      likedList,
      isDarkMode,
    } = this.state
    // console.log('app', savedList)
    return (
      <Container color={isDarkMode ? 'white' : 'black'}>
        <NextWatchContext.Provider
          value={{
            activeRoute,
            updateActiveRoute: this.updateActiveRoute,
            savedVideosList,
            updateSavedList: this.updateSavedList,
            likedList,
            updateLikedList: this.updateLikedList,
            disLikedList,
            updateDislikedList: this.updateDislikedList,
            isDarkMode,
            updateIsDarkMode: this.updateIsDarkMode,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />

            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route component={NotFound} />
          </Switch>
        </NextWatchContext.Provider>
      </Container>
    )
  }
}

export default App
