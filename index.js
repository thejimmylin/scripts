#!/usr/bin/env node

import fs from "fs";
import path from "path";

const configFilePath = path.join(process.env.HOME, "gitas-config.json");

const data = fs.readFileSync(configFilePath, "utf8");
const config = JSON.parse(data);
console.log(config);
