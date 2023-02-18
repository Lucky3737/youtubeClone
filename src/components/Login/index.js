import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    ErrorMsg: '',
    showSubmitError: false,
    showPassword: false,
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 50})
    history.replace('/')
  }

  submitFailure = ErrorMsg => {
    this.setState({showSubmitError: true, ErrorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    const url = 'https://apis.ccbp.in/login'
    const {password, username} = this.state
    const UserDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  clickShowPassword = () => {
    this.setState(PreState => ({showPassword: !PreState.showPassword}))
  }

  render() {
    const {
      username,
      password,
      showSubmitError,
      ErrorMsg,
      showPassword,
    } = this.state

    const textType = showPassword ? 'text' : 'password'

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login">
        <form className="form-container" onClick={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="website-logo"
          />

          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            className="username-input"
            placeholder="User name"
            value={username}
            onChange={this.getUsername}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type={`${textType}`}
            id="password"
            className="password-input"
            placeholder="Password"
            value={password}
            onChange={this.getPassword}
          />
          <div>
            <input
              type="checkbox"
              id="checkboxId"
              onClick={this.clickShowPassword}
            />
            <label htmlFor="checkboxId">Show Password </label>
          </div>

          {showSubmitError && <p className="error-msg">*{ErrorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
