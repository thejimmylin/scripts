#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { exec } from "child_process";

const filePath = path.join(process.env.HOME, "gitas-config.json");
const content = fs.readFileSync(filePath, "utf8");
const configs = JSON.parse(content);
const config = configs.find((config) => config.email === process.argv[2]);
const { email, name } = config;

const commands = [
  `git config --global user.email ${email}`,
  `git config --global user.name ${name}`,
  `rm ~/.ssh/id_ed25519`,
  `rm ~/.ssh/id_ed25519.pub`,
  `cp ~/.ssh/${email}/id_ed25519 ~/.ssh/id_ed25519`,
  `cp ~/.ssh/${email}/id_ed25519 ~/.ssh/id_ed25519.pub`,
];

exec(commands.join(";"), (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
  } else if (stderr) {
    console.log(`stderr: ${stderr}`);
  } else if (stdout) {
    console.log(`stdout: ${stdout}`);
  }
});
