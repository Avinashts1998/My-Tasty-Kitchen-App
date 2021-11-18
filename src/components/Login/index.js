import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    submitState: false,
    errorMsg: 'please enter a valid username and password',
  }

  onClickLogin = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.showSuccess(data.jwt_token)
    } else {
      this.showFailureText(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  showSuccess = jwt => {
    Cookies.set('jwt_token', jwt, {expires: 20}, '/')
    const {history} = this.props
    history.replace('/')
  }

  showFailureText = err => {
    this.setState({
      submitState: true,
      errorMsg: err,
    })
  }

  renderLoginForm = () => {
    const {submitState, errorMsg} = this.state
    return (
      <>
        <form className="login-form" onSubmit={this.onClickLogin}>
          <div className="set-logo">
            <img
              src="https://i.imgur.com/Zm6ULiH.png"
              alt="website logo"
              className="logo-image"
            />
            <h1 className="logo-name">Tasty kitchens</h1>
          </div>
          <h1 className="login">Login</h1>
          <div className="input-container">
            <label htmlFor="username" className="name">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input-sizer"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="name">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input-sizer"
              onChange={this.onChangePassword}
            />
          </div>
          {submitState && <p className="error-text">{errorMsg}</p>}
          <button type="submit" className="button-style">
            Login
          </button>
        </form>
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-background">
        <div className="login-part">
          <div>{this.renderLoginForm()}</div>
        </div>
        <img
          src="https://i.imgur.com/125zAtD.png"
          alt="website login"
          className="website-login"
        />
      </div>
    )
  }
}

export default Login
