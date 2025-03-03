/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SlashCommandBuilder,
  CommandInteraction,
  Collection,
  SlashCommandOptionsOnlyBuilder,
  ButtonInteraction,
  AnySelectMenuInteraction,
  ModalSubmitInteraction,
} from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
    buttonCommands?: Collection<string, Button>;
    selectMenus?: Collection<string, SelectMenu>;
    modalForms?: Collection<string, ModalSumbit>;
  }
}

interface commandOptions {
  userOnly?: boolean;
  adminOnly?: boolean;
  isCode?: boolean;
}

export interface Command extends commandOptions {
  data: SlashCommandOptionsOnlyBuilder | SlashCommandBuilder;
  execute: (...args: CommandInteraction[]) => void;
}

export interface Event {
  name: string;
  execute: (...args: any[]) => void;
  once?: boolean;
}

export interface Button extends commandOptions {
  name: string;
  ignore?: boolean;
  execute: (...args: ButtonInteraction[]) => Promise<any> | any;
}

export interface SelectMenu extends commandOptions {
  name: string;
  ignore?: boolean;
  execute: (...args: AnySelectMenuInteraction[]) => Promise<any> | any;
}

export interface ModalSumbit extends commandOptions {
  name: string;
  ignore?: boolean;
  execute: (...args: ModalSubmitInteraction[]) => Promise<any> | any;
}

export type anyInteraction = Command | Button | SelectMenu | ModalSumbit;
