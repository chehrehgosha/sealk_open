const { optimizationCallback } = require("./optimizationCallback");
const fs = require("fs");

// the function used for data processing
export async function dataProcessor(linesOfData, processLimit): Promise<void> {
  // number of lines of data in dataset
  const numberOfLines: number = linesOfData.length;

  // number of complete iterations
  const numberOfIterations: number = Math.floor(numberOfLines / processLimit);
  for (let index = 0; index <= numberOfIterations; index++) {
    // defining the starting index and end index of the
    // current iteration of data processing
    const startIndex: number = index * processLimit;
    const endIndex: number =
      index === numberOfIterations ? numberOfLines : (index + 1) * processLimit;

    console.log(`### Processing on data index ${startIndex} to ${endIndex}...`);

    let processRequests: Array<void> = linesOfData
      .slice(startIndex, endIndex)
      .map(async (line) => {
        const promise = new Promise((resolve, reject) => {
          // splitting the data to it fields
          // the first index contains the symbol
          // of the company
          const dataFields: Array<string> = line.split(",");

          // calling the optimization callback
          optimizationCallback(dataFields[0], resolve, reject);
        });
        return promise;
      });

    await Promise.all(processRequests).then((values) => {
      fs.appendFileSync("../outputData.txt", values.join("\n"));
    });
  }
}
