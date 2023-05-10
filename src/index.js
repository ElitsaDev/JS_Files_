import openDirectory from "./openDirectory.js";
import writeFile from "./writeFile.js";

const openDirButton = document.getElementById('open-directory');
const downloadButton = document.getElementById('download-file');
const pre = document.querySelector('pre');
let cloneResult = [];
openDirButton.addEventListener('click', async () => {
    const filesInDirectory = await openDirectory();
    if (!filesInDirectory) {
        return;
    }
    //console.log(filesInDirectory);
    let radioButtons = document.getElementsByName("file-extention");

    let extensionIsChecked = false;
    //console.log(Array.from(radioButtons))
    let waschaced = Array.from(radioButtons).some(r => r.getAttribute('data-waschecked') == 'true');
    if (!waschaced) {
        alert("Please decide if the file extensions have to be included or not?");
        window.location.reload(true);
        return;
    }

    for (let i = 0; i < radioButtons.length; i++) {
        //console.log(radioButtons[i].getAttribute('data-waschecked'))

        if (radioButtons[i].type == "radio"
            && radioButtons[i].value == "yes"
            && radioButtons[i].getAttribute('data-waschecked') == 'true') {
            console.log("Extensions must to be included in")
            extensionIsChecked = true;
            break;
        } else if (radioButtons[i].type == "radio"
            && radioButtons[i].value == "no"
            && radioButtons[i].getAttribute('data-waschecked') == 'true') {
            console.log("Without extensions")
            extensionIsChecked = false;
        }
    }
    let arrResult = Array.from(filesInDirectory);
    //console.log(extensionIsChecked)
    if (extensionIsChecked) {
        arrResult.forEach((file) => (pre.textContent += `${file.directoryHandle.name}\\${file.name}\n`));
    } else {
        arrResult.forEach((e) => cloneResult.push(e.directoryHandle.name + '\\' + e.name.substring(0, e.name.indexOf('.'))))
        //console.log(cloneResult)
        pre.textContent = cloneResult.join('\n').toString();
    }
});

downloadButton.addEventListener('click', async () => {
    //console.log(pre)
    writeFile(pre);
    window.location.reload(true);
});

