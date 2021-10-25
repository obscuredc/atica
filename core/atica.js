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
atica.xsilence = false;
atica.bios = document.getElementById("bios");
atica.rout = function(raw, to) {
    try {
        to.innerHTML += raw;
    } catch {
        //lmao nothing. ignore
    }
}
atica.cout = function(rmsg, cl, to) {
    if(atica.xsilence == false) {
        atica.rout(`<p class="${cl}">${rmsg}</p>`, to);
    }
}
//!!!env ---
//controls system defined and user defined variables and permissions.

//are the system defined variables readonly?
atica._systemreadonly = false;
//!!!files ---
//manages the filesystem emulator, path fetching, content/type fetching, etc
var Files = [];
var Drives = [];
var CDRIVE;
class FFile {
    constructor(ID) {
        this.ID = ID;
        this.Content = "";
        this.ENDL = "";
    }
    getContent() {
        return this.Content;
    }
    setContent(str) {
        this.Content = str;
    }
}
class FDrive {
    constructor(ID) {
        this.ID = ID;
        this.Files = [];
    }
    getFiles() {
        return this.Files;
    }
    appendFile(f) {
        this.Files.push(f);
    }
}
function getDrive(ID) {
    for(i = 0 ; i < Drives.length; i++) {
        if(Drives[i].ID == ID) {
            return Drives[i];
        }
    }
    return new FDrive("");
}
function getFile(ID,drive) {
    for(i = 0; i < drive.Files.length; i++) {
        if(drive.Files[i].ID == ID) {
            return drive.Files[i];
        }
    }
    return false;
}
Drives.push(new FDrive("C"));
CDRIVE = getDrive("C");
var _aticaJS_temp = new FFile("temp");
_aticaJS_temp.ENDL = "sys";
CDRIVE.appendFile(_aticaJS_temp);
//!!!logo ---
atica._logo = `
                                ,-.<br>
                               ("O_)<br>
                              / \`-/<br>
                             /-. /<br>
                            /   )<br>
                           /   /  <br>
              _           /-. /<br>
             (_)"-._     /   )<br>
               "-._ "-'""( )/    <br>
                   "-/"-._" \`. <br>
                    /     "-.'._<br>
                   /\\       /-._"-._<br>
    _,---...__    /  ) _,-"/    "-(_)<br>
___<__(|) _   ""-/  / /   /<br>
 '  \`----' ""-.   \\/ /   /<br>
               )  ] /   /<br>
       ____..-'   //   /                       )<br>
   ,-""      __.,'/   /   ___                 /,<br>
  /    ,--""/  / /   /,-""   """-.          ,'/<br>
 [    (    /  / /   /  ,.---,_   \`._   _,-','<br>
  \\    \`-./  / /   /  /       \`-._  """ ,-'<br>
   \`-._  /  / /   /_,'            ""--"<br>
       "/  / /   /"         <br>
       /  / /   /<br>
      /  / /   / <br>
     /  |,'   /  <br>
    :   /    /<br>
    [  /   ,'  <br>
    | /  ,'<br>
    |/,-'<br>
    P'<br>
`;