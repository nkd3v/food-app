const ThaiDateTime = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
        timeZone: "Asia/Bangkok",
        hour12: false,
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    return date.toLocaleDateString("th-TH", options);
}

export default ThaiDateTime;