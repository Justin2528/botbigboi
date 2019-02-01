const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const antispam = require("discord-anti-spam");

antispam(bot, {
    warnBuffer: 8, //Maximum amount of messages allowed to send in the interval time before getting warned.
    maxBuffer: 12, // Maximum amount of messages allowed to send in the interval time before getting banned.
    interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
    warningMessage: " [ ! ] WARNING, If you continue spamming you will be banned.", // Warning message send to the user indicating they are going to fast.
    banMessage: " was banned for spamming. Don't test EDGE bots anti spam. Would anyone else like a try?", // Ban message, always tags the banned user in front of it.
    maxDuplicatesWarning: 8, // Maximum amount of duplicate messages a user can send in a timespan before getting warned
    maxDuplicatesBan: 24, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
    deleteMessagesAfterBanForPastDays: 7 // Delete the spammed messages after banning for the past x days.
});

fs.readdir("./commands/", (err, files) => {
    
    if(err) console.log(err);

 let jsfile = files.filter(f => f.split(".").pop() === "js")
    
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props)
    
    });

});
    bot.on("roleCreate", async role => {
    let L = role.guild.channels.find("name", "staff-logs")
    L.send(`${role} is now alive! Woohoo! Well i like that name but idk just a role.`)
});

bot.on("roleDelete", async role => {
    let L = role.guild.channels.find("name", "staff-logs")
    L.send(`${role.name} was alive but someone killed ${role.name} D: cri`)
});


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return message.channel.send("Commands don't work in dm channel!");
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: botconfig.prefix
      };
    }
    let prefix = prefixes[message.guild.id].prefixes;
    if(!message.content.startsWith(prefix)) return;
    
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args)

    
});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity(">help - Luca");

});

bot.on("messageDelete", async message => {
    if(message.author.bot) return;
    let sChannel = message.guild.channels.find(`name`, "staff-logs");
    sChannel.send(` ${message.content} by \`${message.author.username}\` is dead in ${message.channel}.`);
});

bot.on("guildMemberAdd", async member => {

    console.log(`${member.id} joined the server.`);
    let welcomechannel = member.guild.channels.find(`name`, "welcome");
    welcomechannel.send(`Welcome, ${member} to the Hypixel Zoo! Wait, this isn't the Zoo, it's **${member.guild}**`);

});

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} has leave the server`);
    let welcomechannel = member.guild.channels.find(`name`, "welcome");
    welcomechannel.send(`${member} left the Hypixel Zoo. I mean **${member.guild}**`);

});
bot.on("guildBanAdd", async user => {

    let sChannel = user.guild.channels.find(`name`, "staff-logs");
    sChannel.send(`Oh Look, there is a guy got banned. AND THIS GUY'S NAME IS ${user}`);
});


bot.on("channelCreate", async channel => {

    console.log(`${channel.name} is alive`)

    let sChannel = channel.guild.channels.find(`name`, "staff-logs");

    if(!sChannel) return;
    sChannel.send(`${channel} is alive! woohoo!`);

});

bot.on("channelDelete", async channel => {
    let sChannel = channel.guild.channels.find(`name`, "staff-logs");
    console.log(`${channel.name} has been dead`)
    if(!sChannel) return;
    sChannel.send(`${channel.name} is dead! OH NO IT'S DEAD!`);

});

    

    
    bot.login(process.env.BOT_TOKEN);
