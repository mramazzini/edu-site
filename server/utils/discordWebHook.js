const { Webhook } = require("discord-webhook-node");
require("dotenv").config();
const webhook = new Webhook(process.env.DISCORD_WEBHOOK_URL);

const sendMessage = (message) => {
  console.log(message);
  webhook
    .send(`Jerry has been high fived ${message} times!`)
    .then(() => console.log("Sent webhook successfully!"))
    .catch((err) => console.log(err.message));
};

module.exports = sendMessage;
