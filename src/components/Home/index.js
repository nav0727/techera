import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {status: apiStatus.progress, techList: []}

  componentDidMount() {
    this.getTech()
  }

  getTech = async () => {
    const api = `https://apis.ccbp.in/te/courses`
    const options = {
      method: 'GET',
    }

    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logo: each.logo_url,
      }))
      this.setState({techList: updateData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  onRetry = () => {
    this.getTech()
  }

  renderSuccess = () => {
    const {techList} = this.state
    const Tech = props => {
      const {techItem} = props
      const {id, name, logo} = techItem
      return (
        <Link to={`/courses/${id}`} style={{textDecoration: 'none'}}>
          <li className="li-con">
            <img src={logo} alt={name} className="logo-img" />
            <p>{name}</p>
          </li>
        </Link>
      )
    }
    return (
      <div>
        <h1>Courses</h1>

        <ul className="ul-con">
          {techList.map(each => (
            <Tech key={each.id} techItem={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="loader-container">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-btn" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderTechs = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderSuccess()
      case apiStatus.progress:
        return this.renderLoading()
      case apiStatus.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    const {guideList} = this.state
    console.log(guideList)
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
        {this.renderTechs()}
      </div>
    )
  }
}

export default Home
