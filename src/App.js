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

  // Card flip
  const flip = (card) => {

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
        setTimeout(() => {
          resetCard()
        }, 1000);
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
          <SingleCard
            key={card.id}
            card={card}
            choiceCard={choiceCard}

            // Match처럼 따로 값을 관리하려 하였으나, flip의 경우 기존의 selection 값을 이용하는 것이 효율적
            // 클릭을 하는 순간, chiceCard() > setSelection 이 되고, 
            // useEffect()가 움직이면서 
            // rendering이 다시 이루어진다. 
            // 중요한 것은... SingleCard 로 넘어가면서 flip을 prop으로 가지고 간다는 점.
            // singleCard에는 hooks를 설정해놓지 않았기 때문에, 지금으로선 fix된 값을 넘겨주는 것이 간편.
            flip={card === selection01 || card === selection02 || card.matched == true}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
