import React from 'react';
import { render } from 'react-dom';
import ReactStripeModal from './index';

class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.reactStripeModalRef = null;
        this.onSubmit = this.onSubmit.bind(this);
        this.openStripeModal = this.openStripeModal.bind(this);
    }

    // Open the stripe modal
    openStripeModal() {
        this.reactStripeModalRef.open();
    }

    // Handle the submission of the stripe form
    onSubmit(token) {
        console.log(token);
    }

    render() {
        return (
            <div>
                <h2>Card Details</h2>

                <input type="button" onClick={this.openStripeModal} value={"Update Card Details"} />

                <ReactStripeModal 
                    ref={e => this.reactStripeModalRef = e}
                    stripePublicKey={"put_your_api_key_here"} 
                    headerBackgroundColor={"#098dd5"}
                    headerColor={"#fff"}
                    buttonStyle={{ backgroundColor: "#098dd5", borderColor: "#098dd5" }}
                    customerEmail={"demo@website.com"}
                    customerName={"Matt"}
                    onSubmit={this.onSubmit}
                    buttonLabel={"Upgrade Account"}
                />
            </div>
        )
    }
}

render(
    <MyComponent />,
    document.getElementById("root")
);