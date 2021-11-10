import React from 'react'
import './SingleCard.css'

export default function SingleCard({ card, choiceCard }) {

    const cardClick = () => {
        choiceCard(card)
    }
    return (
        <>
            <div className="card">
                <img className="back" src="/img/cover.png" onClick={cardClick} alt="Card back" />
                <img className="front" src={card.src} alt="Card front" />
            </div>
        </>
    )
}
