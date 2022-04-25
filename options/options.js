'use strict';

function checkboxClickCustom(element) {
    updateSelector(element.name, element.checked);

}

function loadCheckbox() {
    document.querySelectorAll('#what-to-hide input').forEach(input => {
        // set value
        if (settings.selectors.includes(input.name)) input.checked = true; // do poprawienia

        // add listener
        // input.addEventListener('input', e => {
        //     updateSelector(e.target.name, e.target.checked);
        // })
    });
}


function updateSelector(selector, value) {
    chrome.storage.sync.get('selectors')
        .then(items => {
            if (!checkError() && items.selectors) {
                let selectors = items.selectors;
                if (value) {
                    // add selector to array
                    selectors.push(selector);
                }
                else {
                    // remove selector from array
                    const index = selectors.indexOf(selector);
                    if (index >= 0) selectors.splice(index, 1);
                }

                // update storage
                chrome.storage.sync.set({
                    'selectors': selectors
                }, checkError);
            }
        });
}
