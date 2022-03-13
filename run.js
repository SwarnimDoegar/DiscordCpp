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
    exec(`echo '${input}'| timeout 7 ./userCodes/${userId}.out -l`, (err, stdout, stdin) => {
        const output = stdout || (err?.code === 124 ? "Code took too long to run. Please optimise your code to run under 7 seconds." : "Something went wrong.");
        msg.reply("Your output is ```\n"+output+"```")
    })
    
}