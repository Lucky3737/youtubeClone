import {GoPrimitiveDot} from 'react-icons/go'
import {Link} from 'react-router-dom'
import './index.css'

const HomeVideoItem = props => {
  const {videoDetails} = props
  const {
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    channel,
    id,
  } = videoDetails
  return (
    <li className="list-container" data-testid="videoItemDetails">
      <Link to={`/videos/${id}`}>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-size"
        />
        <div className="video-details-card">
          <img
            src={channel.profile_image_url}
            alt="channel logo"
            className="profile-size"
          />
          <div>
            <p>{title}</p>
            <p>{channel.name}</p>
            <div className="view-card">
              <p className="views">{viewCount} views</p>
              <p>
                <GoPrimitiveDot />
                {publishedAt}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default HomeVideoItem
