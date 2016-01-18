
module.exports = {

    cronInterval: '*/1 * * * * *',
    eventName: 'reminder',

    // Remind me X minutes before the event starts
    preReminderMin: 10,

    // Remind me X minutes after the event starts
    postReminderMin: 5,

    reminderPosition: {
        // The nº of rows the widget occupies horizontally
        size_x: 2,

        // The nº of columns the widget occupies vertically
        size_y: 1,

        // The column the widget should start in
        col: 5,

        // The row the widget should start in
        row: 1
    },

    events: [

        {
            name: "Daily",
            wday: [1,2,3,4], // Day of week: 0 is Sunday
            hour: "10",
            min: "00"
        },
        {
            name: "Sprint Planning",
            wday: [4], // Day of week: 0 is Sunday
            hour: "11",
            min: "00",
            weekrythm: "even"
        }
        
        // ....
    ]

}