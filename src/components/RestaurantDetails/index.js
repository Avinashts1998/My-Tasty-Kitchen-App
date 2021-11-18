import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'
import FoodItem from '../FoodItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    obtainedData: '',
    foodItems: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getItemData()
  }

  changeCase = data => {
    const obtainedData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      id: data.id,
      restaurantImageUrl: data.image_url,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      totalReviews: data.reviews_count,
    }
    return obtainedData
  }

  changeDataCaseForFoodItems = data => {
    const foodList = {
      cost: data.cost,
      foodType: data.food_type,
      itemId: data.id,
      itemImageUrl: data.image_url,
      name: data.name,
      rating: data.rating,
    }
    return foodList
  }

  getItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const formattedData = this.changeCase(fetchedData)
      const foodItems = fetchedData.food_items
      const foodData = foodItems.map(each =>
        this.changeDataCaseForFoodItems(each),
      )
      this.setState({
        obtainedData: formattedData,
        foodItems: foodData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderItemSuccessView = () => {
    const {obtainedData, foodItems} = this.state
    console.log(foodItems)

    return (
      <div>
        <div className="restaurant-details-top">
          <img
            src={obtainedData.restaurantImageUrl}
            alt="restaurant"
            className="restaurant-image"
          />
          <div className="individual-restaurant-details">
            <h1 className="restaurant-name-heading">{obtainedData.name}</h1>
            <p className="restaurant-name-para">{obtainedData.cuisine}</p>
            <p className="restaurant-name-para">{obtainedData.location}</p>
            <div className="rating-box">
              <div>
                <p className="rating-styling">
                  <AiFillStar /> {obtainedData.rating}
                </p>
                <p className="rating-reviews">
                  {obtainedData.totalReviews}+Ratings
                </p>
              </div>
              <hr />
              <div>
                <p className="rating-styling">
                  <BiRupee />
                  {obtainedData.costForTwo}
                </p>
                <p className="rating-reviews">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-display">
          {foodItems.map(each => (
            <FoodItem key={each.itemId} food={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div
      className="products-loader-container"
      data-testId="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <h1 className="product-failure-text">Oops! Something Went Wrong</h1>
    </div>
  )

  renderRestaurantList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderItemSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        {this.renderRestaurantList()}
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
