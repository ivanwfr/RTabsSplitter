/*┌──────────────────────────────────────────────────────────────────────────┐*/
/*│ dom_scroll_js                                                            │*/
/*└──────────────────────────────────────────────────────────────────────────┘*/
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/

/* globals console, document, window */
/* globals setTimeout, clearTimeout */
/* globals dom_tools, dom_store, dom_util, dom_log */


/* exported DOM_SCROLL_JS_TAG, dom_scroll */

/* exported DOM_SCROLL_JS_TAG */

const DOM_SCROLL_JS_ID         = "dom_scroll_js";
const DOM_SCROLL_JS_TAG        = DOM_SCROLL_JS_ID  +" (230820:21h:11)";
/*}}}*/
let dom_scroll              = (function() {
"use strict";
let   DOM_SCROLL_LOG        = false;
let   DOM_SCROLL_TAG        = false;

/* IMPORT {{{*/
/* eslint-disable no-unused-vars */
/* eslint-disable no-warning-comments */
/*➔ t_scroll_IMPORT {{{*/
/*{{{*/

let t_store    ;
let t_util     ;
let t_tools    ;

/*......................................*/
/*}}}*/
let t_scroll_IMPORT  = function(_log_this,import_num)
{
    /* t_store {{{*/
    if     (typeof      dom_store != "undefined") t_store  =      dom_store; /*      script/dom_store.js */
    else console.warn("MISSING STUB FOR: [dom_store]");

    /*}}}*/
    /* MODULE LOGGING TAGGING {{{*/
    DOM_SCROLL_LOG = DOM_SCROLL_LOG || t_store.t_store_getItem("DOM_SCROLL_LOG");
    DOM_SCROLL_TAG = DOM_SCROLL_TAG || t_store.t_store_getItem("DOM_SCROLL_TAG");

    /*}}}*/
    /* t_util {{{*/
    if     (typeof      dom_util != "undefined") t_util  =      dom_util; /*      script/dom_util.js */
    else console.warn("MISSING STUB FOR: [dom_util]");

    /*}}}*/
    /* t_tools {{{*/
    if     (typeof      dom_tools != "undefined") t_tools =      dom_tools ; /*      script/dom_tools.js */
    else console.warn("MISSING STUB FOR: [dom_tools]");

    /*}}}*/
    scroll_INTERN();
if(_log_this) log("➔ "+(import_num ? (import_num+" ") : "")+"t_scroll_IMPORT: t_util=["+t_util.name+"] , t_tools=["+t_tools.name+"]");
};
/*}}}*/
/*_   scroll_INTERN {{{*/
/* dom_log {{{*/

let LOG_MAP = false;

let lf1="", lf2="", lf3="", lf4="", lf5="", lf6="", lf7="", lf8="", lf9="", lf0="";
let lfX = [ lf1 ,lf2 ,lf3 ,lf4 ,lf5 ,lf6 ,lf7 ,lf8 ,lf9, lf0 ];

let lb1="", lb2="", lb3="", lb4="", lb5="", lb6="", lb7="", lb8="", lb9="", lb0="";
let lbX = [ lb1 ,lb2 ,lb3 ,lb4 ,lb5 ,lb6 ,lb7 ,lb8 ,lb9, lb0 ];

const lXX  = "border:1px solid gray; padding:0 .5em; border-radius:1em;";
let lbA=lXX, lbB=lXX, lbC=lXX, lbF=lXX, lbH=lXX, lbL=lXX, lbR=lXX, lbS=lXX, lbb=lXX;

let log                 = console.log;
let log_key_val_group   = console.log;
let log_caller          = console.trace;

let console_dir         = (k,v) => { console.log("..."+k+":"); console.dir(v); };

/*}}}*/
let   scroll_INTERN     = function()
{
    /* dom_log OVERLOADED BY dom_log {{{*/
    if((typeof dom_log != "undefined") && (dom_log.LOG_BG_CSS))
    {
        LOG_MAP = dom_log.LOG_MAP;

        ({ lb0, lb1, lb2, lb3, lb4, lb5, lb6, lb7, lb8, lb9, lbX } = dom_log.LOG_BG_CSS);
        ({ lf0, lf1, lf2, lf3, lf4, lf5, lf6, lf7, lf8, lf9, lfX } = dom_log.LOG_FG_CSS);
        ({ lbA, lbB, lbC, lbF, lbH, lbL, lbR, lbS, lbb           } = dom_log.LOG_XX_CSS);

        log                 = dom_log.log;
        log_key_val_group   = dom_log.log_key_val_group;
        console_dir         = dom_log.console_dir;
        log_caller          = dom_log.log_caller;
    }
    /*}}}*/
    /* lfX {{{*/
    else if((typeof dom_log != "undefined") && dom_log.lfX)
    {
        lbH = dom_log.lbH;
        lbL = dom_log.lbL;
        lbR = dom_log.lbR;
        lbC = dom_log.lbC;
        lfX = dom_log.lfX;
        [ lf0 ,lf1 ,lf2 ,lf3 ,lf4 ,lf5 ,lf6 ,lf7 ,lf8 ,lf9 ] = lfX;
    }
    /*}}}*/
};
/*}}}*/
/* eslint-enable  no-unused-vars */
/*}}}*/
/*{{{*/
const CSS_SCROLL_SMOOTH      = "scroll_smooth";

const SCROLL_INTO_VIEW_DELAY = 500; /* eslint-disable-line no-unused-vars */
const SCROLL_RECENTER_DELAY  = 500;

let scrollIntoView_EL;

let scroll_intoview_timer;
let scroll_recenter_timer;

let w_W = 1280, w_H = 1024;

/*{{{
let onScroll_XY = { x:0, y:0 };
}}}*/

/*}}}*/

/* LISTENER */
/*{{{*/

const MAX_SCROLL_SMOOTH_DURATION    = 20000;
const SCROLLED_ENOUGH               =    16; /* eslint-disable-line no-unused-vars */
const SCROLL_DONE_COOLDOWN          =   250;

let scroll_end_timeout              =  null;
let scroll_end_last_scrollY         =     0;
let scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_clr_scrollBehavior_timeout;

/*}}}*/
/*➔ t_scroll_listener {{{*/
let t_scroll_listener = function(e)
{
/*{{{*/
let   caller = "t_scroll_listener";
let log_this = DOM_SCROLL_LOG;

    if(!t_util) t_scroll_IMPORT(log_this);
/*}}}*/

    let scroll_details = "scrollY="+window.scrollY;

if( log_this) log("%c"+caller+" %c "+ scroll_details, lbb+lbL+lf8, lbb+lbR+lf3);
    scroll_listener_scroll_changed(e, scroll_details);
};
/*}}}*/
/*_   scroll_listener_scroll_changed {{{*/
let   scroll_listener_scroll_changed = function(e, scroll_details="")
{
/*{{{*/
let   caller = "scroll_listener_scroll_changed";
let log_this = DOM_SCROLL_LOG;

if( log_this && !scroll_end_timeout)
    log("➔ %c"+caller+"%c"+ window.scrollX +" "+ window.scrollY +"%c"+ (scroll_details ? " scroll_details" : "")
        ,  lbb+lbL+lf9,lbb+lbC+lf9                               ,lbb+lbR+lf9                                   );
/*}}}*/
    /* track and store [window_scrollY] {{{*/
    if( scroll_end_timeout ) clearTimeout( scroll_end_timeout );
    /**/scroll_end_timeout =   setTimeout(scroll_listener_scroll_changed_scroll_end_handler, SCROLL_DONE_COOLDOWN);

    /*}}}*/
};
/*}}}*/
/*_ t_scroll_is_scrolling {{{*/
let t_scroll_is_scrolling = function()
{
/*{{{*/
let   caller = "t_scroll_is_scrolling";
let log_this = DOM_SCROLL_LOG;

/*}}}*/
    let result = (scroll_end_timeout != null);
if( log_this) log("➔ %c"+caller+" %c "+ result
                  ,  lbb+lbL+lf0 ,lbb+lbR+lf0         );
    return result;
};
/*}}}*/
/*_   scroll_listener_scroll_changed_scroll_end_handler {{{*/
let   scroll_listener_scroll_changed_scroll_end_handler     = function()
{
/*{{{*/
let   caller = "scroll_listener_scroll_changed_scroll_end_handler";
let log_this = DOM_SCROLL_LOG;
let tag_this = DOM_SCROLL_TAG || log_this;

/*}}}*/

    scroll_end_timeout = null;

    let                   this_scrollY  =          window.scrollY;
    let done_scrolling = (this_scrollY == scroll_end_last_scrollY);
/*{{{
console.log("... last=["+scroll_end_last_scrollY+"] .. this=["+this_scrollY+"] .. done_scrolling=["+done_scrolling+"]")
}}}*/

    /* SCROLLING NOT DONE .. REARM HANDLER */
    if(!done_scrolling )
    {
        scroll_end_last_scrollY = this_scrollY;
        scroll_end_timeout      = setTimeout(scroll_listener_scroll_changed_scroll_end_handler, SCROLL_DONE_COOLDOWN);
    }
    /* SCROLLING IS  DONE .. RECENTER ON [ELEMENT TO SCROLL INTO VIEW] */
    else {
        let scroll_details = "scrollY="+window.scrollY+" "+(scrollIntoView_EL ? t_util.get_id_or_tag(scrollIntoView_EL) : "");
if( tag_this) log("➔ %c"+caller+" %c "+ scroll_details
                  ,  lbb+lbL+lf0 ,lbb+lbR+lf0         );

        if( scrollIntoView_EL )
            on_scroll_end_scrollIntoViewIfNeeded();
    }
};
/*}}}*/

/* ELEMENT TO SCROLL INTO VIEW */
/*➔ t_scrollIntoViewIfNeeded_set_EL {{{*/
let t_scrollIntoViewIfNeeded_set_EL = function(el)
{
/*{{{*/
let   caller = "t_scrollIntoViewIfNeeded_set_EL";
let log_this = DOM_SCROLL_LOG;
let tag_this = DOM_SCROLL_TAG || log_this;

    if(!t_util) t_scroll_IMPORT(log_this);
/*}}}*/

    if(        scrollIntoView_EL
       &&      scrollIntoView_EL.scrolledIntoView_handled_MS)
        delete scrollIntoView_EL.scrolledIntoView_handled_MS;

    scrollIntoView_EL = el;

if( tag_this) log("%c "+caller+" %c "+t_util.get_id_or_tag(scrollIntoView_EL)
                  ,lbL+lf4      ,lbR+lf4                                       );
if( log_this) log_caller();

    if( scrollIntoView_EL ) on_scrollIntoView_EL();
};
/*}}}*/
/*_   on_scroll_end_scrollIntoViewIfNeeded {{{*/
let   on_scroll_end_scrollIntoViewIfNeeded = function(delay) /* eslint-disable-line no-unused-vars */
{
if( !scrollIntoView_EL ) return;
/*{{{*/
let   caller = "on_scroll_end_scrollIntoViewIfNeeded";
let log_this = DOM_SCROLL_LOG;

if( log_this) log("%c "+caller+" %c "+t_util.get_id_or_tag(scrollIntoView_EL)+     "%c scrollIntoView_EL.scrolledIntoView_handled_MS "+scrollIntoView_EL.scrolledIntoView_handled_MS+"%c delay "+delay
                  ,lbL+lf4      ,lbR+lf4                                      ,lbH+lfX[scrollIntoView_EL.scrolledIntoView_handled_MS ? 5 : 6]                                        ,lbH+lf9         );
/*}}}*/

    /* CLEAR PENDING HANDLER */
    if(scroll_intoview_timer) clearTimeout( scroll_intoview_timer );
    scroll_intoview_timer = null;

    if( scrollIntoView_EL ) on_scrollIntoView_EL();
};
/*}}}*/
/*_   on_scrollIntoView_EL {{{*/
let   on_scrollIntoView_EL = function()
{
/*{{{
log("%c on_scrollIntoView_EL", lbB)
log("%c on_scrollIntoView_EL %c "+t_util.get_id_or_tag(scrollIntoView_EL), lbL+lf6,lbR+lf6);
}}}*/
    if(!scrollIntoView_EL ) return;
    /* (native support) {{{*/
    scrollIntoView_EL.scrollIntoView({ behavior : "smooth"  /* [auto]  , smooth          */
                                     , block    : "nearest" /* [start] , center, nearest */
                                     , inline   : "nearest" /* [start] , center, nearest */
    });
    scrollIntoView_EL = null; /* only once */

/*
    $0.scrollIntoView({behavior:"smooth" , block:"nearest" , inline:"nearest"});

:!start explorer "https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView"
*/
    /*}}}*/
    /* custom support {{{*/
/*
    if( delay == undefined)       delay = SCROLL_INTO_VIEW_DELAY;
    if( delay ) scroll_intoview_timer = setTimeout(scrollIntoViewIfNeeded_handler, delay);
    else                                             scrollIntoViewIfNeeded_handler();
*/
    /*}}}*/
};
/*}}}*/
/*_   scrollIntoViewIfNeeded_handler {{{*/
/*{{{*/
let scrollIntoView_was_needed;

/*}}}*/
let   scrollIntoViewIfNeeded_handler = function() /* eslint-disable-line no-unused-vars */
{
/*{{{*/
let   caller = "scrollIntoViewIfNeeded_handler";
let log_this = DOM_SCROLL_LOG;

    scroll_intoview_timer = null;

    if(!scrollIntoView_EL) return;

    let el = scrollIntoView_EL;
if( log_this) log("%c "+caller+" %c "+t_util.get_id_or_tag(el)+"%c el.scrolledIntoView_handled_MS "+el.scrolledIntoView_handled_MS
                  ,lbL+lf4      ,lbR+lf4                       ,lbH+lfX[el.scrolledIntoView_handled_MS ? 5 : 6]                  );

    t_scrollIntoViewIfNeeded_set_EL( null );
/*}}}*/
    /* [?  scrolledIntoView_handled_MS]  {{{*/
    if( el.scrolledIntoView_handled_MS )
    {
        let      this_MS = new Date().getTime();
        let since_handled = this_MS - el.scrolledIntoView_handled_MS;
        let  just_handled = (since_handled < SCROLL_RECENTER_DELAY*3);

if( log_this) log("%c  just_handled=["+just_handled+"]", lbH+lfX[just_handled ? 8:7]);

        if( just_handled ) return;
    }
    /*}}}*/
    /* SCROLL WHERE {{{*/
    let xy = scrollIntoViewIfNeeded_get_scrollXY( el );
    if(!xy) {

        return;
    }
    /*}}}*/
    /* NOT NEEDED {{{*/
    if((window.scrollX == xy.x) && (window.scrollY == xy.y))
    {
/*{{{
if( log_this) log("%c SCROLL INTO VIEW NOT NEEDED %c "+window.scrollX+" "+window.scrollY, lbb+lbH+lf8, lbb+lbH+lf8);
}}}*/

        scrollIntoView_was_needed = false;
if( log_this) log("%c scrollIntoView_was_needed=["+scrollIntoView_was_needed+"]", lbH+lf8);
    }
    /*}}}*/
    /* IF NEEDED {{{*/
    else {
        scrollIntoView_was_needed = true;
if( log_this) log("%c scrollIntoView_was_needed=["+scrollIntoView_was_needed+"]", lbH+lf8);

if( log_this) log("SCROLL INTO VIEW %c DX=["+window.scrollX+" "+xy.x+"] %c DY=["+window.scrollY+" "+xy.y+"]"
                  ,                 lbL+lf9                            ,lbR+lf9                             );
        scrollIntoViewIfNeeded_then_recenter_handler_scrollTo(xy.x, xy.y);
    }
    /*}}}*/

    /* should'nt we always recenter ? */
    if(scrollIntoView_was_needed)
    {
if( log_this) log("RECENTERING");

        if(scroll_recenter_timer) clearTimeout( scroll_recenter_timer );
        scroll_recenter_timer = setTimeout(scrollIntoViewIfNeeded_then_recenter_handler, SCROLL_RECENTER_DELAY);
    }
};
/*}}}*/
/*_   scrollIntoViewIfNeeded_get_scrollXY {{{*/
let   scrollIntoViewIfNeeded_get_scrollXY = function(el)
{
    return scrollIntoViewIfNeeded_get_scrollXY_with_options({ container:el , with_margin:false });
};
/*}}}*/
/*_   scrollIntoViewIfNeeded_get_scrollXY_with_options {{{*/
let   scrollIntoViewIfNeeded_get_scrollXY_with_options = function({ container })
{
/*{{{*/
let caller = "scrollIntoViewIfNeeded_get_scrollXY_with_options";
let log_this = DOM_SCROLL_LOG;

/*}}}*/
    /* VIEW {{{*/
    w_W = window.innerWidth ;
    w_H = window.innerHeight;
    let view_rect
        = {   left   : window.scrollX       + 16
            , top    : window.scrollY       + 16
            , right  : window.scrollX + w_W - 32
            , bottom : window.scrollY + w_H - 32
        };

    view_rect.height
        = view_rect.bottom
        - view_rect.top
    ;
    /*}}}*/
    /* EL {{{*/
    let xy = t_util.get_el_xy(container, caller);
/*{{{
xy.el = container
log_key_val_group(caller, xy, lf8, false)
console.dir(container)
log_caller()
}}}*/
    if(!xy) return null;

    let e_W = container.clientWidth  || container.offsetWidth;
    let e_H = container.clientHeight || container.offsetHeight;

    let container_rect
        = { left   : xy.x
        ,   top    : xy.y
        ,   right  : xy.x + e_W
        ,   bottom : xy.y + e_H
    };

    container_rect.height
        = container_rect.bottom
        - container_rect.top
    ;
    /*}}}*/
    /* OVER [top left bottom right] {{{*/
    container_rect.seekTop
        =  container_rect.top
    ;
    let over_top       = (container_rect.seekTop < view_rect.top   );
    let over_left      = (container_rect.left    < view_rect.left  );
    let over_bottom    = (container_rect.bottom  > view_rect.bottom);
    let over_right     = (container_rect.right   > view_rect.right );

    let over_something = ((over_top ? "T":"")+(over_left ? "L":"")+(over_right ? "R":"")+(over_bottom ? "B":""));

    let may_go_left    = (container_rect.right  < window.innerWidth); /* i.e. still visible with no left margin */
if(log_this) {
    log_key_val_group("to_the_top .. over_something=["+over_something+"]"
                      , {   container
                          , container_rect
                          , e_H
                          , view_rect
                          , window_scrollY : window.scrollY
                          , over_something : ((over_top ? "T":"_")+(over_left ? "L":"_")+(over_right ? "R":"_")+(over_bottom ? "B":"_"))
                      }, lfX[over_something ? 7:8], false);
}

    /*}}}*/
    /* NOT NEEDED .. (return null) {{{*/
    if(!!!over_something) return null; /* falsy coerced */ /* eslint-disable-line no-extra-boolean-cast */

    /*}}}*/
    /* scrollX scrollY {{{*/
    let scrollX
        = (over_left  ) ? container_rect.left                         - 16
        : (over_right ) ? container_rect.right   - window.innerWidth  + 32
        : may_go_left   ?                          0
        :                                          window.scrollX;

    let scrollY
        = (over_top    ) ? container_rect.seekTop                     - 16
        : (over_bottom ) ? container_rect.bottom - window.innerHeight + 32
        :                                          window.scrollY;

    /*}}}*/
    /* FROM [over_bottom .. to_the_top] {{{*/
    if(container.to_the_top && over_bottom)
    {
        let scroll_more
            = view_rect.height
            - container_rect.height;
/*{{{*/
if(log_this)
        log_key_val_group("to_the_top .. scroll_more=["+scroll_more+"]"
                          , {   container
                              , view_rect
                              , container_rect
                              , window_scrollY      : window.scrollY
                              , over_something      : ((over_top ? "T":"_")+(over_left ? "L":"_")+(over_right ? "R":"_")+(over_bottom ? "B":"_"))
                              , scrollY
                              , scroll_more
                              , scrollY_scroll_more : (scrollY + scroll_more)
                          }, lfX[over_something ? 7:8], false);

/*}}}*/
        scrollY += scroll_more;
    }
    /*}}}*/
    return { x : scrollX , y : scrollY };
};
/*}}}*/
/*_   scrollIntoViewIfNeeded_then_recenter_handler {{{*/
const CONTAINER_TOP_MARGIN = 64;
let   scrollIntoViewIfNeeded_then_recenter_handler = function()
{
/*{{{*/
let   caller = "scrollIntoViewIfNeeded_then_recenter_handler";
let log_this = DOM_SCROLL_LOG;

if( log_this) log("%c "+caller+" %c "+t_util.get_id_or_tag(scrollIntoView_EL), lbL+lf6,lbR+lf6);
/*}}}*/
    if( !scrollIntoView_EL) return;
    let el = scrollIntoView_EL;
    /* CONTAINER CENTER .. WINDOW CENTER{{{*/
    scroll_recenter_timer   = null;

    let recenter_dxy = t_util.get_el_xy(el, caller);
    if(!recenter_dxy ) return;

    let e_W = el.clientWidth  || el.offsetWidth;
    let e_H = el.clientHeight || el.offsetHeight;

    recenter_dxy.x    = recenter_dxy.x  /* container left   */
        +     e_W/2 /* container center */
        -     w_W/2 /*   window  center */
    ;

    recenter_dxy.y    = recenter_dxy.y  /* container top    */
        +     e_H/2 /* container middle */
        -     w_H/2 /*   window  middle */
        -     CONTAINER_TOP_MARGIN
    ;

    /*}}}*/
    /* RECENTER IS NEEDED .. (if not already there) {{{*/
    if((window.scrollX != recenter_dxy.x) || (window.scrollY != recenter_dxy.y))
    {
        scrollIntoView_was_needed = true;

        scrollIntoViewIfNeeded_then_recenter_handler_scrollTo(recenter_dxy.x, recenter_dxy.y);
    }
    /*}}}*/
    /* RECENTER NOT NEEDED {{{*/
    else {
        scrollIntoView_was_needed = false;
if( log_this) log("%c SCROLL RECENTER NOT NEEDED %c "+window.scrollX+" "+window.scrollY, lbb+lbH+lf6, lbb+lbH+lf6);

    }
    /*}}}*/
};
/*}}}*/
/*_   scrollIntoViewIfNeeded_then_recenter_handler_scrollTo {{{*/
let   scrollIntoViewIfNeeded_then_recenter_handler_scrollTo = function(x, y)
{
/*{{{*/
let   caller = "scrollIntoViewIfNeeded_then_recenter_handler_scrollTo";
let log_this = DOM_SCROLL_LOG;

if( log_this) log("%c "+caller+"%c(x=["+x+"] , y=["+y+"])", lbL+lf6,lbR+lf6);
/*}}}*/
    /* SET SMOOTH SCROLL BEHAVIOR */
    scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_set_scrollBehavior();

    /* WINDOW SCROLL */
    window.scrollTo(x, y);

    /* SET LAST SCROLLED TIMESTAMP */
    if( scrollIntoView_EL ) {
        scrollIntoView_EL.scrolledIntoView_handled_MS = new Date().getTime();

if( log_this) log("%c scrollIntoView_EL.scrolledIntoView_handled_MS=["+scrollIntoView_EL.scrolledIntoView_handled_MS+"]", lbH+lf6);
    }

    /* RESTORE USER SCROLL BEHAVIOR */
    if(scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_clr_scrollBehavior_timeout) clearTimeout( scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_clr_scrollBehavior_timeout );
    scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_clr_scrollBehavior_timeout   =   setTimeout( scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_clr_scrollBehavior, MAX_SCROLL_SMOOTH_DURATION);
};
/*}}}*/
/*_   scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_set_scrollBehavior {{{*/
let   scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_set_scrollBehavior = function()
{
    let html  = document.getElementsByTagName("HTML")[0];

    html.classList.add( CSS_SCROLL_SMOOTH );
};
/*}}}*/
/*_   scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_clr_scrollBehavior {{{*/
let   scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_clr_scrollBehavior = function()
{
    /* restore user behavior */
    scrollIntoViewIfNeeded_then_recenter_handler_scrollTo_clr_scrollBehavior_timeout = null;

    let html  = document.getElementsByTagName("HTML")[0];

    html.classList.remove( CSS_SCROLL_SMOOTH );
};
/*}}}*/


/* EXPORT */
return { name : "dom_scroll"
    ,    logging : (state) => DOM_SCROLL_LOG = t_store.t_store_set_state("DOM_SCROLL_LOG",state)
    ,    tagging : (state) => DOM_SCROLL_TAG = t_store.t_store_set_state("DOM_SCROLL_TAG",state)
    ,    t_scroll_listener
    ,    t_scrollIntoViewIfNeeded_set_EL
    ,    t_scroll_is_scrolling
};
}());

/*{{{
"┌─────────────────────────────────────────────────────────────────────────────┐
"│                                                                             │
:e  $BROWSEEXT/SplitterExtension/manifest.json

:e  $BROWSEEXT/SplitterExtension/javascript/background.js
:e  $BROWSEEXT/SplitterExtension/javascript/content.js
:e             $RPROFILES/script/dom_sentence.js
:e             $RPROFILES/script/stub/dom_tools.js
"...           $RPROFILES/script/stub/dom_scroll.js
:e             $RPROFILES/script/stub/dom_util.js
:e             $RPROFILES/script/stub/dom_log.js
:e             $RPROFILES/stylesheet/dom_host.css

:e             $RPROFILES/script/dom_select.js
:e             $RPROFILES/script/dom_util.js
:e             $RPROFILES/script/dom_log.js

:e             $RPROFILES/script/splitter.js
:e             $RPROFILES/script/dom_load.js
"│                                                                             │
"└─────────────────────────────────────────────────────────────────────────────┘
}}}*/
