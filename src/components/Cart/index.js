import Header from '../Header'
import Footer from '../Footer'
import EmptyCartView from '../emptyCartView'
import CartContext from '../../context/CartContext'

import CartItem from '../CartItem'

import './index.css'
import CartSummary from '../CartSummary'

const cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <ul>
                  <ul className="cart-list">
                    <li className="column-identify">
                      <p>Item</p>
                      <p>Quantity</p>
                      <p>Price</p>
                    </li>
                    {cartList.map(eachCartItem => (
                      <CartItem
                        key={eachCartItem.itemId}
                        cartItemDetails={eachCartItem}
                      />
                    ))}
                  </ul>
                  <hr />
                  <li className="link-styling">
                    <CartSummary />
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default cart
