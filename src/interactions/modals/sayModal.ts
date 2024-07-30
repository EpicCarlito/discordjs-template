import {
  ModalSubmitInteraction,
  TextChannel,
} from "discord.js";
import { ModalSumbit } from "../../types";

export const modal: ModalSumbit = {
  name: "saymodal",
  async execute(interaction: ModalSubmitInteraction) {
    const sayMessage = interaction.fields.getTextInputValue(
      "saymessage"
    ) as string;

    const channel = interaction.channel as TextChannel;
    channel.send({ content: sayMessage });

    return interaction.reply({ content: 'Message successfully sent!', ephemeral: true });
  },
};
