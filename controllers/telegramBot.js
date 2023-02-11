const TelegramBot = require('node-telegram-bot-api');
const token = '5833828063:AAHLJpO-zSeQ69RGyx9-QoVglWyQEqPb-Sw';
const bot = new TelegramBot(token, {polling: true});
const adminChatId = 660836275
bot.on('message', (msg) => {

    console.log(msg.chat.id)
    bot.sendMessage(msg.chat.id,'برای استفاده از بات به ادمین مراجعه نمایید.')
  
  });

  export const NewLoginTelegram = (name) => {
        console.log("-----TELEGRAM NEW LOGIN-----");
        bot.sendMessage(adminChatId,'ورود جدید !! \n'+'------------------------\n'+name+'\n'+'وارد پنل ادمین شد')
};
  export const NewWrongLoginTelegram = () => {
        console.log("-----TELEGRAM NEW WRONG LOGIN-----");
        bot.sendMessage(adminChatId,'هشدار امنیتی\n'+'-------------------------\n'+'یک تلاش غیرمجاز برای ورود به پنل ادمین ثبت شد')
};
  export const NewWOrderTelegram = (number) => {
        console.log("-----TELEGRAM NEW WRONG LOGIN-----");
        bot.sendMessage(adminChatId,' ثبت سفارش جدید\n'+'-------------------------\n'+'یک سفارش جدید ثبت شد\n'+'تعداد محصول'+number)
};
