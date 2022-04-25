'use strict';

// default settings values
const settings = {
    enable: true,
    selectors: ['homepage', 'vidautoplay', 'vidend', 'vidright', 'sublist']
};

// details of radio buttons groups
// type:
//  option: selecting one of the options
//  value: every option has a corresponding value
//      key: name of the value in storage
//      values: array of values corresponding to every radio button
//      allowCustom: allows entering a custom value
//          defVal: default value to set when advanced settings are disabled
const radioGroups = {

};

// advanced checkboxes and their default values
const advancedCheckboxes = {

};

// runs at the end of configuration
function configureCustom() {
    const toggleEl = document.querySelector('#toggle');
    if (settings.enable) toggleEl.classList.add('toggle-active');

    toggleEl.addEventListener('click', toggle);

    function toggle(e) {
        const enabled = toggleEl.classList.contains('toggle-active');
        setData('enable', !enabled);
        toggleEl.classList.toggle('toggle-active');
    }
}

// runs when advanced checkbox is being enabled
function showAdvancedCustom() {

}

// runs when advanced checkbox is being disabled
function hideAdvancedCustom() {

}

configure();