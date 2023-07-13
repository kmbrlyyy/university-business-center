import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function InformationScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { customerInfo },
  } = state;

  const [fullName, setFullName] = useState(customerInfo.fullName || '');
  const [contactNumber, setContactNumber] = useState(
    customerInfo.contactNumber || ''
  );
  const [address, setAddress] = useState(customerInfo.address || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/customer-information');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_CUSTOMER_INFORMATION',
      payload: {
        fullName,
        contactNumber,
        address,
      },
    });
    localStorage.setItem(
      'customerInfo',
      JSON.stringify({
        fullName,
        contactNumber,
        address,
      })
    );
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Customer Information</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Customer Information</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              className="form-field"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              className="form-field"
              value={contactNumber}
              required
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              className="form-field"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="none" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
