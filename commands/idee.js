const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var idee = args.join(' ');

    if (!idee) return message.channel.send("Error: U bent vergeten om een idee op te geven!");

    var ideeGestuurdEmbed = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Idee")
        .setDescription("Uw idee is met succes in de `#ideeën` channel gezet!")
        .setTimestamp();

    message.channel.send(ideeGestuurdEmbed);

    var ideeEmbed = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Idee")
        .addField("Idee", idee)
        .addField("Bedacht door", message.author)
        .setTimestamp();

    var ideeChannel = message.guild.channels.find("name", "ideeën");

    ideeChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');

    });

};

module.exports.help = {
    name: "/idee"
};