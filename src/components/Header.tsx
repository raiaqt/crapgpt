import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const isMansplain = path.includes('mansplain');
  const isCope = path.includes('cope');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={`${styles.navLink} ${!isMansplain && !isCope ? styles.active : ''}`}
        >
          CrapGPT
        </Link>
        <Link
          to="/mansplain"
          className={`${styles.navLink} ${isMansplain ? styles.active : ''}`}
        >
          MansplainGPT
        </Link>
        <Link
          to="/cope"
          className={`${styles.navLink} ${isCope ? styles.active : ''}`}
        >
          CopeGPT
        </Link>
      </nav>
    </header>
  );
};

export default Header; 