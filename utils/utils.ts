import * as fs from "fs";

export function getAuthData(){
  const filePath = "login-data.json";
  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData.toString());

  return {
    username: "TEST_USER",
    password: "TEST_PASS",
  };
}