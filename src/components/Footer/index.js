import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="background-footer">
    <div className="display-icon">
      <div>
        <img
          src="https://i.imgur.com/v0LBpVc.png"
          alt="website-footer-logo"
          className="logo-img"
        />
      </div>
      <h1 className="logo-nme">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div>
      <FaPinterestSquare
        className="social-icon-style"
        data-testid="pintrest-social-icon"
      />
      <FaInstagram
        className="social-icon-style"
        data-testid="instagram-social-icon"
      />
      <FaTwitterSquare
        className="social-icon-style"
        data-testid="twitter-social-icon"
      />
      <FaFacebookSquare
        className="social-icon-style"
        data-testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
