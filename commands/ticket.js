const discord = require('discord.js');

exports.run = (client, message, args, guild) => { 

    let onderwerp = args.join(" ");

    var userName = message.author.username;

    let bicon = client.user.displayAvatarURL;

    if (!onderwerp) return message.channel.send("Error: Geef een onderwerp op waar je ticket over gaat!");

    let role = message.guild.roles.find(c => c.name === 'Team SimpleDesigns');
    let role2 = message.guild.roles.find(c => c.name === '@everyone');
    var bool = false;

    message.guild.channels.forEach((channel) => {

        if (channel.name == "ticket-" + userName.toLowerCase()) {

            message.channel.send("Error: U hebt momenteel al een ticket open staan!");

            bool = true;

        }

    });

    if (bool == true) return;

    message.guild.createChannel("?ticket-" + userName, "text").then(c => {
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        const ticketEmbed = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Ticket")
        .setDescription("Wij als SimpleDesigns proberen zo snel mogelijk uw ticket te behandelen. U zult reactie krijgen binnen 12 uur! Wilt u uw ticket toch al sluiten, type dan `/close`, en uw channel zal snel verwijderd worden!")
        .addField("Onderwerp", `${onderwerp}` )
        .setTimestamp();
        c.send({ embed: ticketEmbed });

        c.setTopic(`Ticket gemaakt door ${message.author}!`)

        const categoryId = "651129559843864606";
        c.setParent(categoryId)

        var t2 = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Ticket")
        .setDescription(`Uw ticket is met succes aangemaakt!`)
        .setTimestamp();
        
        message.channel.send(t2);

        var log1 = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Ticket")
        .addField("Door", `${message.author}`)
        .addField("Channel", `${message.channel.name}`)
        .addField("Actie", "Aangemaakt")

    var logChannel = message.guild.channels.find("name", "logs");

    logChannel.send(log1);

    });
};

module.exports.help = {
    name: "/ticket"
};
