import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import logger from 'use-reducer-logger';
import { Store } from '../Store';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>TUP Business Center</title>
      </Helmet>
      <div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : userInfo && userInfo.isAdmin ? (
          <>
            <h1 className="my-3">Admin</h1>
            <div className="admin-homescreen">
              <div className="d-grid gap-3">
                <Link className="btn btn-lg" to="/admin/dashboard">
                  Dashboard
                </Link>
                <Link className="btn btn-lg" to="/admin/products">
                  Product List
                </Link>
                <Link className="btn btn-lg" to="/admin/orders">
                  Order List
                </Link>
                <Link className="btn btn-lg" to="/admin/users">
                  User List
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="my-3">Featured Products</h1>
            <div className="center-align">
              <Row>
                {products.map((product) => (
                  <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
