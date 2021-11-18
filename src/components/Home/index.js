import Slider from 'react-slick'
import {FcGenericSortingDesc} from 'react-icons/fc'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantItem from '../RestaurantItem'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    carouselData: {},
    restaurantData: [],
    initialStatus: apiStatusConstants.initial,
    restaurantStatus: apiStatusConstants.initial,
    sortBy: 'Lowest',
    search: '',
    offset: 0,
    limit: 9,
    total: '',
    activePage: 1,
  }

  componentDidMount() {
    this.getOffersData()
    this.getRestaurantData()
  }

  setOptions = event => {
    this.setState({sortBy: event.target.value}, this.getRestaurantData)
  }

  forwardPage = () => {
    const {total, activePage} = this.state
    if (total > activePage) {
      this.setState(
        prevState => ({
          offset: prevState.offset + 9,
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantData,
      )
    }
  }

  backwardPage = () => {
    const {activePage} = this.state
    if (activePage > 0) {
      this.setState(
        prevState => ({
          offset: prevState.offset - 9,
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantData,
      )
    }
  }

  changeDataCase = data => {
    const obtainedData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      groupByTime: data.group_by_time,
      hasOnlineDelivery: data.has_online_delivery,
      hasTableBooking: data.has_table_booking,
      id: data.id,
      imageUrl: data.image_url,
      isDeliveringNow: data.is_delivering_now,
      location: data.location,
      menuType: data.menu_type,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.user_rating.rating,
      ratingColor: data.user_rating.rating_color,
      ratingText: data.user_rating.rating_text,
      totalReviews: data.user_rating.total_reviews,
    }
    return obtainedData
  }

  getRestaurantData = async () => {
    this.setState({
      restaurantStatus: apiStatusConstants.inProgress,
    })
    const {sortBy, limit, offset, search} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const restaurantsUrl = `https://apis.ccbp.in/restaurants-list?search=${search}&offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(restaurantsUrl, options)
    if (response.ok) {
      const restaurantsList = await response.json()
      const reqData = restaurantsList.restaurants
      const resData = reqData.map(each => this.changeDataCase(each))
      const totalHotels = restaurantsList.total
      const pages = Math.ceil(totalHotels / 9)
      this.setState({
        restaurantData: resData,
        restaurantStatus: apiStatusConstants.success,
        total: pages,
      })
    } else {
      this.setState({
        restaurantStatus: apiStatusConstants.failure,
      })
    }
  }

  getOffersData = async () => {
    this.setState({
      initialStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const offersData = await response.json()
      const fetchedData = offersData.offers.map(each => ({
        id: each.id,
        carouselImageUrl: each.image_url,
      }))
      this.setState({
        carouselData: [...fetchedData],
        initialStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        initialStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const {carouselData} = this.state
    return (
      <Slider {...settings}>
        {carouselData.map(each => (
          <li key={each.id} className="list-order">
            <img
              src={each.carouselImageUrl}
              alt="offer"
              className="carousel-image"
            />
          </li>
        ))}
      </Slider>
    )
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <h1 className="product-failure-text">Oops! Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div
      className="products-loader-container"
      data-testId="restaurants-offers-loader"
    >
      <Loader type="Circles" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantSuccessView = () => {
    const {restaurantData} = this.state
    return (
      <ul className="list-order">
        {restaurantData.map(e => (
          <RestaurantItem key={e.id} item={e} />
        ))}
      </ul>
    )
  }

  renderRestaurantLoadingView = () => (
    <div
      className="products-loader-container"
      data-testId="restaurants-list-loader"
    >
      <Loader type="Circles" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderCarouselItem = () => {
    const {initialStatus} = this.state

    switch (initialStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderRestaurantList = () => {
    const {restaurantStatus} = this.state

    switch (restaurantStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderRestaurantLoadingView()
      default:
        return null
    }
  }

  renderPaginationButtons = () => {
    const {activePage, total} = this.state
    return (
      <div className="pagination">
        <button
          type="button"
          data-testid="pagination-left-button"
          className="pagination-button"
          onClick={this.backwardPage}
        >
          <AiOutlineLeft className="styling-pagination-icon" />
        </button>
        <p className="style-paging">
          <span data-testid="active-page-number">{activePage}</span>of
          <span>{total}</span>
        </p>
        <button
          type="button"
          data-testid="pagination-right-button"
          className="pagination-button"
          onClick={this.forwardPage}
        >
          <AiOutlineRight className="styling-pagination-icon" />
        </button>
      </div>
    )
  }

  render() {
    const {sortBy} = this.state
    return (
      <div>
        <Header />
        <div className="product-container">
          {this.renderCarouselItem()}
          <div>
            <div className="set-introduction">
              <div>
                <h1 className="popular-restaurants">Popular Restaurants</h1>
                <p className="restaurants-tag">
                  Select Your favourite restaurant special dish and make your
                  day happy
                </p>
              </div>
              <div className="sort-by">
                <FcGenericSortingDesc className="sort-icon" />
                <p className="tag">Sort By</p>
                <select
                  value={sortBy}
                  onChange={this.setOptions}
                  className="select-tag"
                >
                  {sortByOptions.map(each => (
                    <option key={each.id} value={each.value}>
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr />
            {this.renderRestaurantList()}
            {this.renderPaginationButtons()}
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Home