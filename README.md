# telegram bot
imitates group messaging through bot.  

## about
user receives link `https://telegram.me/<bot_username>?start=<base64_encoded_parameter>`.  
where `<bot_username>` is your bot username and `<base64_encoded_parameter>` is optional payload allowed to pass into telegrams bot chat, limited to 64 chars.  
after clicking the link, user is prompted to open telegram.  
telegram opens chat with your bot, after clicking on start, the app registers in `cache` object chatId and received user object, after that when any user sends text message (only text, media messages need additional code), the app will resend that message to all the participants, not including the sender.

## references
 - https://core.telegram.org/bots#deep-linking
 - https://core.telegram.org/bots/api
 - https://github.com/yagop/node-telegram-bot-api

## config
 - in `config` folder, create file `default.json`
 - paste content from `default.example.json` into `default.json` and change to your keys 

## run
 - `git clone https://github.com/alexanderman/telegram-bot.git`
 - `npm install`
 - `npm start`


