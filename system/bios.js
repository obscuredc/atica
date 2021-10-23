//here we check if an os exists and try to boot it. if not, we boot the bios terminal
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}
//from `https://stackoverflow.com/questions/15313418/what-is-assert-in-javascript`
//just in case to prevent errors
const _bios_check = "<span class=\"tc-lime\">\u2713</span>"; //✓
const _bios_fail = "\u274c";  //❌
const _typeblock = "\u2588";
//tryout, u2591,u2592,u2593,u2588

const _rarblock = "\u25BF";
var _biosallow = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,[]()!@#$~ /:;?\'\"+-/*&_=<>|`";
var _ctyping = "";


if(atica._os.has == false) {
    //load bios
    _bios_load();
} else {
    //wow os exists
}
/** BIOSTERMINAL */
var _PARSEREXECUTEOVERRIDE = true;
var _CHARLIGHT = true;
var _shortcuton = false;
function _bios_load() {
    //wow we get to do fun stuff
    document.body.classList.add("_bios-normal");
    atica.cinListeners.push(function(k) {
        if(_shortcuton == false) {
            if(_biosallow.includes(k.key) == true) {
                _ctyping += k.key;
                vkupdate();
            } else if (k.key == "Enter") {
                _bios_execute(_ctyping);
                _ctyping = "";
                _PARSEREXECUTEOVERRIDE = true;
                vkupdate();
            } else if (k.key == "Backspace") {
                _ctyping = _ctyping.slice(0, _ctyping.length - 1);
                vkupdate();
            } else if (k.key == "Control") {
                _shortcuton = true;
                vkupdate();
            }
        } else {
            if(k.key == "c") {
                _ctyping = "";
            }
            _shortcuton = false;
            vkupdate();
        }
    });
}

    /** messages */
    atica.cout(`:atica${_rarblock}`, " tc-orange _bios-normal", atica.bios);
    atica.cout(_bios_fail + `no os was detected, booting atica bios`, "_bios-normal tc-white", atica.bios);
    if(atica._coreins == true) {
        atica.cout(_bios_check + `core is installed`, "_bios-normal tc-white", atica.bios);
    } else {
        atica.cout(_bios_fail + `core not installed`, "_bios-normal tc-white", atica.bios);
    }
    
var vkbios = document.getElementById("vkbios");
vkupdate();
var _vk_sp_char = "@#$!?.,;:-=_&*%[]\\|\"";
function vkupdate() {
    if(_CHARLIGHT == true) {
        var tempvk = "";
        for(i = 0; i < _ctyping.length; i++) {
            if(_vk_sp_char.includes(_ctyping[i])) {
                tempvk += `<span class="tc-orange">${_ctyping[i]}</span>`;
            } else {
                tempvk += _ctyping[i];
            }
        }
        vkbios.innerHTML = `<span class="tc-lime">${_shortcuton ? "[CTRL]" : ""} atica $ </span>${tempvk}<span class="blink tc-white">${_typeblock}</span>`;
    } else {
        vkbios.innerHTML = `<span class="tc-lime">${_shortcuton ? "[CTRL]" : ""} atica $ </span>${_ctyping}<span class="blink tc-white">${_typeblock}</span>`;
    }
}

