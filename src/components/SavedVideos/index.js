import {BiListPlus} from 'react-icons/bi'
import SavedVideoContext from '../../context/SavedVideoContext'
import Header from '../Header'
import LeftNavbar from '../LeftNavbar'
import SavedVideoView from '../SaveVideoView'

const SavedVideos = () => (
  <SavedVideoContext.Consumer>
    {value => {
      const {savedVideosList} = value

      const renderOfEmptyView = () => (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <h1>No saved videos found</h1>
          <p>Save your videos by clicking a button</p>
        </div>
      )

      const renderSaveVideos = () => (
        <div className="videos-section">
          <div className="trending-card">
            <BiListPlus color="red" />

            <h1>Saved Videos</h1>
          </div>
          <ul className="trending-video-container">
            {savedVideosList.map(eachVideo => (
              <SavedVideoView videoDetails={eachVideo} key={eachVideo.id} />
            ))}
          </ul>
        </div>
      )

      return (
        <div>
          <Header />
          <div className="content-container">
            <LeftNavbar />

            <div className="video-main-card">
              {savedVideosList.length === 0
                ? renderOfEmptyView()
                : renderSaveVideos()}
            </div>
          </div>
        </div>
      )
    }}
  </SavedVideoContext.Consumer>
)

export default SavedVideos
