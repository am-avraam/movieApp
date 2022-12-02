import format from 'date-fns/format'

export default class MovieRequest {
  _apiBase = 'https://api.themoviedb.org/3/search/movie'
  _apiKey = 'api_key=6a2dba1cf42e77b0077aa2784f3cd0bf'
  _langQuery = 'language=en-US'
  _contentToAdults = 'include_adult=false'

  id = 0

  cutArticle = (title, description) => {
    let resArr = []
    if (title && title.length > 50) {
      title = title.slice(0, title.indexOf(' ', 50)) + '...'
    }
    if (title && title.length < 14) {
      description = description.slice(0, description.indexOf(' ', 150)).replace(/\.$|,$|;$/, '') + '...'
    } else if (title && title.length <= 29 && title.length >= 14) {
      description = description.slice(0, description.indexOf(' ', 120)).replace(/\.$|,$|;$/, '') + '...'
    } else {
      description = description.slice(0, description.indexOf(' ', 80)).replace(/\.$|,$|;$/, '') + '...'
    }
    resArr.push(title, description)
    return resArr
  }

  async getResource(pageNum = 1, queryStr = 'return', search = true) {
    let sessionID = `guest_session/${localStorage.getItem('movieGuestSession')}/`
    let params = 'language=en-US&sort_by=created_at.asc'
    let urlToRated = `https://api.themoviedb.org/3/${sessionID}rated/movies?${this._apiKey}&${params}`

    let page = `page=${pageNum}`
    let query = `query=${queryStr}`

    let fullApi = `${this._apiBase}?${this._apiKey}&${this.langQuery}&${query}&${page}&${this._contentToAdults}`
    if (search === false) {
      fullApi = urlToRated
    }

    const res = await fetch(fullApi)

    if (!res.ok) {
      throw new Error('Something went wrong')
    }
    return await res.json()
  }

  async getMovieList(pageNum, query, search) {
    let rated
    if (search) {
      rated = await this.getResource(pageNum, query, !search)
      rated = rated.results
    }

    const resp = await this.getResource(pageNum, query, search)

    const pageCount = resp.total_pages

    let rating
    let preparedToRender = resp.results.map((el) => {
      rating = ''
      if (rated) {
        el.id ==
          rated.forEach((underRate) => {
            if (underRate.id == el.id) {
              rating = underRate.rating
              return true
            }
          })
      }
      let date = null
      if (el.release_date) {
        date = format(new Date(el.release_date), 'MMMM d, yyyy')
      } else if (el.first_air_date) {
        date = format(new Date(el.first_air_date), 'MMMM d, yyyy')
      }

      let name = el.original_title || el.name
      let cutDescription = this.cutArticle(name, el.overview)
      return {
        id: this.id++,
        name: cutDescription[0],
        jenres: el.genre_ids,
        description: cutDescription[1],
        pathToPoster: `https://image.tmdb.org/t/p/original/${el.poster_path}`,
        date: date,
        loading: false,
        averageRate: el.vote_average.toFixed(1),
        rate: rating || el.rating ? rating || el.rating : 0,
        movieID: el.id,
      }
    })

    const responseArr = [preparedToRender, pageCount]

    return responseArr
  }
}
