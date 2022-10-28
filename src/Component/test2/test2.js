import React from 'react'
import style from './test2.module.css'

function test2() {

  const test2 = () => {
    console.log('blue')
  }
  return (
    <div className={style.test2}
    onClick={test2}
    ></div>
  )
}

export default test2