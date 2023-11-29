import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main ({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
      {/* profile */}
      <section className='profile container__profile'>
        <div className='profile__info'>
          <div className='profile__overlay' onClick={onEditAvatar}>
            <div
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              className='profile__avatar'
            ></div>
            <div className='profile__change-avatar-icon' />
          </div>
          <div className='profile__text'>
            <div className='profile__box'>
              <h1 className='profile__title'>{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                aria-label='редактировать'
                type='button'
                className='profile__edit-button'
              />
            </div>
            <p className='profile__subtitle'>{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type='button'
          className='profile__add-button'
        />
      </section>
      {/* elements */}
      <section aria-label='карточки' className='elements'>
        {cards.map(card => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )
        })}
      </section>
    </main>
  )
}

export default Main
