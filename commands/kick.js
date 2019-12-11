const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Error: Alleen medewerkers kunnen dit command uitvoeren!");
    let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (args < 1) return message.channel.send("Error: Er is geen gebruiker opgegeven!");

    if (!kickUser) return message.channel.send("Error: Er is geen gebruiker gevonden met deze naam!");

    let kickReden = args.join(" ").slice(22) || "Geen reden opgegeven!"

    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.delete(7500) && (message.channel.send("Error: De persoon die je hebt opgegeven heeft dezelfde permissie als jouw, en is dus niet kickbaar!").then(m => m.delete(7500)));

    const logChannel = message.guild.channels.find("name", "logs");

    var kickEmbedLog = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("Server Kick")
        .addField("Wie", `${kickUser}`)
        .addField("Door", `${message.author}`)
        .addField("Reden", kickReden)
        .setTimestamp();

    logChannel.send(kickEmbedLog)

    var persoonIsKickedEmbed = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Kick")
        .setDescription(`${kickUser} is gekickt uit de SimpleDesigns discord server met als reden: ` + kickReden)
        .setTimestamp();

    message.channel.send(persoonIsKickedEmbed)

    var persoonIsKickedEmbed2 = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Kick")
        .setDescription(`U bent gekickt uit de SimpleDesigns discord server met als reden: ` + kickReden)
        .setTimestamp();

    message.author.sendMessage()

    message.mentions.users.map(async user => {

        try { await kickUser.send(persoonIsKickedEmbed2); }

        catch (err) { console.log(''); }

        message.guild.member(kickUser).kick(kickReden);

        return;
    });

}

module.exports.help = {
    name: "/kick"
}