import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartItemsCount = cartList.length
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })

      return (
        <div className="summary-container">
          <div className="price-container">
            <h1 className="price-label">
              Order Total:
              <span className="price">Rs {total}/-</span>
            </h1>
          </div>
          <p className="total-items-label">{cartItemsCount} items in cart</p>
          <button type="button" className="checkout-button" aria-label="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
