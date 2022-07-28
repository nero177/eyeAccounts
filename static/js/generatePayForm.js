const formWrapper = document.querySelector('.pay-form-wrapper');

document.querySelectorAll('.account-item__buy').forEach(button => {
    button.onclick = () => {

        generatePayForm(button);
        formWrapper.show();
    }
})

let accountDescription;

async function generatePayForm(element) {
    accountDescription = element.parentElement.parentElement.querySelector('.account-item__description').innerHTML.trim();
    const { account, payment } = await accountAndPaymentQueries(accountDescription)

    if (!account.data) return null;

    s('.payok-form input[name=choosenAmount]').setAttribute('max', account.data.amount)
    s('.total-price > span').innerHTML = payment.data.amount;
    s('.payok-form input[name=amount]').value = account.data.price;
    s('.payok-form input[name=payment]').value = payment.data.paymentId;
    s('.payok-form input[name=desc]').value = account.data.description;
    s('.payok-form input[name=sign]').value = payment.data.sign;

    document.cookie = `count=1;`;
}

s('.payok-form input[name=choosenAmount]').oninput = async() => {
    let count = s('.payok-form input[name=choosenAmount]').value;
    let maxCount = parseInt(s('.payok-form input[name=choosenAmount]').getAttribute('max'));

    if (!count) count = 1;
    if (count > maxCount) count = maxCount;

    const { payment } = await accountAndPaymentQueries(accountDescription, count)

    s('.payok-form input[name=payment]').value = payment.data.paymentId;
    s('.payok-form input[name=sign]').value = payment.data.sign;
    s('.payok-form input[name=amount]').value = payment.data.amount;
    s('.total-price > span').innerHTML = payment.data.amount;

    document.cookie = `count=${count}`;
}

async function accountAndPaymentQueries(description, count = 1) {
    const account = await axios.get(`https://eyeaccounts.store/api/getAccount`, { //get query to accounts api 
        params: {
            description: description,
        }
    });

    const payment = await axios.post(`https://eyeaccounts.store/createPayment`, { //post query to createPayment
        description: description,
        count: count
    });

    return { account, payment }
}

/*temporary*/

document.querySelector('.input-default[type=email]').oninput = (e) => {
    document.cookie = `email=${document.querySelector('.input-default[type=email]').value};`;

}