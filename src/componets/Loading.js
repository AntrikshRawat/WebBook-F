import React from 'react'
import "../index.css"
export default function Loading(props) {
  return (
          <div className= {`main d-${props.display}`}>
<div className="loading-wave">
  <div className="loading-bar"></div>
  <div className="loading-bar"></div>
  <div className="loading-bar"></div>
  <div className="loading-bar"></div>
</div>
</div>
  )
}
