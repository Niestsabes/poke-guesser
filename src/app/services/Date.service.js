function DateService() {}

/**
 * Returns today date stamp
 * @returns 
 */
DateService.prototype.getTodayStamp = function() {
    return Math.floor((new Date(Date.now())).getTime() / 86400000);
}

/**
 * Returns yyyy-mm-dd format of a given date stamp
 * @param {number} stamp 
 * @returns 
 */
DateService.prototype.getStringFromStamp = function(stamp) {
    const date = new Date(stamp * 86400000);
    return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join('-');
}

const DateHelper = new DateService();

export default DateHelper;