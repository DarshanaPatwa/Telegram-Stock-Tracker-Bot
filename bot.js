const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = 'Enter your key for BOT creation';

// Initialize the Telegram bot
const bot = new TelegramBot(token, { polling: true });

// Define a command to handle /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the Stock Tracker Bot! Send me the stock symbol (e.g., AAPL) to get the current price.');
});

// Listen for text messages
bot.onText(/^[A-Za-z]{1,10}$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const symbol = match[0].toUpperCase();
  try {
    const response = await axios.get(`Enter your key for fetching Stock Price`);
    const data = response.data;

    if (data['Time Series (5min)']) {
      const latestData = data['Time Series (5min)'];
      const latestTimestamp = Object.keys(latestData)[0];
      const latestPrice = latestData[latestTimestamp]['1. open'];

      bot.sendMessage(chatId, `Current price of ${symbol}: $${latestPrice}`);
    } else {
      bot.sendMessage(chatId, `Unable to fetch data for ${symbol}. Please make sure the symbol is valid.`);
    }
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, `An error occurred while fetching data for ${symbol}.`);
  }
});

// Start listening for messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId);
});

console.log('Stock Price Bot is running...');