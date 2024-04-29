import { Events, Interaction } from "discord.js";
import { Event } from "../types";

// Handles the execution of interactions
export const event: Event = {
  name: Events.InteractionCreate, // https://gist.github.com/Iliannnn/f4985563833e2538b1b96a8cb89d72bb#interactioncreate
  async execute(interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return console.error("Invalid command");
      try {
        await command.execute(interaction);
      } catch (error) {
        console.log(`Error executing ${interaction.commandName}: ${error}`);
      }
    }
  },
};
