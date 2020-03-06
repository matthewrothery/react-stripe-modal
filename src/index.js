import React from 'react';
import PropTypes from 'prop-types';
import { StripeProvider } from 'react-stripe-elements';
import { Elements } from 'react-stripe-elements';
import Form from './form';

class ReactStripeModal extends React.Component {
    render() {
        const { stripePublicKey, onCancel } = this.props;
        if (!stripePublicKey) {
            console.warn("@react-stripe-modal > missing property: stripePublicKey");
            return null;
        }

        if (!onCancel || typeof onCancel !== 'function') {
            console.warn("@react-stripe-modal > missing property: onCancel");
            return null;
        }
        return (
            this.props.open ?
                <StripeProvider apiKey={stripePublicKey}>
                    <Elements>
                        <Form {...this.props} />
                    </Elements>
                </StripeProvider>
            : null
        );
    }
}

ReactStripeModal.propTypes = {
    stripePublicKey: PropTypes.string
}

export default ReactStripeModal;