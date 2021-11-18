import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const PaymentSuccessful = () => (
  <div>
    <Header />
    <div className="payment-page-bg">
      <h1 className="payment-status">Payment Successful</h1>
      <p className="description-payment">
        Thank you for ordering <br />
        Your payment is successfully completed.
      </p>
      <Link to="/" className="link-styling">
        <button type="button" className="home-page-redirecting">
          Go To Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default PaymentSuccessful
