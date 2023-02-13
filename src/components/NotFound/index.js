import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="bg-container">
        <div className="head-container">
          <Link to="/" style={{textDecoration: 'none'}}>
            <img
              className="web-logo"
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>

        <div className="loader-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
            alt="not found"
            className="fail-img"
          />
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found.</p>
        </div>
      </div>
    )
  }
}

export default NotFound
