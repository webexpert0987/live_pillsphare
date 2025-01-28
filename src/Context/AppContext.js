import React, { createContext, useContext, useState, useEffect } from 'react';
import { addProductToCart, getUserCart } from '../apis/apisList/cartApi';
import { useMessage } from './MessageContext';

// Create the app context
const AppContext = createContext();

// Provider for app state
export const AppProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cart, setCart] = useState([]);
  const [variantIds, setVariantIds] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const {showMessage } = useMessage();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    const fetchCart = async (user) => {
      const data = await getUserCart({
        user_id: user.user_id,
        token: user.token
      })
     
      const cartData = JSON.parse(data.cart_value).cart
     
      setCart(cartData);
      setVariantIds([...new Set(cartData.map((item) => item.selectedVariant))]);
    }

    if (storedUser) {
      let user = JSON.parse(storedUser)
      setUserDetails(user);
     
      fetchCart(user);
    }
    
  }, []);

  const login = (userInfo) => {
    setUserDetails(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  const logout = () => {
    setUserDetails(null);
    localStorage.removeItem('user');
  };
  
  useEffect(()=>{
    if(cart.length > 0){
      cart.reduce(
        (total, item) => total + parseFloat(item.selectedVariantPrice),
        0
      ).toFixed(2);
    }
  }, [cart])
  
  useEffect(()=>{
    const addProducts = async () => {
      if(userDetails){
        const cartData = {
          user_id: userDetails.user_id,
          token: userDetails.token,
          cart_value: JSON.stringify({ cart, cartTotalAmount })
        }
        try {
          const response = await addProductToCart(cartData);
        
          setIsAddingProduct(false);
          if (response == 'Cart updated successfully') {
            showMessage('Cart updated successfully', 'success');
          }
        } catch (err) {
          // setError(err.response.data.message);
          console.error('Error:', err);
          showMessage(err.response.data.message, 'error');
        }
      } else {
        showMessage('Cart updated successfully', 'success');
      }
    }

    if(isAddingProduct){
      addProducts();
    }
  }, [isAddingProduct])

const updateVariantInCart = (productId, newVariantId, quantity = 1) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.product.id === productId
        ? {
            ...item,
            variant: item.product.variations.find(
              (variant) => variant.variation_id === newVariantId
            ),
            quantity,
          }
        : item
    )
  );
};
  // Calculate total amount
  const calculateTotal = () => {
    if(cart.length >0){
      return cart.reduce(
        (total, item) => total + parseFloat(item.selectedVariantPrice),
        0
      ).toFixed(2);
    } else {
      return 0
    }
  };


  const addToCart = (item, variant) => {
   
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((cartItem) => cartItem.id === item.id);
  
      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          selectedVariant: variant.variation_id,
          selectedVariantPrice: variant.price,
        };
        return updatedCart;
      }
      
      return [
        ...prev,
        { ...item, selectedVariant: variant.variation_id, selectedVariantPrice: variant.price },
      ];
    });
  
    if (!variantIds.includes(variant.variation_id)) {
      variantIds.push(variant.variation_id);
    }

    setIsAddingProduct(true);
  };

  const updateVariant = (product, variantId) => {

    setCart((prevCart) =>
      prevCart.map((item) => {

        if (item.id === product.id) {
          const oldVariantId = item.selectedVariant;
          const newVariantId = variantId;

          setVariantIds((prevVariantIds) => {
            const updatedVariantIds = prevVariantIds.filter((id) => id !== oldVariantId);

            if (!updatedVariantIds.includes(newVariantId)) {
              updatedVariantIds.push(newVariantId);
            }

            return updatedVariantIds
          });

          return {
            ...item,
            selectedVariant: variantId,
            selectedVariantPrice: item.variations.find(
              (variant) => variant.variation_id === variantId
            )?.price
          }
        } else {
          return item
        }
      }
      )
    );
   
  };

  const removeFromCart = (item) => {
    const removedItem = cart.find((cartItem) => cartItem.id === item.id);
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== item.id));
  
    setVariantIds((prev) => {
      if (removedItem && removedItem.selectedVariant) {
        return prev.filter((variantId) => variantId !== removedItem.selectedVariant);
      }
      return prev;
    });
    
    setIsAddingProduct(true);
    
  };
  
  const cartEmpty = async ()=>{
    setCart([]);
    const cartData = {
      user_id: userDetails.user_id,
      token: userDetails.token,
      cart_value: JSON.stringify({ cart:[], cartTotalAmount })
    }
    try {
      const response = await addProductToCart(cartData);
    } catch (err) {
      console.error('Error:', err);
      showMessage(err.response.data.message, 'error');
    }
  }


  return (
    <AppContext.Provider value={{
      userDetails,
      login,
      logout,
      cartTotalAmount,
      setCartTotalAmount,
      cart,
      setCart,
      addToCart,
      updateVariant,
      updateVariantInCart,
      calculateTotal,
      variantIds,
      setVariantIds,
      removeFromCart,
      cartEmpty
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => useContext(AppContext);
