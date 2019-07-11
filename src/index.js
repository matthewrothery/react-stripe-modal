import React from 'react';
import PropTypes from 'prop-types';
import { StripeProvider } from 'react-stripe-elements';
import { Elements } from 'react-stripe-elements';
import Form from './form';

class ReactStripeModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open || false
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    // Open the modal
    open() {
        this.setState({ open: true });
    }

    // Close the modal
    close() {
        this.setState({ open: false });
    }

    render() {
        const { stripePublicKey } = this.props;
        if (!stripePublicKey) {
            console.warn("@react-stripe-modal > missing property: stripePublicKey");
            return null;
        }

        if (!this.state.open) {
            return null;
        }
        return (
            <StripeProvider apiKey={stripePublicKey}>
                <Elements>
                    <Form {...this.props} close={this.close} />
                </Elements>
            </StripeProvider>
        );
    }
}

ReactStripeModal.propTypes = {
    stripePublicKey: PropTypes.string
}

export default ReactStripeModal;