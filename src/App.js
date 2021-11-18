import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'

import CartContext from './context/CartContext'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRouter'
import Home from './components/Home'
import cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'

import './App.css'
import NotFound from './components/NotFound'
import PaymentSuccessful from './components/PaymentSuccessful'

class App extends Component {
  state = {
    cartList: [],
  }

  componentDidMount() {
    const data = localStorage.getItem('cartData')
    const d = JSON.parse(data)
    this.setState({cartList: d})
  }

  incrementCartItemQuantity = id => {
    const obtained = localStorage.getItem('cartData')
    const obtainedData = JSON.parse(obtained)

    const newData = obtainedData.map(each => {
      if (id === each.itemId) {
        const updatedQuantity = each.quantity + 1
        return {...each, quantity: updatedQuantity}
      }
      return each
    })
    this.setState({cartList: newData})
    localStorage.setItem('cartData', JSON.stringify(newData))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.itemId === id,
    )
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.itemId) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  removeCartItem = id => {
    const obtained = localStorage.getItem('cartData')
    const obtainedData = JSON.parse(obtained)

    const newData = obtainedData.filter(each => each.itemId !== id)
    this.setState({cartList: newData})
    localStorage.setItem('cartData', JSON.stringify(newData))
  }

  addCartItem = product => {
    const {cartList} = this.state

    const updatedCartList = [...cartList, product]
    this.setState({cartList: updatedCartList})
    const cartListForLocalStorage = JSON.stringify(updatedCartList)
    localStorage.setItem('cartData', cartListForLocalStorage)
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantDetails}
            />
            <ProtectedRoute exact path="/cart" component={cart} />
            <ProtectedRoute
              exact
              path="/paymentsuccess"
              component={PaymentSuccessful}
            />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
