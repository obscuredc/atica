//here we check if an os exists and try to boot it. if not, we boot the bios terminal

//just in case to prevent errors
const _bios_check = "<span class=\"tc-lime\">\u2713</span>"; //✓
const _bios_fail = "\u274c";  //❌
const _typeblock = "\u2588"; //█

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
    atica.cout(`:atica${_rarblock}`, " tc-orange _bios-normal", atica.bios);
    atica.cout(_bios_fail + `no os was detected, booting atica bios`, "_bios-normal tc-white", atica.bios);
    if(atica._coreins == true) {
        atica.cout(_bios_check + `core is installed`, "_bios-normal tc-white", atica.bios);
    } else {
        atica.cout(_bios_fail + `core not installed`, "_bios-normal tc-white", atica.bios);
    }
    
var vkbios = document.getElementById("vkbios");
vkupdate();
function vkupdate() {
    vkbios.innerHTML = `<span class="tc-lime">atica $ </span>${_ctyping}<span class="blink tc-white">${_typeblock}</span>`;
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
        //console.log(tokens);
    } else {
        atica.cout(_bios_fail + `not passed lexing`, "_bios-normal tc-white", atica.bios);
        //atica.cout(lexer_logs, "_bios-normal tc-white", atica.bios);
        //console.log(tokens);
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
const HString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_/$^&*#@!? ";
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

//!!! bios std library ----
