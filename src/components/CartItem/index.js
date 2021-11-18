import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value
      const {cartItemDetails} = props
      const {itemId, name, cost, quantity, itemImageUrl} = cartItemDetails
      const onClickDecrement = () => {
        if (quantity > 1) {
          decrementCartItemQuantity(itemId)
        } else {
          removeCartItem(itemId)
        }
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(itemId)
      }
      const totalOrderCost = cost * quantity

      return (
        <li className="cart-styling">
          <div className="image-cart-styling">
            <img src={itemImageUrl} alt="food" className="cart-item-image" />
            <h1 className="cart-item-name">{name}</h1>
          </div>
          <div className="cart-button-styling">
            <button
              type="button"
              data-testid="decrement-quantity"
              onClick={onClickDecrement}
              className="cart-button"
            >
              <BsDashSquare />
            </button>
            <p data-testid="item-quantity" className="cart-item-quantity">
              {quantity}
            </p>
            <button
              type="button"
              data-testid="increment-quantity"
              onClick={onClickIncrement}
              className="cart-button"
            >
              <BsPlusSquare />
            </button>
          </div>
          <div>
            <p data-testid="total-price" className="price-color">
              <span>
                <BiRupee />
              </span>
              {totalOrderCost}
            </p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
