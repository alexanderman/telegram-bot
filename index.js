process.env["NTBA_FIX_319"] = true;
/**
 * this line fixes error: node-telegram-bot-api deprecated Automatic enabling of cancellation of promises is deprecated.
 * source: https://github.com/yagop/node-telegram-bot-api/issues/540
 */

const TelegramBotApi = require('node-telegram-bot-api');
const config = require('config');

const token = config.get('bot_token');
const bot_username = config.get('bot_username');
const bot = new TelegramBotApi(token, { polling: true });

/** 
 * api to receive updates, 2 possible ways
 *  - "getUpdates" works by long polling (ssl not required) -> { polling: true }
 *  - "setWebhook" requires ssl 
 */
let cache = {};

function onStart(msg) {
    const { chat: { id }, from } = msg;
    cache[id] = from;
}

function broadcast(msg) {
    const { chat: { id }, text, from } = msg;
    Object.keys(cache).forEach(chatId => {
        if (chatId != id) {
            const { first_name, last_name } = from; 
            bot.sendMessage(chatId, `*${first_name} ${last_name}:* ${text}`, { parse_mode: 'Markdown' });
        }
    });
}

bot.on('message', msg => {
    const { chat: { id }, text } = msg;
    console.log(msg);
    if (/^\/start/.test(text)) {
        const payload = Buffer.from(text.replace('/start', ''), 'base64').toString('utf8');
        bot.sendMessage(id, `*bot* welcomes ${payload || 'unknown'}`, { parse_mode: 'Markdown' });
        onStart(msg);
    }
    else {
        // bot.sendMessage(id, '*bot* talking', { parse_mode: 'Markdown' })
        // .then(sentMsg => console.log('sent', sentMsg))
        // .catch(err => console.error(err));
        broadcast(msg);
    }
});


