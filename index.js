const ow = require('overwatch-stats-api');
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord= require("discord.js")
const client = new Discord.Client()
const prefix="."


client.on('ready', ready =>{
  client.user.setPresence({
        game: { 
            name: 'Use .help',
            type: 'WATCHING'
        },
        status: 'available'
    })
	console.log("ready")
   
  
})
client.on("error", error=>{

})
client.on('message', message =>{
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).split(' ');
const command = args.shift().toLowerCase();
var res=args.toString().replace("#", "-")
console.log(res)
  if(command=="help"){
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
	.setTitle('Help')
	.setURL('https://discord.js.org/')
	.setAuthor('OverSR', 'https://i.imgur.com/FXEcoUt.png', 'https://discord.js.org')
	.setDescription('Helps you with command usage.')
	.setThumbnail('https://i.imgur.com/FXEcoUt.png')
	.addFields(
		{ name: `${prefix}sr`, value: 'Shows rank of specified player. Usage: .sr <battletag>' },
		
	
	)
	
	.setImage('https://i.imgur.com/FXEcoUt.png')
	.setTimestamp()
	.setFooter('OverSR', 'https://i.imgur.com/FXEcoUt.png');
  message.channel.send(exampleEmbed)
  }
  
	if(command=="sr"){
	if(args.length>6) {
    message.channel.send("You haven't provided battletag") 
    return;
  }

(async () => {
  message.channel.send("Please wait! It may take some time!")
  
  const stats = await ow.getAllStats(res, 'pc');
  console.log(res)
  if(res==" ") message.channel.send("You haven't provided any battletag!");
 console.log(stats.rank);
  
	
  if(!args) message.channel.send("You haven't provided any battletag!");
   
	
  if(stats.rank.damage){
 var dmgsr=stats.rank.damage.sr
  }else{
    var dmgsr="no placements were played"
  }
  if(stats.rank.tank){
 var tanksr=stats.rank.damage.sr
  }else{
    var tanksr="no placements were played"
  }
  if(stats.rank.support){
 var support=stats.rank.damage.sr
 var rankicon=stats.rank.damage.tierIcon
  }else{
    var support="no placements were played"
  }
	
  const exampleEmbed = new Discord.MessageEmbed()
  
	.setColor('#0099ff')
	.setTitle('OverSR')
	.setURL('https://discord.js.org/')
	.setAuthor('OverSR', 'https://i.imgur.com/FXEcoUt.png', 'https://discord.js.org')
	.setDescription('Shows SR of specified person')
	.setThumbnail(`${stats.iconURL}`)
	.addFields(
      
		{ 
      name: 'Player', value: `${args}` },
    {name:"Level", value:`${stats.level}`},
    
    {name:"Stars", value:`${stats.prestige}`},
    {name: 'Tank', value: `${tanksr}` },
		
		{ name: 'DPS', value: `${dmgsr}`},
		{ name: 'Support', value: `${support}`},
	)
	
	.setImage(stats.rank.damage.tierIcon)
	.setTimestamp()
	.setFooter('OverSR', 'https://i.imgur.com/FXEcoUt.png');
	message.channel.send(exampleEmbed).catch(error =>{
    message.channel.send("Could not send SR because placement were not played")
  })
  
  
    ;
})()

      
	
	}
	
})
	
	

client.login("NzEyNjIxMzY0MzU5NzI1MDU2.XsUrAg.tHZzur4vAGAp47gqUKfT4YcM9Xo")