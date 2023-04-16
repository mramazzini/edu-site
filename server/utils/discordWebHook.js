const { Webhook } = require("discord-webhook-node");
const webhook = new Webhook(
  "https://discord.com/api/webhooks/1096982899452030986/g7QcEJ5ZEbMCpLA4gChyiNfrD7pAsLBE4CJUafawAIeqct2ZQqyma6YgFFVoeKS0ErWn"
);

const sendMessage = (message) => {
  console.log(message);
  webhook
    .send(`Jerry has been high fived ${message} times!`)
    .then(() => console.log("Sent webhook successfully!"))
    .catch((err) => console.log(err.message));
};

module.exports = sendMessage;
