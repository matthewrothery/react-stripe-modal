import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import autobind from 'class-autobind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.less';
import CardNumber from './components/card-number';
import CardExpiry from './components/card-expiry';
import CardCVC from './components/card-cvc';
import Footer from './components/footer';

class Form extends React.Component {

    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            cardType: null,
            errors: null,
            fields: {
                card: null,
                expiry: null,
                cvc: null
            },
            valid: false,
        }
    }

    onChange(element) {
        const { elementType } = element;

        let cardType = this.state.cardType;
        let errors = this.state.errors || {};
        let fields = this.state.fields;

        delete errors['submitError'];

        if (elementType === 'cardNumber') {
            cardType = element.brand === 'unknown' ? null : element.brand;
        }

        if (!element.error) {
            if (elementType === 'cardNumber') {
                fields.card = true;
            } else if (elementType === 'cardExpiry') {
                fields.expiry = true;
            } else if (elementType === 'cardCvc') {
                fields.cvc = true;
            }
        }

        // Check for errors
        if (element.error && element.error.message) {
            errors[elementType] = element.error.message;
        } else if (element.empty) {
            if (elementType === 'cardNumber') {
                errors[elementType] = "Card number cannot be empty";
            } else if (elementType === 'cardExpiry') {
                errors[elementType] = "Card Expiry cannot be empty";
            } else if (elementType === 'cardCvc') {
                errors[elementType] = "Card CVC cannot be empty";
            }
        } else {
            delete errors[elementType];
        }

        this.setState({
            cardType,
            errors,
            fields,
            valid: !Object.values(errors).length && fields.card && fields.expiry && fields.cvc
        });
    }

    // Handle form submission
    onSubmit(evt) {
        const { customerEmail, onSubmit, stripe, customerName, close } = this.props;
        evt.preventDefault();

        stripe.createToken({ type: 'card', name: customerName, email: customerEmail }).then((data) => {
            if (data.error && data.error.message) {
                let message = "";
                
                switch (data.error.type) {
                    case 'incomplete_number': message = 'Invalid card number'; break;
                    case 'incomplete_cvc': message = 'Invalid CVC'; break;
                    case 'incomplete_expiry': message = 'Invalid expiry'; break;
                    case 'invalid_request_error': {
                        message = 'Invalid request - please try again later';
                        console.warn("@react-stripe-modal > invalid Stripe API Key");
                        break;
                    }
                    default: message = 'Invalid form data'; break;
                }

                this.setState({
                    valid: false,
                    errors: {
                        ['submitError']: message
                    }
                });
            } else {
                // There are no errors, lets fetch the token & 
                // send the token to parent component
                if (onSubmit && typeof onSubmit === 'function') {
                    onSubmit(data.token);
                    close();
                } else {
                    console.warn("@react-stripe-modal > missing onSubmit property");
                }
            }
        });
    }

    render() {
        const { headerColor, headerBackgroundColor, buttonStyle, close, submitLabel } = this.props;
        return (
            <div className={styles.modal}>
                <div className={styles.content}>
                    <div className={styles.header} style={{ backgroundColor: headerBackgroundColor ? headerBackgroundColor : null, color: headerColor ? headerColor : null }}>
                        <span className={styles.title}><FontAwesomeIcon icon={faLock} style={{ marginBottom: '-1px' }} /> Payment Details</span>
                        <span className={styles.icons}>
                            <FontAwesomeIcon icon={faCcVisa} title={"Visa"} />
                            <FontAwesomeIcon icon={faCcMastercard} title={"Mastercard"} />
                            <FontAwesomeIcon icon={faCcAmex} title={"American Express"} />
                        </span>
                    </div>
                    <div className={styles.body}>
                        <CardNumber type={this.state.cardType} onChange={this.onChange} />
                        <CardExpiry onChange={this.onChange} />
                        <CardCVC onChange={this.onChange} />
                        <Footer valid={this.state.valid} errors={this.state.errors} onSubmit={this.onSubmit} close={close} buttonStyle={buttonStyle} submitLabel={submitLabel} />
                    </div>
                </div>
            </div>
        );
    }
}

export default injectStripe(Form);