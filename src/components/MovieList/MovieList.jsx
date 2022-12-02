import { Component } from 'react'
import './MovieList.css'

import Card from '../Card/Card'
import Loading from '../Loading/Loading'

export default class MovieList extends Component {
  render() {
    const { movieData, cardError, evaluate } = this.props

    const movies = movieData.map((movie) => {
      const { id, ...movieData } = movie
      const load = movie.loading ? <Loading /> : null
      const card = !movie.loading ? <Card {...movieData} cardError={cardError} evaluate={evaluate} /> : null
      return (
        <li className="movies__card" id={id} key={id}>
          {load}
          {card}
        </li>
      )
    })

    return <ul className="movies">{movies}</ul>
  }
}
