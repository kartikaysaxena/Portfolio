import React from 'react'

export default function Work() {
  return (
    <div className='margin-top margin-bottom' id='work'>

        <div className="d-flex justify-content-center">
            <p className='display-3'>My Works.</p>
        </div>
        <div className="d-flex margin-bottom justify-content-center">
            <div className="display-3">Cause it matters</div>
        </div>
        <hr />
        <div className="d-flex flex-row justify-content-center">
            <div className="p-2">
                <p className="display-4 color">Weather App</p>
                <p>Made a weather API using JavaScript, React, integrated API for real time weather updates, hosted it using netlify</p>
                <p className="color"><a href="https://subtle-stardust-f76416.netlify.app">Link →</a></p>
            </div>

        </div>
        <div >
        <hr />
                <p className="display-4 color">Memory Game</p>
                <p>Made a memory game using JavaScript, hosted it using github</p>
                <p className="color"><a href="https://kartikaysaxena.github.io/memory.html">Link →</a></p>
        </div>
        <hr />
    </div>
  )
}
