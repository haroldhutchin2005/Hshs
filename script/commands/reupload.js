const axios = require('axios');

module.exports.config = {
    name: "uploadsong",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Jonell Magallanes",
    description: "Reupload music from rgdps",
    usePrefix: false,
    commandCategory: "RGDRS",
    usages: "songlink | title | artist",
    cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
    const [link, ...rest] = args.join(" ").split("|").map(arg => arg.trim());
    const [title, artist] = rest;

    const apiUrl = `https://johnrickgdp.ps.fhgdps.com/dashboard/api/addSong.php?name=${encodeURIComponent(title)}&author=${encodeURIComponent(artist)}&download=${encodeURIComponent(link)}`;

    if (!link || !title || !artist) {
        return api.sendMessage("Please provide song link, title, and artist.\n\nUsage: rmusic dropboxlink | title | artist", event.threadID, event.messageID);
    }

    try {
        api.sendMessage("☁️ | Reuploading song. Please wait...", event.threadID, event.messageID);

        const response = await axios.get(apiUrl);
        const responseData = response.data;

        if (responseData.dashboard && responseData.success) {
            const songInfo = responseData.song;
            const message = `✅ | 𝙍𝙀𝙐𝙋𝙇𝙊𝘼𝘿𝙀𝙍 𝙂𝘿𝙋𝙃 \n╭─❍\nID: ${songInfo.ID}\nAuthor: ${songInfo.author}\nName: ${songInfo.name}\nSize: ${songInfo.size} MB\nDownload: ${songInfo.download}\n╰───────────⟡`;

            api.sendMessage(message, event.threadID, event.messageID);
        } else {
            api.sendMessage("An error occurred while processing your request.", event.threadID);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
