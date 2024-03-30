// prints date & time in YYYY-MM-DD HH:MM:SS format
class Timestamp {
    constructor() {
        const dateObject = new Date();
        // current date
        // adjust 0 before single digit date
        this.date = (`0 ${dateObject.getDate()}`).slice(-2);
        
        // current month
        this.month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
        
        // current year
        this.year = dateObject.getFullYear();
        
        // current hours
        this.hours = dateObject.getHours();
        
        // current minutes
        this.minutes = dateObject.getMinutes();
        
        // current seconds
        this.seconds = dateObject.getSeconds();
    }

    times() {
        return `${this.year}-${this.month}-${this.date}T${this.hours}:${this.minutes}:${this.seconds}`;
    }
}

module.exports = Timestamp;