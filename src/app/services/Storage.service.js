function LocalStorageService() {}

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
}

const Storage = new LocalStorageService();

export default Storage;