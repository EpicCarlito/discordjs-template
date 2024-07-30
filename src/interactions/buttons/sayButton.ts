import {
    ActionRowBuilder,
    ButtonInteraction,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
  } from "discord.js";
  import { Button } from "../../types";
  
  export const button: Button = {
    name: "saybutton",
    execute(interaction: ButtonInteraction) {
      const sayModal = new ModalBuilder()
        .setCustomId("saymodal")
        .setTitle("Repeat a Message");
  
      const sayMessage = new TextInputBuilder()
        .setCustomId("saymessage")
        .setLabel("What would you like to say?")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("Enter your message!");
  
      const message = new ActionRowBuilder<TextInputBuilder>().addComponents(
        sayMessage
      );
  
      sayModal.addComponents(message);
  
      interaction.showModal(sayModal);
    },
  };
  