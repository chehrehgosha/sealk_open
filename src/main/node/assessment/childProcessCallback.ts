import { DummyAI } from "../common/dummy-ai";

// listen for messages from the parent process
process.on("message", async (companyName) => {
  try {
    // the time consuming function, called inside each child process
    let score = await DummyAI.getCompanyAttractiveness(companyName);

    // send the result as a message to the parent process
    process.send(score);

    //terminating the child process
    process.exit();
  } catch (error) {
    console.log(`error`, error);
    process.exit();
  }
});
