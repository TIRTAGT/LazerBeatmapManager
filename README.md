# LazerBeatmapManager
A simple CLI tools, to export/view your osu!lazer beatmaps.

Written on NodeJS, this guarantees as easy as possible setup.


---
## Project Minimum Requirements
1.  NodeJS version higher than v14+
    - Tested NodeJS version :
       - v14.18.1
       - v17.2.0

2.  npm
	- Tested npm version :
    	- 8.1.4

3.  Operating System : Linux

	In the future, I might will test it on windows.
	- Tested Operating System version :
    	- Arch Linux (Kernel: 5.16.2.arch1-1)

---
## Why was this project created
I want to be able to quickly share my osu!lazer beatmaps into the current stable osu.
As osu!lazer uses a different way to store the beatmaps, and there is no option to export all beatmaps on the game.... _This project was created under 11 hours._

Before having an idea to create this project, I was looking at a ready made solution on the open source world, however..... all of the project relating osu!lazer beatmap conversion are either on ``.NET Mono``, ``.NET Core`` or ``Java``. Which is not really suitable for me.

The first idea was to use ``PHP``, however as I thought that ``NodeJS`` should be enough for such simple tasks.

I appreciate your contribution to the open source world.

---
## How to use

1. Compile the project, and run the project with :
    - Extract All beatmaps :
     	- ``node build/lazermanager.js [osu!lazer path] -e [?output_directory]``

	- View All beatmaps
       - ``node build/lazermanager.js [osu!lazer path] -v``

	- Display the help message :
    	- ``node build/lazermanager.js "" -h``

---
## Future plans on this project
There must be nothing much that needs to be done in the future...

However, I'd like to make this script to be also available to windows based operating system !

And I'd like to implement a way so that we can select only a specific beatmap artist's or title's, that will be displayed/extracted.

---
## Compile the project
1. Make sure that your system had meets the Project Minimum Requirements.
2. Open up a terminal and adjust your current working directory to the project location.
3. Install the node_modules, by running ``npm install`` at your terminal.
4. Compile the Typescript either by running :
	- Compile only :
    	- ``tsc -p tsconfig.json``
  	- Compile + Run
    	- ``tsc -p tsconfig.json && node build/lazermanager.js`` or ``npm start``
5. Ready to use !

---
## Script Options
The basic syntax is as follows:
	``node build/lazermanager.js [osu!lazer path] [mode] [?output_directory]``

	Which is :

	- [ozu!lazer path] are a path to your osu!lazer installation directory.
  
	- [mode] can be one of these :
    	- -e  => Extract Beatmaps from osu!lazer directory to the output_directory
    	- -v  => View beatmaps from the osu!lazer directory
    	- -h  => Displays a help message

  	- [?output_directory] are the location to store the exported beatmaps.
    	- Will only be required when running with the ``-e`` mode.

---
## License
This project are licensed under the MIT License
