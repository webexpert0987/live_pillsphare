import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug } from "../apis/apisList/productApi";

const CategoryPage = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
  
    useEffect(() => {
      const fetchCategory = async () => {
        try {
          const response = await getCategoryBySlug(slug);
         
  
          if (response.success) {
            setCategory(response); // Set the category data directly from the response
          } else {
            setNotFound(true); // If not found, show 404
          }
  
          setLoading(false);
        } catch (error) {
          console.error('Category not found:', error);
          setNotFound(true);
          setLoading(false);
        }
      };
  
      fetchCategory();
    }, [slug]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (notFound) {
      return (
        <div>
          <h1>404 - Category Not Found</h1>
          <p>The category you're looking for does not exist.</p>
          <Link to="/" className="btn-home">
            Go to Home Page
          </Link>
        </div>
      );
    }
  
   
  
    return (
      <div>
        <h1>{category?.category_name || 'Category Not Found'}</h1>
        <p>{category?.category_description || 'Description not available.'}</p>
        {/* Add more category-specific content as needed */}
      </div>
    );
  };
  
  export default CategoryPage;