const fs = require('fs');
const discord = require('discord.js');
const { exec } = require('child_process');
/**
 * 
 * @param {discord.Message} msg 
 * @param {string} msgContent 
 */

module.exports= function compile(msg, msgContent) {
    
    const index = msgContent.indexOf("```")
    const code = msgContent.slice(index+3,msgContent.length-3)
    const dir = "./userCodes";
    console.log(`compiling for ${msg.author.username}`)

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    fs.writeFileSync(`${dir}/${msg.author.id}.cpp`, code)
    exec(`g++ ${dir}/${msg.author.id}.cpp -o ${dir}/${msg.author.id}.out`, (err, stdout, stdin) => {

        if (err != null) {
            // console.log(err.toString())
            msg.reply("```\n" + err.toString().slice(0, 1500) + "```")
            return;
        }
        msg.reply("Your code compiled successfully use [] run ```input``` to execute your program")
    })

}
