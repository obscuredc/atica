//provides standard input and output. cinListeners is just a group of things that all get fired on a keypress.

atica.cinListeners = []; //array of functions
document.addEventListener("onkeydown", function(key) {
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
atica.cout = function(raw) {
    try {
        atica.bios.innerHTML += raw;
    } catch {
        //lmao nothing. ignore
    }
}