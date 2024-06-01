import React, { createContext, useState } from 'react'
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext();

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < all_product.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
}

const applyFixedAmountDiscount = (total, amount) => total - amount;

const applyPercentageDiscount = (total, percentage) => total * (1 - (percentage / 100));

const applyCategoryDiscount = (cartItems, category, percentage) => {
  let discount = 0;
  for (const itemId in cartItems) {
    if (cartItems[itemId] > 0) {
      let item = all_product.find((product) => product.id === Number(itemId));
      if (item.category === category) {
        discount += (item.new_price * cartItems[itemId]) * (percentage / 100);
      }
    }
  }
  return discount;
};

const applyPointsDiscount = (total, points) => {
  const discount = Math.min(points, total * 0.2);
  return total - discount;
};

const applySeasonalDiscount = (total, everyX, discountY) => {
  const discount = Math.floor(total / everyX) * discountY;
  return total - discount;
};

const ShopContextProvider = (props) => {

  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [discounts, setDiscounts] = useState([]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
  }
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) 
    {
      if (cartItems[item] > 0)
      {
        let itemInfo = all_product.find((product)=> product.id === Number(item))
        totalAmount += (itemInfo.new_price * cartItems[item]);
      }
    }
    return totalAmount;
  }

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems)
    {
      if (cartItems[item] > 0 ) 
      {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  }

  const addDiscount = (newDiscount) => {
    setDiscounts((prevDiscounts) => {
      const existingDiscount = prevDiscounts.find(
        (discount) =>
          discount.categoryDiscount === newDiscount.categoryDiscount &&
          discount.type === newDiscount.type &&
          (newDiscount.type === 'Category' ? discount.category === newDiscount.category : true)
      );
      if (existingDiscount) {
        return prevDiscounts;
      }
      return [...prevDiscounts, newDiscount];
    });
  };

  const calculateTotal = () => {
    let total = getTotalCartAmount();

    const couponDiscount = discounts.find((d) => d.categoryDiscount === 'Coupon');
    const onTopDiscounts = discounts.filter((d) => d.categoryDiscount === 'On Top');
    const seasonalDiscount = discounts.find((d) => d.categoryDiscount === 'Seasonal');

    // Coupon Discount
    if (couponDiscount) {
      if (couponDiscount.type === 'Fixed') {
        total = applyFixedAmountDiscount(total, couponDiscount.amount);
      } else if (couponDiscount.type === 'Percentage') {
        total = applyPercentageDiscount(total, couponDiscount.percentage);
      }
    }

    // On Top Discounts
    onTopDiscounts.forEach((discount) => {
      if (discount.type === 'Category') {
        const categoryDiscount = applyCategoryDiscount(cartItems, discount.category, discount.percentage);
        total -= categoryDiscount;
      } else if (discount.type === 'Points') {
        total = applyPointsDiscount(total, discount.points);
      }
    });

    // Seasonal Discount
    if (seasonalDiscount) {
      total = applySeasonalDiscount(total, seasonalDiscount.everyX, seasonalDiscount.discountY);
    }
    return total;
  };

  const contextValue = {
    discounts, 
    calculateTotal, 
    addDiscount, 
    getTotalCartItems, 
    getTotalCartAmount, 
    all_product, 
    cartItems, 
    addToCart, 
    removeFromCart};
  
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;