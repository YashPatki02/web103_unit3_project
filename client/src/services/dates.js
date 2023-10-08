const formatTime = async (time) => {
    if (time) {
        const [hour, minute] = time.split(":");

        if (hour > 12) {
            return `${hour - 12}:${minute} PM`;
        } else if (hour === "00") {
            return `12:${minute} AM`;
        } else {
            return `${hour}:${minute} AM`;
        }
    } else {
        return "Invalid Time";
    }
};

const formatRemainingTime = async (date) => {
    const today = new Date();

    const remainingTime = new Date(date) - today;

    const months = Math.floor(remainingTime / 1000 / 60 / 60 / 24 / 30);
    const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24) % 30;

    if (months > 0 && days > 0) {
        return `~ ${months} months and ${days} days ~`;
    } else if (days > 0) {
        return `~ ${days} days ~`;
    } else if (days === 0) {
        return `~ Today! ~`;
    } else {
        return `- ${months} months and ${days} days! Expired!`;
    }
};

const formatDate = async (date) => {
    const [year, month, day] = date.split("T")[0].split("-");

    return `${month}/${day}/${year}`;
};

export default { formatTime, formatRemainingTime, formatDate };
