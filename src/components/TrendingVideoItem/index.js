import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
/* import "./index.css" */

class TrendingVideoItem extends Component {
  render() {
    const {videoDetails} = this.props
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
}

export default TrendingVideoItem
