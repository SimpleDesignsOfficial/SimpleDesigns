const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const bot = new discord.Client();

const fs = require("fs");
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen!`);

        bot.commands.set(fileGet.help.name, fileGet);
    });

});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("/help", { type: "LISTENING" });
});

bot.on("guildMemberAdd", member => {

    var joinMessage = new discord.RichEmbed()
        .setTitle("Server Join")
        .setDescription(`${member.user} is de discord server gejoined!`)
        .setTimestamp()
        .setColor("#97a2f8");

    const logChannel = member.guild.channels.find("name", "logs");

    logChannel.send(joinMessage);
});

bot.on("guildMemberRemove", member => {

    var leaveMessage = new discord.RichEmbed()
        .setTitle("Server Leave")
        .setDescription(`${member.user} is de discord server geleaved!`)
        .setTimestamp()
        .setColor("#97a2f8")

    const logChannel = member.guild.channels.find("name", "logs");

    logChannel.send(leaveMessage);
});

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    let prefix = botConfig.prefix;

    let messageArray = message.content.split(" ");

    let cmd = messageArray[0];

    let args = messageArray.slice(1)

    var commands = bot.commands.get(cmd.slice(prefix));

    if (commands) commands.run(bot, message, args);

});

bot.login(botConfig.token);