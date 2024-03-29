import { Header } from './header';

import styles from './mainLayout.module.css';
import React from 'react';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.innerContainer}>{children}</div>
    </div>
  );
};
