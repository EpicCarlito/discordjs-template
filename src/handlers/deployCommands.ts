import { Client, REST, Routes } from "discord.js";
import { pathToFileURL } from "url";
import { Command } from "../types";
import env from "../env";

import path from "path";
import fs from "fs";

const clientId = env.CLIENT_ID;
const token = env.DISCORD_TOKEN;

type CommandData = {
  name: string;
  description: string;
};

export async function deployCommands(client: Client, rootPath: string) {
  const commands: CommandData[] = [];
  const commandsPath = path.join(rootPath, "commands");
  const commandFolder = pathToFileURL(commandsPath); // For dynamic imports on windows
  try {
    const commandFiles = fs
      .readdirSync(commandFolder)
      .filter((file) => file.endsWith(".js"));

    await Promise.all(
      commandFiles.map(async (file) => {
        const filePath = path.join(commandsPath, file);
        try {
          const commandFile = await import(`file:///${filePath}`); // Imports file from commands folder
          const command: Command = commandFile?.command;
          if (!command) {
            throw new Error(`Command infomration not found in ${filePath}`);
          }
          if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
          } else {
            console.log(
              `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
          }
        } catch (error) {
          console.error(`Failed to import command from ${filePath}:`, error);
        }
      })
    );

    const rest = new REST({ version: "10" }).setToken(token);

    try {
      await rest.put(Routes.applicationCommands(clientId), { body: commands }); // Sets bot's slash commands
      console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(`Failed to read commands and deploy commands:`, error);
  }
}
