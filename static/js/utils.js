function s(selector) {
    return document.querySelector(selector);
}

function sAll(selector) {
    return document.querySelectorAll(selector);
}

function c(message) {
    console.log(message);
}

Object.prototype.hide = function() {
    this.classList.add('hide');
}

Object.prototype.show = function() {
    this.classList.remove('hide');
}

Object.prototype.fadeHide = function(fadeDuration = 0.5) {
    this.style.transition = `${fadeDuration}s opacity`;
    this.style.opacity = 0;
}

Object.prototype.nullStyles = function() {
    this.style = '';
}