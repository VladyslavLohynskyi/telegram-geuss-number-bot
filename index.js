const TelegarmApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options");

const token = "5223254396:AAH0hm_Gamhcif3-FgGbg5SFQRXkXPL****";
const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    `now I will guess a number from 0 to 9 and you have to guess it`
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, `guess it`, gameOptions);
};
const start = () => {
  const bot = new TelegarmApi(token, { polling: true });
  bot.setMyCommands([
    {
      command: "/start",
      description: "greeting",
    },
    {
      command: "/info",
      description: "information about user",
    },
    {
      command: "/game",
      description: "game about geussing number",
    },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    console.log(msg);
    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "CAACAgIAAxkBAAMOYkMhY2sdQ4ZDCfMz7g4UBeBWTH8AAiRBAALpVQUYQFkSdWdFXgIjBA"
      );
      return bot.sendMessage(
        chatId,
        `You are welcome to my telegram bot VladyslavLohynskyi`
      );
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, `Your name is ${msg.from.first_name} `);
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, "I don't understand you, pls try again");
  });
  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (data == chats[chatId]) {
      return await bot.sendMessage(
        chatId,
        `Excellent you geussed number ${data}`,
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `You didnt geuss number , number was ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
