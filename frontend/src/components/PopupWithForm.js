import React from 'react'

function PopupWithForm ({
  isOpen,
  onClose,
  name,
  title,
  buttonName,
  children,
  onSubmit
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <form
          className={`popup__content popup__content_type_${name}`}
          noValidate=''
          onSubmit={onSubmit}
        >
          <h3 className='popup__head'>{title}</h3>
          {children}
          <button
            type='submit'
            className='popup__save'
            disabled=''
          >
            {buttonName}
          </button>
        </form>
        <button className='popup__close' type='button' onClick={onClose} />
      </div>
    </div>
  )
}

export default PopupWithForm

// className='popup__save popup__save_type_edit'
// className='popup__save popup__save_type_add popup__save_disabled'
// className='popup__save'
// className='popup__save'
