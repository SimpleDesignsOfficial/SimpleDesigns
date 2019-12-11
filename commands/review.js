const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const aantalSterren = args[0];

    if (!aantalSterren) return message.delete(7500) && (message.channel.send("Error: U bent vergeten om het aantal sterren op te geven! (1/5)").then(m => m.delete(7500)));

    if (aantalSterren < 1 || aantalSterren > 5) return message.delete(7500) && (message.channel.send("Error: U kunt alleen de getallen: 1, 2, 3, 4 en 5 gebruiken!").then(m => m.delete(7500)));

    const bericht = args.splice(1, args.length).join(' ');

    if (!bericht) return message.delete(7500) && (message.channel.send("Error: U bent vergeten om een review op").then(m => m.delete(7500)));

    var reviewChannel = message.guild.channels.find('name', 'reviews');

    var sterren = "";

    for (var i = 0; i < aantalSterren; i++) {

        sterren += ":star: ";

    }

    const review = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Review")
        .addField("Sterren", `${sterren}`)
        .addField("Review", `${bericht}`)
        .addField("Door", message.author)
        .setTimestamp();

    const review2 = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Review")
        .setDescription("Uw review is met succes in de #reviews channel gezet!")
        .setTimestamp();

    message.delete(15000) && (message.channel.send(review2).then(m => m.delete(15000)));

    reviewChannel.send(review);

}

module.exports.help = {
    name: "/review",
}