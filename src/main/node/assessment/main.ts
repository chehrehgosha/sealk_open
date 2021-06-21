const { DummyAI } = require("../common/dummy-ai");
const { dataProcessor } = require("./dataProcessor");
const csv = require("csv-parser");
const fs = require("fs");

/*
    if you don't define the maximum limit or a reasonable
    limit for the number of processes, your program will 
    crash.
    In the current approach, we split the dataset to several
    part, based on the maximum process limit number.
    e.g. you have 1000 lines of data, and you have the limit 
    of 500 processes at a time: so you do 2 iterations, each 
    time 500 line of data.

    Unless you'ill face this issue.
    Error: spawn /Users/omid_ch/.nvm/versions/node/v12.22.1/bin/node EAGAIN
    Error: write EBADF

  */
const PROCESS_PER_USER_LIMIT: number = 500;

async function main() {
  //string variables for holding the outputfile and the dataset path
  const outputPath: string = "../outputData.txt";
  const datasetPath: string = "../../nasdaq-company-list.csv";

  //deleting the output data from last attempt
  if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

  // reading the dataset
  const data: string = fs.readFileSync(datasetPath, "UTF-8");

  // split the CSV file to lines
  const lines: Array<string> = data.split(/\r?\n/).slice(1);

  // splitting dataset to sets and process one by one
  await dataProcessor(lines, PROCESS_PER_USER_LIMIT);
}

main()
  .then(() => {
    console.log("Data available in the output path");
  })
  .catch((err) => {
    console.log("Error", err);
  });
