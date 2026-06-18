import React, { useState } from 'react'

function UseState() {
  const [students, setStudents] = useState([
    { name: 'Alice', rollno: '101', course: 'CS' },
    { name: 'Bob', rollno: '102', course: 'IT' },
    { name: 'Charlie', rollno: '103', course: 'EE' }
  ]);

  return (
    <>
    <div style={{display:'flex', gap:'20px', margin:'0 auto', padding:'4px'}}>
      {students.map((student, index) => (
        <div key={index} style={{backgroundColor:'#f5f5f5', padding:'0 20px'}}>
          <h1>{student.name}</h1>
          <h2>{student.rollno}</h2>
          <h3>{student.course}</h3>
        </div>
      ))}
    </div>
    </>
  )
}

export default UseState