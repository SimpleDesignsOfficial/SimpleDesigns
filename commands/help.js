const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var helpEmbed = new discord.RichEmbed()
        .setColor("#97a2f8")
        .setTitle("SimpleDesigns Help")
        .addField("/help", "Dit command laat alle commands zien die iedereen kan uitvoeren!")
        .addField("/website", "Met dit command krijg je een link van de website!")
        .addField("/ticket <onderwerp>", "Met dit command kan je een prive kanaal maken met alle medewerkers!")
        .addField("/idee <idee>", "Met dit command kan je een idee opgeven waar wij veel aan hebben!")

    message.channel.send("Het help menu met alle commands is in je dm gestuurt!");
    
    message.author.send(helpEmbed);

};

module.exports.help = {
    name: "/help"
};
