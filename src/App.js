import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachCartItem => {
      if (eachCartItem.id === id) {
        return {...eachCartItem, quantity: eachCartItem.quantity + 1}
      }

      return eachCartItem
    })

    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList
      .map(eachCartItem => {
        if (eachCartItem.id === id) {
          if (eachCartItem.quantity > 1) {
            return {...eachCartItem, quantity: eachCartItem.quantity - 1}
          }
          return null
        }
        return eachCartItem
      })
      .filter(item => item !== null)

    this.setState({cartList: updatedCartList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    this.setState(prevState => {
      const existingItemIndex = prevState.cartList.findIndex(
        item => item.id === product.id,
      )

      if (existingItemIndex >= 0) {
        const updatedCartList = [...prevState.cartList]
        updatedCartList[existingItemIndex] = {
          ...updatedCartList[existingItemIndex],
          quantity:
            updatedCartList[existingItemIndex].quantity + product.quantity,
        }
        return {cartList: updatedCartList}
      }
      return {cartList: [...prevState.cartList, product]}
    })
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
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
