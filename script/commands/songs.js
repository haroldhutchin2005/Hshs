const axios = require('axios');

module.exports.config = {
    name: "songs",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Jonell Magallanes",
    description: "Search for songs from GDPH SERVER",
    usePrefix: true,
    commandCategory: "GDPH TOOLS",
    usages: "[song title]",
    cooldowns: 30
};

module.exports.run = async function ({ api, event, args }) {
    const title = encodeURIComponent(args.join(" "));
    const apiUrl = `https://gpdh-server-song-list-api-search-by.onrender.com/gdph?songlist=${title}`;

    if (!title) return api.sendMessage("Please provide a song title.\n\nUsage: songs [your search song title]", event.threadID, event.messageID);

    try {
        const searchMessage = await api.sendMessage("🔍 | Checking The Database for Searching songs. Please wait...", event.threadID);

        const response = await axios.get(apiUrl);
        const songs = response.data;

        if (songs.length === 0) {
            await api.sendMessage("No songs found with that title.", event.threadID);
            return api.unsendMessage(searchMessage.messageID);
        }

        for (const song of songs) {
            let resultMessage = `ID: ${song.id}\nSong: ${song.song}\nAuthor: ${song.author}\nSize: ${song.size}\n\n`;
            await api.sendMessage(resultMessage, event.threadID);
        }

        api.unsendMessage(searchMessage.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
