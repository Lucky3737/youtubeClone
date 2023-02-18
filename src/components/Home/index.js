import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineCloseSquare} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import Header from '../Header'
import LeftNavbar from '../LeftNavbar'
import HomeVideoItem from '../HomeVideoItem'

import SavedVideoContext from '../../context/SavedVideoContext'
import {BannerContainer} from '../../styledComponents'
import './index.css'

const apiResult = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Home extends Component {
  state = {homeVideos: [], searchInput: '', apiStatus: '', bannerPresent: true}

  componentDidMount() {
    this.GetHomeVideo()
  }

  GetHomeVideo = async () => {
    const {searchInput} = this.state

    this.setState({apiStatus: apiResult.progress})

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateData = data.videos.map(eachVideo => ({
        channel: eachVideo.channel,
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({homeVideos: updateData, apiStatus: apiResult.success})
    } else {
      this.setState({apiStatus: apiResult.failure})
    }
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  clickOnSearchBtn = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.GetHomeVideo)
  }

  searchAgin = () => {
    this.setState({searchInput: ''}, this.GetHomeVideo)
  }

  renderNoVideos = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={this.searchAgin}>
        Retry
      </button>
    </div>
  )

  renderOfVideos = () => {
    const {homeVideos} = this.state

    return (
      <ul className="video-container">
        {homeVideos.map(eachVideo => (
          <HomeVideoItem videoDetails={eachVideo} key={eachVideo.id} />
        ))}
      </ul>
    )
  }

  closeBanner = () => {
    this.setState({bannerPresent: false})
  }

  renderAllVideos = () => {
    const {homeVideos, searchInput, bannerPresent} = this.state
    const lengthVideoList = homeVideos.length

    return (
      <div className="video-main-card">
        {bannerPresent && (
          <BannerContainer data-testid="banner">
            <div className="banner-btn">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
                className="website-logo"
              />
              <button
                type="button"
                data-testid="close"
                onClick={this.closeBanner}
              >
                <AiOutlineCloseSquare size="40" color="blue" />
              </button>
            </div>
            <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
            <button type="button">GET IT NOW</button>
          </BannerContainer>
        )}

        <div className="videos-section">
          <input
            type="search"
            className="home-video-search"
            placeholder="Search"
            value={searchInput}
            onChange={this.getSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.clickOnSearchBtn}
          >
            <BiSearch size="30" />
          </button>

          {lengthVideoList > 0 ? this.renderOfVideos() : this.renderNoVideos()}
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retryApi = () => {
    this.GetHomeVideo()
  }

  renderOfFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again
      </p>
      <button type="button" onClick={this.retryApi}>
        Retry
      </button>
    </div>
  )

  renderHomeComponent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResult.success:
        return this.renderAllVideos()
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
      <SavedVideoContext.Consumer>
        {value => {
          const {isDarkMode} = value
          const bgColor = isDarkMode ? 'bg-color' : ''

          return (
            <div data-testid="home">
              <Header />
              <div className={`content-container ${bgColor}`}>
                <LeftNavbar />
                {this.renderHomeComponent()}
              </div>
            </div>
          )
        }}
      </SavedVideoContext.Consumer>
    )
  }
}

export default Home
