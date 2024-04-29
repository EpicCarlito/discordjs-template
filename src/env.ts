import dotenv from "dotenv";
dotenv.config();

function getEnv() {
  return {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN as string,
    CLIENT_ID: process.env.CLIENT_ID as string,
  };
}

const env = getEnv();

export default env;
