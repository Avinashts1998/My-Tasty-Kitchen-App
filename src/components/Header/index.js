import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <ul className="header-background">
        <Link to="/" className="linked">
          <li>
            <img
              src="https://i.imgur.com/Ncgq2Tm.png"
              alt="website logo"
              className="logo-image"
            />
          </li>
          <p className="logo-name">Tasty Kitchens</p>
        </Link>
        <ul className="link-positioner">
          <Link to="/" className="linked">
            <li>
              <p>Home</p>
            </li>
          </Link>
          <Link to="/cart" className="linked">
            <li>
              <p>Cart</p>
            </li>
          </Link>
          <li className="logout-btn">
            <button type="button" className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </ul>
    </>
  )
}

export default withRouter(Header)
