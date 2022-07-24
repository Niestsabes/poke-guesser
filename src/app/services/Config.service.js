import APP_CONFIG from "../../config/config";

function SettingService() {
    this.dicoListeners = {};
    this.keyboardName = APP_CONFIG.configDefault.keyboard;
}

/**
 * @returns {string[][]}
 */
SettingService.prototype.getKeyboard = function() {
    return APP_CONFIG.keyboard[this.keyboardName];
}

/**
 * @returns {string}
 */
SettingService.prototype.getKeyboardName = function() {
    return this.keyboardName;
}

/**
 * @param {string} value 
 */
SettingService.prototype.setKeyboardName = function(value) {
    this.keyboardName = value;
    this.invoke({keyboardName: this.keyboardName});
}

/**
 * @param {string} key 
 * @param {Function} callback 
 */
SettingService.prototype.addListener = function(key, callback) {
    this.dicoListeners[key] = callback
}

/**
 * @param {string} key 
 */
SettingService.prototype.removeListener = function(key) {
    if (this.dicoListeners[key]) {
        delete this.dicoListeners[key];
    }
}

/**
 * @param {any} change
 */
SettingService.prototype.invoke = function(change) {
    for (let callback of Object.values(this.dicoListeners)) {
        callback(change);
    }
}

const Settings = new SettingService();

export default Settings;