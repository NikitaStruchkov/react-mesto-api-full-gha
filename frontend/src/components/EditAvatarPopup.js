import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar }) {
  const ref = React.useRef() // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit (e) {
    e.preventDefault()

    onUpdateAvatar({
      avatar: ref.current.value
    })
  }

  React.useEffect(() => {
    ref.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      name='avatar-change'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      buttonName='Сохранить'
      onSubmit={handleSubmit}
      children={
        <>
          <input
            id='avatar-url'
            type='url'
            className='popup__text-area popup__text-area_avatar-url'
            name='avatarUrl'
            placeholder='Cсылка на новый аватар:'
            required=''
            ref={ref}
          />
          <span id='error-avatar-url' className='popup__error-text' />
        </>
      }
    />
  )
}
