import React, { createContext, useContext, useState, useEffect } from "react";
import { addProductToCart, getUserCart } from "../apis/apisList/cartApi";
import { useMessage } from "./MessageContext";
import { profile } from "../apis/apisList/userApi";
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
  const { showMessage } = useMessage();
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [sortOption, setSortOption] = useState("relevance");
  const [qaCart, setQaCart] = useState([]);
  const [questionData, setQuestionData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [searchBlogValue, setSearchBlogValue] = useState("");
  // const [page, setPage] = useState(1);

  const fetchCart = async (user) => {
    try {
      const data = await getUserCart({
        user_id: user.user_id,
        token: user.token,
      });

      const cartData = JSON.parse(data.cart_value).cart;

      setCart(cartData);
      setVariantIds([...new Set(cartData.map((item) => item.selectedVariant))]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      let user = JSON.parse(storedUser);
      setUserDetails(user);

      fetchCart(user);
    }
  }, []);

  const login = async (userInfo) => {
    let user = userInfo;
    try {
      user = await profile(userInfo.user_id);
    } catch (error) {
      console.log("Error fetch userProfile", error);
    }
    user = {
      ...userInfo,
      ...user,
    };

    setUserDetails(user);
    fetchCart(userInfo);

    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUserDetails(null);
    localStorage.removeItem("user");
    localStorage.removeItem("questionnaire_info");
    setCart([]);
  };

  useEffect(() => {
    if (cart.length > 0) {
      cart
        .reduce(
          (total, item) => total + parseFloat(item.selectedVariantPrice),
          0
        )
        .toFixed(2);
    }
  }, [cart]);

  useEffect(() => {
    const addProducts = async () => {
      if (userDetails) {
        const total = calculateTotal();
        const cartData = {
          user_id: userDetails.user_id,
          token: userDetails.token,
          cart_value: JSON.stringify({ cart, cartTotalAmount: total }),
        };
        try {
          const response = await addProductToCart(cartData);

          setIsAddingProduct(false);
          if (response == "Cart updated successfully") {
            showMessage("Cart updated successfully", "success");
          }
        } catch (err) {
          // setError(err.response.data.message);
          console.error("Error:", err);
          showMessage(err.response.data.message, "error");
        }
      } else {
        showMessage("Cart updated successfully", "success");
      }
    };

    if (isAddingProduct) {
      addProducts();
    }
  }, [isAddingProduct]);

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
    try {
      if (cart.length > 0) {
        return cart
          .reduce(
            (total, item) =>
              total +
              parseFloat(item?.selectedVariantPrice || item?.price || 0) *
                (item.quantity || 1),
            0
          )
          .toFixed(2);
      } else {
        return "0.00";
      }
    } catch (error) {
      return "0.00";
    }
  };

  const addToCart = (item, variant) => {
    setCart((prev) => {
      // Check if the item with the selected variant already exists in the cart
      const existingItemIndex = prev.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.selectedVariant === variant.variation_id
      );

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
        {
          ...item,
          selectedVariant: variant.variation_id,
          selectedVariantPrice: variant.price,
        },
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
            const updatedVariantIds = prevVariantIds.filter(
              (id) => id !== oldVariantId
            );

            if (!updatedVariantIds.includes(newVariantId)) {
              updatedVariantIds.push(newVariantId);
            }

            return updatedVariantIds;
          });

          return {
            ...item,
            selectedVariant: variantId,
            selectedVariantPrice: item.variations.find(
              (variant) => variant.variation_id === variantId
            )?.price,
          };
        } else {
          return item;
        }
      })
    );
  };

  const removeFromCart = (item) => {
    setCart((prev) => {
      // Check if the cart contains the item with the selected variant
      const existingItemIndex = prev.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.selectedVariant === item.selectedVariant
      );

      // If the item and variant exist, remove it from the cart
      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart.splice(existingItemIndex, 1); // Remove the item
        return updatedCart;
      }
      return prev;
    });

    // Remove the variant from the variantIds list if it's no longer present in the cart
    setVariantIds((prev) => {
      // Check if the item with the specific variant is the last one in the cart
      const itemWithVariantExists = cart.some(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.selectedVariant === item.variation_id
      );

      if (!itemWithVariantExists) {
        return prev.filter((variantId) => variantId !== item.variation_id);
      }
      return prev;
    });

    setIsAddingProduct(true);
  };

  const cartEmpty = async () => {
    setCart([]);
    const cartData = {
      user_id: userDetails.user_id,
      token: userDetails.token,
      cart_value: JSON.stringify({ cart: [], cartTotalAmount }),
    };
    try {
      const response = await addProductToCart(cartData);
    } catch (err) {
      console.error("Error:", err);
      showMessage(err.response.data.message, "error");
    }
  };

  const searchProducts = (products) => {
    const search = searchValue.trim();
    // setPage(1)
    if (!search) {
      setFilteredProducts(products);
      return;
    }
    // setPage(1);
    const filteredProducts = products.filter((product) =>
      product?.name?.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredProducts.length === 0) {
      setFilteredProducts([]);
      return;
    } else {
      // setPage(1);
      setFilteredProducts(filteredProducts);
      return;
    }
  };
// searching blogs and blog data  

// const searchBlogs = (blogs) => {
//   const search = searchBlogValue.trim();
//   if (!search) {
//     setFilteredBlogs(blogs);
//     return;
//   }
//   const filteredBlogs = blogs.filter((blog) =>
//     blog?.name?.toLowerCase().includes(search.toLowerCase())
//   );
//   if (filteredBlogs.length === 0) {
//     setFilteredBlogs([]);
//     return;
//   } else {
//     setFilteredBlogs(filteredBlogs);
//     return;
//   }
// };

// ---------
  return (
    <AppContext.Provider
      value={{
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
        cartEmpty,
        selectedTab,
        setSelectedTab,
        filteredProducts,
        setFilteredProducts,
        qaCart,
        setQaCart,
        sortOption,
        setSortOption,
        questionData,
        setQuestionData,
        searchValue,
        setSearchValue,
        searchProducts,
        setUserDetails,
        // searchBlogValue,
        // filteredBlogs,
        // setFilteredBlogs,
        // setSearchBlogValue,
        // searchBlogs,
        // page,
        // setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => useContext(AppContext);
