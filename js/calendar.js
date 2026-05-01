// Add to Calendar Function
function addToCalendar(title, date) {
    // Convert YYYY-MM-DD to YYYYMMDD
    const formattedDate = date.replace(/-/g, '');
    
    const event = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${formattedDate}T090000
DTEND:${formattedDate}T100000
DESCRIPTION:JanVote AI Reminder
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([event], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.ics`;
    link.click();
}
