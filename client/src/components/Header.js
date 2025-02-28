import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Adjust the import according to your styling approach
import logo from '../assets/images/logo.jpg'; // Adjust the path based on your structure

const Header = () => {
  return (
    <nav className={styles.topnav + " bg-blue-600 w-full p-2 text-center shadow-md"}>
      <div className="flex justify-center space-x-6 rtl:space-x-reverse">
        <a 
            href="/" className="hover:underline">                 
            <img 
                src={logo} 
                alt="Logo" 
                style={{ height: '2rem', width: 'auto' }} // Set height directly
            />        
        </a>
        <Link to="/getinsurance" className="hover:underline">ביטוח נסיעות</Link>
        <a href="/creditcards" className="hover:underline">כרטיסי אשראי</a>
        <a href="/about" className="hover:underline">קצת עלינו</a>
        <a href="/contactus" className="hover:underline">צור קשר</a>
      </div>
    </nav>
  );
};

export default Header;
