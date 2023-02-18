import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import ReactPlayer from 'react-player'
import Header from '../Header'
import LeftNavbar from '../LeftNavbar'
import './index.css'
import SavedVideoContext from '../../context/SavedVideoContext'
import {LikeButton} from '../../styledComponents'

const apiResult = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class HomeVideoDetails extends Component {
  state = {
    video: {},
    channelDetails: {},
    apiStatus: '',
    isVideoLiked: false,

    isVideoDislike: '',

    isVideoSave: false,
  }

  componentDidMount() {
    this.GetVideo()
  }

  getUpdateData = data => ({
    publishedAt: data.video_details.published_at,
    thumbnailUrl: data.video_details.thumbnail_url,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    viewCount: data.video_details.view_count,
    channel: data.video_details.channel,
    id: data.video_details.id,
    description: data.video_details.description,
  })

  GetVideo = async () => {
    const {match} = this.props

    this.setState({apiStatus: apiResult.progress})
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updateData = this.getUpdateData(data)
      const channelDetails = {
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }

      this.setState({
        video: updateData,
        channelDetails,
        apiStatus: apiResult.success,
      })
    } else {
      this.setState({apiStatus: apiResult.failure})
    }
  }

  renderProductView = () => (
    <SavedVideoContext.Consumer>
      {value => {
        const {
          video,
          channelDetails,
          isVideoLiked,
          isVideoDislike,
          isVideoSave,
        } = this.state
        const {title, viewCount, publishedAt, description, videoUrl} = video
        const {name, profileImageUrl, subscriberCount} = channelDetails

        const {addVideo} = value
        const toSaveVideo = () => {
          addVideo({...video})
          this.setState(preState => ({isVideoSave: !preState.isVideoSave}))
        }

        const changeLikeBtnColor = () => {
          this.setState({isVideoLiked: true, isVideoDislike: false})
        }

        const changeDislikeBtnColor = () => {
          this.setState({isVideoLiked: false, isVideoDislike: true})
        }

        const saveBtn = isVideoSave ? 'btn-color' : ''

        return (
          <div className="video-details-container">
            <ReactPlayer
              url={videoUrl}
              controls
              height="50%"
              width="90%"
              background-size="cover"
            />
            <p>{title}</p>
            <div className="video-content-card">
              <div className="view-card">
                <p className="views">{viewCount}</p>
                <p>{publishedAt}</p>
              </div>
              <div className="save-card">
                <LikeButton
                  onClick={changeLikeBtnColor}
                  likeBtn={isVideoLiked}
                  type="button"
                >
                  <AiOutlineLike /> Like
                </LikeButton>

                <LikeButton
                  onClick={changeDislikeBtnColor}
                  likeBtn={isVideoDislike}
                  type="button"
                >
                  <AiOutlineDislike /> Dislike
                </LikeButton>
                <button
                  type="button"
                  onClick={toSaveVideo}
                  className={`like-save-btn ${saveBtn}`}
                >
                  <BiListPlus /> Saved
                </button>
              </div>
            </div>
            <hr />
            <div>
              <img src={profileImageUrl} alt="channel logo" />
              <div>
                <p>{name}</p>
                <p>{subscriberCount}</p>
                <p>{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </SavedVideoContext.Consumer>
  )

  renderOfFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={this.retryApi}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderComponent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResult.success:
        return this.renderProductView()
      case apiResult.failure:
        return this.renderOfFailure()
      case apiResult.progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="content-section">
          <LeftNavbar />
          {this.renderComponent()}
        </div>
      </div>
    )
  }
}

export default HomeVideoDetails
