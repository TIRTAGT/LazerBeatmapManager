/** LazerBeatmapManager - SQLite Database Handler
 *  Description : A simple CLI tools, to export/view your osu!lazer beatmaps
 * 	License : MIT
 * 	Repository: https://github.com/TIRTAGT/LazerBeatmapManager
 */

import * as db from 'better-sqlite3';
import { FileCompressor } from './filecompressor';

export class DatabaseHandler {
	private Database : db.Database = null;
	private TotalBeatmaps = 0;
	private FailedBeatmaps = 0;
	private InputParameters : { Mode: string; OutputDirectory: string; OsuLazerDirectory: string; } = null;

	constructor(InputParam: { Mode: string; OutputDirectory: string; OsuLazerDirectory: string; }) {
		this.InputParameters = InputParam;
		try {
			this.Database = db((this.InputParameters.OsuLazerDirectory + "/client.db"), { 
				readonly: true,
				fileMustExist: true,
				verbose: (message) => {
					// Uncomment the console.log below to Enable SQL logging
					// console.log(message);
				}
			});
		} catch (error) {
			console.log("Failed to open database");
			throw error;
		}
	}

	public ConvertBeatmaps() {
		let Beatmaps = this.Database.prepare("SELECT * FROM BeatmapSetInfo;").all();

		if (Beatmaps == null) {
			console.log("Failed to get beatmap data");
			process.exit(1);
		}
		
		this.TotalBeatmaps = Beatmaps.length;
		console.log("Extractor : Found " + this.TotalBeatmaps + " beatmaps");

		// Stop if empty.
		if (this.TotalBeatmaps == 0) {
			return;
		}

		for (let i = 0; i < Beatmaps.length; i++) {

			// Check for beatmap online ID
			if (!Beatmaps[i].OnlineBeatmapSetID || !Beatmaps[i].MetadataID) {
				console.log("Beatmap " + i + " has no online beatmapset or Metadata ID");
				continue;
			}

			let BeatmapMetadata = this.Database.prepare("SELECT * FROM BeatmapMetadata WHERE ID = ?").all(Beatmaps[i].MetadataID);
			let BeatMapFileInfo = this.Database.prepare("SELECT * FROM BeatmapSetFileInfo WHERE BeatmapSetInfoID = ?").all(Beatmaps[i].ID);
			
			// TODO: Allow to extract with specified title or artists.
			if (BeatmapMetadata[0].Artist == "IMPLEMENT:THIS") {
				continue;
			}

			console.log("(" + i + "<->" + this.TotalBeatmaps + ")  Exporting : " + BeatmapMetadata[0].Artist + " - " + BeatmapMetadata[0].Title);
			
			// Prepare the file compressor
			var Compressor = new FileCompressor(this.InputParameters);

			// Set the archive name
			Compressor.MarkStart((BeatmapMetadata[0].Artist + " - " + BeatmapMetadata[0].Title));
			
			BeatMapFileInfo.forEach(BeatFileInfo => {
				// BeatFileInfo will always have a pointer to one FileInfo

				let FileInfo = this.Database.prepare("SELECT * FROM FileInfo WHERE ID = ?").get(BeatFileInfo.FileInfoID);

				// First, we need to get the first character of FileInfo.Hash
				// After that, get the first and second characters of FileInfo.Hash
				// Next, Append all of the FileInfo.Hash after that First and First + Second path
				// Example : ./osu/files/f/f0/f0ab8b6b9c6d9f96a96969f69e6

				let FirstIndex:string = FileInfo.Hash[0] + "/";
				let SecondIndex:string = FileInfo.Hash[0] + FileInfo.Hash[1] + "/";

				// Full path to the beatmap resources
				let FullPath:string = this.InputParameters.OsuLazerDirectory + "files/" + FirstIndex + SecondIndex + FileInfo.Hash;

				Compressor.AddContent(FullPath, BeatFileInfo.Filename);
			});

			// Close the current archive
			Compressor.MarkEnd();
		}
	}

	public ViewBeatmaps() {
		let Beatmaps = this.Database.prepare("SELECT * FROM BeatmapSetInfo;").all();

		if (Beatmaps == null) {
			console.log("Failed to get beatmap data");
			process.exit(1);
		}
		
		this.TotalBeatmaps = Beatmaps.length;
		console.log("Found " + this.TotalBeatmaps + " beatmaps");
	}
	

	/** Close the existing  database connection */
	public CloseDatabase() {
		this.Database.close();
	}
}