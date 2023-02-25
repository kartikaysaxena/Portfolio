import React from 'react'
import git from './github.png'
export default function Contact() {
  return (
    <>
<div className="d-flex justify-content-center" id='contact'>

<span className="mb-3 mb-md-0 text-muted">
    <p className='h2'>Made with ❤️ by Kartikay.  </p>
    </span>

            <a href="https://github.com/kartikaysaxena">
              <img src={git} alt="" className='h-auto-img'/>
              </a>



      </div>
      </>
  )
}
