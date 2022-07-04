const formWrapper = document.querySelector('.pay-form-wrapper');

document.querySelectorAll('.account-item__buy').forEach(button => {
    button.onclick = () => {
        formWrapper.show();
        generatePayForm(button);
    }
})


async function generatePayForm(element) {
    const accountDescription = element.parentElement.parentElement.querySelector('.account-item__description').innerHTML.trim();
    const shopId = document.querySelector('.pay-form input[name=shop]').value;

    let res = await axios.get('http://localhost:3000/api/getAccount', {
        params: {
            description: accountDescription,
            shop: shopId,
        }
    });

    if (!res.data) return null;

    document.querySelector('.pay-form input[name=amount]').value = parseInt(res.data.price);
    document.querySelector('.pay-form input[name=desc]').value = res.data.description;
    document.querySelector('.pay-form input[name=payment]').value = res.data.payment;
    document.querySelector('.pay-form input[name=sign]').value = res.data.sign;
    document.querySelector('.pay-form input[name=currency]').value = res.data.currency;
}