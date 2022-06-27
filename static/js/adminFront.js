s('.admin-main__add-account').onclick = function() {
    s('.add-account-popup').show();
}

s('.add-account-popup__close').onclick = function() {
    s('.add-account-popup').hide();
}

const addMoreButton = s('#account-data-addmore');
const accountData = s('#account-data'); //data in one account data input
let accountsDataHidden = s('#accounts-data-hidden'); //accounts data hidden input 
let accountsCountHidden = s('#accounts-count-hidden');

let accountDataStore = [];
let accountCount = 0;

addMoreButton.onclick = function() {
    accountCount++; //increase accounts count
    accountDataStore.push(accountData.value); //push data in accounts store from current account data textarea (before clear)
    accountData.value = ''; //clear

    accountsDataHidden.value = JSON.stringify(accountDataStore);
    accountsCountHidden.value = accountCount;
    s('#accounts-count').innerHTML = accountCount;
}

const search = s('.admin-main__search');
const descriptions = Array.from(document.querySelectorAll('.account-item__description'));

search.oninput = function(e) {
    descriptions.forEach(el => {
        elementHTML = el.innerHTML.trim();
        searchText = e.target.value.trim();

        if (!elementHTML.includes(searchText)) {
            el.parentElement.parentElement.hide();
        } else {
            el.parentElement.parentElement.show();
        }
    })
}