const { prefix, token, api, owner } = require('./config.json');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const search = require('youtube-search');
const bot = new Discord.Client();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let botusername = "";

bot.on('ready', (msg) => {
    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag}!`);
    console.log("");
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `Tinder voor 🌱 | ${prefix}info`,
            url: 'https://planetx.landstede.dev/'
        }
    })

    botusername = bot.user.username;
});

// const exampleEmbed = new Discord.MessageEmbed()
// 	.setColor('#0099ff')
// 	.setTitle('Some title')
// 	.setURL('https://discord.js.org/')
// 	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
// 	.setDescription('Some description here')
// 	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
// 	.addFields(
// 		{ name: 'Regular field title', value: 'Some value here' },
// 		{ name: '\u200B', value: '\u200B' },
// 		{ name: 'Inline field title', value: 'Some value here', inline: true },
// 		{ name: 'Inline field title', value: 'Some value here', inline: true },
// 	)
// 	.addField('Inline field title', 'Some value here', true)
// 	.setImage('https://i.imgur.com/wSTFkRM.png')
// 	.setTimestamp()
// 	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

const data2 = {
    "embed": [
        {
            "title": "GERRIT BAÑO COMMANDS:",
            "color": 16426522,
            "fields": [
                {
                    "name": `${prefix}info`,
                    "value": "Dit bericht kan je oproepen met dit command."
                },
                {
                    "name": `${prefix}status`,
                    "value": "Hiermee kan je de link krijgen van de website waar op ik sta. Op de website kan je zien van onderander bij hoe vochtig mijn aarde is. Ook kan je de vochtigheid  van andere planten zien.\n"
                },
                {
                    "name": `${prefix}water`,
                    "value": "Met dit command kan ik je laten weten of ik dorst heb of niet."
                },
                {
                    "name": `${prefix}join`,
                    "value": "Je kan mij oproepen om in een voice channel te komen met dit command.\n"
                },
                {
                    "name": `${prefix}leave`,
                    "value": "Dit command kan je mij uit een voice-channel zetten.\n"
                },
                {
                    "name": `${prefix}play`,
                    "value": "Ik kan liedjes af spelen als je dit command invoert. *(.play {titel van het liedje})*\n"
                },
                {
                    "name": `${prefix}stop`,
                    "value": "Om mij te laten stoppen met een liedje af te spelen moet je dit command gebruiken."
                }
            ]
        }
    ]
}

const data_2 = {
    "embed": {
        "title": "! LET OP: !",
        "color": 15746887,
        "description": `Bij sommige commands moet je in een voice-channel zitten of in de voice-channel waar ik in zit zitten. Bij de volgende commands moet je in een voice-channel zitten om het te gebruiken:\n\n- **${prefix}join** \n- **${prefix}play** \n\nBij de volgende commands moet je in dezelfde voice-channel zitten als ik:\n\n-**${prefix}leave**\n-**${prefix}stop**`,
        "fields": [
            {
                "name": "................",
                "value": "Als je iets niet snapt of je ziet dat er in de bot fouten zijn, ga gerust naar Mart toe!"
            }
        ]
    }
}
const data = {
    "embed": {
        "title": "GERRIT BAÑO COMMANDS:",
        "color": 16426522,
        "author": {
            "name": botusername,
        },
        "fields": [
            {
                "name": `${prefix}info`,
                "value": "Dit bericht kan je oproepen met dit command."
            },
            {
                "name": `${prefix}status`,
                "value": "Hiermee kan je de link krijgen van de website waar op ik sta. Op de website kan je zien van onderander bij hoe vochtig mijn aarde is. Ook kan je de vochtigheid  van andere planten zien.\n"
            },
            {
                "name": `${prefix}water`,
                "value": "Met dit command kan ik je laten weten of ik dorst heb of niet."
            },
            {
                "name": `${prefix}join`,
                "value": "Je kan mij oproepen om in een voice channel te komen met dit command.\n"
            },
            {
                "name": `${prefix}leave`,
                "value": "Dit command kan je mij uit een voice-channel zetten.\n"
            },
            {
                "name": `${prefix}play`,
                "value": "Ik kan liedjes aflaten spelen als je dit command invoert. *(.play {titel van het liedje})*\n"
            },
            {
                "name": `${prefix}stop`,
                "value": "Om mij te laten stoppen met een liedje af te spelen moet je dit command gebruiken."
            }
        ]
    }
};

bot.on('message', async msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "water") {
        msg.channel.send(isToday());
    }

    if (command === "info") {
        msg.channel.send(data);
        msg.channel.send(data_2);
    }

    if (command === "join") {
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
        } else {
            msg.channel.send(`Je moet in een voice channel zitten, ${msg.author}!`);
        }
    }

    if (command === "leave") {
        if (msg.member.voice.channel) {
            const connection = msg.member.voice.channel.leave();
        } else {
            msg.channel.send(`Je moet in de voice channel zitten waar ik ook in zit, ${msg.author}!`);
        }
    }

    if (command === "play") {
        if (msg.member.voice.channel) {
            if (!args.length) {
                return msg.channel.send(`Je moet wel een titel toevoegen, ${msg.author}!`);
            }

            // play(msg.member.voice.channel, args);
            // const broadcast = bot.voice.createBroadcast();
            // console.log(args[0]);
            // broadcast.play('audio.mp3');

            //https://www.youtube.com/watch?v=
            //https://www.youtube.com/results?search_query=
            // let url = `https://www.youtube.com/results?search_query=`
            let url = "";
            for (let i = 0; i < args.length; i++) {
                url += `${args[i]}+`;
            }
            // console.log(url);
            // msg.channel.send(url);

            msg.member.voice.channel.join().then(connection => {
                var opts = {
                    maxResults: 1,
                    key: api
                };

                search(url, opts, function (err, results) {
                    if (err) return console.error(err);

                    // console.dir(results[0].link);
                    const dispatcher = connection.play(ytdl(results[0].link, {
                        quality: 'highestaudio',
                        highWaterMark: 1 << 25
                    }));
                    dispatcher.on('start', () => {
                        msg.channel.send(`Nu aan het spelen: **${results[0].title}** \n${results[0].link}`);
                        console.log(`Nu aan het spelen > ${msg.guild.name} > ${msg.channel.name} (${msg.author.username}): \n${results[0].title}\n${results[0].link}`);
                    });

                    dispatcher.on('error', (error) => { console.error(error); });
                });

            });
        } else {
            msg.channel.send(`Je moet wel in een voice channel zitten, ${msg.author}!`)
        }
    }

    if (command === "stop") {
        if (msg.member.voice.channel) {
            const connection = msg.member.voice.channel.leave();
        } else {
            msg.channel.send(`Je moet wel in de voice channel zitten waar ik ook in zit, ${msg.author}!`)
        }
    }

    if (command === "status") {
        msg.channel.send('Hier kan je zien of ik nog leef of niet!\nhttps://planetx.landstede.dev/');
    }
});

// async function play(voiceChannel, song) {
//     const connection = await voiceChannel.join();
//     connection.play(song);
// }

const isToday = () => {
    const geen = ["Sorry, geen behoefte aan water...", "Ik heb geen dorst!", "Ik zit te vol om te drinken."];
    const wel = ["Ik heb dorst! Geef me water!!!!", "Mag ik misschien wat water hebben!", "Ik heb een droge mond, kan ik water krijgen?"];

    const randomGeen = Math.floor(Math.random() * geen.length);
    const randomWel = Math.floor(Math.random() * wel.length);

    const today = new Date()

    return 1 == today.getDate() || 14 == today.getDate() ? wel[randomWel] : geen[randomGeen];
}

bot.login(token);