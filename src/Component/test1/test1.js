import React from 'react'



import './test1.css'

import Test2 from '../test2/test2';
function test1() {

    const test_click = () => {
        console.log('red click')
    }
  return (
    <div className="main-test2" onClick={test_click}>
        <Test2></Test2>
    </div>
  )
}

export default test1