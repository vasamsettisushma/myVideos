import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header'
import Slider from '../Slider'
import NextWatchContext from '../../context/NextWatchContext'
import EmptySavedListView from '../EmptySavedLIstView'
import {Container} from '../../StyledComponent'

class SavedVideos extends Component {
  renderCard = videoDetails => {
    const {
      channel,
      viewsCount,
      title,
      publishedAt,
      thumbnailUrl,
      id,
    } = videoDetails

    return (
      <Link to={`/videos/${id}`} className="link">
        <div className="p-2 d-flex">
          <div className="col-4">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="img-thumbnail"
            />
          </div>
          <div className="d-flex pl-3">
            <div className="">
              <p>{title}</p>
              <p className="text-secondary mb-1">{channel.name}</p>
              <div className="d-flex text-secondary">
                <p>{viewsCount} views . </p>
                <p> {formatDistanceToNow(new Date(publishedAt))}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  renderSavedList = savedVideosList => (
    <>
      {savedVideosList.length !== 0 ? (
        <div className="d-flex flex-column trendingParentCon">
          <div
            className="banner w-100 d-flex align-items-center p-3 mb-3"
            data-testid="banner"
          >
            <div className="d-flex justify-content-center align-items-center trendingIcon rounded-circle">
              <MdPlaylistAdd className="mb-0 h5 firelogo" />
            </div>
            <h1 className="h4 font-wight-bold ml-3 mb-0 text-dark">
              Saved Videos
            </h1>
          </div>
          <ul className="list-unstyled trendingParentCon d-flex flex-column w-100 overflow-auto">
            {savedVideosList.map(obj => (
              <li key={obj.id} className="">
                {this.renderCard(obj)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <EmptySavedListView />
      )}
    </>
  )

  render() {
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {isDarkMode, savedVideosList} = value
          return (
            <Container
              className="vh-100 d-flex flex-column overflow-auto"
              data-testid="savedVideos"
              bgColor={isDarkMode ? ' #0f0f0f' : '#f9f9f9 '}
            >
              <Header />
              <div className="d-flex HomeBottomSectionCon">
                <Slider />
                {this.renderSavedList(savedVideosList)}
              </div>
            </Container>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }
}

export default SavedVideos
