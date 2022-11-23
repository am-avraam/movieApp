import { Component } from 'react'
import './../../styles'
import { Offline, Online } from 'react-detect-offline'

import MovieList from '../MovieList/MovieList'
import MovieRequest from '../../services/MovieRequest'
import Pages from '../Pages/Pages'
import FormInput from '../FormInput/FormInput'
import SearchTab from '../SearchTab/SearchTab'
import Loading from '../Loading/Loading'
import AlertByError from '../AlertByError/AlertByError'

export default class App extends Component {
  constructor() {
    super()
    this.updateList()
  }

  offlineMessage = 'Sorry, you are out of network.'
  request = new MovieRequest()
  id = 0

  state = {
    movieData: [],
    error: [],
    loading: true,
  }

  togglePage = (pageNum) => {
    this.updateList(pageNum)
  }

  onError = (err) => {
    this.setState({
      error: [true, err.message],
    })
  }

  updateList(pageNum = 1) {
    this.request
      .getMovieList(pageNum)
      .then((list) => {
        this.setState(() => {
          return { movieData: list, loading: false }
        })
      })
      .catch(this.onError)
  }

  render() {
    let error = this.state.error[0] ? <AlertByError error={this.state.error[1]} /> : null
    let loading = this.state.loading && !this.state.error.length ? <Loading /> : null

    let contentLoaded = !this.state.loading ? (
      <>
        <MovieList {...this.state} />
        <Pages togglePage={this.togglePage} />
      </>
    ) : null

    return (
      <>
        <Online>
          <div className="app">
            <SearchTab />
            <FormInput />
            {error}
            {loading}
            {contentLoaded}
          </div>
        </Online>

        <Offline>
          <AlertByError error={this.offlineMessage} />
        </Offline>
      </>
    )
  }
}
