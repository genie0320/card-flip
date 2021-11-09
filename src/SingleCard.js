import React from 'react'
import './SingleCard.css'

export default function SingleCard({ card }) {
    return (
        <>
            <div className="card">
                <img className="back" src="/img/cover.png" alt="Card back" />
                <img className="front" src={card.src} alt="Card front" />
            </div>
        </>
    )
}
