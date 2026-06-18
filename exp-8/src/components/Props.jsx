import React from 'react'

function Props(props) {
  return (
    <>
    <div style={{display:'flex', gap:'20px', margin:'0 auto', padding:'4px'}}>

    <div style={{backgroundColor:'#f5f5f5', padding:'0 20px'}}>
     <h1>{props.name}</h1>
     <h2>{props.rollno}</h2>
     <h3>{props.course}</h3>
     </div>
     <div style={{backgroundColor:'#f5f5f5', padding:'0 20px'}}>
     <h1>{props.name}</h1>
     <h2>{props.rollno}</h2>
     <h3>{props.course}</h3>
     </div>
     <div style={{backgroundColor:'#f5f5f5', padding:'0 20px'}}>
     <h1>{props.name}</h1>
     <h2>{props.rollno}</h2>
     <h3>{props.course}</h3>
     </div>
     </div>
    </>
  )
}
export default Props
