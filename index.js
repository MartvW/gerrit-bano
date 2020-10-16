const { prefix, token, api, alec, jacco, sietse, remco, milan, mart, gerritkanaal } = require('./config.json');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const search = require('youtube-search');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const { exit } = require('process');
const { realpathSync } = require('fs');
const { sign } = require('crypto');
const bot = new Discord.Client();

let botusername = "";
let dagelijkselimit = false;

bot.on('ready', async (msg) => {
    console.log("");
    console.log(`Succesvol ingelogd als ${bot.user.tag}!`);
    readline.question('Water zeggen? Y/N', name => {
        if (name === "y" || name === "Y") {
            const geen = ["Sorry, geen behoefte aan water...", "Ik heb geen dorst!", "Ik zit te vol om te drinken.", "Ik heb nu geen dorst, misschien een andere keer.", "De kraan zit dicht dus ik hoef geen water!", "Water? Ik hoef niet!", "Ik wil GEEEEEN water... Hoe vaak moet ik het zeggen?"];
            const wel = ["@everyone Ik heb dorst! Geef me water!!!!", "@everyone Mag ik misschien wat water hebben!", "@everyone Ik heb een droge mond, kan ik water krijgen?", "@everyone Is het mogelijk om water te krijgen.", "@everyone Mijn stem is een beetje schor, mag ik wat water?", "@everyone *kuch* Mag ik wat water?", "@everyone Ik ga dood als ik geen water krijg, geef me water!!!!"];

            const randomGeen = Math.floor(Math.random() * geen.length);
            const randomWel = Math.floor(Math.random() * wel.length);

            const today = new Date();
            const channel = bot.channels.cache.find(channel => channel.id === gerritkanaal)
            if (today.getDate() === 1 || today.getDate() === 14) {
                var maanden = new Array('januari', 'februari', 'maart',
                    'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december');
                var vandaag = new Date();
                var maand = vandaag.getMonth();
                var dag = vandaag.getDay();
                var nlmaand = maanden[maand];
                channel.send(wel[randomWel]);
                console.log(`Het is ${today.getDate()} ${nlmaand} ${today.getFullYear()}, ik heb water nodig!`);
                console.log("");
            } else {
                console.log("");
                channel.send(geen[randomGeen]);
                console.log(`Ik heb geen water nodig!`);
                console.log("");
            }
        } else {
            console.log("");
        }
        readline.close();
    });
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

bot.on("guildCreate", guild => {
    console.log(`Een nieuwe server gebruikt mij: ${guild.name} (id: ${guild.id}). Deze server heeft ${guild.memberCount} gebruikers!`);
});

bot.on("guildDelete", guild => {
    console.log(`Ik ben verwijderd bij: ${guild.name} (id: ${guild.id})`);
});


const data_2 = {
    "embed": {
        "title": "! LET OP !",
        "color": 15746887,
        "description": `Bij sommige commands moet je in een voice-channel zitten of in de voice-channel waar ik in zit zitten. Bij de volgende commands moet je in een voice-channel zitten om het te gebruiken:\n\n- **${prefix}join** \n- **${prefix}play** \n\nBij de volgende commands moet je in dezelfde voice-channel zitten als ik:\n\n-**${prefix}leave**\n-**${prefix}stop**`,
        "fields": [
            {
                "name": "................",
                "value": "Als je iets niet snapt of je ziet dat er in de bot fouten zijn, ga gerust naar Mart toe!"
            }
        ]
    }
};

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
                "value": "Hiermee krijg je de link van de pagina vol met commands."
            },
            {
                "name": `${prefix}status`,
                "value": "Hiermee kan je de link krijgen van de website waar op ik sta. Op de website kan je zien van onderander bij hoe vochtig mijn aarde is. Ook kan je de vochtigheid  van andere planten zien."
            },
            {
                "name": `${prefix}water`,
                "value": "Met dit command kan ik je laten weten of ik dorst heb of niet."
            },
            {
                "name": `${prefix}join`,
                "value": "Je kan mij oproepen om in een voice channel te komen met dit command."
            },
            {
                "name": `${prefix}leave`,
                "value": "Dit command kan je mij uit een voice-channel gooien."
            },
            {
                "name": `${prefix}play`,
                "value": `Ik kan liedjes laten afspelen als je dit command invoert. *(${prefix}play {titel van het liedje | url van het liedje})*`
            },
            {
                "name": `${prefix}stop`,
                "value": "Om mij te laten stoppen met een liedje af te spelen moet je dit command gebruiken."
            },
            {
                "name": `${prefix}lied`,
                "value": "Om te zien welk nummer ik aan het spelen ben."
            },
            {
                "name": `${prefix}skip`,
                "value": "Hiermee kan je een liedje skippen."
            },
            {
                "name": `${prefix}flipcoin`,
                "value": "Kop of munt."
            },
            {
                "name": `${prefix}ping`,
                "value": "Checkt wat de ping is van mij."
            },
            {
                "name": `${prefix}jaofnee`,
                "value": "Stel een ja of nee vraag en ik beantwoord."
            },
            {
                "name": `${prefix}wie`,
                "value": "Stel een wie-is-vraag en ik beantwoord."
            },
            {
                "name": `${prefix}hoeveel`,
                "value": "Hoeveel procent..."
            },
            {
                "name": `${prefix}random`,
                "value": "Geeft een random getal."
            },
            {
                "name": `${prefix}wachtrij`,
                "value": "Hiermee kan je zien wat er in de wachtrij staat."
            },
            {
                "name": `${prefix}infovolledig`,
                "value": "De volledige lijst met alle commands."
            },
            {
                "name": `${prefix}link`,
                "value": "Link van Xtreme Travel website."
            },
            {
                "name": `${prefix}inloglink`,
                "value": "Inloglink van Xtreme Travel website."
            },
            {
                "name": `${prefix}dilemma`,
                "value": "Hiermee krijg je van mij een dilemma."
            },
            {
                "name": `${prefix}pp`,
                "value": "SECRET"
            }
        ]
    }
};

