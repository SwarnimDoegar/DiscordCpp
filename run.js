const { exec } = require('child_process');
const discord = require('discord.js');
const { join } = require('path');


/**
 * 
 * @param {discord.Message} msg 
 * @param {string} msgContent 
 */

module.exports= function run (msg,msgContent)
{
    const userId = msg.author.id;
    let input = msgContent.slice(msgContent.indexOf("```")+3, msgContent.length-3).trim()
    exec(`echo '${input}'|./userCodes/${userId}.out`, (err, stdout, stdin) => {
        const output = stdout;
        msg.reply("Your output is ```\n"+output+"```")
    })
    
}