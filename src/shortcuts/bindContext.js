import React from 'react'
import { store } from '../store.js'

const bindContextSVG = ({ fill = 'black', size = 20 }) => <svg version="1.1" className="icon" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 19.481 19.481" enableBackground="new 0 0 19.481 19.481">
    <g>
        <path d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z" fill={fill} />
    </g>
</svg>

export default {
  id: 'bindContext',
  name: 'Bind Context',
  svg: bindContextSVG,
  description: 'Bind two different contexts of a thought so that they always have the same children.',
  gesture: 'rud',
  keyboard: { key: 'b', shift: true, meta: true },
  exec: () => {
    store.dispatch({ type: 'toggleBindContext' })
  }
}