let nummers = [];
let queue = [];

const alecNiet = false;
const jaccoNiet = false;
const sietseNiet = false;
const remcoNiet = false;
const milanNiet = false;
const martNiet = false;

bot.on('message', async msg => {
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;
    if (msg.author.id === alec && alecNiet === true) {
        const tekst = ["Raak me niet aan pedofiel!", "Alec, tyf op.", "SUIKERUITLEPELAAR!"];
        const index = Math.floor(Math.random() * tekst.length);
        msg.channel.send(tekst[index]);
        return;
    }
    if (msg.author.id === jacco && jaccoNiet === true) {
        const tekst = ["OK BOOMER!", "Ga wiet kopen voor ons.", "19 en in de 1ste van MBO zitten, schande!!!!!"];
        const index = Math.floor(Math.random() * tekst.length);
        msg.channel.send(tekst[index]);
        return;
    }
    if (msg.author.id === sietse && sietseNiet === true) {
        const tekst = ["Homo! Doe niet!", "17 jaar en nog steeds vakkenvuller.", "Drive through penalty - for being an idiot!"];
        const index = Math.floor(Math.random() * tekst.length);
        msg.channel.send(tekst[index]);
        return;
    }
    if (msg.author.id === remco && remcoNiet === true) {
        const tekst = ["Vuil flikkertje!", "Niet DOOOEEEN.", "Ga terug naar Juf Lotte!"];
        const index = Math.floor(Math.random() * tekst.length);
        msg.channel.send(tekst[index]);
        return;
    }
    if (msg.author.id === milan && milanNiet === true) {
        const tekst = ["Domme teringleier, ga weg!", "Dementiepatiënt, niet doen!", "Ga terug naar Verschoorschool."];
        const index = Math.floor(Math.random() * tekst.length);
        msg.channel.send(tekst[index]);
        return;
    }
    if (msg.author.id === mart && martNiet === true) {
        const tekst = ["BAAS STOP", "baas, niet doen!", "boss..."];
        const index = Math.floor(Math.random() * tekst.length);
        msg.channel.send(tekst[index]);
        return;
    }

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "mute") {
        if (!args > 0) {
            msg.channel.send("Je moet een user invoeren!");
            return;
        }

        let user = msg.mentions.members.first();
        // console.log(user);
        user.edit({ mute: true });
        // args[0].edit({ mute: true });
    }


    if (command === "unmute") {
        if (!args > 0) {
            msg.channel.send("Je moet een user invoeren!");
            return;
        }

        let user = msg.mentions.members.first();
        // console.log(user);
        user.edit({ mute: false });
        // args[0].edit({ mute: true });
    }


    if (command === "reset") {
        if (msg.author.id !== mart) return msg.channel.send("Je kan dit command niet gebruiken!");
        msg.channel.send(`Bezig met resetten van ${botusername}...`);
        bot.destroy();
        bot.login(token);
    };

    if (command === "shutdown") {
        if (msg.author.id !== mart) return msg.channel.send("Je kan dit command niet gebruiken!");
        msg.channel.send(`Bezig met uitzetten van ${botusername}...`).then(m => {
            bot.destroy();
            exit;
        });
    }

    if (command === "pp") {
        const randomGetal = Math.floor(Math.random() * 20);
        let result = "=";
        for (let i = 0; i < randomGetal; i++) {
            result += "=";
        }
        msg.channel.send(`Lengte = 8${result}D (${randomGetal + 1}cm)`);
    }

    if (command === "dilemma") {
        const randomGetal = Math.floor(Math.random() * 300);
        msg.channel.send(`https://dilemmaopdinsdag.nl/dilemmas/${randomGetal}`);
    }

    if (command === "random") {
        const index = Math.floor(Math.random() * 100000000000000);
        msg.channel.send(`${index}`);
    }

    if (command === "link") {
        const tekst = ["Link van XtremeTravel.", "Hier heb je de link."];
        const index = Math.floor(Math.random() * tekst.length);
        msg.channel.send(`${tekst[index]}\nhttp://xtravel.realdesigner.nl`);
    }

    if (command === "inloglink") {
        msg.channel.send('http://git.compict.nl:8888/xtravel/xtravel.git');
    }

    if (command === "hoeveel") {
        const index = Math.floor(Math.random() * 100);
        msg.channel.send(`${index}%`);
    }

    if (command === "jaofnee") {
        const index = Math.random(1);
        if (index <= .5) {
            msg.channel.send("Ja");
        } else {
            msg.channel.send("Nee");
        }
    }

    if (command === "wie") {
        const index = Math.floor(Math.random() * 7);
        if (index === 0) {
            msg.channel.send("Alec");
        } else if (index === 1) {
            msg.channel.send("Jacco");
        } else if (index === 2) {
            msg.channel.send("Sietse");
        } else if (index === 3) {
            msg.channel.send("Remco");
        } else if (index === 4) {
            msg.channel.send("Mart");
        } else if (index === 5) {
            msg.channel.send("Iedereen");
        } else {
            msg.channel.send("Niemand");
        }
    }

    if (command === "water") {
        msg.channel.send(isToday());
    }

    if (command === "info") {
        const tekst = ["Dit zijn alle commands.", "Op deze website kan je klikken.", "Wil je zien wat ik allemaal kan, klik op de link.", "Klik niet op deze link.", "Zie hier mijn prachtige website!", "Alsjeblieft...", `Als je nog een keer ${prefix}info doet, krijg je deze link.`];
        const index = Math.floor(Math.random() * tekst.length);
        msg.channel.send(`${tekst[index]}\nhttp://martw.epizy.com/gerrit/`);
    }

    if (command === "infovolledig") {
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
            queue = [];
            nummers = [];
        } else {
            msg.channel.send(`Je moet in de voice channel zitten waar ik ook in zit, ${msg.author}!`);
        }
    }

    function playWachtrij() {
        if (queue.length != 0) {
            if (queue[0].includes("https://www.youtube.com/watch?v=")) {
                msg.member.voice.channel.join().then(connection => {
                    if (!queue.length > 1) {
                        const dispatcher = connection.play(ytdl(queue[0], {
                            quality: 'highestaudio',
                            highWaterMark: 1 << 25
                        }));
                        dispatcher.on('start', () => {
                            nummers.push({ "titel": queue[0], "url": queue[0] });
                            msg.channel.send(`Nu aan het spelen: \n${queue[0]}`);
                            console.log(`Nu aan het spelen > ${msg.guild.name} > ${msg.member.voice.channel.name} (${msg.author.username}: ${queue[0]}):\n${queue[0]}\n`);
                        });

                        dispatcher.on('finish', () => {
                            queue.shift();
                            console.log(queue);
                            nummers = [];
                        });

                        dispatcher.on('error', (error) => {
                            console.error(error);
                            msg.channel.send("Er is een fout opgetreden!");
                        });
                    }
                });
            } else {
                let url = "";
                for (let i = 0; i < queue.length; i++) {
                    url += `${queue[i]} `;
                }

                queue.push(url);
                // console.log(url);
                // msg.channel.send(url);

                msg.member.voice.channel.join().then(connection => {
                    var opts = {
                        maxResults: 1,
                        key: api,
                        type: 'video'
                    };

                    search(queue[0], opts, function (err, results) {
                        if (err) {
                            if (err.response.status === 403) {
                                if (!dagelijkselimit) {
                                    console.error("Dagelijkse limit bereikt.");
                                    dagelijkselimit = true;
                                    msg.channel.send("De dagelijkse limit van de API is bereikt, je kan nu alleen maar liedjes laten afspelen door middel van een URL.");
                                    return;
                                }
                            } else {
                                console.error(err);
                                msg.channel.send("Er is een fout opgetreden!");
                                return;
                            }
                        }

                        // console.dir(results[0].link);
                        const dispatcher = connection.play(ytdl(results[0].link, {
                            quality: 'highestaudio',
                            highWaterMark: 1 << 25
                        }));
                        dispatcher.on('start', () => {
                            nummers.push({ "titel": results[0].title, "url": results[0].link });
                            msg.channel.send(`Nu aan het spelen: **${results[0].title}** \n${results[0].link}`);
                            console.log(`Nu aan het spelen > ${msg.guild.name} > ${msg.member.voice.channel.name} (${msg.author.username}: ${url}): \n${results[0].title}\n${results[0].link}\n`);
                        });

                        dispatcher.on('finish', () => {
                            queue.shift();
                            nummers = [];
                        });

                        dispatcher.on('error', (error) => {
                            console.error(error);
                            msg.channel.send("Er is een fout opgetreden!");
                        });
                    });
                });
            }
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

            if (args.includes("https://www.youtube.com/watch?v=")) {
                queue.push(args[0]);
                if (queue.length < 2) {
                    msg.member.voice.channel.join().then(connection => {
                        if (!queue.length > 1) {
                            const dispatcher = connection.play(ytdl(queue[0], {
                                quality: 'highestaudio',
                                highWaterMark: 1 << 25
                            }));
                            dispatcher.on('start', () => {
                                nummers.push({ "titel": args[0], "url": args[0] });
                                msg.channel.send(`Nu aan het spelen: \n${args[0]}`);
                                console.log(`Nu aan het spelen > ${msg.guild.name} > ${msg.member.voice.channel.name} (${msg.author.username}: ${args[0]}):\n${args[0]}\n`);
                            });

                            dispatcher.on('finish', () => {
                                queue.shift();
                                playWachtrij();
                                // console.log(queue);
                                nummers = [];
                            });

                            dispatcher.on('error', (error) => {
                                console.error(error);
                                msg.channel.send("Er is een fout opgetreden!");
                            });
                        }
                    });
                } else {
                    msg.channel.send(`${msg.author} heeft **${args[0]}** toegevoegd aan de wachtrij!`);
                }
            } else {
                let url = "";
                for (let i = 0; i < args.length; i++) {
                    url += `${args[i]} `;
                }

                queue.push(url);
                if (queue.length < 2) {
                    // console.log(url);
                    // msg.channel.send(url);

                    msg.member.voice.channel.join().then(connection => {
                        var opts = {
                            maxResults: 1,
                            key: api,
                            type: 'video'
                        };

                        search(queue[0], opts, function (err, results) {
                            if (err) {
                                if (err.response.status === 403) {
                                    if (!dagelijkselimit) {
                                        console.error("Dagelijkse limit bereikt.");
                                        dagelijkselimit = true;
                                        msg.channel.send("De dagelijkse limit van de API is bereikt, je kan nu alleen maar liedjes laten afspelen door middel van een URL.");
                                        return;
                                    }
                                } else {
                                    console.error(err);
                                    msg.channel.send("Er is een fout opgetreden!");
                                    return;
                                }
                            }

                            // console.dir(results[0].link);
                            const dispatcher = connection.play(ytdl(results[0].link, {
                                quality: 'highestaudio',
                                highWaterMark: 1 << 25
                            }));
                            dispatcher.on('start', () => {
                                nummers.push({ "titel": results[0].title, "url": results[0].link });
                                msg.channel.send(`Nu aan het spelen: **${results[0].title}** \n${results[0].link}`);
                                console.log(`Nu aan het spelen > ${msg.guild.name} > ${msg.member.voice.channel.name} (${msg.author.username}: ${url}): \n${results[0].title}\n${results[0].link}\n`);
                            });

                            dispatcher.on('finish', () => {
                                queue.shift();
                                playWachtrij();
                                // console.log(queue);
                                nummers = [];
                            });

                            dispatcher.on('error', (error) => {
                                console.error(error);
                                msg.channel.send("Er is een fout opgetreden!");
                            });
                        });
                    });
                } else {
                    msg.channel.send(`${msg.author} heeft **${url}**toegevoegd aan de wachtrij!`);
                }
            }
        } else {
            msg.channel.send(`Je moet wel in een voice channel zitten, ${msg.author}!`)
        }
    }

    if (command === "skip") {
        queue.shift();
        if (queue[0].includes("https://www.youtube.com/watch?v=")) {
            msg.member.voice.channel.join().then(connection => {
                const dispatcher = connection.play(ytdl(queue[0], {
                    quality: 'highestaudio',
                    highWaterMark: 1 << 25
                }));
                dispatcher.on('start', () => {
                    nummers.push({ "titel": args[0], "url": args[0] });
                    msg.channel.send(`Nu aan het spelen: \n${args[0]}`);
                    console.log(`Nu aan het spelen > ${msg.guild.name} > ${msg.member.voice.channel.name} (${msg.author.username}: .skip):\n${args[0]}\n`);
                });

                dispatcher.on('finish', () => {
                    queue.shift();
                    // console.log(queue);
                    playWachtrij();
                    nummers = [];
                });

                dispatcher.on('error', (error) => { console.error(error); });
            });
        } else {
            let url = "";
            for (let i = 0; i < args.length; i++) {
                url += `${args[i]} `;
            }
            // console.log(url);
            // msg.channel.send(url);
            msg.member.voice.channel.join().then(connection => {
                var opts = {
                    maxResults: 1,
                    key: api,
                    type: 'video'
                };

                search(queue[0], opts, function (err, results) {
                    if (err) {
                        if (err.response.status === 403) {
                            if (!dagelijkselimit) {
                                console.error("Dagelijkse limit bereikt.");
                                dagelijkselimit = true;
                                msg.channel.send("De dagelijkse limit van de API is bereikt, je kan nu alleen maar liedjes laten afspelen door middel van een URL.");
                                return;
                            }
                        } else {
                            console.error(err);
                            msg.channel.send("Er is een fout opgetreden!");
                            return;
                        }
                    }

                    // console.dir(results[0].link);
                    const dispatcher = connection.play(ytdl(results[0].link, {
                        quality: 'highestaudio',
                        highWaterMark: 1 << 25
                    }));

                    dispatcher.on('start', () => {
                        nummers.push({ "titel": results[0].title, "url": results[0].link });
                        msg.channel.send(`Nu aan het spelen: **${results[0].title}** \n${results[0].link}`);
                        console.log(`Nu aan het spelen > ${msg.guild.name} > ${msg.member.voice.channel.name} (${msg.author.username}: .skip): \n${results[0].title}\n${results[0].link}\n`);
                    });

                    dispatcher.on('finish', () => {
                        queue.shift();
                        // console.log(queue);
                        playWachtrij();
                        nummers = [];
                    });

                    dispatcher.on('error', (error) => { console.error(error); });
                });
            });
        }
    }

    if (command === "stop") {
        if (msg.member.voice.channel) {
            msg.member.voice.channel.leave();
            nummers = [];
            queue = [];
        } else {
            msg.channel.send(`Je moet wel in de voice channel zitten waar ik ook in zit, ${msg.author}!`)
        }
    }

    if (command === "lied") {
        if (nummers.length === 0) {
            msg.channel.send(`Op dit moment is er geen nummer aan het spelen!`);
        } else {
            msg.channel.send(`Nu aan het spelen: **${nummers[nummers.length - 1].titel}**\n${nummers[nummers.length - 1].url}`);
        }
    }

    if (command === "status") {
        const tekst = ["Hier kan je zien of ik nog leef.", "Op deze website kan je klikken.", "Wil je mijn mooie gezicht zien, klik op de link.", "Mijn privégegevens staan op deze website.", "Klik voor mijn waterpercentage!", "Ik ben moe...", "Als je mij wilt zien, klik hier op.", "Blijf van mijn medische documenten af!"];
        const index = Math.floor(Math.random() * tekst.length);
        msg.channel.send(`${tekst[index]}\nhttps://planetx.landstede.dev/`);
    }

    if (command === "flipcoin") {
        const index = Math.floor(Math.random() * 2);
        if (index === 0) {
            msg.channel.send(`Kop`);
        } else {
            msg.channel.send(`Munt`);
        }
    }

    if (command === "ping") {
        msg.channel.send("Pinging...").then(m => {
            var ping = m.createdTimestamp - msg.createdTimestamp;

            // Basic embed
            var embed = new Discord.MessageEmbed()
                .setAuthor(`Jouw ping is: ${ping}ms`)
                .setColor(16426522)

            // Then It Edits the message with the ping variable embed that you created
            m.edit(embed);
        });
    }

    if (command === "wachtrij") {
        let results = "**De wachtrij is:**\n";
        if (queue.length > 1) {
            for (let i = 1; i < queue.length; i++) {
                results += `${i}. ${queue[i]}\n`;
            }
        } else {
            results += "op dit moment leeg...";
        }

        msg.channel.send(results);
    }
});


const isToday = () => {
    const geen = ["Sorry, geen behoefte aan water...", "Ik heb geen dorst!", "Ik zit te vol om te drinken.", "Ik heb nu geen dorst, misschien een andere keer.", "De kraan zit dicht dus ik hoef geen water!", "Water? Ik hoef niet!", "Ik wil GEEEEEN water... Hoe vaak moet ik het zeggen?"];
    const wel = ["Ik heb dorst! Geef me water!!!!", "Mag ik misschien wat water hebben!", "Ik heb een droge mond, kan ik water krijgen?", "Is het mogelijk om water te krijgen.", "Mijn stem is een beetje schor, mag ik wat water?", "*kuch* Mag ik wat water?", "Ik ga dood als ik geen water krijg, geef me water!!!!"];

    const randomGeen = Math.floor(Math.random() * geen.length);
    const randomWel = Math.floor(Math.random() * wel.length);

    const today = new Date();

    return 1 == today.getDate() || 14 == today.getDate() ? wel[randomWel] : geen[randomGeen];
}

bot.login(token);