// import React, { useEffect, useState } from 'react' 
// import { Link } from "react-router-dom";
import styles from './Home.module.css'
import Header from '../../components/Header'

function Home() {
    
//   const [backendData, setBackendData] = useState([{}])

//   useEffect(() => {
//     fetch("/api").then(
//       response => response.json()
//     ).then(
//       data => {
//         setBackendData(data)
//       }
    // )
    
//   }, [])

  return (
      <div> 
      <header className="bg-blue-500 text-white p-4 shadow-md">
        <h1>טיפים לטיולים!</h1>
      </header>
    </div>
  )
}

export default Home