const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete(15000) && (message.channel.send("Error: Alleen medewerkers kunnen dit command uitvoeren!").then(m => m.delete(7500)));

if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
    return message.delete(15000) && (message.channel.send("Error: U bent vergeten om een getal optegeven, of het getal is niet correct!").then(m => m.delete(7500)));
}

let deleteAmount;

if (parseInt(args[0]) > 100) {
    deleteAmount = 100;
} else {
    deleteAmount = parseInt(args[0]);
}

var logChannel = message.guild.channels.find("name", "logs");

var logEmbed = new discord.RichEmbed()
    .setColor("#97a2f8")
    .setTitle("SimpleDesigns Clear")
    .addField("Door", message.author)
    .addField("Channel", message.channel.name)
    .addField("Aantal", args[0])
    .setTimestamp();

logChannel.send(logEmbed);

var clearEmbed = new discord.RichEmbed()
.setColor("#97a2f8")
.setTitle("SimpleDesigns Clear")
.setDescription(`Er zijn in totaal ${args[0]} berichten verwijderd!`)
.setTimestamp();

message.channel.bulkDelete(deleteAmount, true)
    .then(deleted => message.channel.send(clearEmbed).then(m => m.delete(15000)));
}

module.exports.help = {
    name: "/clear"
}