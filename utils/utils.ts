import * as fs from "fs";

export function getAuthData() {
  const username = process.env.TEST_USER;
  const password = process.env.TEST_PASS;

  if (username && password) {
    return { username, password };
  }

  // Fallback: use local login-data.json if running locally
  const filePath = "login-data.json";
  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData.toString());

  return {
    username: jsonData.users.standardValidUser.username as string,
    password: jsonData.users.standardValidUser.password as string,
  };
}