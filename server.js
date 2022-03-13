const Discord = require('discord.js');
const compile = require('./compile');
const run = require('./run')
const fetch= require('node-fetch')
require('dotenv').config();
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const msgContent = msg.content;
  // console.log(msg)


  if (msgContent.length < 2) {
    return;
  }

  if (msgContent.substr(0, "[] compile".length) == "[] compile") {
    if (msg.attachments.array().length >= 1) {
      const url = msg.attachments.array()[0].url
      fetch(url).then((data)=>data.text()).then(data=>{
        compile(msg, "```"+data+"```")
      })
      return;
    }

    compile(msg, msgContent);
  }

  if (msgContent.substr(0, "[] run".length) == "[] run") {

    if (msg.attachments.array().length >= 1) {
      const url = msg.attachments.array()[0].url
      fetch(url).then((data)=>data.text()).then(data=>{
        run(msg, "```"+data+"```")
      })
      return;
    }
    run(msg, msgContent);
  }
}
);

client.login(process.env.clientid);


