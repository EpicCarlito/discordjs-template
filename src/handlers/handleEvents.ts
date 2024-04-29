import { Client } from "discord.js";
import { pathToFileURL } from "url";
import { Event } from "../types";

import path from "path";
import fs from "fs";

export async function handleEvents(client: Client, rootPath: string) {
  const eventsPath = path.join(rootPath, "events");
  const eventsFolder = pathToFileURL(eventsPath); // For dynamic imports on windows
  try {
    const commandFiles = fs
      .readdirSync(eventsFolder)
      .filter((file) => file.endsWith(".js"));

    await Promise.all(
      commandFiles.map(async (file) => {
        const filePath = path.join(eventsPath, file);
        try {
          const eventFile = await import(`file:///${filePath}`); // Imports file from commands folder
          const event: Event = eventFile?.event;
          if (!event) {
            throw new Error(`Event not found in ${filePath}`);
          }
          if ("name" in event && "execute" in event) {
            if (event.once) {
              client.once(event.name, (...args) => event.execute(...args));
            } else {
              client.on(event.name, (...args) => event.execute(...args));
            }
          } else {
            console.log(
              `The event at ${filePath} is missing a required "name" or "execute" property.`
            );
          }
        } catch (error) {
          console.error(`Failed to import event from ${filePath}:`, error);
        }
      })
    );
  } catch (error) {
    console.error(`Failed to read and run events:`, error);
  }
}
