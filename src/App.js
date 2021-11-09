import { useState } from 'react';
import './App.css';

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
          <div className='card' key={card.id}>
            <div>
              {/* 이 이미지의 렌더링이 이루어지는 곳은, index.html 즉, public의 공간이다. 이걸 잘 생각해서 경로를 넣자. */}
              {/* <img className="back" src="../public/img/cover.png" alt="Card back" /> */}
              <img className="back" src="/img/cover.png" alt="Card back" />
              <img className="front" src={card.src} alt="Card front" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
