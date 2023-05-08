import openDirectory from "./openDirectory.js";
import writeFile from "./writeFile.js";

const openDirButton = document.getElementById('open-directory');
const downloadButton = document.getElementById('download-file');
const pre = document.querySelector('pre');

openDirButton.addEventListener('click', async () => {
    const filesInDirectory = await openDirectory();
    if (!filesInDirectory) {
        return;
    }
    Array.from(filesInDirectory)
    .forEach((file) => (pre.textContent += `${file.directoryHandle.name}\\${file.name}\n`));
});

downloadButton.addEventListener('click', async () => {
    writeFile(pre);
});
