import '../../index';
import { initCustomTabCallbacks, initTabGroups, initScrollableTabControls } from '../../../components/common/tabs';

initCustomTabCallbacks();
initScrollableTabControls();
initTabGroups();

window.simpleCallbackExample = function(event) { 
    let tabId = event.target.getAttribute('id');
    alert('Clicking tab ' + tabId + ' triggered this alert');
}