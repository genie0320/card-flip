import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './SingleCard';

const cardImgs = [
  { "src": "/img/helmet-1.png", "matched": "false" },
  { "src": "/img/potion-1.png", "matched": "false" },
  { "src": "/img/ring-1.png", "matched": "false" },
  { "src": "/img/scroll-1.png", "matched": "false" },
  { "src": "/img/shield-1.png", "matched": "false" },
  { "src": "/img/sword-1.png", "matched": "false" }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [selection01, setSelection01] = useState(null)
  const [selection02, setSelection02] = useState(null)

  const shuffle = () => {
    const cardList = [...cardImgs, ...cardImgs]
      // .sort() => Math.random() 의 값이 0보다 작으면 swap, 크면 keep.
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    console.clear()
    setCards(cardList)
    setTurns(1)
  }

  // User choice
  const choiceCard = (cardInfo) => {
    selection01 ? setSelection02(cardInfo) : setSelection01(cardInfo)
    // console.log("sel01 : ", selection01)
  }

  // compare cards
  useEffect(() => {
    if (selection01 && selection02) {

      if (selection01.src === selection02.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === selection01.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        console.log('match!', turns)
        resetCard()
      } else {
        console.log('not match', turns)
        resetCard()
      }

      console.log(cards, turns)
    }
  }, [selection01, selection02])

  // card reset
  const resetCard = () => {
    setSelection01(null)
    setSelection02(null)
    setTurns(turns => turns + 1)
  }
  return (
    <div className="App">
      <h1 className="genieTest">genitest</h1>
      <button onClick={shuffle}>New Game</button>
      <div className="card-spread">
        {cards.map(card => (
          <SingleCard key={card.id} card={card} choiceCard={choiceCard} />
        ))}
      </div>
    </div>
  );
}

export default App;
