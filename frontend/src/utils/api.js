class Api {
  constructor (config) {
    this._url = config.url
    this._headers = config.headers
    this._authorization = config.headers.authorization // token
  }

  _getResponseData (res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }
  getUserInfo () {
    // 1. Загрузка информации о пользователе с сервера
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: {
    'Content-Type': 'application/json'
  }
    }).then(res => this._getResponseData(res))
  }

  getInitialCards () {
    // 2. Загрузка карточек с сервера
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
        }
    }).then(res => this._getResponseData(res))
  }

  sendUserInfo (profileData) {
    // 3. Редактирование профиля
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    }).then(res => this._getResponseData(res))
  }

  addNewCard ({ name, link }) {
    // 4. Добавление новой карточки
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    }).then(res => this._getResponseData(res))
  }

  deleteCard (cardId) {
    // 7. Удаление карточки
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._getResponseData(res))
  }
  // Метод изменения кнопки лайка
  changeLikeCardStatus (cardId, isLiked) {
    if (isLiked) {
      return this.deleteCardLike(cardId)
    } else {
      return this.putCardLike(cardId)
    }
  }

  // Метод отправки лайка на сервер
  putCardLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._getResponseData(res))
  }
  // Метод удаления лайка с сервера
  deleteCardLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._getResponseData(res))
  }

  // 9. Обновление аватара пользователя
  changeAvatar (avatarUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatarUrl)
    }).then(res => this._getResponseData(res))
  }
}

export const api = new Api({
  url: 'https://api.me.students.nomoredomainsrocks.ru',
  // url: 'http://localhost:3001',
  headers: {
    // authorization: '44f88861-7aa4-4c69-b219-337a1c6a7261',
    'Content-Type': 'application/json'
  }
})
