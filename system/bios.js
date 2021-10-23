//here we check if an os exists and try to boot it. if not, we boot the bios terminal

if(atica._os.has == false) {
    //load bios
    _bios_load();
} else {
    //wow it exists
}

/** BIOSTERMINAL */
_biosallow = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,[]()!@#$~ /:";
_ctyping = "";
function _bios_load() {
    //wow we get to do fun stuff
    atica.cinListeners.push(function(k) {
        console.log(k.name);
        if(_biosallow.includes(k.name)) {
            _ctyping += k.name;
        } else if (k.name == "Enter") {
            _bios_execute(_ctyping);
        }
    });
}

function _bios_execute() {
    console.log("lmao");
}