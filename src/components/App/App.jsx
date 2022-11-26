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
  offlineMessage = 'Sorry, you are out of network.'
  request = new MovieRequest()

  state = {
    request: '',
    movieData: [],
    error: [],
    loading: true,
    search: true,
    currentPage: 1,
    pagesCount: null,
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

  updateList = (pageNum = 1, query = 'return', search = null) => {
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

  componentDidMount() {
    this.updateList()
    // this.toggleLoading()
  }

  componentDidUpdate(a, prev) {
    if (this.state.loading == true && prev.loading) {
      this.toggleLoading()
    }
  }

  render() {
    let alertByErrorTemplate = <AlertByError error={this.state.error[1]} />
    let paginationTemplate = <Pages togglePage={this.togglePage} currentPage={this.state.currentPage} />
    let searchInputTemplate = <FormInput toSearch={this.toSearch} togglePage={this.togglePage} />
    let noResultWarningTemplate = <AlertByError error={'nothing'} />
    let error = this.state.error[0] ? alertByErrorTemplate : null
    let loading = this.state.loading && !this.state.error.length ? <Loading /> : null
    let pagination = this.state.pagesCount > 6 ? paginationTemplate : null
    let searchInput = this.state.search ? searchInputTemplate : null
    let noResultWarning = this.state.pagesCount != null && this.state.pagesCount < 1 ? noResultWarningTemplate : null
    let contentLoaded = !this.state.loading ? (
      <>
        <MovieList {...this.state} />
        {pagination}
      </>
    ) : null

    return (
      <>
        <Online>
          <div className="app">
            <SearchTab updateList={this.updateList} toggleSearch={this.toggleSearch} searchStatus={this.state.search} />

            {searchInput}
            {error}
            {noResultWarning}
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
