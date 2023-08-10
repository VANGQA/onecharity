import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

 

  useEffect(() => {
    dispatch(listProducts({}));
   
  }, [dispatch]);
  return (
     
    <div>
        <>
            <Carousel>
                <div>
                    <img src="https://m.media-amazon.com/images/I/51RPiINhM7L._SX1500_.jpg"  />
                    <p >Legend 1</p>
                </div>
                <div>
                    <img src="https://m.media-amazon.com/images/I/51RPiINhM7L._SX1500_.jpg"  />
                    <p >Legend 1</p>
                </div>
           
            </Carousel>
         </>
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
