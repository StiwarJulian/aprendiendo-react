import { TURNS } from '../constants'
import { Square } from './Square'

// eslint-disable-next-line react/prop-types
export function TurnSelected ({ turn }) {
  return (
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
      </Square>
    </section>
  )
}
