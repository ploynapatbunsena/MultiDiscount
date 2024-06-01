import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {

  const[menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" />
        <p>SHOPPING ONLINE</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => {setMenu("shop")}}><Link style={{ textDecoration: 'none'}} to='/'>Shop</Link>  
          {menu==="shop"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("clothing")}}><Link style={{ textDecoration: 'none'}} to='/clothing'>Clothing</Link> 
          {menu==="clothing"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("accessories")}}><Link style={{ textDecoration: 'none'}} to='/accessories'>Accessories</Link> 
          {menu==="accessories"?<hr/>:<></>}</li>
        <li onClick={() => {setMenu("electronics")}}><Link style={{ textDecoration: 'none'}} to='/electronics'>Electronics</Link> 
          {menu==="electronics"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-cart">
        <Link to='/cart'>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}
