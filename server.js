// server.js
const { snipe } = require('./sniper');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your ShopGoodwill email: ', (username) => {
  rl.question('Enter your password: ', (password) => {
    rl.question('Enter Item ID: ', (itemId) => {
      rl.question('Enter your max bid: ', (maxBid) => {
        snipe({ username, password, itemId, maxBid });
        rl.close();
      });
    });
  });
});
