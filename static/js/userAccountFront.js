const avatarInput = s('#user-change-avatar-form > input[type=file]');
const avatarForm = s('#user-change-avatar-form');

avatarForm.onsubmit = function(e) {
    e.preventDefault();
}
const reader = new FileReader();

avatarInput.onchange = function(e) {

    reader.readAsDataURL(avatarInput.files[0]);
    reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = (e) => {
            if (image.width < 256 || image.height < 256) {
                triggerError('Картинка должна быть более чем 256 пикселей в высоту и ширину')
            } else {
                avatarForm.submit();
            }
        }
    }
}

s('.account-settings__close').onclick = function() {
    s('.account-settings').classList.toggle('hide');
}
s('.account-info__settings').onclick = function() {
    s('.account-settings').classList.toggle('hide');
}