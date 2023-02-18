import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {FaMoon} from 'react-icons/fa'
import {BiSun} from 'react-icons/bi'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

const Header = props => (
  <SavedVideoContext.Consumer>
    {value => {
      const {isDarkMode, changeTheme} = value

      const LogOutApp = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const clickLightMode = () => {
        changeTheme()
      }

      const clickDarkMode = () => {
        changeTheme()
      }

      return (
        <div>
          {isDarkMode && (
            <div className="header-container-dark">
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                />
              </Link>
              <div className="logout-container">
                <button
                  type="button"
                  onClick={clickLightMode}
                  className="light-btn"
                  data-testid="theme"
                >
                  <BiSun size="50" color="white" />
                </button>

                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile"
                />
                <div>
                  <Popup
                    modal
                    trigger={
                      <button type="button" className="logout-btn">
                        Logout
                      </button>
                    }
                    assName="popup-content"
                  >
                    {close => (
                      <div>
                        <p>Are you sure, you want to logout</p>

                        <div>
                          <button type="button" onClick={() => close()}>
                            Cancel
                          </button>
                          <button type="button" onClick={LogOutApp}>
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
          )}
          {!isDarkMode && (
            <div className="header-container">
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />
              </Link>
              <div className="logout-container">
                <button
                  type="button"
                  onClick={clickDarkMode}
                  className="dark-btn"
                  data-testid="theme"
                >
                  <FaMoon size="40px" color="black" />
                </button>

                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile"
                />

                <div>
                  <Popup
                    modal
                    trigger={
                      <button type="button" className="logout-btn">
                        Logout
                      </button>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <div>
                        <p>Are you sure, you want to logout</p>
                        <div>
                          <button type="button" onClick={() => close()}>
                            Cancel
                          </button>
                          <button type="button" onClick={LogOutApp}>
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }}
  </SavedVideoContext.Consumer>
)

export default withRouter(Header)
