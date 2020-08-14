const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const moment = require("moment");
require("moment-duration-format");
const momenttz = require('moment-timezone');
const MessageAdd = require('./db/message_add.js')
const welcomeChannelName = "💡입퇴장💡";
const byeChannelName = "💡입퇴장💡";
const welcomeChannelComment = "어서오세요. #💬📋입단_신청📋💬에서 입단테스트 보고싶은 날짜와 시간을 적어주세요!";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: 'PLAYERUNKNOWN"S BATTLEGROUNDS' }, status: 'online' })
});

client.on('message', (message) => {
	if (message.content.startsWith("/안녕")) {
		message.channel.send("안녀엉!")
	}
	if (message.content.startsWith("/추방")) { //메세지가 /추방 으로 시작되고
		if (message.member.hasPermission("MANAGE_MESSAGES")) { //채팅을 입력한사람에게 MANAGE_MESSAGES 라는 권한이 있다면
            var Kick_player = message.mentions.users.first(); //Kick_player 변수를 메세지 중 가장 먼저 멘션한 사람으로 정의한다.
            if (Kick_player) { //만약 Kick_player Bool 값이 true라면 (찾을 수 없는경우 False가 됩니다.)
                try { //시도해봅니다
                    message.guild.member(Kick_player).kick(); //메세지를 입력한 서버 멤버중 멘션한 사람을 추방시킵니다.
                    message.channel.send(Kick_player.displayName + "를 서버에서 추방했습니다.");
                } catch (error) { //만약 오류가 발견되었다면
					message.channel.send("오류가 발생했습니다." + error) //전송
				}
            } else { //만약 없다면 (False일경우)
                message.channel.send("유저를 찾을 수 없습니다."); //전송
            }
        } else { //만약 채팅을 입력한 사람에게 MANAGE_MESSAGES 라는 권한이 없다면
            message.channel.send("권한이 없습니다."); //전송
        }
	}

	if (message.content.startsWith("/차단")) { //메세지가 /차단 으로 시작되고
		if (message.member.hasPermission("MANAGE_MESSAGES")) { //채팅을 입력한사람에게 MANAGE_MESSAGES 라는 권한이 있다면
            var Ban_player = message.mentions.users.first(); //Ban_player 변수를 메세지 중 가장 먼저 멘션한 사람으로 정의한다.
            if (Ban_player) { //만약 Ban_player Bool 값이 true라면 (찾을 수 없는경우 False가 됩니다.)
                try { //시도해봅니다
                    message.guild.member(Ban_player).ban(); //메세지를 입력한 서버 멤버중 멘션한 사람을 추방시킵니다.
                    message.channel.send(Ban_player.displayName + "를 서버에서 차단했습니다.");
                } catch (error) { //만약 오류가 발견되었다면
                    message.channel.send("오류가 발생했습니다." + error) //전송
                }
            } else { //만약 없다면 (False일경우)
                message.channel.send("유저를 찾을 수 없습니다."); //전송
            }
        } else { //만약 채팅을 입력한 사람에게 MANAGE_MESSAGES 라는 권한이 없다면
            message.channel.send("권한이 없습니다."); //전송
        }
	}

	if (message.content.startsWith('/삭제')) { //메세지가 /삭제 로 시작되고
		if (!message.member.hasPermission("MANAGE_MESSAGES")) { //만약에 명령어를 입력한 사람 권한 중 MANAGE_MESSAGES 라는 권한이 없다면
			return message.channel.send("권한이 없습니다."); //전송
		}
		var purge = message.content.substring(4) //메세지 내용중 4번째부터 메세지를 받습니다.
        /*
        substring()을 설명해드리자면, 괄호 안에있는 숫자부터 문자를 자릅니다.
        예시로 가나다라마바사아 가 있고 substring(3) 을 한다면,
        라마바사아 가 됩니다. 이때 숫자 순서는 0부터 시작합니다.
        0 1 2 3 4 5 6 . . . .
        만약, 3부터 6까지만 자르고 싶다면
        substring(3, 6) 하면됩니다.
        */
			if (!purge || purge == "") { //만약 메세지가 비어있거나 안써져있다면
				return message.channel.send("숫자를 입력해주세요,") //전송
			}
			if (purge > 100) { //만약 purge의 값이 100보다 크다면
				message.channel.send("1부터 100까지만 입력하세요.") //전송
			}
			if (purge < 1) { //만약 purge의 값이 1보다 작다면
				message.channel.send("1부터 100까지만 입력하세요.") //전송
			}
			if (isNaN(purge) == true) { //isNaN은 정수인지 판단하는 함수입니다. 문자열이 포함되어있을 경우 true를 반환합니다.
				message.channel.send("숫자만 입력하세요.") //전송
			} else { //아니라면
				    message.channel.bulkDelete(purge) //purge 변수 만큼 채널에세 메세지를 삭제합니다. //전송
					.then(() => message.channel.send(`${purge}개의 메세지를 삭제했습니다.`))
					.catch(console.error)
                
			}
		}

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

client.on("messageUpdate", (message) => {
  MessageSave(message, true)
});

client.on('message', (message) => {
  MessageSave(message)
  if(message.author.bot) return;

  if(message.content == '!스크림') {
    return message.reply('데일리,km 디코방을 필수로 들어가 있어주세요 https://discord.gg/w4jaMgH https://discord.gg/rpDZrab ');
  }

  if(message.content == '!si') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/attachments/739378453895315507/742615745141407744/gfsdsfdsdf.png?size=256';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#186de6')
    embed.setAuthor('server info of TEAM CR BOT', img)
    embed.setFooter(`TEAM CR BOT`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
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
  } else if(message.content == '!help') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '!help', desc: 'help'},
      {name: '!스크림', desc: '스크림 신청 시 필독해야 할것'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: '!청소', desc: '텍스트 지움'},
      {name: '!초대코드', desc: '해당 채널의 초대 코드 표기'},
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
  } else if(message.content == '!초대코드2') {
    client.guilds.array().forEach(x => {
      x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    });
  } else if(message.content == '!초대코드') {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if(err.code == 50013) {
          message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
        }
      })
  } else if(message.content.startsWith('!전체공지2')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지2'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('공지 of TEAM CR BOT')
        .setColor('#186de6')
        .setFooter(`TEAM CR BOT`)
        .setTimestamp()
  
      embed.addField('공지: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!전체공지')) {
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
  } else if(message.content.startsWith('!청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
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

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}

function getEmbedFields(message, modify=false) {
  if(message.content == '' && message.embeds.length > 0) {
    let e = message.embeds[0].fields;
    let a = [];

    for(let i=0;i<e.length;i++) {
        a.push(`\`${e[i].name}\` - \`${e[i].value}\`\n`);
    }

    return a.join('');
  } else if(modify) {
    return message.author.lastMessage.content;
  } else {
    return message.content;
  }
}

function MessageSave(message, modify=false) {
  imgs = []
  if (message.attachments.array().length > 0) {
    message.attachments.array().forEach(x => {
      imgs.push(x.url+'\n')
    });
  }

  username = message.author.username.match(/[\u3131-\uD79D^a-zA-Z^0-9]/ugi)
  channelName = message.channel.type != 'dm' ? message.channel.name : ''
  try {
    username = username.length > 1 ? username.join('') : username
  } catch (error) {}

  try {
    channelName = channelName.length > 1 ? channelName.join('') : channelName
  } catch (error) {}

  var s = {
    ChannelType: message.channel.type,
    ChannelId: message.channel.type != 'dm' ? message.channel.id : '',
    ChannelName: channelName,
    GuildId: message.channel.type != 'dm' ? message.channel.guild.id : '',
    GuildName: message.channel.type != 'dm' ? message.channel.guild.name : '',
    Message: getEmbedFields(message, modify),
    AuthorId: message.author.id,
    AuthorUsername: username + '#' + message.author.discriminator,
    AuthorBot: Number(message.author.bot),
    Embed: Number(message.embeds.length > 0), // 0이면 false 인거다.
    CreateTime: momenttz().tz('Asia/Seoul').locale('ko').format('ll dddd LTS')
  }

  s.Message = (modify ? '[수정됨] ' : '') + imgs.join('') + s.Message

  MessageAdd(
    s.ChannelType,
    s.ChannelId,
    s.ChannelName,
    s.GuildId,
    s.GuildName,
    s.Message,
    s.AuthorId,
    s.AuthorUsername,
    s.AuthorBot,
    s.Embed,
    s.CreateTime,
  )
    // .then((res) => {
    //   console.log('db 저장을 했다.', res);
    // })
    .catch(error => console.log(error))
}


client.login(token);
