//some initial setup. is almost always the first few scripts to run. provides a root for the bios terminal.

atica.root = document.getElementById("atica-root");
atica.root.innerHTML += `<div id="bios"></div><p id="vkbios" class="_bios-normal"></p>`;