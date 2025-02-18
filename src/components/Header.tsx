import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const path = window.location.pathname;
  const isMansplain = path.includes('mansplain');
  const isCope = path.includes('cope');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a
          href="/"
          className={`${styles.navLink} ${!isMansplain && !isCope ? styles.active : ''}`}
        >
          CrapGPT
        </a>
        <a
          href="/mansplain"
          className={`${styles.navLink} ${isMansplain ? styles.active : ''}`}
        >
          MansplainGPT
        </a>
        <a
          href="/cope"
          className={`${styles.navLink} ${isCope ? styles.active : ''}`}
        >
          CopeGPT
        </a>
      </nav>
    </header>
  );
};

export default Header; 