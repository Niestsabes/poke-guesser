function LocalStorageService() {
    this.listeners = { userStats: {} };
}

LocalStorageService.prototype.getUserStats = function() {
    let userStats = JSON.parse(localStorage.getItem('userStats'));
    if (!userStats) {
        userStats = { bestStreak: 0, currentStreak: 0, listGame: [] };
        this.setUserStats(userStats);
    }
    return userStats;
}

LocalStorageService.prototype.setUserStats = function(userStats) {
    localStorage.setItem('userStats', JSON.stringify(userStats));
    this.invoke('userStats');
}

/**
 * Add listener to update event triggered by service
 * @param {string} eventName 
 * @param {string} key 
 * @param {Function} callback 
 */
LocalStorageService.prototype.addListener = function(eventName, key, callback) {
    if (this.listeners[eventName] === undefined) {
        throw new Error(`Event to subscribe on does not exist: ${eventName}.`);
    }
    this.listeners[eventName][key] = callback;
}

/**
 * Remove subscription to event
 * @param {string} eventName 
 * @param {string} key 
 */
LocalStorageService.prototype.removeListener = function(eventName, key) {
    if (this.listeners[eventName] === undefined) {
        throw new Error(`Event to remove subscription from does not exist: ${eventName}.`);
    }
    delete this.listeners[eventName][key];
}

/**
 * Invoke callback functions of subscriptions
 * @param {string} eventName
 */
LocalStorageService.prototype.invoke = function(eventName) {
    if (this.listeners[eventName] === undefined) {
        throw new Error(`Event to invoke does not exist: ${eventName}.`);
    }
    Object.values(this.listeners[eventName]).forEach(callback => callback())
}

/**
 * Returns list of event names
 * @returns {string[]}
 */
LocalStorageService.prototype.eventNames = function() {
    return Object.keys(this.listeners);
}

const Storage = new LocalStorageService();

export default Storage;