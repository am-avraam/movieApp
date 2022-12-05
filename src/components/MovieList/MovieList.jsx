import { Component } from 'react'
import './MovieList.css'

import Card from '../Card/Card'
import Loading from '../../services/Loading/Loading'

const MovieList = ({ movieData, cardError, evaluate }) => {
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

export default MovieList
