import React from 'react'
import success from '../images/success.svg'
import fail from '../images/fail.svg'

export default function InfoTooltip ({ isOpen, onClose, successfulRegister }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <img
          className='popup__sign'
          alt={
            successfulRegister
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
          src={successfulRegister ? success : fail}
        />
        {/* "имя-блока__имя-элемента_имя-модификатора_значение-модификатора." */}
        <h3 className='popup__head popup__head_type_sign'>
          {successfulRegister
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
        <button className='popup__close' type='button' onClick={onClose} />
      </div>
    </div>
  )
}

// InfoTooltip — компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации.
