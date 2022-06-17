const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./option')

const token = '5551787910:AAFEP_8TfBfX5gCOxf03GV4TEgQCa_HBssM'

const bot = new TelegramApi(token, { polling: true })

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'бот загадал число от 1 до 10')
    const random = Math.floor(Math.random() * 10)
    chats[chatId] = random;
    await bot.sendMessage(chatId, 'отгадай !', gameOptions);
}


const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'start bot' },
        { command: '/game', description: 'start game' }
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp')
            return bot.sendMessage(chatId, `Wellcom ${msg.from.first_name}`)
        }

        if (text === '/game') {
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, 'I dont anderstend you !')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if(data === '/again') {
            return startGame(chatId);
        }

        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `congratulation ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `uncorrect number ${chats[chatId]}`, againOptions)
        }
    })
}

start()