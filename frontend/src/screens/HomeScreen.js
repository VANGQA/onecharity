import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import HeroSlider, {Slide} from 'hero-slider';

const takeaBanner="https://media.takealot.com/promotions/83540-top-banner.png";
const takedProduct="https://media.takealot.com/promotions/app-only-top-banner.png";
const afterProfuct="https://media.takealot.com/promotions/82109-top-banner.png";
const theProfuct="https://media.takealot.com/promotions/82109-top-banner.png";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <Carousel>
                <div>
                    <img src="https://media.takealot.com/promotions/83540-top-banner.png" />
                    
                </div>
                <div>
                    <img src="https://media.takealot.com/promotions/83540-top-banner.png" />
                    
                </div>
                <div>
                    <img src="https://media.takealot.com/promotions/83540-top-banner.png" />
                    
                </div>
                <div>
                    <img src="https://media.takealot.com/promotions/83540-top-banner.png" />
                   
                </div>
                
            </Carousel>
   
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
