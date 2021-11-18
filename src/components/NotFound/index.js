import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="page-not-display">
      <img
        src="https://i.imgur.com/HlzaSSM.png"
        alt="not found"
        className="page-not-found"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-para">
        we are sorry, the page you requested could not be found <br />
        Please go back to the homepage
      </p>
      <Link to="/" className="redirect-styling">
        <button type="button" className="page-not-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
