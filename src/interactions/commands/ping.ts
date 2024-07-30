import {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../../types";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the response time of the bot"),
  async execute(interaction: CommandInteraction) {
    if (!interaction.guild) return;
    const clientUser = interaction.client.user;

    const pingEmbed = new EmbedBuilder()
      .setColor("#2FA6BA")
      .setTitle("🏓 Ping!")
      .setAuthor({
        name: `${clientUser.username}`,
        iconURL: clientUser.displayAvatarURL({ size: 512 }),
      })
      .setThumbnail(interaction.guild.iconURL({ size: 512 }))
      .setDescription(`${interaction.client.ws.ping}ms`)
      .setTimestamp();

    await interaction.reply({ embeds: [pingEmbed] });
  },
};
