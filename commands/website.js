const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var websiteEmbed = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Website")
        .setDescription("Dit is de link naar onze website: https://www.simpledesigns.nl/")
        .setTimestamp();

    message.channel.send(websiteEmbed);

};

module.exports.help = {
    name: "/website"
};