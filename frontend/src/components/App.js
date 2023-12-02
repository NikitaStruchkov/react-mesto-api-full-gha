 import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ImagePopup from './ImagePopup'
import { api } from '../utils/api'
import React, { useState, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import AddPlacePopup from './AddPlacePopup'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ProtectedRouteElement from './ProtectedRoute'
import * as auth from '../utils/auth.js'
import InfoTooltip from './InfoTooltip'

function App () {
  const [loggedIn, setLoggedIn] = useState(false) // вошёл пользователь в систему или нет
  const [emailUser, setEmailUser] = useState('') // email для header
  const [successfulRegister, setSuccessfulRegister] = useState(false) // успешная регистрация
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  // Создайте стейт currentUser в корневом компоненте
  const [currentUser, setCurrentUser] = useState({})
  // список карточек
  const [cards, setCards] = React.useState([])

  const navigate = useNavigate()

  const handleLogin = formValue => {
    // ЛОГИН
    if (!formValue.email || !formValue.password) {
      return
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then(() => {
          setLoggedIn(true)
          navigate('/')
          setEmailUser(formValue.email)
      })
      .catch(err => console.log(err))
  }

  /**
 * если у пользователя есть токен в localStorage,
    эта функция проверит валидность токена
 * 
 */    

  const handleToken = () => {
    const jwt = localStorage.getItem('userId')
    if (!jwt) {
      setLoggedIn(false)
      return
    }
    // проверим токен
    auth
      .checkToken(jwt)
      .then(res => {
        if (res) {
          // Сохраняем токен в локальном хранилище
          localStorage.setItem('userId', res.token);
          // авторизуем пользователя
          setLoggedIn(true)
          setEmailUser(res.data.email)
          navigate('/', { replace: true })
        } else {
          setLoggedIn(false)
        }
      })
      .catch(err => console.log(err))
  }

  const handleRegister = formValue => {
    // РЕГИСТРАЦИЯ
    auth
      .register(formValue.email, formValue.password)
      .then(res => {
        setInfoTooltipPopupOpen(true)
        setSuccessfulRegister(true)
        navigate('/sign-in', { replace: true })
      })
      .catch(err => {
        setInfoTooltipPopupOpen(true)
        setSuccessfulRegister(false)
        console.log(err)
      })
  }

  const handleExit = () => {
    // ВЫХОД
    setLoggedIn(false)
    localStorage.removeItem('userId')
    navigate('/sign-in')
  }

  useEffect(() => {
    handleToken()
  }, [])

  // «Реакт» вызовет этот колбэк после того, как компонент будет смонтирован или обновлён.
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user)
          setCards(cards)
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn])

  // фиксим скачек при перезагрузки главной страницы
  // if (loggedIn === undefined) {
  //   return null // здесь можно добавить спинер загрузки
  // }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = card => {
    setSelectedCard(card)
  }

  // обработчик закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setInfoTooltipPopupOpen(false)
    setSelectedCard(null)
  }

  // Поддержка лайков и дизлайков
  const handleCardLike = card => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    // const isLiked = card.likes.some(i => i._id === currentUser._id)
    const isLiked = card.likes.some((id) => String(id) === String(currentUser._id));
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state =>
          state.map(currentCard =>
            currentCard._id === card._id ? newCard : currentCard
          )
        )
      })
      .catch(err => console.log(err))
  }

  // Поддержка удаления карточки
  const handleCardDelete = card => {
    // принимает удаленную карточку в качестве аргумента и передает в комп-нт Card через пропс onCardDelete
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards =>
          cards.filter(selectedCard => selectedCard._id !== card._id)
        )
      })
      // Метод filter() создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции.
      .catch(err => console.log(err))
  }

  // Теперь нужно создать обработчик в App. Назовите его handleUpdateUser и задайте его в виде нового пропса onUpdateUser для компонента EditProfilePopup. Внутри этого обработчика вызовите api.setUserInfo. После завершения запроса обновите стейт currentUser из полученных данных и закройте все модальные окна.
  const handleUpdateUser = data => {
    api
      .sendUserInfo(data)
      .then(newUser => {
        setCurrentUser(newUser)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  // В App добавьте handleUpdateAvatar, вызывающий api.setUserAvatar. Не забудьте обновлять аватар локально после завершения запроса.

  const handleUpdateAvatar = data => {
    api
      .changeAvatar(data)
      .then(userInfo => {
        setCurrentUser(userInfo)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  const handleAddPlaceSubmit = data => {
    api
      .addNewCard(data)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  // Компонент Provider имеет пропс value со значением,
  // которое нужно распространить всем дочерним элементам.
  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* 1. Создайте нужные роуты и опишите перенаправления
Вся функциональность приложения будет доступна только авторизованным пользователям по роуту /, поэтому реализуйте два дополнительных роута для неавторизованных пользователей:
/sign-up — для регистрации пользователя;
/sign-in — для авторизации пользователя.
Если неавторизованный пользователь приходит на сайт, он должен попадать на страницу входа, на какой бы роут он ни пришёл. */}

      <div className='app'>
        <div className='container'>
          {/* header */}
          <Header onSignOut={handleExit} email={emailUser} />
          <Routes>
            <Route
              path='/sign-up'
              element={<Register onRegister={handleRegister} />}
            />
            <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
            <Route
              path='/'
              element={
                <ProtectedRouteElement
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>

          {/* popup "Редактировать профиль" */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          {/* popup «Новое место» */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
          />
          {/* popup «Обновить аватар» */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* Открытие попапа с картинкой */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          {/* Компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации. */}
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            successfulRegister={successfulRegister}
          />

          {/* footer */}
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
