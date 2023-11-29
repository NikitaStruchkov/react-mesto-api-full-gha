import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext)
  const { name, about } = currentUser
  const [profileName, setProfileName] = React.useState('')
  const [profileDescription, setProfileDescription] = React.useState('')

  function handleNameChange (e) {
    setProfileName(e.target.value)
  }

  function handleDescriptionChange (e) {
    setProfileDescription(e.target.value)
  }
  // Сохраняйте данные в API
  function handleSubmit (e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: profileName,
      about: profileDescription
    })
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    if (isOpen) {
      setProfileName(name)
      setProfileDescription(about)
    }
  }, [isOpen, currentUser])

  return (
    <PopupWithForm
      name='edit-form'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName='Сохранить'
    >
      <>
        <input
          id='profile-name'
          className='popup__text-area popup__text-area_input_name'
          type='text'
          name='profile-name'
          minLength={2}
          maxLength={40}
          required=''
          onChange={handleNameChange}
          value={profileName}
        />
        <span id='error-profile-name' className='popup__error-text' />
        <input
          id='profile-job'
          className='popup__text-area popup__text-area_input_job'
          type='text'
          name='profile-job'
          minLength={2}
          maxLength={200}
          required=''
          onChange={handleDescriptionChange}
          value={profileDescription}
        />
        <span id='error-profile-job' className='popup__error-text' />
      </>
    </PopupWithForm>
  )
}
