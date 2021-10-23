//just contains global objects for all scripts to use. also exposes stuff in a organized way at the same time.

var atica = {};

//for your os :>
atica._os = {};

//for the bios
atica._coreins = true;

//should we run your os on boot? nah by default
atica._os.runboot = false;

atica._os.name = "";
atica._os.admin = true;
atica._os.has = false;

//!!!modelc ---
//some initial setup. is almost always the first few scripts to run. provides a root for the bios terminal.

atica.root = document.getElementById("atica-root");
atica.root.innerHTML += `<div id="bios"></div><p id="vkbios" class="_bios-normal tc-white"></p>`;
//!!!io ---
//provides standard input and output. cinListeners is just a group of things that all get fired on a keypress.

atica.cinListeners = []; //array of functions
document.addEventListener("keydown", function(key) {
    for(i = 0; i < atica.cinListeners.length; i++) {
        try {
            atica.cinListeners[i](key);
        } catch {
            //lmao nothing, we just ignore B)
        }
    }
});
//atica.cout -> cout in terminal bios
atica.bios = document.getElementById("bios");
atica.rout = function(raw, to) {
    try {
        to.innerHTML += raw;
    } catch {
        //lmao nothing. ignore
    }
}
atica.cout = function(rmsg, cl, to) {
    atica.rout(`<p class="${cl}">${rmsg}</p>`, to);
}
//!!!env ---
//controls system defined and user defined variables and permissions.

//are the system defined variables readonly?
atica._systemreadonly = false;
//!!!files ---
//manages the filesystem emulator, path fetching, content/type fetching, etc