const formWrapper = document.querySelector('.pay-form-wrapper');

document.querySelectorAll('.account-item__buy').forEach(button => {
    button.onclick = () => {

        generatePayForm(button);
        formWrapper.show();
    }
})

let account;

async function generatePayForm(element) {
    const accountDescription = element.parentElement.parentElement.querySelector('.account-item__description').innerHTML.trim();

    account = await axios.get(`${location.href}api/getAccount`, { //get query to accounts api 
        params: {
            description: accountDescription,
        }
    });

    if (!account.data) return null;

    document.querySelector('.qiwi-form input[name=amount]').value = parseInt(account.data.price);
    // document.querySelector('.interkassa-form input[name=ik_pm_no]').value = account.data.orderID
    // document.querySelector('.interkassa-form input[name=ik_am]').value = parseInt(account.data.price);
    // document.querySelector('.interkassa-form input[name=ik_desc]').value = accountDescription;
    // document.querySelector('.interkassa-form input[name=ik_sign]').value = account.data.sign;
}

const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0
};

const allowedCardNetworks = ["MASTERCARD", "MIR", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
        'gateway': 'aciworldwide',
        'gatewayMerchantId': 'BCR2DN4T7THMRXZW'
    }
};

const baseCardPaymentMethod = {
    type: 'CARD',
    parameters: {
        allowedAuthMethods: allowedCardAuthMethods,
        allowedCardNetworks: allowedCardNetworks
    }
};

const cardPaymentMethod = Object.assign({},
    baseCardPaymentMethod, {
        tokenizationSpecification: tokenizationSpecification
    }
);

let paymentsClient = null;

function getGoogleIsReadyToPayRequest() {
    return Object.assign({},
        baseRequest, {
            allowedPaymentMethods: [baseCardPaymentMethod]
        }
    );
}

function getGooglePaymentDataRequest() {
    const paymentDataRequest = Object.assign({}, baseRequest);
    paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
    paymentDataRequest.merchantInfo = {
        merchantId: 'BCR2DN4T7THMRXZW',
        merchantName: 'EyeAccounts'
    };
    return paymentDataRequest;
}

function getGooglePaymentsClient() {
    if (paymentsClient === null) {
        paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });
    }
    return paymentsClient;
}

function onGooglePayLoaded() {
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
        .then(function(response) {
            if (response.result) {
                addGooglePayButton();
            }
        })
        .catch(function(err) {
            // show error in developer console for debugging
            console.error(err);
        });
}


function addGooglePayButton() {
    const paymentsClient = getGooglePaymentsClient();
    const button =
        paymentsClient.createButton({
            onClick: onGooglePaymentButtonClicked,
            allowedPaymentMethods: [baseCardPaymentMethod]
        });

    document.getElementById('buy-now').innerHTML = '';
    document.getElementById('buy-now').appendChild(button);
}


function getGoogleTransactionInfo() {
    return {
        countryCode: 'RU',
        currencyCode: 'RUB',
        totalPriceStatus: 'FINAL',
        // set to cart total
        totalPrice: account.data.price
    };
}

function prefetchGooglePaymentData() {
    const paymentDataRequest = getGooglePaymentDataRequest();
    // transactionInfo must be set but does not affect cache
    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
        currencyCode: 'RUB'
    };
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.prefetchPaymentData(paymentDataRequest);
}


function onGooglePaymentButtonClicked() {
    const paymentDataRequest = getGooglePaymentDataRequest();
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(function(paymentData) {
            // handle the response
            processPayment(paymentData);
        })
        .catch(function(err) {
            // show error in developer console for debugging
            console.error(err);
        });
}

function processPayment(paymentData) {
    // show returned data in developer console for debugging
    console.log(paymentData);
    // @todo pass payment token to your gateway to process payment
    paymentToken = paymentData.paymentMethodData.tokenizationData.token;

    fetch('/success', {
        method: 'POST',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': paymentToken
        },
        body: paymentData
    }).then(response => {
        if (response.status != 200)
            return null;

        window.location = '/success'
    });


}