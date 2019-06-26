import React from 'react';
import { CardCVCElement } from 'react-stripe-elements';
import styles from '../styles.less';

export default props => {
    const { onChange } = props;

    return (
        <div className={styles.cardCVC}>
            <div className={styles.label}>CVC Code</div>
            <CardCVCElement className={styles.input} onChange={onChange} />
        </div>
    );
}