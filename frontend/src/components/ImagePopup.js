import React from 'react'

export default function ImagePopup ({ card, onClose }) {
  // console.log(card);
  return (
    <div className={`popup popup_type_full-img ${card ? 'popup_opened' : ''}`}>
      <div className='popup__img-container'>
        <img src={card?.link} alt={card?.name} className='popup__image' />
        <p className='popup__description'>{card?.name}</p>
        <button type='button' className='popup__close' onClick={onClose} />
      </div>
    </div>
  )
}
