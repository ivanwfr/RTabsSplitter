/*┌──────────────────────────────────────────────────────────────────────────┐*/
/*│ dom_log [dir log log<0-9>]                                               │*/
/*└──────────────────────────────────────────────────────────────────────────┘*/
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/

/* globals console */

/* exported dom_log */

const DOM_LOG_JS_ID        = "dom_log_js";
const DOM_LOG_JS_TAG       = DOM_LOG_JS_ID  +" (220128:19h:09)";  /* eslint-disable-line no-unused-vars */
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
/* eslint-enable  no-unused-vars */

/*}}}*/

/* console {{{*/

let dir               = console.dir;
let log               = console.log;
let console_clear     = function(msg=null) { console.clear(); if(msg) console.log ("%c.. by "+msg,"color:#666; background:#111; border:0px solid #445; border-radius:1em;"); };

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

/* EXPORT */
/*{{{*/
return {  LF
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
:e             $RPROFILES/script/stub/dom_sentence_event.js
:e             $RPROFILES/script/stub/dom_scroll.js
:e             $RPROFILES/script/stub/dom_sentence_util.js
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
