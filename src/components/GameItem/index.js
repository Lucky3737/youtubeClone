import {Link} from 'react-router-dom'
import './index.css'

const GameItem = props => {
  const {videoDetails} = props
  const {
    thumbnailUrl,
    title,
    viewCount,

    id,
  } = videoDetails

  return (
    <li className="list">
      <Link to={`/videos/${id}`}>
        <div className="trending-list-container">
          <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-img" />

          <div className="video-details-card">
            <div>
              <p>{title}</p>

              <div className="view-card">
                <p className="views">{viewCount} views</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default GameItem
