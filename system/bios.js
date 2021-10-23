//here we check if an os exists and try to boot it. if not, we boot the bios terminal

//just in case to prevent errors
const _bios_check = "<span class=\"tc-lime\">\u2713</span>"; //✓
const _bios_fail = "\u274c";  //❌
var _biosallow = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,[]()!@#$~ /:;?\'\"+-/*&";
var _ctyping = "";


if(atica._os.has == false) {
    //load bios
    _bios_load();
} else {
    //wow it exists
}
/** BIOSTERMINAL */

function _bios_load() {
    //wow we get to do fun stuff
    document.body.classList.add("_bios-normal");
    atica.cinListeners.push(function(k) {
        if(_biosallow.includes(k.key) == true) {
            _ctyping += k.key;
            vkupdate();
        } else if (k.key == "Enter") {
            _bios_execute(_ctyping);
            _ctyping = "";
            vkupdate();
        } else if (k.key == "Backspace") {
            _ctyping = _ctyping.slice(0, _ctyping.length - 1);
            vkupdate();
        }
    });
}

    /** messages */
    atica.cout(_bios_fail + `no os was detected, booting atica bios`, "_bios-normal", atica.bios);
var vkbios = document.getElementById("vkbios");
vkupdate();
function vkupdate() {
    vkbios.innerHTML = `<span class="tc-lime">atica $ </span>${_ctyping}`;
}
function _bios_execute() {
    atica.cout(`<span class="tc-lime">atica $ </span>${_ctyping}`, "_bios-normal", atica.bios);
    atica.cout(_bios_check + `executed ${_ctyping}`, "_bios-normal", atica.bios);
}