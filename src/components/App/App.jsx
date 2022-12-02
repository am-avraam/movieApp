import { Component } from 'react'
import './App.css'
import './../../styles'
import { Offline, Online } from 'react-detect-offline'

import MovieList from '../MovieList/MovieList'
import MovieRequest from '../../services/MovieRequest'
import GuestSession from '../../services/GuestSession'
import Pages from '../Pages/Pages'
import FormInput from '../FormInput/FormInput'
import SearchTab from '../SearchTab/SearchTab'
import Loading from '../Loading/Loading'
import AlertByError from '../AlertByError/AlertByError'
import { GuestSessionProvider } from '../GuestSessionContext/GuestSessionContext'

export default class App extends Component {
  offlineMessage = 'Sorry, you are out of network.'
  errorByCode = 'Sorry, the app has been broken'
  errorByCard = 'Sorry, the card cannot be shown'

  request = new MovieRequest()
  guestSession = new GuestSession()

  state = {
    request: '',
    movieData: [],
    error: [],
    loading: true,
    search: true,
    currentPage: 1,
    pagesCount: null,
    hasError: false,
    jenresList: [],
  }

  loadJenres = () => {
    this.guestSession.requestJenres().then((resp) => {
      this.setState(() => {
        return { jenresList: resp }
      })
    })
  }

  toggleSearch = () => {
    this.togglePage()
    this.toggleLoading()
    this.setState(({ search }) => {
      return { search: !search }
    })
  }

  toggleLoading = () => {
    this.setState(() => {
      return { loading: !this.state.loading }
    })
  }

  togglePage = (pageNum) => {
    this.toggleLoading()
    if (pageNum) {
      if (!this.state.search) {
        this.updateList(pageNum, undefined, this.state.search)
      } else this.updateList(pageNum, this.state.request)
      this.setState(() => {
        return {
          currentPage: pageNum,
        }
      })
    } else {
      this.setState({
        currentPage: 1,
      })
    }
  }

  onError = (err) => {
    this.setState({
      error: [true, err.message],
    })
  }

  updateList = (pageNum = 1, query = 'return', search = true) => {
    this.request
      .getMovieList(pageNum, query, search)
      .then((responseArr) => {
        this.setState(() => {
          return { movieData: responseArr[0], request: query, pagesCount: responseArr[1] }
        })
      })
      .catch(this.onError)
  }

  toSearch = (query) => {
    query = query ? query : 'return'
    this.updateList(1, query)
  }

  evaluate = (stars, movieID) => {
    this.guestSession.rate(stars, movieID).then()
    let changedCard = this.state.movieData.find((movie) => movie.movieID == movieID)
    changedCard = { ...changedCard, rate: stars }

    this.setState(({ movieData }) => {
      let newArr = movieData.map((el) => {
        if (el.id == changedCard.id) {
          el = changedCard
        }
        return el
      })
      return { movieData: newArr }
    })
  }

  componentDidMount() {
    this.loadJenres()
    this.guestSession.guestSessionInit()
    this.updateList()
  }

  componentDidUpdate(a, prev) {
    if (this.state.loading == true && prev.loading) {
      this.toggleLoading()
    }
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <AlertByError error={this.errorByCode} />
    }

    let loading = this.state.loading && !this.state.error.length ? <Loading /> : null

    let alertByErrorTemplate = <AlertByError error={this.state.error[1]} />
    let error = this.state.error[0] ? alertByErrorTemplate : null
    let cardError = <AlertByError error={this.errorByCard} />

    let searchInputTemplate = <FormInput toSearch={this.toSearch} togglePage={this.togglePage} />
    let searchInput = this.state.search ? searchInputTemplate : null

    let noResultWarningTemplate = <AlertByError error={'nothing'} />
    let noResultWarning = this.state.pagesCount != null && this.state.pagesCount < 1 ? noResultWarningTemplate : null

    let paginationTemplate = (
      <Pages togglePage={this.togglePage} currentPage={this.state.currentPage} totalPages={this.state.pagesCount} />
    )
    let pagination = this.state.pagesCount > 6 ? paginationTemplate : null

    let contentLoaded = !this.state.loading ? (
      <>
        <MovieList {...this.state} cardError={cardError} evaluate={this.evaluate} />
        {pagination}
      </>
    ) : null

    return (
      <>
        <Online>
          <GuestSessionProvider value={this.state.jenresList}>
            <div className="app">
              <SearchTab
                updateList={this.updateList}
                toggleSearch={this.toggleSearch}
                searchStatus={this.state.search}
              />
              {searchInput}
              {error}
              {noResultWarning}
              {loading}
              {contentLoaded}
            </div>
          </GuestSessionProvider>
        </Online>

        <Offline>
          <AlertByError error={this.offlineMessage} />
        </Offline>
      </>
    )
  }
}
