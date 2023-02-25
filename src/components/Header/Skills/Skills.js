import React from 'react'
import html from './Html.png'
import css from './css.jpg'
import Java from './JavaScript.jpg'
import node from './node.jpg'
import './skills.css'
export default function Skills() {
  return (
    <div id='skills'>
        <div className="d-flex margin-top mb-5 justify-content-center">
            <p className='display-4 color'>My Tech Stack</p>
        </div>
        <div className="d-flex flex-row justify-content-center">
            <div className="p-2"><img src={html} alt="" className='img-fluid h-auto-img'/></div>
            <div className="p-2"><img src={css} alt="" className='img-fluid h-auto-img' /></div>
            <div className="p-2"><img src={Java} alt="" className='img-fluid h-auto-img' /></div>
            <div className="p-2"><img src={node} alt="" className='img-fluid h-auto-img' /></div>
        </div>
    </div>
  )
}
