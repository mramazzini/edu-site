const { Webhook } = require("discord-webhook-node");
const webhook = new Webhook(
  "https://discord.com/api/webhooks/1096991826356998165/NAzedJKDWQpE397oOmnL4Vkfss0xfRvG23XM6PbnqBIRiXlSzCZczXzuk3gBwRDf8S-T"
);

const sendMessage = (message) => {
  console.log(message);
  webhook
    .send(`Jerry has been high fived ${message} times!`)
    .then(() => console.log("Sent webhook successfully!"))
    .catch((err) => console.log(err.message));
};

module.exports = sendMessage;
