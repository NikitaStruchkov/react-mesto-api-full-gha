import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup ({ onSubmit, isOpen, onClose }) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handlePlaceNameChange (e) {
    setName(e.target.value)
  }

  function handlePlaceLinkChange (e) {
    setLink(e.target.value)
  }

  function handleSubmit (evt) {
    evt.preventDefault()
    onSubmit({ name, link })
  }

  React.useEffect(() => {
    if (isOpen) {
      setName('')
      setLink('')
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name='add-form'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      buttonName='Создать'
      onSubmit={handleSubmit}
      children={
        <>
          <input
            id='card-name'
            className='popup__text-area popup__text-area_card_name'
            type='text'
            name='name'
            placeholder='Название'
            minLength={2}
            maxLength={30}
            required=''
            onChange={handlePlaceNameChange}
            value={name}
          />
          <span id='error-card-name' className='popup__error-text' />
          <input
            id='card-url'
            className='popup__text-area popup__text-area_card_url'
            type='url'
            name='link'
            placeholder='Ссылка на картинку'
            required=''
            onChange={handlePlaceLinkChange}
            value={link}
          />
          <span id='error-card-url' className='popup__error-text' />
        </>
      }
    />
  )
}


// Если в инпуте есть onChange или onInput, то в этом же инпуте должен быть атрибут value.
// Именно так контролируются компоненты в Реакте.