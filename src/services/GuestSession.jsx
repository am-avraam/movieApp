export default class GuestSession {
  _apiKey = 'api_key=6a2dba1cf42e77b0077aa2784f3cd0bf'

  guestSessionInit = async () => {
    let address = `https://api.themoviedb.org/3/authentication/guest_session/new?${this._apiKey}`

    let sessionID = localStorage.getItem('movieGuestSession')

    if (!sessionID) {
      let initialization = await fetch(address)
      let initResponse = await initialization.json()

      localStorage.setItem('movieGuestSession', initResponse.guest_session_id)
    }
  }
  rate = async (value, filmID) => {
    let sessionID = `guest_session_id=${localStorage.getItem('movieGuestSession')}`

    let urlToPost = `https://api.themoviedb.org/3/movie/${filmID}/rating?${this._apiKey}&${sessionID}`

    let valueObj = {
      value: value,
    }

    await fetch(urlToPost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(valueObj),
    })
  }

  requestJenres = async () => {
    let urlToJanres = `https://api.themoviedb.org/3/genre/movie/list?${this._apiKey}&language=en-US`
    let res = await fetch(urlToJanres)
    res = await res.json()
    return res.genres
  }
}
