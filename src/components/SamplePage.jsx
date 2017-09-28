import React from 'react';
import styles from './samplePage.scss';

console.log('scss', JSON.stringify(styles));

const SamplePage = () => <div className={styles.red}>Sample Page</div>;

export default SamplePage;
