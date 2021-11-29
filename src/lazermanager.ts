/** LazerBeatmapManager
 *  Description : A simple CLI tools, to export/view your osu!lazer beatmaps
 * 	License : MIT
 * 	Repository: https://github.com/TIRTAGT/LazerBeatmapManager
 */

import { InputHandler } from "./handler/inputhandler";
import { DatabaseHandler } from "./handler/databasehandler";

// Print a welcome screen to the console
console.log("================================================================================");
console.log("LazerBeatmapManager - A simple CLI tools, to export/view your osu!lazer beatmaps");
console.log("Repository: https://github.com/TIRTAGT/LazerBeatmapManager");
console.log("License: MIT");
console.log("================================================================================");

// Count command line parameters.
if (process.argv.length < 4) {
	console.log("Usage: lazermanager.js [osu!lazer path] [mode] [?output_directory]");
	process.exit(1);
}

// Run Input Handler
var inputHandler: InputHandler = new InputHandler();

// Validate input
if (!inputHandler.IsInputValid()) {
	console.error("Invalid input!");
	process.exit(1);
}

// Get input parameter
var InputParam: { Mode: string; OutputDirectory: string; OsuLazerDirectory: string; } = inputHandler.GetInputParameters();

// Run the database handler
var dataBaseHandler: DatabaseHandler = new DatabaseHandler(InputParam);

if (InputParam.Mode === "-e") {
	dataBaseHandler.ConvertBeatmaps();
}
else if (InputParam.Mode === "-v") {
	dataBaseHandler.ViewBeatmaps();
}

dataBaseHandler.CloseDatabase();

console.log("Script has been executed without any exceptions!");