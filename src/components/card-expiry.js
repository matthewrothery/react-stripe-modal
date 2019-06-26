import React from 'react';
import { CardExpiryElement } from 'react-stripe-elements';
import styles from '../styles.less';

export default props => {
    const { onChange } = props;

    return (
        <div className={styles.cardExpiry}>
            <div className={styles.label}>Expiry Date</div>
            <CardExpiryElement className={styles.input} onChange={onChange} />
        </div>
    );
}