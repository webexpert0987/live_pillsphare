import React, { createContext, useContext, useState, useEffect } from 'react';
import { addProductToCart, getUserCart } from '../apis/apisList/cartApi';

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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    const fetchCart = async (user) => {
      const data = await getUserCart({
        user_id: user.user_id,
        token: user.token
      })
      console.log('cart data', data);
    }

    if (storedUser) {
      let user = JSON.parse(storedUser)
      setUserDetails(user);
      console.log('user info', user);
      // fetchCart(user);
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
    console.log('useEffect variantIds', variantIds)
  }, [variantIds])
  
  useEffect(()=>{
    cart.reduce(
      (total, item) => total + parseFloat(item.selectedVariantPrice),
      0
    ).toFixed(2);
  }, [cart])
  
  useEffect(()=>{
    console.log('useEffect variantIds', variantIds)
  }, [variantIds])
  
  useEffect(()=>{
    const addProducts = async () => {
      console.log('addProducts')
      const cartData = {
        user_id: userDetails.user_id,
        token: userDetails.token,
        cart_value: JSON.stringify({ cart, cartTotalAmount })
      }
      try {
        const response = await addProductToCart(cartData);
        console.log('API Response: add product to cart => ', response);
        setIsAddingProduct(false);
        if (response.status == 200) {
          // showMessage(response.message, 'success');
        }
      } catch (err) {
        // setError(err.response.data.message);
        console.error('Error:', err);
        // showMessage(err.response.data.message, 'error');
      }
    }

    if(isAddingProduct){
      addProducts();
    }
  }, [isAddingProduct])

  // // Add item to cart
  // const addToCart = (product, variant) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find(
  //       (item) => item.product.id === product.id && item.variant.variation_id === variant.variation_id
  //     );

  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item === existingItem
  //           ? { ...item }
  //           : item
  //       );
  //     } else {
  //       return [...prevCart, { product, variant }];
  //     }
  //   });
  // };

  // // Update variant in the cart
  // const updateVariantInCart = (productId, variantId) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.product.id === productId && item.variant.variation_id === variantId
  //         ? { ...item }
  //         : item
  //     )
  //   );
  // };
// Update variant and quantity in cart
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
    return cart.reduce(
      (total, item) => total + parseFloat(item.selectedVariantPrice),
      0
    ).toFixed(2);
  };


  // const addToCart = (item, variant) => {
  //   // setCartItems((prev) => [...prev, item]);
  //   setCart((prev) => [
  //     ...prev,
  //     { ...item, selectedVariant: variant.variation_id, selectedVariantPrice: variant.price }
  //   ]);
  //   variantIds.push(variant.variation_id)
  // };
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
    console.log('variantIds', variantIds)
    // setCart((prevCart) => {
    //   return prevCart.map((item) => {
    //     if (item.id === product.id) {
    //       const oldVariantId = item.selectedVariant; 
    //       const newVariantId = variantId;

    //       setVariantIds((prevVariantIds) => {
    //         // Remove the old ID and add the new one
    //         return prevVariantIds
    //           .filter((id) => id !== oldVariantId) // Remove the old ID
    //           .concat(newVariantId); // Add the new ID
    //       });

    //       return {
    //         ...item,
    //         selectedVariant: newVariantId, // Update the new variant ID
    //         selectedVariantPrice: item.variations.find(
    //           (variant) => variant.variation_id === newVariantId
    //         )?.price, // Update the price for the new variant
    //       };
    //     }
    //     return item; // Return other items unchanged
    //   });
    // });
  };



  return (
    <AppContext.Provider value={{ userDetails, login, logout, cartTotalAmount, setCartTotalAmount, cart, addToCart, updateVariant, updateVariantInCart, calculateTotal }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => useContext(AppContext);
