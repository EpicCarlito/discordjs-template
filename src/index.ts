import { Client, Collection, GatewayIntentBits } from "discord.js";
import deployCommands from "./handlers/deployCommands";
import handleEvents from "./handlers/Events";
import handleButtons from "./handlers/Buttons";
import handleModals from "./handlers/Modals";
import env from "./env";

export const rootPath = __dirname;

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.buttonCommands = new Collection();
client.selectMenus = new Collection();
client.modalForms = new Collection();

(async () => {
  try {
    await Promise.all([
      client.login(env.DISCORD_TOKEN),
      deployCommands(client, rootPath),
      handleEvents(client, rootPath),
      handleButtons(client, rootPath),
      handleModals(client, rootPath)
    ]);
  } catch (error) {
    console.error(
      `An error occurred when starting up ${client.user?.username}: ${error}`
    );
  }
})();
