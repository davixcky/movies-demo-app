import styles from './loading.module.css';
export const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <div className={styles.simpleLoader}></div>
      </div>
    </div>
  );
};
