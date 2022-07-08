const formWrapper = document.querySelector('.pay-form-wrapper');
const ordersEndpointUrl = '/success'

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

    console.log(parseInt(account.data.price))
    document.querySelector('.qiwi-form input[name=amount]').value = parseInt(account.data.price);

    // document.querySelector('.interkassa-form input[name=ik_pm_no]').value = account.data.orderID
    // document.querySelector('.interkassa-form input[name=ik_am]').value = parseInt(account.data.price);
    // document.querySelector('.interkassa-form input[name=ik_desc]').value = accountDescription;
    // document.querySelector('.interkassa-form input[name=ik_sign]').value = account.data.sign;
}

// const tokenizationSpecification = {
//     type: 'PAYMENT_GATEWAY',
//     parameters: {
//         gateway: 'example',
//         gatewayMerchantId: 'gatewayMerchantId'
//     }
// }

// const cardPaymentMethod = {
//     type: 'CARD',
//     tokenizationSpecification: tokenizationSpecification,
//     parameters: {
//         allowedCardNetworks: ['VISA', 'MASTERCARD'],
//         allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS']
//     }
// }

// const googlePayConfiguration = {
//     apiVersion: 2,
//     apiVersionMinor: 0,
//     allowedPaymentMethods: [cardPaymentMethod]
// }

// let googlePayClient;

// function onGooglePayLoaded() {
//     googlePayClient = new google.payments.api.PaymentsClient({
//         environment: 'TEST'
//     });

//     googlePayClient.isReadyToPay(googlePayConfiguration)
//         .then(response => {
//             if (!response.result)
//                 return null;

//             createAndAddButton();
//         })
//         .catch(err => console.error(err));
// }

// function createAndAddButton() {
//     const googlePayButton = googlePayClient.createButton({
//         onClick: onGooglePayButtonClicked,
//     });

//     document.getElementById('buy-now').innerHTML = '';
//     document.getElementById('buy-now').appendChild(googlePayButton);
// }

// function onGooglePayButtonClicked() {
//     const paymentDataRequest = {...googlePayConfiguration };
//     paymentDataRequest.merchantInfo = {
//         merchantId: 'BCR2DN4T7THMRXZW',
//         merchantName: 'EyeAccounts'
//     };

//     paymentDataRequest.transactionInfo = {
//         totalPriceStatus: 'FINAL',
//         totalPrice: account.data.price,
//         currencyCode: 'RUB',
//         countryCode: 'RU'
//     }

//     googlePayClient.loadPaymentData(paymentDataRequest)
//         .then(paymentData => processPaymentData(paymentData))
//         .catch(err => console.error(err))
// }

// function processPaymentData(paymentData) {
//     fetch(ordersEndpointUrl, {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: paymentData
//     })
// }