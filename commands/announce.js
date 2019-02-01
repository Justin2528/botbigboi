const send = require('quick.hook');
const Discord = require('discord.js');

exports.run = (bot, message, args) => {

     let L = bot.guild.channels.find("name", "announcements");
    L.send(`@everyone ${message.content}`)
    
    
    };
exports.help = {
    name: "announce"

}
