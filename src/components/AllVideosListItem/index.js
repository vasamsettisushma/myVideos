import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

class AllVideosListItem extends Component {
  render() {
    const {videoItem} = this.props
    const {
      channel,
      viewsCount,
      title,
      publishedAt,
      thumbnailUrl,
      id,
    } = videoItem

    return (
      <Link to={`/videos/${id}`} className="link">
        <div className="p-2 h-100">
          <div className="">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="img-thumbnail"
            />
          </div>
          <div className="d-flex mt-3">
            <div className="">
              <img
                src={channel.profile_image_url}
                alt="channel logo"
                className="channelLogo pr-2"
              />
            </div>
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
}

export default AllVideosListItem
