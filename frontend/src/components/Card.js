import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Card ({ card, onCardClick, onCardLike, onCardDelete }) {
  // клик по карточке
  const handleClick = () => {
    onCardClick(card)
  }
  // нажатие кнопки лайка
  const handleLikeClick = () => {
    onCardLike(card)
  }

  // удаление карточки
  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  // подписка на контекст
  const currentUser = React.useContext(CurrentUserContext)
  // Этот хук возвращает значение контекста, которое было передано в пропс value провайдера

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwnCard = card.owner === currentUser._id
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(id => id === currentUser._id)

  const cardLikeButtonClassName = isLiked
    ? 'element__like element__like_type_active'
    : 'element__like'

  return (
    <div className='element'>
      {isOwnCard && (
        <button
          type='reset'
          className='element__delete'
          onClick={handleDeleteClick}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className='element__photo'
        onClick={handleClick}
      />
      <div className='element__group'>
        <h2 className='element__name'>{card.name}</h2>
        <div className='element__like-area'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className='element__likes-quantity'>{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}
