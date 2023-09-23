/*┌──────────────────────────────────────────────────────────────────────────┐*/
/*│ dom_log [dir log log<0-9>]                                               │*/
/*└──────────────────────────────────────────────────────────────────────────┘*/
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/

/* globals console */

/* exported dom_log */

const DOM_LOG_JS_ID        = "dom_log_js";
const DOM_LOG_JS_TAG       = DOM_LOG_JS_ID  +" (230707:21h:39)";  /* eslint-disable-line no-unused-vars */
/*}}}*/
let dom_log = (function() {
"use strict";


/* SPECIAL_CHAR {{{*/
const LF        = String.fromCharCode(10);

/*}}}*/
/* CSS {{{*/
const lf1  = "color:#964B00;";
const lf2  = "color:#FF0000;";
const lf3  = "color:#FFA500;";
const lf4  = "color:#FFFF00;";
const lf5  = "color:#9ACD32;";
const lf6  = "color:#6495ED;";
const lf7  = "color:#EE82EE;";
const lf8  = "color:#A0A0A0;";
const lf9  = "color:#FFF; text-shadow:#000 1px 1px 1px; background:#666;";
const lf0  = "color:#000; text-shadow:#FFF 1px 1px 1px; background:#666;";
const lfX  = [ lf0 ,lf1 ,lf2 ,lf3 ,lf4 ,lf5 ,lf6 ,lf7 ,lf8 ,lf9 ];

/* eslint-disable no-unused-vars */
const lbH  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0 1ex 1ex   0; padding:0 .5em 0 .5em; border-radius:1em 1em 1em 1em; background:linear-gradient(to bottom, #555 0%, #223 80%, #454 100%);";
const lbL  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0   0   0 1ex; padding:0 .5em 0 .5em; border-radius:1em   0   0 1em; background:linear-gradient(to   left, #333 0%           ,#445 100%);";
const lbR  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0 1ex   0   0; padding:0 .5em 0 .5em; border-radius:  0 1em 1em   0; background:linear-gradient(to  right, #333 0%           ,#544 100%);";
const lbC  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0   0   0   0; padding:0 .5em 0 .5em; border-radius:  0   0   0   0;";

const lbF  = "font-size:120%; font-weight:500; border:2px solid white;";
let   L_ARD  =         "↓ ";
let   L_ARL  = "        ← "; /* EXPORTED */ /* eslint-disable-line no-tabs */
let   L_ARR  =         "→ "; /* EXPORTED */
let   L_ARU  =         "↑ ";
/* eslint-enable  no-unused-vars */

/*}}}*/

/* console {{{*/

let dir               = console.dir;
let log               = console.log;
let console_clear     = function(msg=null) { console.clear(); if(msg) console.log ("%c.. by "+msg,"color:#666; background:#111; border:0px solid #445; border-radius:1em;"); };

let logBIG            = (msg)    => log("%c"+msg, "font-size:150%; font-weight:100;");
let log_key_val       = (name,o) => { console.log(name+":"); console.dir(o); };
let log_key_val_group = log_key_val;

let logX = (msg,l_x) => console.log("%c"+msg, lbR+lfX[l_x]);

let log0 = (msg)     =>         logX(    msg, 0  );
let log1 = (msg)     =>         logX(    msg, 1  );
let log2 = (msg)     =>         logX(    msg, 2  );
let log3 = (msg)     =>         logX(    msg, 3  );
let log4 = (msg)     =>         logX(    msg, 4  );
let log5 = (msg)     =>         logX(    msg, 5  );
let log6 = (msg)     =>         logX(    msg, 6  );
let log7 = (msg)     =>         logX(    msg, 7  );
let log8 = (msg)     =>         logX(    msg, 8  );
let log9 = (msg)     =>         logX(    msg, 9  );

/*}}}*/

/*➔ log_caller {{{*/
let log_caller = function(level_max)
{
    let stack_trace = get_callers( level_max );

    if( stack_trace.includes(LF) ) console.log("%c"+stack_trace.replace(LF,"%c"+LF), lbH+lf6, lf8);
    else                         { console.log("%c"+stack_trace                    , lf6+lbF     ); console.trace(); }
};
let get_callers = function(level_max)
{
    let xx, ex_stack;
    try {   xx.raise(); } catch(ex) { ex_stack = parse_ex_stack_FUNC_FILE_LINE_COL(ex.stack, level_max); }
    return  ex_stack.trim();
};
/*}}}*/
/*_ parse_ex_stack_FUNC_FILE_LINE_COL {{{*/
/*{{{
ReferenceError: exception is not defined
    at XXX1 (file:///.../XXX5.js:12558:38)
    at XXX2 (file:///.../XXX5.js:12497:5)
    at XXX3 (file:///.../XXX5.js:13273:5)
    at XXX4 (file:///.../XXX5.js:2697:5)

/\v\s*at\s*(\S+)\s+\((.+):(\d+):(\d+)
/\v\s*at\s*\zs(\S+)\ze\s+\((.+):(\d+):(\d+)
/\v\s*at\s*(\S+)\s+\(\zs(.+)\ze:(\d+):(\d+)
/\v\s*at\s*(\S+)\s+\((.+):\zs(\d+)\ze:(\d+)
/\v\s*at\s*(\S+)\s+\((.+):(\d+):\zs(\d+)\ze
}}}*/
/*.....................................................func.........file...............line....col..........*/

let parse_ex_stack_FUNC_FILE_LINE_COL = function(text, level_max=10)
{
    let  result = "";
    let   lines = text.split(LF);
    let     sym = L_ARL;
    let line_match;
    for(let i=2; i<=(2+level_max); ++i)
    {
        if( String(lines[i]).includes("at log_caller") ) continue;

        if( line_match = get_ex_stack_line_match(lines[i]) )
            result    += (result ? LF : "") + sym+" "+line_match;
        sym = L_ARU; /* past first line arrow */
    }

    if( !result.includes(LF) ) result += LF + sym +" ... (async)";

    return result;
};
/*}}}*/
/*_ get_ex_stack_line_match {{{*/
/*................................................at    (FILE__).....\( FILE_PATH____).(\......(LINE ).(COL  )*/
const regexp_FUNC_FILE_LINE_COL = new RegExp("\\s*at\\s*([^\\(]+)\\s+\\((?:[^\\/]*\\/)*(\..+?):(\\d+?):(\\d+?)");
/*{{{
const regexp_FUNC_FILE_LINE_COL = new RegExp("\\s*at\\s*([^\\(]+)\\s+\\(([^\\/]*\\/)*(\\w+\\.\\w*):(\\d+):(\\d+)");
}}}*/

let get_ex_stack_line_match = function(ex_stack_line)
{
    let matches = regexp_FUNC_FILE_LINE_COL.exec(ex_stack_line);

    if(!matches ) return "";

    let func = matches[1].replace("Object.","");
    let file = matches[2];
    let line = matches[3];
    let col  = matches[4];
    let match= mPadStart(func, 48)+".. "+file+" "+line+":"+col;

/*{{{
log(ex_stack_line);
log("...... matches[1]=["+matches[1]+"]");
log("...... matches[2]=["+matches[2]+"]");
log("...... matches[3]=["+matches[3]+"]");
log("...... matches[4]=["+matches[4]+"]");
log("...... matches[5]=["+matches[5]+"]");
log("...... matches[6]=["+matches[6]+"]");
log("..match..........=["+match     +"]");
}}}*/
    return match;
};
/*}}}*/
/*_ mPadStart .. mPadEnd {{{*/
/* eslint-disable      no-unused-vars */
let mPadStart = function(s,l,c=" ") { s = String(s); while(s.length < l) s = c+s; return s; };

let mPadEnd   = function(s,l,c=" ") { s = String(s); while(s.length < l) s = s+c; return s; };
/* eslint-enable       no-unused-vars */
/*}}}*/

/* EXPORT */
/*{{{*/
        return { name : "dom_log"
            , LF
            , console_clear
            , dir
            , log
            , log0
            , log1
            , log2
            , log3
            , log4
            , log5
            , log6
            , log7
            , log8
            , log9
            , lbH
            , lbL
            , lbR
            , lbC
            , lfX

            , logBIG
            , log_key_val
            , log_key_val_group

            , get_callers
            , log_caller
        };

/*}}}*/

}());

/*{{{
"┌─────────────────────────────────────────────────────────────────────────────┐
"│                                                                             │
:e  $BROWSEEXT/SplitterExtension/manifest.json

:e  $BROWSEEXT/SplitterExtension/javascript/background.js
:e  $BROWSEEXT/SplitterExtension/javascript/content.js
:e             $RPROFILES/script/dom_sentence.js
:e             $RPROFILES/script/stub/dom_tools.js
:e             $RPROFILES/script/stub/dom_scroll.js
:e             $RPROFILES/script/stub/dom_util.js
"...           $RPROFILES/script/stub/dom_log.js
:e             $RPROFILES/stylesheet/dom_host.css

:e             $RPROFILES/script/dom_select.js
:e             $RPROFILES/script/dom_util.js
:e             $RPROFILES/script/dom_log.js

:e             $RPROFILES/script/splitter.js
:e             $RPROFILES/script/dom_load.js
"│                                                                             │
"└─────────────────────────────────────────────────────────────────────────────┘
}}}*/
