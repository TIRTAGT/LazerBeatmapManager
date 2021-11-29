/** LazerBeatmapManager - Input Handler
 *  Description : A simple CLI tools, to export/view your osu!lazer beatmaps
 * 	License : MIT
 * 	Repository: https://github.com/TIRTAGT/LazerBeatmapManager
 */
import { existsSync, lstatSync, readdirSync, Stats } from 'fs';

export class InputHandler {
	private Mode:string;
	private OutputDirectory:string = "";
	private OsuLazerDirectory: string = "";
	
	public constructor() {
		// Get command line parameters
		var args = process.argv.slice(2);

		this.OsuLazerDirectory = args[0];
		this.Mode = args[1];

		switch (this.Mode) {
			case "-e":
				console.info("-e specified, extracting mode.");

				// Get the output directory
				this.OutputDirectory = args[2];
				break;
			case "-v":
				console.info("-v specified, viewonly mode.");
				break;
			case "-h":
				console.log("Available modes :");
				console.log("-e : Extract Beatmaps from ozu!lazer directory");
				console.log("-v : View betmaps from ozu!lazer directory")
				console.log("-h : Display this help message");
				process.exit(0);
				break;
			default:
				console.log("Usage: LazerBeatmapManager.js [osu!lazer path] [mode] [?output_directory]");
				console.log("Run 'node LazerBeatmapManager.js -h' for help !");
				process.exit(1);
				break;
		}
	}

	/** Validate the provided input 
	 * @returns {boolean} true if input is valid, false otherwise
	*/
	private ValidateInput(): boolean {
		// Check if Osulazer directory is not a empty string
		if (this.OsuLazerDirectory.length < 5) {
			console.log("No osu!lazer directory specified !");
			process.exit(1);
		}

		// Check if OsuLazerDirectory exists
		if (!existsSync(this.OsuLazerDirectory)) {
			console.log("The provided Osu!lazer path does not exist !");
			process.exit(1);
		}

		let LazerDirectoryInfo: Stats = lstatSync(this.OsuLazerDirectory);

		// Check if OsuLazerDirectory is a directory
		if (!LazerDirectoryInfo.isDirectory()) {
			console.log("The provided Osu!lazer path is not a directory !");
			process.exit(1);
		}

		// Check if the OzulazerDirectory contains a folder called "files"
		if (!existsSync(this.OsuLazerDirectory + "/files")) {
			console.log("The provided Osu!lazer path does not contain a 'files' folder !");
			process.exit(1);
		}

		// Check if the OzulazerDirectory contains a file called "client.db"
		if (!existsSync(this.OsuLazerDirectory + "/client.db")) {
			console.log("The provided Osu!lazer path does not contain a 'client.db' file !");
			process.exit(1);
		}

		// Check if the OsuLazerDirectory contains a file called "game.ini"
		if (!existsSync(this.OsuLazerDirectory + "/game.ini")) {
			console.log("The provided Osu!lazer path does not contain a 'game.ini' file !");
			process.exit(1);
		}

		if (this.Mode == "-e") {
			if (this.OutputDirectory.length < 3) {
				console.log("No output directory specified !");
				process.exit(1);
			}

			// Check if output directory exists
			if (!existsSync(this.OutputDirectory)) {
				console.log("The provided output directory does not exist !");
				process.exit(1);
			}

			// Make sure the Output Directory is a directory
			let OutputDirectoryInfo: Stats = lstatSync(this.OutputDirectory);

			if (!OutputDirectoryInfo.isDirectory()) {
				console.log("The provided output directory is not a directory !");
				process.exit(1);
			}

			// Make sure the Output Directory is empty
			if (readdirSync(this.OutputDirectory).length > 0) {
				console.log("The provided output directory is not empty !");
				process.exit(1);
			}
		}
		return true;
	}

	/** Check if Input is valid by invoking the ValidateInput function
	* @returns {boolean} true if input is valid, false otherwise
	*/
	public IsInputValid(): boolean {
		return this.ValidateInput();
	}

	/** Get Input Parameters 
	* @returns {object} the Input Parameters
	*/
	public GetInputParameters(): { Mode: string, OutputDirectory: string, OsuLazerDirectory: string } {
		return {
			Mode: this.Mode,
			OutputDirectory: this.OutputDirectory,
			OsuLazerDirectory: this.OsuLazerDirectory
		};
	}

}