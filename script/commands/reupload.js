const axios = require('axios');

module.exports.config = {
    name: "rmusic",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Jonell Magallanes",
    description: "Reupload music from gdph serve",
    usePrefix: false,
    commandCategory: "GDPH TOOLS",
    usages: "songlink | title | artist",
    cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
    const [link, ...rest] = args.join(" ").split("|").map(arg => arg.trim());
    const [title, artist] = rest;

    const apiUrl = `https://gdph-reuploader-music-api-by-jonell.onrender.com/gdph?songlink=${link}&title=${title}&artist=${artist}`;

    if (!link || !title || !artist) {
        return api.sendMessage("Please provide song link, title, and artist.\n\nUsage: rmusic dropboxlink | title | artist", event.threadID, event.messageID);
    }

    try {
        api.sendMessage("☁️ | Reuploading song. Please wait...", event.threadID, event.messageID);

        const response = await axios.get(apiUrl);
        const responseData = response.data.replace(/<\/?b>/g, '').replace(/<hr>/g, '');

        api.sendMessage(`GDPH REUPLOADER SONG TOOLS RESPONSE\n\n${responseData}`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
