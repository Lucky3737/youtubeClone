import {AiFillHome} from 'react-icons/ai'
import {GiFireZone} from 'react-icons/gi'
import {BiListPlus} from 'react-icons/bi'
import {GrGamepad} from 'react-icons/gr'
import {Link, withRouter} from 'react-router-dom'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

const LeftNavbar = () => (
  <SavedVideoContext.Consumer>
    {value => {
      const {isDarkMode} = value
      const LeftNavColor = isDarkMode ? 'darkMode' : ''
      console.log(isDarkMode)
      return (
        <div className={`left-nav ${LeftNavColor}`}>
          <div className="video-category">
            <div>
              <Link to="/">
                <h1>
                  <AiFillHome color="red" /> Home
                </h1>
              </Link>
              <div>
                <Link to="/trending">
                  <h1>
                    <GiFireZone /> Trending
                  </h1>
                </Link>
              </div>
              <div>
                <Link to="/gaming">
                  <GrGamepad />
                  <h1>Gaming</h1>
                </Link>
              </div>
              <div>
                <Link to="/saved-videos">
                  <h1>
                    <BiListPlus /> Saved Videos
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <p>CONTACT US</p>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                alt="facebook logo"
                className="social-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="social-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="social-logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </SavedVideoContext.Consumer>
)

export default withRouter(LeftNavbar)
