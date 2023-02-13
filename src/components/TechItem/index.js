import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStat = {
  success: 'SUCCESS',
  progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class TechItem extends Component {
  state = {apStatus: apiStat.progress, techItemList: []}

  componentDidMount() {
    this.getTechItem()
  }

  getTechItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const itemApi = `https://apis.ccbp.in/te/courses/${id}`

    const options = {
      method: 'GET',
    }

    const res = await fetch(itemApi, options)
    if (res.ok === true) {
      const resData = await res.json()

      const update = [resData.course_details].map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))

      this.setState({techItemList: update, apStatus: apiStat.success})
    } else {
      this.setState({apStatus: apiStat.failure})
    }
  }

  onRetry = () => {
    this.getTechItem()
  }

  renderSuccessed = () => {
    const {techItemList} = this.state
    const Techs = props => {
      const {item} = props
      const {id, name, imageUrl, description} = item
      return (
        <li id={id} className="item-container">
          <img src={imageUrl} alt={name} className="image-item" />
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </li>
      )
    }

    return (
      <div className="loader-container">
        {techItemList.map(each => (
          <Techs key={each.id} item={each} />
        ))}
      </div>
    )
  }

  renderLoad = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFail = () => (
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
    const {apStatus} = this.state
    switch (apStatus) {
      case apiStat.success:
        return this.renderSuccessed()
      case apiStat.progress:
        return this.renderLoad()
      case apiStat.failure:
        return this.renderFail()

      default:
        return null
    }
  }

  render() {
    //  const {techItemList} = this.state
    //  console.log(techItemList)
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

export default TechItem
