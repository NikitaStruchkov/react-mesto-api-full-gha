import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register ({ onRegister }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    // отслеживание ввода данных в импуты
    const { name, value } = e.target

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = e => {
    // сабмит формы
    e.preventDefault() // отмена перезагрузки страницы при сабмите формы
    onRegister(formValue)
  }

  return (
    <div className='register'>
      <p className='register__welcome'>Регистрация</p>
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
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className='register__signin'>
        <p>Уже зарегистрированы?</p>
        <Link to='/sign-in' className='register__login-link'>
          Войти
        </Link>
      </div>
    </div>
  )
}

// Register — компонент регистрации пользователя с необходимыми стейт-переменными.

// при вводе данных отправить их в стейт
// при сабмите формы отпраить данные на бэк
// если все хорошо, то отправить на логин
// если нет - показать ошибку
