import React from 'react';
import { render } from 'react-dom';
import ReactStripeModal from './index';

class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.openStripeModal = this.openStripeModal.bind(this);
        this.closeStripeModal = this.closeStripeModal.bind(this);

        this.state = {
            open: false,
            errorMessage: null,
        }
    }

    // Open the stripe modal
    openStripeModal() {
        this.setState({
            open: true,
        });
    }

    // Close the stripe modal
    closeStripeModal() {
        this.setState({
            open: false,
        });
    }

    // Handle the submission of the stripe form
    onSubmit(token) {
        console.log(token);

        // Perform validation and any checks

        this.setState({
            errorMessage: "Failed to process request"
        });
    }

    render() {
        return (
            <div>
                <h2>Card Details</h2>

                <input type="button" onClick={this.openStripeModal} value={"Update Card Details"} />

                <ReactStripeModal
                    open={this.state.open}
                    stripePublicKey={"stripe-api-key"}
                    headerBackgroundColor={"#098dd5"}
                    headerColor={"#fff"}
                    buttonStyle={{ backgroundColor: "#098dd5", borderColor: "#098dd5" }}
                    customerEmail={"demo@website.com"}
                    customerName={"Matt"}
                    onSubmit={this.onSubmit}
                    buttonLabel={"Upgrade Account"}
                    onCancel={this.closeStripeModal}
                    errorMessage={this.state.errorMessage}
                />
            </div>
        )
    }
}

render(
    <MyComponent />,
    document.getElementById("root")
);