import {
  SlashCommandBuilder,
  CommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import { Command } from "../../types";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Allow users to say a message"),
  async execute(interaction: CommandInteraction) {
    const say = new ButtonBuilder()
      .setCustomId("saybutton")
      .setLabel("Say a Message")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("🗣");

    const sayButton = new ActionRowBuilder<ButtonBuilder>().addComponents(say);

    return interaction.reply({
      content: "Want to say something through the bot? Click the button below!",
      components: [sayButton],
    });
  },
};
