import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GiFireZone} from 'react-icons/gi'
import Header from '../Header'

import LeftNavbar from '../LeftNavbar'
import TrendingItem from '../TrendingItem'
import './index.css'

const apiResult = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Trending extends Component {
  state = {trendingVideos: [], apiStatus: ''}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiResult.progress})

    const url = 'https://apis.ccbp.in/videos/trending'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updateData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
        channel: eachVideo.channel,
      }))

      this.setState({trendingVideos: updateData, apiStatus: apiResult.success})
    } else {
      this.setState({apiStatus: apiResult.failure})
    }
  }

  renderVideos = () => {
    const {trendingVideos} = this.state
    return (
      <div className="video-main-card">
        <div className="trending-card">
          <GiFireZone color="red" size="50" margin-left="20px" />
          <h1>Trending</h1>
        </div>

        <div className="videos-section">
          <ul className="trending-video-container">
            {trendingVideos.map(eachVideo => (
              <TrendingItem videoDetails={eachVideo} key={eachVideo.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  retryApi = () => {
    this.getTrendingVideos()
  }

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

  renderTrendingVideo = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiResult.success:
        return this.renderVideos()
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
        <div className="content-container">
          <LeftNavbar />

          {this.renderTrendingVideo()}
        </div>
      </div>
    )
  }
}

export default Trending
