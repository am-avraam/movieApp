// import AlertByError from '../components/Alert/Alert'
import format from 'date-fns/format'

export default class MovieRequest {
  _apiBase = 'https://api.themoviedb.org/3/search/movie'
  _apiKey = 'api_key=6a2dba1cf42e77b0077aa2784f3cd0bf'
  _langQuery = 'language=en-US'
  _contentToAdults = 'include_adult=false'

  id = 0

  cutArticle = (title, description) => {
    if (title.length < 19) {
      return description.slice(0, description.indexOf(' ', 110)) + '...'
    } else return description.slice(0, description.indexOf(' ', 70)) + '...'
  }

  async getResource(pageNum = 1, queryStr = 'return') {
    let page = `page=${pageNum}`
    let query = `query=${queryStr}`

    let fullApi = `${this._apiBase}?${this._apiKey}&${this.langQuery}&${query}&${page}&${this._contentToAdults}`

    const res = await fetch(fullApi)

    if (!res.ok) {
      throw new Error('Something went wrong')
    }
    return await res.json()

    // return <AlertByError />
  }

  async getMovieList(pageNum) {
    const resp = await this.getResource(pageNum)
    console.log(resp)
    let preparedToRender = resp.results.map((el) => {
      return {
        id: this.id++,
        name: el.original_title,
        jenres: el.genre_ids,
        description: this.cutArticle(el.original_title, el.overview),
        pathToPoster: `https://image.tmdb.org/t/p/original/${el.poster_path}`,
        date: format(new Date(el.release_date), 'MMMM d, yyyy'),
        loading: false,
        rate: el.vote_average,
      }
    })

    return preparedToRender.slice(0, 6)
  }
}
