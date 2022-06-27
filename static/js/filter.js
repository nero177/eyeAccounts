//filter functionality

//social networks filter
const filterSocialItems = sAll('.filter__social-item');
const categorySections = sAll('.acc-category-section');

filterSocialItems.forEach(el => {
    el.onclick = function() {
        const itemFilterSocial = this.getAttribute('data-filter-social');

        categorySections.forEach(element => {
            const sectionFilterSocial = element.getAttribute('data-filter-social');

            if (sectionFilterSocial != itemFilterSocial) {
                element.hide();
            } else {
                element.show();
            }
        })
    }
})

//account description filter

const filterDescription = document.getElementById('filter-description');
const allDescriptions = sAll('.account-item__description');

filterDescription.oninput = function(e) {
    allDescriptions.forEach(el => {
        const description = el.innerHTML.trim();

        if (!description.includes(e.target.value)) {
            el.parentElement.parentElement.hide();
        } else {
            el.parentElement.parentElement.show();
        }
    })
}

//price filter

const filterPrice = document.getElementById('filter-price-range');
const allPrices = sAll('.account-item__price > b');
const rangeNum = s('.range-num');

filterPrice.oninput = function(e) {
    rangeNum.innerHTML = 'До ' + e.target.value + ' руб';

    allPrices.forEach(el => {
        const price = parseInt(el.innerHTML);
        const filterPrice = parseInt(e.target.value);

        if (price > filterPrice) {
            el.parentElement.parentElement.parentElement.hide();
        } else {
            el.parentElement.parentElement.parentElement.show();
        }
    })
}

//clear all filters
const priceRangeMaxValue = filterPrice.getAttribute('max')

s('.filter-clear').onclick = function() {
    categorySections.forEach(element => {
        element.show();
    })

    allDescriptions.forEach(element => {
        filterDescription.value = '';
        element.parentElement.parentElement.show();
    });

    rangeNum.innerHTML = 'До ' + priceRangeMaxValue + ' руб';
    filterPrice.value = priceRangeMaxValue;
}