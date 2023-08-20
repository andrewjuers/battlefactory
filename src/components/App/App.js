import { Home } from 'components';
import styles from './styles.module.css';
import React from 'react';

export function App() {
  return (
    <div className={styles.main}>
      <Home />
    </div>
  );
}