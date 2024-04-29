import {
  SlashCommandBuilder,
  CommandInteraction,
  Collection,
} from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
  }
}

// How a slashCommand should be structured
export interface Command {
  data: SlashCommandBuilder;
  execute: (...args: CommandInteraction[]) => void;
}

// How an event should be structured
export interface Event {
  name: string;
  execute: (...args: any[]) => void;
  once?: boolean;
}
