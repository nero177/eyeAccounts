const formWrapper = document.querySelector('.pay-form-wrapper');

document.querySelectorAll('.account-item__buy').forEach(button => {
    button.onclick = () => {
        formWrapper.show();
        generatePayForm(button);
    }
})

let res;

async function generatePayForm(element) {
    const accountDescription = element.parentElement.parentElement.querySelector('.account-item__description').innerHTML.trim();

    res = await axios.get(`${location.href}api/getAccount`, { //get query to accounts api 
        params: {
            description: accountDescription,
        }
    });

    if (!res.data) return null;

    document.querySelector('.freekassa-payform input[name=oa]').value = parseInt(res.data.price);
    document.querySelector('.freekassa-payform input[name=o]').value = res.data.orderID;
    document.querySelector('.freekassa-payform input[name=s]').value = res.data.sign;
}