import { useState } from 'react'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import confetti from 'canvas-confetti'
import { WinnerModal } from './components/WinnerModal.jsx'
import { Board } from './components/Board.jsx'
import { TurnSelected } from './components/TurnSelected.jsx'
import { resetGameStorage, saveGameStorage } from './logic/storage/index.js'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')

    return boardFromStorage? JSON.parse(boardFromStorage) : Array(9).fill(boardFromStorage)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')

    return turnFromStorage ?? TURNS.X 
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] !== null || winner) return
    
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameStorage({ board: newBoard, turn: newTurn })

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    resetGameStorage()
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>

      <Board board={board} updateBoard={updateBoard} />

      <TurnSelected turn={turn}/>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
