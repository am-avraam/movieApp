import { Component } from 'react'

import Stars from '../Stars/Stars'
import Loading from '../../services/Loading/Loading'
import './Card.css'
import { GuestSessionConsumer } from '../../services/GuestSessionContext'

export default class Card extends Component {
  state = {
    hasError: false,
    loaded: false,
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    })
  }

  notLoadedStyle = { display: 'none' }
  render() {
    let noPosterUrl =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png'
    const { cardError } = this.props
    if (this.state.hasError) {
      return cardError
    }

    const { name, description, pathToPoster, date, rate, averageRate, movieID, evaluate, jenres } = this.props

    let moviesRateClass = 'movies__rate'

    if (+averageRate < 3) {
      moviesRateClass += ' movies__rate_grade_fail'
    } else if (+averageRate <= 5) {
      moviesRateClass += ' movies__rate_grade_satisfactory'
    } else if (+averageRate <= 7) {
      moviesRateClass += ' movies__rate_grade_good'
    } else if (+averageRate > 7) {
      moviesRateClass += ' movies__rate_grade_verygood'
    }

    let poster = !pathToPoster.includes('null') ? pathToPoster : noPosterUrl
    let jenresToShow = (
      <GuestSessionConsumer>
        {(jenresList) => {
          if (jenresList) {
            let jenresArr = jenres.map((item) => {
              let aim = jenresList.find((el) => el.id == item)
              return aim.name
            })
            let jenresPrepared = jenresArr.slice(0, 3).map((jenre, id) => {
              return (
                <span key={id} className="movies__jenre">
                  {jenre}
                </span>
              )
            })
            return jenresPrepared
          }
        }}
      </GuestSessionConsumer>
    )

    return (
      <>
        {!this.state.loaded && <Loading />}
        <img
          className="movies__img"
          alt={name}
          style={!this.state.loaded ? this.notLoadedStyle : null}
          src={poster}
          onLoad={() => this.setState({ loaded: true })}
        />
        <div className="movies__description">
          <h5 className="movies__name">{name}</h5>
          <p className={moviesRateClass}>{averageRate}</p>

          <p className="movies__date">{date}</p>
          <p className="movies__jenres">
            {/* <span className="movies__jenre"></span>
            <span className="movies__jenre"></span> */}
            {jenresToShow}
          </p>
          <p className="movies__intro">{description}</p>
          <Stars rate={rate} movieID={movieID} evaluate={evaluate} />
        </div>
      </>
    )
  }
}
