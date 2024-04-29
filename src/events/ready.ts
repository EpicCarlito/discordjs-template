import { Client, Events, ActivityType } from "discord.js";
import { Event } from "../types";

// Handles what happens after the bot is logged in and has started
export const event: Event = {
  name: Events.ClientReady, // https://gist.github.com/Iliannnn/f4985563833e2538b1b96a8cb89d72bb#ready
  once: true,
  async execute(client: Client) {
    console.log(`${client.user?.username} is Currently Online ✅!`);

    // List of activities that will eventually show up as the bot's status
    // ActivityType: https://discord-api-types.dev/api/discord-api-types-v10/enum/ActivityType
    const activities = [
      { name: "Video Games", type: ActivityType.Playing },
      { name: "Github", type: ActivityType.Playing },
    ];

    // Sets presence when the bot starts
    client.user?.setPresence({
      activities: [
        {
          name: "🤖 Bot Activated",
          type: ActivityType.Custom,
        },
      ],
      status: "dnd",
    });

    // Every five minutes, the bot's presence changes
    setInterval(() => {
      const randomActivity =
        activities[Math.floor(Math.random() * activities.length)];

      client.user?.setPresence({
        activities: [
          {
            name: randomActivity.name,
            type: randomActivity.type,
          },
        ],
        status: "dnd",
      });
    }, 300000);
  },
};
