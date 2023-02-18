import {GoPrimitiveDot} from 'react-icons/go'
import {Link} from 'react-router-dom'
import './index.css'

const TrendingItem = props => {
  const {videoDetails} = props
  const {
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    id,
    channel,
  } = videoDetails

  return (
    <li className="list">
      <Link to={`/videos/${id}`}>
        <div className="trending-list-container">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="thumbnail-img"
          />

          <div className="video-details-card">
            <div>
              <p>{title}</p>

              <div className="view-card">
                <p className="views">{viewCount} views</p>
                <p>
                  <GoPrimitiveDot />
                  {publishedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default TrendingItem
