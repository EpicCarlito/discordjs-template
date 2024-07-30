import { Client } from "discord.js";
import { pathToFileURL } from "url";
import { Button } from "../types";

import path from "path";
import fs from "fs";

export default async function handleEvents(client: Client, rootPath: string) {
  const interactionsPath = path.join(rootPath, "interactions");
  const modalsPath = path.join(interactionsPath, "buttons");
  const eventsFolder = pathToFileURL(modalsPath);
  try {
    const commandFiles = fs
      .readdirSync(eventsFolder)
      .filter((file) => file.endsWith(".js"));

    await Promise.all(
      commandFiles.map(async (file) => {
        const filePath = path.join(modalsPath, file);
        try {
          const eventFile = await import(`file:///${filePath}`);
          const button: Button = eventFile?.button;
          if (!button || button?.ignore) return;

          if (button?.name) client.buttonCommands?.set(button?.name, button);
        } catch (error) {
          console.error(`Failed to import event from ${filePath}:`, error);
        }
      })
    );
  } catch (error) {
    console.error(`Failed to read and run events:`, error);
  }
}
