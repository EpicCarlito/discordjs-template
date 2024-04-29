import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import { deployCommands } from "./handlers/deployCommands";
import { handleEvents } from "./handlers/handleEvents";
import env from "./env";

export const rootPath = __dirname; // Obtains the root directory of the project

const client = new Client({
  intents: [GatewayIntentBits.Guilds], // https://discord.com/developers/docs/topics/gateway#list-of-intents
  partials: [Partials.Channel], // https://discordjs.guide/popular-topics/partials.html#partial-structures
});

client.commands = new Collection();

(async () => {
  try {
    await Promise.all([
      client.login(env.DISCORD_TOKEN),
      deployCommands(client, rootPath),
      handleEvents(client, rootPath),
    ]);
  } catch (error) {
    console.error(
      `An error occurred when starting up ${client.user?.username}: ${error}`
    );
  }
})();
