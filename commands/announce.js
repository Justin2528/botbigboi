const send = require('quick.hook');
const Discord = require('discord.js');

exports.run = (bot, message, args) => {

     let L = message.guild.channels.find("name", "announcements");
    message.channel.send('@everyone ' + args[0])
    
    
    };
exports.help = {
    name: "announce"

}
