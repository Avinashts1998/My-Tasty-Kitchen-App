import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      return (
        <>
          <div className="cart-summary-container">
            <div className="order-total-display">
              <h1 className="order-total-value" data-testid="total-price">
                Order Total:
              </h1>
              <p>
                <BiRupee /> {total}
              </p>
              <p className="total-items" data-testid="item-quantity">
                {cartList.length} Items in cart
              </p>
            </div>
            <Link to="/paymentsuccess" className="link-styling">
              <button type="button" className="checkout-button">
                Place Order
              </button>
            </Link>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
