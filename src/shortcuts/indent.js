import React from 'react'
import { store } from '../store.js'

// util
import {
  getNextRank,
  contextOf,
  prevSibling,
  restoreSelection,
  rootedContextOf,
  headValue,
  headRank,
} from '../util.js'

const indentSVG = ({ fill = 'black', size = 20 }) => <svg version="1.1" className="icon" xmlns="http://www.w3.org/2000/svg" width={size} height={size} style={{ fill }} viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
    <path d="m10 12h44c1.104 0 2-.896 2-2s-.896-2-2-2h-44c-1.104 0-2 .896-2 2s.896 2 2 2z"/>
    <path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/>
    <path d="m54 19h-20c-1.104 0-2 .896-2 2s.896 2 2 2h20c1.104 0 2-.896 2-2s-.896-2-2-2z"/>
    <path d="m54 30h-20c-1.104 0-2 .896-2 2s.896 2 2 2h20c1.104 0 2-.896 2-2s-.896-2-2-2z"/>
    <path d="m54 41h-20c-1.104 0-2 .896-2 2s.896 2 2 2h20c1.104 0 2-.896 2-2s-.896-2-2-2z"/>
    <path d="m10 34h11.172l-.005.005c-1.201 1.201-2.196 2.581-2.956 4.101-.494.988-.094 2.189.895 2.684.287.143.592.21.892.21.734 0 1.44-.404 1.791-1.105.567-1.135 1.31-2.164 2.206-3.062l3.419-3.419c.781-.781.781-2.047 0-2.828l-3.419-3.419c-.897-.898-1.64-1.928-2.206-3.061-.494-.987-1.692-1.391-2.684-.895-.987.494-1.389 1.695-.895 2.683.759 1.519 1.753 2.898 2.956 4.101l.006.005h-11.172c-1.104 0-2 .896-2 2s.896 2 2 2z"/>
</svg>

/** Returns a function that calls the given function once then returns the same result forever */
function perma(f) {
  let result = null // eslint-disable-line fp/no-let
  return (...args) => result || (result = f(...args))
}

export default {
  id: 'indent',
  name: 'Indent',
  description: `Move the current thought to the end of the previous thought.`,
  keyboard: { key: 'Tab' },
  svg: indentSVG,
  exec: e => {
    const { cursor } = store.getState()
    const prev = perma(() => prevSibling(headValue(cursor), rootedContextOf(cursor), headRank(cursor)))
    if (cursor && prev()) {

      // store selection offset before existingThoughtMove is dispatched
      const offset = window.getSelection().focusOffset

      const cursorNew = contextOf(cursor).concat(prev(), {
          value: headValue(cursor),
          rank: getNextRank(contextOf(cursor).concat(prev()))
        })

      store.dispatch({
        type: 'existingThoughtMove',
        oldPath: cursor,
        newPath: cursorNew
      })

      restoreSelection(cursorNew, { offset })
    }
  }
}
