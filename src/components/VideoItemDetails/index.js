import {Component} from 'react'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {Button} from './StyledComponents'
import Header from '../Header'
import './index.css'
import Slider from '../Slider'
import NextWatchContext from '../../context/NextWatchContext'
import {Container} from '../../StyledComponent'

const apiStatusConstants = {
  success: 'success',
  fail: 'fail',
  load: 'load',
}
class VideoItemDetails extends Component {
  state = {videoDetails: {}, videoDetailsApiStatus: 'initial'}

  componentDidMount = () => {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({videoDetailsApiStatus: apiStatusConstants.load})
    const {match} = this.props
    const {params} = match
    const {id} = params
    try {
      const response = await fetch(
        'https://vasamsettisushma.github.io/myCompleteInformation/main/information.json',
      )
      const data = await response.json()
      const obj = (data.videos || []).find(v => v.id === id)
      if (obj) {
        // Only use thumbnail if video_url is missing or not a video link
        let videoUrl = obj.video_url
        if (
          !videoUrl ||
          videoUrl.endsWith('.png') ||
          videoUrl.endsWith('.jpg') ||
          videoUrl.endsWith('.jpeg')
        ) {
          videoUrl = null
        }
        const receivedList = {
          channel: obj.channel,
          description: obj.description || '',
          id: obj.id,
          title: obj.title,
          videoUrl,
          publishedAt: obj.published_at,
          thumbnailUrl: obj.thumbnail_url,
          viewsCount: obj.view_count,
        }
        this.setState({
          videoDetails: receivedList,
          videoDetailsApiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({videoDetailsApiStatus: apiStatusConstants.fail})
      }
    } catch (error) {
      this.setState({videoDetailsApiStatus: apiStatusConstants.fail})
    }
  }

  renderLoadingView = () => (
    <div className=" d-flex align-items-center justify-content-center w-100 ">
      <div className="loader-container mt-5" data-testid="loader">
        <Loader type="ThreeDots" color="cyan" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = value => {
    const {isDarkMode} = value
    return (
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
            We are having some trouble to complete your request. Please try
            again.
          </p>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => this.getVideoDetails()}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  renderVideoPlayer = videoUrl => {
    if (!videoUrl) {
      return null
    }
    // If Google Drive preview link, use iframe
    if (
      videoUrl.includes('drive.google.com') &&
      videoUrl.includes('/preview')
    ) {
      return (
        <iframe
          src={videoUrl}
          width="100%"
          height="360px"
          allow="autoplay"
          frameBorder="0"
          title="Google Drive Video"
        />
      )
    }
    // Otherwise use ReactPlayer
    return <ReactPlayer url={videoUrl} controls width="100%" height="360px" />
  }

  renderVideo = value => {
    const {videoDetails} = this.state
    const {
      videoUrl,
      channel,
      title,
      publishedAt,
      viewsCount,
      description,
      thumbnailUrl,
    } = videoDetails

    const {
      savedVideosList,
      updateSavedList,
      likedList,
      updateLikedList,
      disLikedList,
      updateDislikedList,
    } = value

    const onClickLikeButton = selectedVideo => {
      updateLikedList(selectedVideo)
    }

    const onClickDislikeButton = selectedVideo => {
      updateDislikedList(selectedVideo)
    }

    const onClickSaveButton = selectedVideo => {
      updateSavedList(selectedVideo)
    }
    const isSaved =
      savedVideosList.filter(obj => obj.id === videoDetails.id).length === 1

    const isLiked =
      likedList.filter(obj => obj.id === videoDetails.id).length === 1

    const isDisliked =
      disLikedList.filter(obj => obj.id === videoDetails.id).length === 1

    return (
      <div className="w-100 videoDetailsCon overflow-auto p-4 pt-0">
        <div className="videoCon">
          <div className="responsive-container">
            {videoUrl ? (
              this.renderVideoPlayer(videoUrl)
            ) : (
              <img
                src={thumbnailUrl}
                alt={title}
                style={{width: '100%', height: '360px', objectFit: 'cover'}}
              />
            )}
          </div>
        </div>
        <p className="h6 pt-3">{title}</p>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p>{`${viewsCount} views .`}</p>
            <p>
              {publishedAt !== undefined &&
                formatDistanceToNow(new Date(publishedAt))}
            </p>
          </div>
          <ul className="d-flex list-unstyled">
            <li>
              <Button
                type="button"
                className="d-flex mr-3 opinionButton"
                onClick={() => onClickLikeButton(videoDetails)}
                active={isLiked}
              >
                <BiLike className="mt-1 mr-2" />
                Like
              </Button>
            </li>
            <li>
              <Button
                type="button"
                className="d-flex mr-3 opinionButton"
                onClick={() => onClickDislikeButton(videoDetails)}
                active={isDisliked}
              >
                <BiDislike className="mt-1 mr-2" />
                Dislike
              </Button>
            </li>
            <li>
              <Button
                type="button"
                className="d-flex mr-3 opinionButton"
                onClick={() => onClickSaveButton(videoDetails)}
                active={isSaved}
                testid="button"
              >
                <MdPlaylistAdd className="mr-2 mt-1" />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </li>
          </ul>
        </div>
        <div className="m-0">
          <hr />
        </div>
        <div className="d-flex text-secondary">
          <div className="">
            <img
              src={channel !== undefined && channel.profile_image_url}
              alt="channel logo"
              className="channelLogo"
            />
          </div>
          <div className="pl-3">
            <p className="m-0 mb-1 h6 text-dark">
              {channel !== undefined && channel.name}
            </p>
            <p className="m-0 mb-1">
              {channel !== undefined &&
                `${channel.subscriber_count} Subscribers`}
            </p>
            <p className="m-0">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  decideWhatToSHow = value => {
    const {videoDetailsApiStatus} = this.state

    switch (videoDetailsApiStatus) {
      case apiStatusConstants.success:
        return this.renderVideo(value)
      case apiStatusConstants.fail:
        return this.renderFailureView(value)
      case apiStatusConstants.load:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {videoDetailsApiStatus} = this.state
    const {children} = this.props

    return (
      <NextWatchContext.Consumer>
        {value => (
          <Container className="nextWatchContainer">
            <Header />
            <div className="d-flex">
              <div className="sidebar d-none d-md-block">{children}</div>
              <div className="main-content w-100">
                {this.decideWhatToSHow(value)}
              </div>
            </div>
          </Container>
        )}
      </NextWatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