function _bios_execute() {
    //this below emulates typing it in. should always be first
    atica.cout(`<span class="tc-lime">atica $ </span>${_ctyping}`, "_bios-normal tc-white", atica.bios);
    atica.cout(`:executor${_rarblock}`, " tc-orange _bios-normal", atica.bios); //executor tracer
    //everything else
    var lexer_logs = "";
    var lexer_logs_amount = 0;
    var lexer = new Lexer(_ctyping);
    lexer.ThrowLog = function(m) {
        if(this.ctok != "\u2929") {
            lexer_logs += m + ", \n";
            //lexer_logs_amount++;
        }
    }
    lexer.ThrowWarning = function(m) {
        if(this.ctok != "\u2929") {
            lexer_logs += m + ", \n";
            lexer_logs_amount++; //maybe a flag to ignore lexer warning logging
        }
    }
    lexer.ThrowError = function(m) {
        if(this.ctok != "\u2929") {
            lexer_logs += m + ", \n";
            lexer_logs_amount++;
        }
    }
    var tokens = lexer.Lex();
    if(lexer_logs_amount == 0) {
        atica.cout(_bios_check + `passed lexing`, "_bios-normal tc-white", atica.bios);
        //atica.cout(lexer_logs, "_bios-normal tc-white", atica.bios);
        console.log(tokens);
    } else {
        atica.cout(_bios_fail + `not passed lexing`, "_bios-normal tc-white", atica.bios);
        _PARSEREXECUTEOVERRIDE = false;
        //atica.cout(lexer_logs, "_bios-normal tc-white", atica.bios);
        console.log(tokens);
    }
    var parsedcommand = parse_data(tokens);
    
    if(parsedcommand.Logs.length == 0 && _PARSEREXECUTEOVERRIDE == true) {
        atica.cout(_bios_check + `passed parsing`, "_bios-normal tc-white", atica.bios);
        //atica.cout(lexer_logs, "_bios-normal tc-white", atica.bios);
        console.log(parsedcommand);
    } else {
        atica.cout(_bios_fail + `not passed parsing`, "_bios-normal tc-white", atica.bios);
        //atica.cout(lexer_logs, "_bios-normal tc-white", atica.bios);
        console.log(parsedcommand);
    }
    if(parsedcommand.HasSC == false) {
        try {
            assert(CommandfromNormal(parsedcommand.Command, _commands));
            atica.cout(_bios_check + `passed finding`, "_bios-normal tc-white", atica.bios);
            CommandfromNormal(parsedcommand.Command, _commands).execute(parsedcommand);
        } catch {
            //not a command
            atica.cout(_bios_fail + `not passed finding`, "_bios-normal tc-white", atica.bios);
        }
    } else if (parsedcommand.HasSC == true) {
        try {
            assert(CommandfromPkg(parsedcommand.Command, parsedcommand.Subcommand));
            atica.cout(_bios_check + `passed finding`, "_bios-normal tc-white", atica.bios);
            CommandfromPkg(parsedcommand.Command, parsedcommand.Subcommand).execute(parsedcommand);
        } catch {
            //not a command
            atica.cout(_bios_fail + `not passed finding`, "_bios-normal tc-white", atica.bios);
        }
    }
}

//here is lexer code
//warning: only minimally tested
//(good enough for obscuredc)

//goal
// pkg install -f "core"
//[Keyword:"pkg",Keyword:"install",Flag:"f",Data:"core"]
//[System:pkg, SubCommand:install, Flags:["f"], Parameters: ["core"]

/** global helpers */
/* string regex-likes */
const HString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_/$^&*#@!?.,:;\\'` ";
const HFlag = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
const HKeyword = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const Allowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_/ 0123456789";
const SpaceAllowed = " ";

/* type classes */
class Normal {
    constructor(Type, Value) {
        this.Type = Type;
        this.Value = Value;
    }
}
class TTKeyword extends Normal {
    constructor(Value) {
        super(Value);
        this.Type = "KEYWORD";
        this.Value = Value;
    }
}
class TTString extends Normal {
    constructor(Value) {
        super(Value);
        this.Type = "STRING";
        this.Value = Value;
    }
}
class TTFlag extends Normal {
    constructor(Value) {
        super(Value);
        this.Type = "FLAG";
        this.Value = Value;
    }
}

class Lexer {
  constructor(Text) {
    this.Text = Text + "\u2929";
    this.Index = 0;
    this.Tokens = [];
    this.ctok = this.Text[this.Index];

    /** types */
    this.Endl = false;
  }
  Lex() {
    this.ThrowLog(`beginning lexing`);
    while(this.Endl == false) {
        if(this.ctok == "\"") {
            this.Continue();
            this.BuildString();
        } else if(this.ctok =="-") {
            this.Continue();
            this.BuildFlag();
        } else if(HKeyword.includes(this.ctok)) {
            //this.Continue();
            this.BuildKeyword();
        } else if (SpaceAllowed.includes(this.ctok)) {
            this.Continue();
        } else {
            this.ThrowError(`LEXING invalid tok "${this.ctok}"`);
            //remeber to implement <TERMINALSTRICTMODE == true?>
            this.Endl = true;
        }
    }
    this.ThrowLog(`ending lexing`);

    return this.Tokens;
  }
  Continue() {
      this.Index++;
      if(this.Index == this.Text.length) {
          this.Endl = true;
      }
      if(this.Endl == false) {
        this.ctok = this.Text[this.Index];
      }
      //console.log(`CONTINUECALL i=${this.Index} c=${this.ctok}`);
  }
  BuildString() {
    //console.log("building string");
    var temp = "";
    while(HString.includes(this.ctok)) {
        temp += this.ctok;
        this.Continue();
    }
    if(this.ctok == "\"") {
        //normal string exit
        this.Tokens.push(new TTString(temp));
        temp = "";
        this.Continue();
    } else {
        //invalidchar
        this.ThrowError(`LEXING invalid tok "${this.ctok}"`);
    }
  }
  BuildFlag() {
    //console.log("building flag");
    var temp = "";
    while(HFlag.includes(this.ctok)) {
        temp += this.ctok;
        this.Continue();
    }
    if(SpaceAllowed.includes(this.ctok)) {
        //normal string exit
        this.Tokens.push(new TTFlag(temp));
        temp = "";
    } else {
        //invalidchar
        this.ThrowError(`LEXING invalid tok "${this.ctok}"`);
    }
  }
  BuildKeyword() {
    //console.log("building keyboard");
    var temp = "";
    while(HKeyword.includes(this.ctok)) {
        temp += this.ctok;
        this.Continue();
    }
    if(SpaceAllowed.includes(this.ctok)) {
        //normal string exit
        this.Tokens.push(new TTKeyword(temp));
        temp = "";
    } else {
        //invalidchar
        this.Tokens.push(new TTKeyword(temp));
        temp = "";
        this.ThrowError(`LEXING invalid tok "${this.ctok}"`);
    }
  }
  ThrowLog(Message) {
    console.log(Message);
  }
  ThrowWarning(Message) {
    console.warn(Message);
  }
  ThrowError(Message) {
    console.error(Message);
  }
}

