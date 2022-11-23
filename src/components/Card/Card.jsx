import { Component } from 'react'

import Stars from '../Stars/Stars'

export default class Card extends Component {
  render() {
    const { name, description, pathToPoster, date, rate } = this.props
    let img = !pathToPoster.includes('null') ? (
      <img src={pathToPoster} alt={name} className="movies__img" />
    ) : (
      <span className="movies__img">No image</span>
    )
    return (
      <>
        {img}
        <div className="movies__description">
          {/* <div className="movie__container"> */}
          <h5 className="movies__name">{name}</h5>
          <p className="movies__rate">{rate}</p>
          {/* </div> */}

          <p className="movies__date">{date}</p>
          <p className="movies__jenres">
            <span className="movies__jenre">Drama</span>
            <span className="movies__jenre">Action</span>
          </p>
          <p className="movies__intro">{description}</p>
          <Stars rate={rate} />
        </div>
      </>
    )
  }
}
