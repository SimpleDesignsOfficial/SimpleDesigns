const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Error: Alleen medewerkers kunnen dit command uitvoeren!");

    let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (args < 1) return message.channel.send("Error: Er is geen gebruiker opgegeven!");

    if (!banUser) return message.channel.send("Error: Er is geen gebruiker gevonden met deze naam!");

    let banReden = args.join(" ").slice(22) || "Geen reden opgegeven!"

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Error: De persoon die je hebt opgegeven heeft dezelfde permissie als jouw, en is dus niet banbaar!");

    const logChannel = message.guild.channels.find("name", "logs");

    var banEmbedLog = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("Server Ban")
        .addField("Wie", `${banUser}`)
        .addField("Door", `${message.author}`)
        .addField("Reden", banReden)
        .setTimestamp();

    logChannel.send(banEmbedLog);

    var persoonIsBannedEmbed = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Ban")
        .setDescription(`${banUser} is gebanned uit de SimpleDesigns discord server met als reden: ` + banReden)
        .setTimestamp();

    message.channel.send(persoonIsBannedEmbed)

    var persoonIsBannedEmbed2 = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Ban")
        .setDescription(`U bent gebanned uit de SimpleDesigns discord server met als reden: ` + banReden)
        .setTimestamp();

    message.author.sendMessage();

    message.mentions.users.map(async user => {

        try { await banUser.send(persoonIsBannedEmbed2); }

        catch (err) { console.log(''); }

        message.guild.member(banUser).ban(banReden);

        return;
    });

};

module.exports.help = {
    name: "/ban"
}