const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let L = new Discord.RichEmbed()
.setDescription("Command List")
.setColor("RANDOM")
.addField("help", "Command List", true)
.addField("ban <user> <reason>", "ban a folks!",true)
.addField("kick <user> <reason>", "kick a folks!",true)
.addField("mute <user> <(number)s/m/h)", "mute a folks",true)
.addField("warn <user> <reason>", "warn a folks")
.addField("warnlevel <user>", "check how many warns that user got.",true)
message.channel.send(L);


}

module.exports.help = {
    name: "help"
}
