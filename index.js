const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '!도움말을 쳐보세요.' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == '!월요일') {
    let img = 'https://cdn.discordapp.com/attachments/780339994467893278/782908608840466442/2aed7a5f5a0b59c7.png';
    let embed = new Discord.RichEmbed()
      .setTitle('월요일 시간표')
      .setThumbnail(img)
      .addBlankField()
      .addField('시간표', '1교시: 체육\n2교시: 체육\n3교시: 수학\n4교시: 과학\n5교시: 국어\n6교시: 기가')
      .addField('줌 주소', '조회/종례\nhttps://us02web.zoom.us/j/85772423415?pwd=R0srQy9STmJWaHZNOWtsMkxFS3N5QT09\n\n수학\nhttps://us02web.zoom.us/j/88915247038?pwd=cXgyQlN2ZHQwWGsydm95b21VY0tKdz09\n\n과학\nhttps://zoom.us/j/5136450756?pwd=QmIrTldmTTRJMHZITWJEWU9ieE1QZz09\n\n국어(김윤정t)\nhttps://zoom.us/j/92498370772?pwd=eWdCUVBCblU1ejBzMGRzd1h6UmFyUT09\n\n기가\nhttps://zoom.us/j/3604918739?pwd=QTduMEkxckxoOFV1VGU1Z3NVUFBWQT09', true)
      .addBlankField()
      .setTimestamp()
      .setFooter('상갈중', img)

    message.channel.send(embed)
  } else if(message.content == '!') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '!(오늘요일)', desc: '오늘의 시간표를 보여줘요!'},
      {name: '!김영채', desc: '김영채의 실체를 알려줘요!'},
      {name: '엄준식', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 상갈 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`상갈 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
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

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == '!화요일') {
    let img = 'https://cdn.discordapp.com/attachments/780339994467893278/782908608840466442/2aed7a5f5a0b59c7.png';
    let embed = new Discord.RichEmbed()
      .setTitle('화요일 시간표')
      .setThumbnail(img)
      .addBlankField()
      .addField('시간표', '1교시: 역사 \n2교시: 국어 \n3교시: 영어 홀-read 짝-listen(zoom)\n4교시: 미술 \n5교시: 도덕 \n6교시: 자유과학 \n7교시: 수학')
      .addField('줌 주소', '조회/종례\nhttps://us02web.zoom.us/j/85772423415?pwd=R0srQy9STmJWaHZNOWtsMkxFS3N5QT09\n\n역사\nhttps://zoom.us/j/5993983414?pwd=SWxpYlJMUzZiWVhEN0o4bXVoRkllUT09\n\n국어(홍수연t)\nhttps://zoom.us/j/6374439665?pwd=T0Y4cHpqYit2emdaZVN1TWs0ZW1UUT09\n\nListen\nhttps://us02web.zoom.us/j/6072115599?pwd=N1VlRnFsbHAxVDFQTmZOenpCb0hydz09\n\n도덕\nhttps://us02web.zoom.us/j/83996760140?pwd=VXZOa3VHSkdsWHY2ZHV2ODZJeUpRZz09\n\n수학\nhttps://us02web.zoom.us/j/88915247038?pwd=cXgyQlN2ZHQwWGsydm95b21VY0tKdz09', true)
      .addBlankField()
      .setTimestamp()
      .setFooter('상갈중', img)

    message.channel.send(embed)
  } else if(message.content == 'embed2') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 콜라곰 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`콜라곰 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
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

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == '!수요일') {
    let img = 'https://cdn.discordapp.com/attachments/780339994467893278/782908608840466442/2aed7a5f5a0b59c7.png';
    let embed = new Discord.RichEmbed()
      .setTitle('수요일 시간표')
      .setThumbnail(img)
      .addBlankField()
      .addField('시간표', '1교시: 역사 \n2교시: 국어 \n3교시: 기가 \n4교시: 기가 \n5교시: 과학\n6교시: 동아리')
      .addField('줌 주소', '조회/종례\nhttps://us02web.zoom.us/j/85772423415?pwd=R0srQy9STmJWaHZNOWtsMkxFS3N5QT09\n\n역사\nhttps://zoom.us/j/5993983414?pwd=SWxpYlJMUzZiWVhEN0o4bXVoRkllUT09\n\n국어(김윤정t)\nhttps://zoom.us/j/92498370772?pwd=eWdCUVBCblU1ejBzMGRzd1h6UmFyUT09\n\n기가\nhttps://zoom.us/j/3604918739?pwd=QTduMEkxckxoOFV1VGU1Z3NVUFBWQT09\n\n과학\nhttps://zoom.us/j/5136450756?pwd=QmIrTldmTTRJMHZITWJEWU9ieE1QZz09', true)
      .addBlankField()
      .setTimestamp()
      .setFooter('상갈중', img)

    message.channel.send(embed)
  } else if(message.content == 'embed2') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 콜라곰 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`콜라곰 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
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

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == '!목요일') {
    let img = 'https://cdn.discordapp.com/attachments/780339994467893278/782908608840466442/2aed7a5f5a0b59c7.png';
    let embed = new Discord.RichEmbed()
      .setTitle('목요일 시간표')
      .setThumbnail(img)
      .addBlankField()
      .addField('시간표', '1교시: 도덕\n2교시: 중국어 \n3교시: 미술\n4교시: 수학 \n5교시: 역사 \n6교시: 영어합반\n7교시:  국어')
      .addField('줌 주소', '조회/종례\nhttps://us02web.zoom.us/j/85772423415?pwd=R0srQy9STmJWaHZNOWtsMkxFS3N5QT09\n\n도덕\nhttps://us02web.zoom.us/j/83996760140?pwd=VXZOa3VHSkdsWHY2ZHV2ODZJeUpRZz09\n\n중국어\nhttps://us02web.zoom.us/j/86959104812?pwd=QVU1clhyZVppWjlpdS9XQzhMdjYyZz09\n\n수학\nhttps://us02web.zoom.us/j/88915247038?pwd=cXgyQlN2ZHQwWGsydm95b21VY0tKdz09\n\n역사\nhttps://zoom.us/j/5993983414?pwd=SWxpYlJMUzZiWVhEN0o4bXVoRkllUT09\n\n국어(김윤정t)\nhttps://zoom.us/j/92498370772?pwd=eWdCUVBCblU1ejBzMGRzd1h6UmFyUT09', true)
      .addBlankField()
      .setTimestamp()
      .setFooter('상갈중', img)

    message.channel.send(embed)
  } else if(message.content == 'embed2') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 콜라곰 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`콜라곰 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
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

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '!김영채') {
    return message.reply('걘 사람도 아님');
  }

  if(message.content == '!금요일') {
    let img = 'https://cdn.discordapp.com/attachments/780339994467893278/782908608840466442/2aed7a5f5a0b59c7.png';
    let embed = new Discord.RichEmbed()
      .setTitle('금요일 시간표')
      .setThumbnail(img)
      .addBlankField()
      .addField('시간표', '1교시: 체육\n2교시: 체육\n3교시: 영어 짝-read 홀-listen(zoom)\n4교시: 과학\n5교시: 중국어 \n6교시: 수학')
      .addField('줌 주소', '조회/종례\nhttps://us02web.zoom.us/j/85772423415?pwd=R0srQy9STmJWaHZNOWtsMkxFS3N5QT09\n\nListen\nhttps://us02web.zoom.us/j/6072115599?pwd=N1VlRnFsbHAxVDFQTmZOenpCb0hydz09\n\n과학\nhttps://zoom.us/j/5136450756?pwd=QmIrTldmTTRJMHZITWJEWU9ieE1QZz09\n\n중국어\nhttps://us02web.zoom.us/j/86959104812?pwd=QVU1clhyZVppWjlpdS9XQzhMdjYyZz09\n\n수학\nhttps://us02web.zoom.us/j/88915247038?pwd=cXgyQlN2ZHQwWGsydm95b21VY0tKdz09', true)
      .addBlankField()
      .setTimestamp()
      .setFooter('상갈중', img)

    message.channel.send(embed)
  } else if(message.content == 'embed2') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 콜라곰 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`콜라곰 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
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
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
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
