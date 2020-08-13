const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => { console.log("Bot is ready!") client.user.setPresence({ game: { name: '블로그 강좌용 봇입니다!' }, status: 'online' }) });

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "TEAM CR | 입단대기자"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '!스크림') {
    return message.reply('데일리,km 디코방을 필수로 들어가 있어주세요 https://discord.gg/w4jaMgH https://discord.gg/rpDZrab ');
  }

  if(message.content == '!클랜') {
    let img = 'https://cdn.discordapp.com/attachments/739378453895315507/742615745141407744/gfsdsfdsdf.png?size=256';
    let embed = new Discord.RichEmbed()
      .setTitle('CR클랜')
      .setURL('https://discord.gg/kwykahw')
      .setAuthor('케이쥐', img, 'https://discord.gg/kwykahw')
      .setThumbnail(img)
      .addBlankField()
      .addField('클랜장', '코일과 케이쥐가 손잡고 만든클랜입니다.')
      .addField('흥보', '흥보를 해서 클랜원 100명이 되면 추첨을통해 문상을 드립니다.', true)
      .addField('누르고 싶은 클랜', 'PKN', true)
      .addField('블랙리스트', '운젠입니다. 권력남용과 악성질을 많이 하였으므로 블랙입니다.', true)
      .addField('흥보링크', 'https://discord.gg/kwykahw\n케이쥐를 클릭하거나\nCR클랜 글자를 클릭\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('케이쥐가 만듬', img)

    message.channel.send(embed)
  } else if(message.content == '!명령어') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '!스크림', desc: '스크림 신청시 필독할거'},
      {name: '!클랜', desc: 'CR클랜에 메시지'},
      {name: '!명령어', desc: '클랜본 명령어'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of TEAM CR BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`TEAM CR BOT`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!dm공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!dm공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "권한이 없어 명령을 수행할수 없습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);
