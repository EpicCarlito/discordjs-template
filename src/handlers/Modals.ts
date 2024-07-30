import { Client } from "discord.js";
import { pathToFileURL } from "url";
import { ModalSumbit } from "../types";

import path from "path";
import fs from "fs";

export default async function handleEvents(client: Client, rootPath: string) {
  const interactionsPath = path.join(rootPath, "interactions");
  const modalsPath = path.join(interactionsPath, "modals");
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
          const event: ModalSumbit = eventFile?.modal;
          if (!event) return;

          if (!event?.ignore && event?.name)
            client.modalForms?.set(event?.name, event);
        } catch (error) {
          console.error(`Failed to import event from ${filePath}:`, error);
        }
      })
    );
  } catch (error) {
    console.error(`Failed to read and run events:`, error);
  }
}
