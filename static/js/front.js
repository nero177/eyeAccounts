try {
    s('.menu-mob_close').onclick = () => {
        s('.menu-mob').hide();
    }

    s('.navbar__menu-mob img').onclick = () => {
        s('.menu-mob').show();
    }

    axios.get(`${document.location.origin}/userAccount`)
        .then(response => console.log(response))

    console.log(`${document.location.origin}/userAccount`)
} catch (e) {
    c(e)
}

try {
    const accounts = sAll('.account-item');

    accounts.forEach(element => {
        const accountSocial = element.getAttribute('data-social');

        switch (accountSocial) {
            case 'telegram':
                element.querySelector('.account-item__icon img').setAttribute('src', '/img/icons/telegram-icon.png');
                break;
            case 'facebook':
                element.querySelector('.account-item__icon img').setAttribute('src', '/img/icons/facebook.png');
                break;
        }
    });
} catch (e) {
    c(e)
}

function triggerError(message) {
    const errorBox = document.createElement("div");
    errorBox.id = 'error-box';

    errorBox.innerHTML = message;
    errorBox.show();
    document.body.append(errorBox)

    setTimeout(function() {
        errorBox.fadeHide();
        setTimeout(() => { errorBox.remove() }, 1000)
    }, 5000);
}