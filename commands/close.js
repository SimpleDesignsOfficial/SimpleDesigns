const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    const categoryId = "651129559843864606";
 
    if (message.channel.parentID == categoryId) {

        var zekerEmbed = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Ticket")
        .setDescription("Er is een melding gestuurt naar alle medewerkers dat u uw ticket wilt sluiten! Wilt u toch niet uw ticket sluiten, type dan nog iets in deze channel!")
        .setTimestamp();

        message.channel.send(zekerEmbed)
 
    } else {
 
        return message.delete(7500) && (message.channel.send("Error: Dit command kan alleen gebruikt worden in een ticket channel!").then(m => m.delete(7500)));
 
    }

    const staffChannel = message.guild.channels.find("name", "on-topic-2");

    var closeEmbedStaff = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Ticket")
        .setDescription(`De gebruiker ${message.author} wilt zijn ticket sluiten, ${message.channel}.`)
        .setTimestamp();

    staffChannel.send(closeEmbedStaff)

}
 
module.exports.help = {
    name: "/close",
}