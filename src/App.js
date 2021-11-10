import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './SingleCard';

// Todo : 전부 매칭이 이루어진 후에는 'Well done!'이라는 레이어팝업을 강력하게 넣어주고 싶다!

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
  const [wait, setWait] = useState(false)
  // wait 이전에 선택했던 카드들에 대한 처리가 끝나기 전에 사용자가 바바박 선택하는 걸 방지.

  const shuffle = () => {
    const cardList = [...cardImgs, ...cardImgs]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setSelection01(null)
    setSelection02(null)
    console.clear()
    setCards(cardList)
    setTurns(0)
  }

  // User choice
  const choiceCard = (cardInfo) => {
    selection01 ? setSelection02(cardInfo) : setSelection01(cardInfo)
  }

  // compare cards
  useEffect(() => {
    if (selection01 && selection02) {
      setWait(true)
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
    setWait(false)
  }
  return (
    <div className="App">
      <h1 className="genieTest">genitest</h1>
      <button onClick={shuffle}>New Game</button>

      <p className="turns"> Your turns : {turns} </p>
      <div className="card-spread">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            choiceCard={choiceCard}

            // prop을 이렇게 처리해서 넘겨줄 수 있다는 것도 인상적이었다.
            flip={card === selection01 || card === selection02 || card.matched == true}
            wait={wait}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
