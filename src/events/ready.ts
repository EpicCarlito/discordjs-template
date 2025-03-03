import { Client, Events, ActivityType } from "discord.js";
import { Event } from "../types";

export const event: Event = {
  name: Events.ClientReady, // https://gist.github.com/Iliannnn/f4985563833e2538b1b96a8cb89d72bb#ready
  once: true,
  async execute(client: Client) {
    console.log(`${client.user?.username} is Currently Online ✅!`);

    const activities = [
      { name: "Video Games", type: ActivityType.Playing },
      { name: "Github", type: ActivityType.Playing },
    ];

    client.user?.setPresence({
      activities: [
        {
          name: "🤖 Bot Activated",
          type: ActivityType.Custom,
        },
      ],
      status: "dnd",
    });

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
