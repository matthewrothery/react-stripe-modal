import React from 'react';
import styles from '../styles.less';

export default props => {
    const { valid, errors, onSubmit, close, buttonStyle } = props;

    return (
        <div className={styles.footer}>
            <div className={styles.errors}>
                {!valid && errors && Object.values(errors).length ? 
                    <ul>
                        {Object.values(errors).map(e => <li key={e}>{e}</li>)}
                    </ul>
                : null}
            </div>
            <input type="submit" 
                className={styles.submit} 
                style={buttonStyle}
                onClick={onSubmit}
                value={"Save changes"}
                disabled={!valid}
            />
            <span className={styles.cancel} onClick={close}>Cancel</span>
        </div>
    );
}