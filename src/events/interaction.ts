import {
  ButtonInteraction,
  Events,
  Interaction,
  ModalMessageModalSubmitInteraction,
  User,
} from "discord.js";
import { Event, Button, ModalSumbit } from "../types";

let clientUser: User;

export const event: Event = {
  name: Events.InteractionCreate, // https://gist.github.com/Iliannnn/f4985563833e2538b1b96a8cb89d72bb#interactioncreate
  async execute(interaction: Interaction) {
    clientUser = interaction.user;
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        command.execute(interaction);
      } catch (error) {
        console.log(`Error executing ${interaction.commandName}: ${error}`);
      }
    } else if (interaction.isButton()) {
      const buttonInteraction = interaction as ButtonInteraction;
      const button: Button | undefined = interaction.client.buttonCommands?.get(
        buttonInteraction.customId
      );
      if (!button) return;

      try {
        button.execute(buttonInteraction);
      } catch (error) {
        console.log(`Error executing ${button.name}: ${error}`);
      }
    } else if (interaction.isModalSubmit()) {
      const modalInteraction =
        interaction as ModalMessageModalSubmitInteraction;
      const modal: ModalSumbit | undefined = interaction.client.modalForms?.get(
        modalInteraction.customId
      );
      if (!modal) return;

      try {
        modal.execute(modalInteraction);
      } catch (error) {
        console.log(`Error executing ${modal.name}: ${error}`);
      }
    }
  },
};

export { clientUser };
