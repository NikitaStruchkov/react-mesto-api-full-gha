import React, { useState } from 'react'

const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    onLogin(formValue)
  }

  return (
    <div className='register'>
      <p className='register__welcome'>Вход</p>
      <form onSubmit={handleSubmit} className='register__form'>
        <input
          id='username'
          name='email'
          type='email'
          placeholder='Email'
          value={formValue.email}
          onChange={handleChange}
        />

        <input
          id='password'
          name='password'
          type='password'
          placeholder='Пароль'
          value={formValue.password}
          onChange={handleChange}
        />

        <div className='register__button-container'>
          <button
            type='submit'
            onSubmit={handleSubmit}
            className='register__button'
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login

// при вводе данных отправить их в стейт
// при сабмите формы отпраить данные на бэк
// если все хорошо, то:
//   -получить токен от бэкенда
//   -куда-то его сохранить
//   -перенаправить на главную
// если нет - показать ошибку
