import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://i.imgur.com/dZqMUiE.png"
      className="cart-empty-image"
      alt="empty cart"
    />
    <h1 className="cart-empty-heading">No Order Yet!</h1>
    <p className="cart-empty-caption">
      Your cart is empty. Add something from the menu.
    </p>

    <Link to="/" className="redirect-styling">
      <button type="button" className="shop-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
