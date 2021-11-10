import React from 'react'
import './SingleCard.css'

export default function SingleCard({ card, choiceCard, flip }) {
    const cardClick = () => {
        choiceCard(card)
    }
    return (
        <>
            <div className={flip ? "card flip" : "card"}>
                <img className="back" src="/img/cover.png" onClick={cardClick} alt="Card back" />
                <img className="front" src={card.src} alt="Card front" />
            </div>
        </>
    )
}
