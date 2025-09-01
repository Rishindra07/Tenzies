import React from 'react'
import Die from './Die'
import Confetti from 'react-confetti'
import { useWindowSize } from "react-use"

export default function Main() {

    const [dice, setDice] = React.useState(() => generateAllNewDice())
    const { width, height } = useWindowSize()
    const focusOnBtn = React.useRef(null)




    const gameWon = dice.every(die => die.isHeld)
        &&
        dice.every(die => dice[0].value === die.value)


    let btnValue = gameWon ? "New Game" : "Roll Dice"

    React.useEffect(()=>{
        if(gameWon){
            focusOnBtn.current.focus()
        }
        
    },[gameWon])


    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => (
                {
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false

                }))

    }


    function rollDice(event) {

        if (gameWon && btnValue === 'New Game') {
            setDice(generateAllNewDice())
        }

        setDice(oldDice => oldDice.map(die =>
            !die.isHeld ? {
                ...die,
                value: Math.ceil(Math.random() * 6)
            } :
                die
        ))
    }

    const diceElements = dice.map((d, index) => (
        <Die id={index} key={index} value={d.value} isHeld={d.isHeld} toggleEvent={toggleEvent} />

    )
    )

    function toggleEvent(id) {

        setDice(oldDice => {
            return oldDice.map((die, index) => {
                return id === index ?
                    { ...die, isHeld: !die.isHeld } : die
            })
        })
    }
    return (
        <div className='outer-box'>

            {gameWon && 
            <Confetti width={width} height={height} />}

            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <div className='inner-box'>
                <div className='group-55'>
                    <div className='group-54'>


                        {/* title */}
                        <div className='title-description'>
                            <h1>Tenzies</h1>
                            <p>Roll until all dice are the same.
                                Click each die to freeze it at its current value between rolls.</p>
                        </div>

                        {/* dice - numbers */}
                        <div className='dice'>

                            {diceElements}

                        </div>

                        {/* btn */}
                        <div className='button'>
                            <button ref={focusOnBtn} onClick={rollDice} value={btnValue}>
                                {btnValue}
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
