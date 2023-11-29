import logo from '../images/logo.svg'
import { Link, useLocation } from 'react-router-dom'

function Header ({ onSignOut, email }) {
  // Хук useLocation возвращает объект текущего местоположения.
  const location = useLocation()

  return (
    <header className='header container__header'>
      <img className='header__logo' src={logo} alt='Логотип' />
      <div className='header__box'>
        {location.pathname === '/sign-in' && (
          <Link className='header__link' to='/sign-up'>
            Регистрация
          </Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link className='header__link' to='/sign-in'>
            Войти
          </Link>
        )}

        {location.pathname === '/' && (
          <>
            <p className='header__email'>{email}</p>
            <Link
              className='header__link'
              to='/sign-in'
              onClick={() => onSignOut()}
            >
              Выйти
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
