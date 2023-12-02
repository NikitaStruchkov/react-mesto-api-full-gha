export const BASE_URL = 'https://api.me.students.nomoredomainsrocks.ru/'
// export const BASE_URL = 'http://localhost:3001/'

const handleResponse = (
  res // обработчик ответа
) => (res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))

export const register = (email, password) => {
  return (
    fetch(`${BASE_URL}signup`, {
      // Эндпоинт
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(handleResponse)
  )
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    // Эндпоинт
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(handleResponse)
    .then(data => {
        localStorage.setItem('userId', data._id)
        return data;
    })
}

/**
 *  Функция checkToken() принимает в качестве параметра один аргумент — JWT. Он будет отправлен на сервер (API) по маршруту /users/me, и, если токен действителен, вернёт ответ с информацией о пользователе.
 * 
 */
export const checkToken = token => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`
    }
  })
    .then(handleResponse) 
}



