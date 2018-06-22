let generateMessage = (from,text) => {
    return {
        from,
        text,
        completedAt: new Date().getTime()
    }
}
let generateLocationMessage = (from,lat,lng) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        completedAt: new Date().getTime()
    }
}

module.exports = {generateMessage,generateLocationMessage}