//!!! command parsing ----

/**
 * notes:
 * if 2 keywords are found then => Command, Subcommand (package finder)
 * if 1 keyword => Command (command finder)
 * 
 * flags and strings are mixed. .Flags, .Parameters
 */

function parse_data(tokens) {
    //find if package or command
    var _TTKEYWORD_count = 0;
    for(i = 0; i < tokens.length; i++) {
        if(tokens[i] instanceof TTKeyword) {
            _TTKEYWORD_count++;
        }
    }
    var _flaggroup = [];
    var _paramgroup = [];
    var _mcmd = "", _scmd = "";
    var _logs = [];
    if(_TTKEYWORD_count == 1) {
        //now get it and all flags
        for(i = 0; i < tokens.length; i++) {
            if(tokens[i] instanceof TTKeyword) {
                _mcmd = tokens[i].Value;
            } else if (tokens[i] instanceof TTFlag) {
                _flaggroup.push(tokens[i].Value);
            } else if (tokens[i] instanceof TTString) {
                _paramgroup.push(tokens[i].Value);
            }
        }
        return {
            Command: _mcmd,
            Subcommand: undefined,
            HasSC: false,
            Params: _paramgroup,
            Flags: _flaggroup,
            Logs: _logs
        }
    } else if (_TTKEYWORD_count == 2) {
        //now get em and all flags
        for(i = 0; i < tokens.length; i++) {
            if(tokens[i] instanceof TTKeyword) {
                if(_mcmd == "") {
                    _mcmd = tokens[i].Value;
                } else {
                    _scmd = tokens[i].Value;
                }
            } else if (tokens[i] instanceof TTFlag) {
                _flaggroup.push(tokens[i].Value);
            } else if (tokens[i] instanceof TTString) {
                _paramgroup.push(tokens[i].Value);
            }
        }
        return {
            Command: _mcmd,
            Subcommand: _scmd,
            HasSC: true,
            Params: _paramgroup,
            Flags: _flaggroup,
            Logs: _logs
        }
        
    } else {
        //error
        _logs.push("illegal order: too many or too little commands found");
        return {
            Command: _mcmd,
            Subcommand: _scmd,
            HasSC: true,
            Params: _paramgroup,
            Flags: _flaggroup,
            Logs: _logs
        }
    }
}

//!!! bios cmd getter ----
var _packages = [];
var _commands = [];

class Package {
    constructor(Commands, ID) {
        this.Commands = Commands;
        this.ID = ID;
    }
}
class Command {
    constructor(exec, ID) {
        this.exec = exec;
        this.ID = ID;
    }
    execute(parse_data) {
        this.exec(parse_data); //you know, from `parse_data()`.
    }
}

function CommandfromPkg(pkg_id, sub_id) {
    for(i = 0; i < _packages.length; i++) {
        if(packages[i].ID == pkg_id) {
            return CommandfromNormal(sub_id, packages[i].Commands);
        }
    }
    return false;
}
function CommandfromNormal(sub_id, regis) {
    for(i = 0; i < regis.length; i++) {
        if(regis[i].ID == sub_id) {
            return regis[i];
        }
    }
    return false;
}

function AddCommand(cmd) {
    _commands.push(cmd);
}
function AddPackage(pkg) {
    _packages.push(pkg);
}
//!!! bios std library ----
AddCommand(new Command(function(d) {
    atica.cout(_bios_check + `passed help`, "_bios-normal tc-white", atica.bios);
}, "help"));