const ow = require('overwatch-stats-api');
const http = require('http');
const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('Your bot is alive!')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("Server is Ready!")});
}


const Discord= require("discord.js")
const client = new Discord.Client({disableEveryone: true})
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


client.on('message', message =>{
  
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).split(' ');
const command = args.shift().toLowerCase();
var res=args.toString().replace("#", "-")
console.log(res)
  if(command=="help"){
     var embed = new Discord.MessageEmbed()
    .addField(".sr", "Shows you SR of specified person. Usage: .sr <battletag>")
  
    
    
  message.channel.sendEmbed(embed);
    
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
 var tanksr=stats.rank.tank.sr
  }else{
    var tanksr="no placements were played"
  }
  if(stats.rank.support){
 var support=stats.rank.support.sr
 var rankicon=stats.rank.damage.tierIcon
  }else{
    var support="no placements were played"
  }
	const exampleEmbed = {
	color: "#0099ff",
	title: 'owSR',
	
	author: {
		name: 'OverSR',
		icon_url: 'https://i.imgur.com/wSTFkRM.png',
		url: 'https://discord.js.org',
	},
	description: 'Shows SR of specified person',
	thumbnail: {
		url: 'https://i.imgur.com/wSTFkRM.png',
	},
	fields: [
		{
			name: 'Player',
			value: `${args}`,
		},
	 {name:"Stars", value:`${stats.prestige}`},
    {name: 'Tank', value: `${tanksr}` },
		
		{ name: 'DPS', value: `${dmgsr}`},
		{ name: 'Support', value: `${support}`}
	],
	image: {
		url: stats.iconURL,
	},
	timestamp: new Date(),
	footer: {
		text: 'OverSR',
		icon_url: 'https://i.imgur.com/FXEcoUt.png',
	},
};

    message.channel.send(exampleEmbed).catch(error =>{
    message.channel.send("Could not send SR because placement were not played")
  })
  
  
    ;
})()

      
	
	}
	
})
	
	

client.login("")
