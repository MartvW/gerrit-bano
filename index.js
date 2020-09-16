const { prefix, token } = require('./config.json');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const bot = new Discord.Client();

let botusername = "";

bot.on('ready', (msg) => {
    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag}!`);
    console.log("");
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'Tinder voor 🌱 | .info',
            url: 'https://planetx.landstede.dev/'
        }
    })

    botusername = bot.user.username;
});

const data = {
    "embed": {
        "title": "GERRIT 🌵 COMMANDS:",
        "color": 9819066,
        "author": {
            "name": botusername,
        },
        "fields": [
            {
                "name": ".info",
                "value": "om dit bericht te laten zien."
            },
            {
                "name": ".water",
                "value": "om te kijken of Gerrit dorst heeft. 💧"
            },
            {
                "name": ".join",
                "value": "om Gerrit te laten joinen."
            },
            {
                "name": ".leave",
                "value": "om Gerrit te laten leaven."
            },
            {
                "name": ".play {url}",
                "value": "om een liedje te laten spelen. 🎵"
            },
            {
                "name": ".stop",
                "value": "om een leidje te laten stoppen."
            }
        ]
    }
};

bot.on('message', msg => {
    if (msg.author.bot) return;
    // console.log(`${msg.author.username} > ${msg.channel.name}: ${msg.content}`);
    if (msg.content === ".water") {
        msg.channel.send(isToday());
    }

    if (msg.content === ".info") {
        msg.channel.send(data);
        // msg.channel.send("De commands voor Gerrit Baño zijn:\n - .water (om te kijken of Gerrit dorst heeft)\n - .join (om Gerrit te laten joinen)\n - .leave (om Gerrit te laten leaven)")
    }
});

bot.on('message', async msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "join") {
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
        } else {
            msg.channel.send("Je moet in een voice channel zitten!");
        }
    }

    if (command === "leave") {
        if (msg.member.voice.channel) {
            const connection = msg.member.voice.channel.leave();
        } else {
            msg.channel.send("Je moet in de voice channel zitten waar ik ook in zit!");
        }
    }

    if (command === "play") {
        if (msg.member.voice.channel) {
            if (!args.length) {
                return msg.channel.send(`Je moet wel een URL toevoegen, ${msg.author}!`);
            }

            // play(msg.member.voice.channel, args);
            // const broadcast = bot.voice.createBroadcast();
            // console.log(args[0]);
            // broadcast.play('audio.mp3');

            // let url = `https://www.youtube.com/results?search_query=`
            // for (let i = 0; i < args.length; i++) {
            // url += `${args[i]}+`;
            // }
            // console.log(url);
            // msg.channel.send(url);

            msg.member.voice.channel.join().then(connection => {
                const dispatcher = connection.play(ytdl(args[0], { quality: 'highestaudio' }));
                dispatcher.on('start', () => {
                    msg.channel.send(`Nu aan het spelen: ${args[0]}`);
                    console.log(`Nu aan het spelen: ${args[0]}`);
                });
                dispatcher.on('error', (error) => { console.error(error); });
            });
        }
    }

    if (command === "stop") {
        if (msg.member.voice.channel) {
            const connection = msg.member.voice.channel.leave();
        }
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