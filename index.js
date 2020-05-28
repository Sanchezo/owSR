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
client.music = require("discord.js-musicbot-addon");

// Now we start the music module.
client.music.start(client, {
  // Set the api key used for YouTube.
  botPrefix:".",
  youtubeKey: ""
  
});
client.on("error", error=>{

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
    .addField(".server", "Shows you our server ip")
    .addField(".error", "Shows you how to resolve most of the problems")
    
    
  message.channel.sendEmbed(embed);
    
  }
  if(command=="error"){
 
    const embed = new Discord.MessageEmbed()
  .setTitle("Problem Solving")
  .setAuthor("Rebels Bot", "https://rebels-games.com/wp-content/uploads/2018/04/Logo-Rebels-64x64.png")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
   
  .setColor(0x00AE86)
  .setDescription("Easiest way to eliminate problem (most problems).")
  .setFooter("rebels-games.com", "https://rebels-games.com/wp-content/uploads/2018/04/Logo-Rebels-64x64.png")
  
  .setThumbnail("https://rebels-games.com/wp-content/uploads/2018/04/Logo-Rebels-64x64.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  
  .addField("-",
   " Disconnect from server." )
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField( "-","Turn off the game" )
  /*
   * Blank field, useful to create some space.
   */

  .addField("-","Delete contents of folder in %appdata%\SpaceEngineers\ShaderCache2")
  .addField("-","Reset Steam" )
  .addField("-"," Connect with server again." )
    
 
  message.channel.send({embed});
}
  if(command=="server"){
 
    const embed = new Discord.MessageEmbed()
  .setTitle("Server IP")
  .setAuthor("Rebels Bot", "https://rebels-games.com/wp-content/uploads/2018/04/Logo-Rebels-64x64.png")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
   
  .setColor(0x00AE86)
  .setDescription("IP of our servers")
  .setFooter("rebels-games.com", "https://rebels-games.com/wp-content/uploads/2018/04/Logo-Rebels-64x64.png")
  
  .setThumbnail("https://rebels-games.com/wp-content/uploads/2018/04/Logo-Rebels-64x64.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
 
    .addField("-","Space Engineers")
  .addField("Name:   Omega EU (Europe)",
   " s1.rebels-games.com:27016 116.202.132.33:27016" )
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField( "Omega SA (South America)","s2.rebels-games.com:27017  209.13.86.245:27017" )
  /*
   * Blank field, useful to create some space.
   */

  .addField("-","Rust")
  .addField("Name:   Omega EU (Europe)","IP:     s1.rebels-games.com:27016 116.202.132.33:27016" )
  .addField("Name:   Omega SA (South America)"," IP:     s2.rebels-games.com:27017 209.13.86.245:27017" )
    
 
  message.channel.send({embed});
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
	
	

client.login("")
