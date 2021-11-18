import {Link} from 'react-router-dom'

import {AiOutlineStar} from 'react-icons/ai'

import './index.css'

const RestaurantItem = props => {
  const {item} = props
  return (
    <Link to={`/restaurant/${item.id}`} className="restaurant-item-styling">
      <li data-testid="restaurant-item" className="restaurant-item-styling">
        <div className="restaurant-item">
          <div>
            <img
              src={item.imageUrl}
              alt="restaurant"
              className="restaurant-img"
            />
          </div>
          <div>
            <p className="restaurant-name">{item.name}</p>
            <p className="restaurant-menu">{item.menuType}</p>
            <div className="rating">
              <AiOutlineStar className="star-designing" />
              <p className="restaurant-rating">{item.rating}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
