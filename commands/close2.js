const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryId = "651129559843864606";

    if (message.channel.parentID == categoryId) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

        message.channel.delete();

    }

    var log1 = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Ticket")
        .addField("Door", `${message.author}`)
        .addField("Channel", `${message.channel.name}`)
        .addField("Actie", "Verwijderd")

    var logChannel = message.guild.channels.find("name", "logs");

    logChannel.send(log1);

}

module.exports.help = {
    name: "/close2",
}