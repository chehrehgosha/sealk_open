const childProcess = require("child_process");
const fs = require("fs");

export function optimizationCallback(symbol, resolve, reject): void {
  // specifying the file that is used for forking

  const forked_child_process = childProcess.fork("./childProcessCallback.js");

  // sending the symbol of the company as the input to the child process
  forked_child_process.send(symbol);

  // listening for messages from the child process
  forked_child_process.on("message", (score) => {
    // dict[score.id] = score.score;
    resolve(`ID:${score.id}, SCORE:${score.score}`);
  });

  // rejecting the promise on the error from the child side
  forked_child_process.on("error", function (err) {
    console.log("Error on the child process: " + err);
    reject();
  });
}
