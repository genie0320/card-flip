import { useState } from 'react';
import './App.css';
import SingleCard from './SingleCard';

const cardImgs = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const shuffle = () => {
    const cardList = [...cardImgs, ...cardImgs]
      // .sort() => Math.random() 의 값이 0보다 작으면 swap, 크면 keep.
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    console.clear()
    setCards(cardList)
    setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="App">
      <h1 className="genieTest">genitest</h1>
      <button onClick={shuffle}>New Game</button>
      <div className="card-spread">
        {cards.map(card => (
          <SingleCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
