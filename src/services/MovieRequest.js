// import AlertByError from '../components/Alert/Alert'
import format from 'date-fns/format'

export default class MovieRequest {
  _apiBase = 'https://api.themoviedb.org/3/search/movie'
  _apiKey = 'api_key=6a2dba1cf42e77b0077aa2784f3cd0bf'
  _langQuery = 'language=en-US'
  _contentToAdults = 'include_adult=false'

  id = 0

  cutArticle = (title, description) => {
    if (title && title.length < 19) {
      return description.slice(0, description.indexOf(' ', 110)) + '...'
    } else return description.slice(0, description.indexOf(' ', 70)) + '...'
  }

  async getResource(pageNum = 1, queryStr = 'return', search) {
    let page = `page=${pageNum}`
    let query = `query=${queryStr}`

    let fullApi = `${this._apiBase}?${this._apiKey}&${this.langQuery}&${query}&${page}&${this._contentToAdults}`
    if (search === false) {
      fullApi = 'https://api.themoviedb.org/3/trending/all/week?api_key=6a2dba1cf42e77b0077aa2784f3cd0bf'
    }

    const res = await fetch(fullApi)

    if (!res.ok) {
      throw new Error('Something went wrong')
    }
    return await res.json()
  }

  async getMovieList(pageNum, query, search) {
    const resp = await this.getResource(pageNum, query, search)
    const pageCount = resp.total_pages

    let preparedToRender = resp.results.map((el) => {
      let date = null
      if (el.release_date) {
        date = format(new Date(el.release_date), 'MMMM d, yyyy')
      } else if (el.first_air_date) {
        date = format(new Date(el.first_air_date), 'MMMM d, yyyy')
      }

      let name = el.original_title || el.name
      return {
        id: this.id++,
        name: name,
        jenres: el.genre_ids,
        description: this.cutArticle(el.original_title, el.overview),
        pathToPoster: `https://image.tmdb.org/t/p/original/${el.poster_path}`,
        date: date,
        loading: false,
        rate: el.vote_average.toFixed(1),
      }
    })

    const responseArr = [preparedToRender.slice(0, 6), pageCount]

    return responseArr
  }
}
