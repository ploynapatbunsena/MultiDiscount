import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import './CartItems.css'

const CartItems = () => {
  const {getTotalCartAmount, all_product, cartItems, removeFromCart,addDiscount, calculateTotal} = useContext(ShopContext);

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if(cartItems[e.id] > 0) 
        {
          return <div>
                    <div className="cartitems-format cartitems-format-main">
                      <img src={e.image} className='carticon-product-icon' alt="" />
                      <p>{e.name}</p>
                      <p>{e.new_price} ฿</p>
                      <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                      <p>{e.new_price * cartItems[e.id]} ฿</p>
                      <img className="cartitems-remove-icon" src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr />
                  </div>
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} ฿</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Discount</p>
              <div className="discount-manage">
                <button onClick={() => addDiscount({ type: 'Fixed', categoryDiscount: 'Coupon', amount: 50 })}>
                  Apply 50 THB Coupon
                </button>
                <button onClick={() => addDiscount({ type: 'Percentage', categoryDiscount: 'Coupon', percentage: 10 })}>
                  Apply 10% Coupon
                </button>
                <button onClick={() => addDiscount({ type: 'Category', categoryDiscount: 'On Top', category: 'clothing', percentage: 15 })}>
                  Apply 15% Off on Clothing
                </button>
                <button onClick={() => addDiscount({ type: 'Category', categoryDiscount: 'On Top', category: 'accessorie', percentage: 15 })}>
                  Apply 15% Off on Accessories
                </button>
                <button onClick={() => addDiscount({ type: 'Category', categoryDiscount: 'On Top', category: 'electronic', percentage: 15 })}>
                  Apply 15% Off on Electronics
                </button>
                <button onClick={() => addDiscount({ type: 'Points', categoryDiscount: 'On Top', points: 68 })}>
                  Redeem 68 Points
                </button>
                <button onClick={() => addDiscount({ type: 'Seasonal', categoryDiscount: 'Seasonal', everyX: 300, discountY: 40 })}>
                  Apply Seasonal Discount (40 THB off every 300 THB)
                </button>
              </div>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{calculateTotal()} ฿</h3>
            </div>
          </div>
          <div className="check-out">
            <button>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems