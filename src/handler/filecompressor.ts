/** LazerBeatmapManager
 *  Description : A simple CLI tools, to export/view your osu!lazer beatmaps
 * 	License : MIT
 * 	Repository: https://github.com/TIRTAGT/LazerBeatmapManager
 */
import { existsSync, lstatSync, Stats, createWriteStream, WriteStream } from 'fs';
import * as archiver from 'archiver';

export class FileCompressor {
	public archiveName = "";
	private archiveRawData: archiver.Archiver = null;
	private archiveContents: string[] = [];
	private InputParameters: { Mode: string; OutputDirectory: string; OsuLazerDirectory: string; } = null;
	private archiveStream: WriteStream = null;

	constructor(InputParam: { Mode: string; OutputDirectory: string; OsuLazerDirectory: string; }) {
		this.InputParameters = InputParam;
	}

	/**
	 * Create a new archive
	 */
	public MarkStart(archiveName: string) {
		if (this.archiveName != "") {
			console.warn("WARNING | Trying to open while there is an opened archive !!!");
			return;
		}
		this.archiveName = archiveName;

		// Try to create a write stream
		this.archiveStream = createWriteStream(this.InputParameters.OutputDirectory + "/" + this.archiveName + ".osz");

		this.archiveRawData = null;
		this.archiveRawData = archiver("zip");
		this.archiveRawData.on("close", this.onArchiveClosed);
		this.archiveRawData.on("end", this.onArchiveContentDrained);
		this.archiveRawData.on("warning", this.onArchiveWarnings);
		this.archiveRawData.on("error", this.onArchiveError);

		this.archiveRawData.pipe(this.archiveStream);
	}

	private onArchiveClosed() {
		// TODO : Implement this function
		this.archiveName = "";
		this.archiveStream.close();
		this.archiveRawData = null;
	}

	private onArchiveContentDrained() {
		// TODO : Implement this function
	}

	private onArchiveWarnings(warn: archiver.ArchiverError) {
		console.warn(warn);
	}

	private onArchiveError(err: archiver.ArchiverError) {
		console.error(err);
	}

	/** Add a content specified by filepath to the archive */
	public AddContent(path: string, renamed: string) {
		if (this.archiveName == "") {
			console.warn("WARNING | Trying to add content while there are no archive opened !!!");
			return;
		}

		// Make sure the path is existant and is a file
		if (!existsSync(path)) {
			console.warn("The provided filepath does not exist !");
			return;
		}

		let LazerDirectoryInfo: Stats = lstatSync(path);

		// Check if OsuLazerDirectory is a directory
		if (!LazerDirectoryInfo.isFile()) {
			console.warn("The provided filepath is not a file !");
			return;
		}

		// Add the file to the archive.
		this.archiveRawData.file(path, {
			name: renamed
		});

		this.archiveContents.push(path);

		return true;
	}

	/** Close the newly created archive */
	public MarkEnd() {
		if (this.archiveName == "") {
			console.warn("WARNING | Trying to close an already closed archive !!!");
			return;
		}

		this.archiveRawData.finalize();

		return true;
	}
}