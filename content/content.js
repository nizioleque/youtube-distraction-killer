'use strict';

function addRule(key) {
	const selector = selectors[key];
	// console.log(sheet);
	if (selector) {
		sheet.insertRule(`
		${selectors[key]} {
			display: none !important;
		}`);
	}
}

function delRule(key) {
	// index = Object.keys(selectors).indexOf(key);
	// sheet.deleteRule(index);

	const selector = selectors[key];
	if (selector) {
		const index = Array.from(sheet.cssRules).findIndex(x => x.selectorText === selector);
		sheet.deleteRule(index);
	}
}

const selectors = {
	'homepage':			'#contents.ytd-rich-grid-renderer, #chips',
	'menu':				'#guide, ytd-mini-guide-renderer',
	'sublist':			'#sections > ytd-guide-section-renderer:nth-child(2), #items > ytd-guide-entry-renderer:nth-child(3)',
	'logo':				'ytd-topbar-logo-renderer',
	'search':			'#center',
	'notifications':	'ytd-notification-topbar-button-renderer',
	'vidstat':			'#primary-inner > #meta, ytd-badge-supported-renderer + #info',
	'vidautoplay':		'button[data-tooltip-target-id="ytp-autonav-toggle-button"], .ytp-autonav-endscreen-countdown-container',
	'vidright':			'#related',
	'playlist':			'#playlist',
	'vidend':			'div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-show-tiles',
	'comments':			'#comments',
	'channelpage':		'ytd-section-list-renderer[page-subtype="channels"] #contents'
}

let enable = false;

const styleElement = document.createElement('style');
document.head.appendChild(styleElement);
const sheet = styleElement.sheet;
sheet.disabled = true;

chrome.storage.sync.get('enable', items => {
	enable = items.enable;
	if (enable) sheet.disabled = false;
	// console.log('enable', enable, 'sheet.disabled', sheet.disabled);
})

chrome.storage.sync.get('selectors', items => {
	// console.log('keys:', items.selectors)
	if (items.selectors) items.selectors.forEach(key => {
		addRule(key);
	});
});


chrome.storage.onChanged.addListener((changes, areaName) => {
	if (areaName == 'sync') {
		if (changes.enable) {
			enable = changes.enable.newValue;
			sheet.disabled = !enable;
			// console.log('enable', enable, 'sheet.disabled', sheet.disabled);
		}

		if (changes.selectors) {
			let add = changes.selectors.newValue.filter(x => !changes.selectors.oldValue.includes(x));
			let del = changes.selectors.oldValue.filter(x => !changes.selectors.newValue.includes(x));
			// console.log('add:', add, 'del:', del);

			add.forEach(key => addRule(key));
			del.forEach(key => delRule(key));
		}

	}
});







// const homepage 		= hideElement('#submenu + #contents, #chips'
// const menu 			= hideElement('#guide'
// const sublist 		= hideElement('#sections > ytd-guide-section-renderer:nth-child(2)'
// const logo			= hideElement('ytd-topbar-logo-renderer'
// const search 		= hideElement('#center'
// const notifications = hideElement('ytd-notification-topbar-button-renderer'
// const vidstat 		= hideElement('#meta, ytd-badge-supported-renderer + #info'
// const vidautoplay	= hideElement('button[data-tooltip-target-id="ytp-autonav-toggle-button"], .ytp-autonav-endscreen-countdown-container'
// const vidright 		= hideElement('#secondary'
// const vidend		= hideElement('div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-show-tiles'
// const comments 		= hideElement('#comments'
// const channelpage 	= hideElement('#header-container + #contents'
