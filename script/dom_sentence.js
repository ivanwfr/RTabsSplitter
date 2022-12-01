/*┌──────────────────────────────────────────────────────────────────────────┐*/
/*│ dom_scroll_js                                                            │*/
/*└──────────────────────────────────────────────────────────────────────────┘*/
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/
/* globals console, window, document, localStorage, NodeFilter */
/* globals setTimeout, clearTimeout */

/* INLINE */
/* globals dom_util , dom_sentence_util  */
/* globals dom_tools, dom_sentence_event */

/* OPTIONAL */
/* globals dom_log    */
/* globals dom_popup  */
/* globals dom_view   */
/* globals dom_scroll */
/* globals dom_prop   */

/* exported dom_sentence, DOM_SENTENCE_JS_TAG */

/* eslint-disable no-warning-comments */
/* eslint-disable dot-notation        */

const DOM_SENTENCE_JS_ID      = "dom_sentence_js";
const DOM_SENTENCE_JS_TAG     = DOM_SENTENCE_JS_ID  +" (220828:20h:20)";
/*}}}*/
let dom_sentence            = (function() {
"use strict";
let   DOM_SENTENCE_LOG      = false;
let   DOM_SENTENCE_TAG      = false;

/* IMPORT {{{*/
/* eslint-disable no-unused-vars */
/* eslint-disable no-warning-comments */
/*➔ t_sentence_IMPORT {{{*/
/*{{{*/

let t_util     ;
let t_tools    ;

/*......................................*/
/*}}}*/
let t_sentence_IMPORT  = function(_log_this,import_num)
{
    /* MODULE LOGGING TAGGING {{{*/
    DOM_SENTENCE_LOG = DOM_SENTENCE_LOG || localStorage_getItem("DOM_SENTENCE_LOG");
    DOM_SENTENCE_TAG = DOM_SENTENCE_TAG || localStorage_getItem("DOM_SENTENCE_TAG");

    /*}}}*/
    /* t_util {{{*/
    if     (typeof dom_util           != "undefined") t_util  = dom_util         ; /* script/dom_util.js */
    else if(typeof dom_sentence_util  != "undefined") t_util  = dom_sentence_util; /* script/stub/dom_sentence_util.js */
    else console.warn("MISSING STUB FOR: [dom_util]");

    /*}}}*/
    /* t_tools {{{*/
    if     (typeof dom_tools          != "undefined") t_tools = dom_tools         ; /* script/dom_tools.js */
    else if(typeof dom_sentence_event != "undefined") t_tools = dom_sentence_event; /* script/stub/dom_sentence_event.js */
    else console.warn("MISSING STUB FOR: [dom_tools]");

    /*}}}*/
    sentence_INTERN();
if(_log_this) log("➔ "+(import_num ? (import_num+" ") : "")+"t_sentence_IMPORT: "+t_util.name+", "+t_tools.name);
};
/*}}}*/
/*_   sentence_INTERN {{{*/
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

let console_dir         = (k,v) => { console.log("..."+k+":"); console.dir(v); };

/*}}}*/
let   sentence_INTERN   = function()
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
/*_ localStorage {{{*/
let localStorage_setItem = function(key,val) { if(val) localStorage.setItem   (key,val); else localStorage.removeItem(key); };
let localStorage_getItem = function(key    ) { return  localStorage.getItem   (key    ); };
let localStorage_delItem = function(key    ) { /*..........................................*/ localStorage.removeItem(key); };
/*}}}*/
/* eslint-enable  no-unused-vars */
/*}}}*/

/*{{{*/
const LF                = String.fromCharCode(10);
const UNICODE_BULLET    = "&#x2022;";

let sentence_containers = [];
/*}}}*/
/* CSS {{{*/
const CSS_SENTENCE_CONTAINER = "sentence_container";
const CSS_SENTENCE           = "sentence";
const CSS_CLAUSE             = "clause";
const CSS_LAST_CLAUSE        = "last_clause";
const CSS_OUTLINED           = "outlined";
const CSS_DARK               = "dark";

/* [fs1..fs12] ../stylesheet/dom_host.css {{{*/

const E12_FONT_SIZE_LIST = ["fs1", "fs2", "fs3", "fs4", "fs5", "fs6", "fs7", "fs8", "fs9", "fs10", "fs11", "fs12"];

let   e12_font_size      =  "fs8";
/*}}}*/
/* EVEN ODD {{{
const CSS_EVEN               =     "even";
const CSS_ODD                =                "odd";
const CSS_EVEN_ODD_ARRAY     = [CSS_EVEN , CSS_ODD];
}}}*/
/*}}}*/

/* ┌────────────────────────────────────────────────────────────────────────┐ */
/* │ GET CONTAINER                                                          │ */
/* └────────────────────────────────────────────────────────────────────────┘ */

/*➔ t_SENTENCE_GET_EL_CONTAINER {{{*/
let t_SENTENCE_GET_EL_CONTAINER = function(el,_log_this)
{
/*{{{*/
/*┌──────────────────────────────────────────────────────────────────────────┐*/
/*│ NOTE:                                                                    │*/
/*│ - As [el] cannot be a TEXT_NODE                                          │*/
/*│ - it defaults to  EVENT target parent container                          │*/
/*│ - that can have a huge textcontent                                       │*/
/*└──────────────────────────────────────────────────────────────────────────┘*/

let   caller = "t_SENTENCE_GET_EL_CONTAINER";
let log_this = _log_this || LOG_MAP.S2_SELECT;

    if(!t_util) console.warn("MISSING STUB FOR: [dom_util]");
    let container;

/*}}}*/
    /* [HTML TAG] {{{*/
    if(!container)
    {
        container =  null

        /* PREVIOUSLY SELECTED */
        /*  || t_util.get_el_parent_with_class(el, "container_light")  */ /* ▼ ordered by priority... */
        /*  || t_util.get_el_parent_with_class(el, "container_dark" )

        /* LIST */
        /*  || t_util.get_el_parent_with_tag  (el,  "LI"            ) */
            || t_util.get_el_parent_with_tag  (el, "UL"             )
            || t_util.get_el_parent_with_tag  (el, "OL"             )

        /* TEXT */
            || t_util.get_el_parent_with_tag  (el, "PRE"            )
            || t_util.get_el_parent_with_tag  (el, "P"              )

        /* TABLE */
        /*  || t_util.get_el_parent_with_tag  (el,  "TH"            ) */ /* single cell             */
            || t_util.get_el_parent_with_tag  (el,  "TD"            )    /* single cell             */
        /*  || t_util.get_el_parent_with_tag  (el,  "THEAD"         ) */ /*        cell collection  */
        /*  || t_util.get_el_parent_with_tag  (el,  "TFOOT"         ) */ /*        cell collection  */
        /*  || t_util.get_el_parent_with_tag  (el,  "COLGROUP"      ) */ /*        cell collection  */
        /*  || t_util.get_el_parent_with_tag  (el,  "CAPTION"       ) */ /*        cell collection  */
        /*  || t_util.get_el_parent_with_tag  (el,  "TBODY"         ) */ /*        cell collection  */
            || t_util.get_el_parent_with_tag  (el, "TABLE"          )    /*        cell collection  */

        /* GLOSSARY */
        /*  || t_util.get_el_parent_with_tag  (el,  "DT"         ) */ /* single cell Term        */
        /*  || t_util.get_el_parent_with_tag  (el,  "DD"         ) */ /* single cell Description */
        /*  || t_util.get_el_parent_with_tag  (el, "DL"          ) */ /*        cell collection  .. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl */

        /* COMPOSITION */
            || t_util.get_el_parent_with_tag  (el, "BLOCKQUOTE"      )
            || t_util.get_el_parent_with_tag  (el, "DIR"             )
            || t_util.get_el_parent_with_tag  (el, "DIV"             )

        /* DETAILS */
        /*  || t_util.get_el_parent_with_tag  (el,  "SUMMARY"       ) */
            || t_util.get_el_parent_with_tag  (el, "DETAILS"        )
        ;

    }
    /*}}}*/
    /* CSS_OUTLINED {{{*/
    if(!container)
    {
        container
        =  t_util.get_el_parent_with_class(el,  CSS_OUTLINED    );

if(log_this && container) log(caller+": ...CSS_OUTLINED container=["+t_util.get_n_lbl(container)+"]");
    }
    /*}}}*/
    /* [CLICKED TITLE] ➔ [TITLE + DL] {{{*/
/* eslint-disable no-unused-vars */
    let cells;
    if(container)
    {
        let c_next = container              .nextElementSibling;

        let p_next = container.parentElement
            ?        container.parentElement.nextElementSibling
            :        null
        ;

        let group
            = (!container)                          ? null
/*          : ( c_next && (c_next.tagName == "DL")) ? [ container               , c_next ] */
/*          : ( p_next && (p_next.tagName == "DL")) ? [ container.parentElement , p_next ] */
            :                                         null
        ;

        /* [CLICKED DT] ➔ [CONTAINING DL] */
        let dlist
            = (!container)                          ? null
            : ( container.nodeName == "DL"      )   ? container
            : ( container.nodeName == "DT"      )   ? container.parentElement
            :                                         null
        ;

        let table
            = (!container)                          ? null
            : ( container.nodeName ==  "THEAD"  )   ? container.parentElement
            : ( container.nodeName ==  "TFOOT"  )   ? container.parentElement
            : ( container.nodeName ==  "TBODY"  )   ? container.parentElement
            : ( container.nodeName ==  "CAPTION")   ? container.parentElement
            : ( container.nodeName == "TABLE"   )   ? container
            :                                         null
        ;

        cells
            =   group ?                        group
/*          :   dlist ? dlist.querySelectorAll("DIV,DT,DD,TEMPLATE") */
/*          :   table ? table.querySelectorAll(     "TH,TD,CAPTION") */
            :                                        null
        ;

/*{{{*/
if(log_this && (log_key_val_group != console.log))
    log_key_val_group(caller
                      , {   el
                          ,                   el_tagName : el.tagName
                          , container
                          , container_textContent_length : container.textContent.length
                          , table
                          , dlist
                          , group
                          , cells
                      }, lbH+lf4, false);

if(log_this) log(caller+": ...return container=["+t_util.get_n_lbl(container)+"] .. cells=["+(cells ? "x"+cells.length : "")+"]");

/*}}}*/
    }
/* eslint-enable  no-unused-vars */
/*}}}*/
    /* RETURN { container, cells } {{{*/
    if(container)
    {
        return { container, cells };
    }
    else {
if(log_this) log(caller+": ...return NO container");
        return "";
    }
    /*}}}*/
};
/*}}}*/
/*➔ t_SENTENCE_GET_EL_SENTENCE_CONTAINER {{{*/
let t_SENTENCE_GET_EL_SENTENCE_CONTAINER = function(el)
{
    if( show_popup_container_shown )
    {
        /*.................................*/ let dom_popup_div = dom_popup.log_popup_div_get();
        if(t_util.is_el_or_child_of_parent_el(el, dom_popup_div))
        {
            return show_popup_container_shown;
        }
    }
    return t_util.get_el_parent_with_class(el, CSS_SENTENCE_CONTAINER);
};
/*}}}*/
/*➔ t_SENTENCE_GET_SENTENCE_CONTAINERS {{{*/
let t_SENTENCE_GET_SENTENCE_CONTAINERS = function()
{
    return sentence_containers;
};
/*}}}*/
/*➔ t_SENTENCE_GET_SENTENCE_CONTAINERS_IN_VIEWPORT {{{*/
let t_SENTENCE_GET_SENTENCE_CONTAINERS_IN_VIEWPORT = function()
{
    if(typeof dom_view == "undefined") return [];

    let el_array = [];
    for(let i=0; i < sentence_containers.length; ++i)
    {
        if(dom_view.t_view1_is_el_topLeft_or_bottomRight_in_viewport(sentence_containers[i]))
            el_array.push( sentence_containers[i] );
    }

    return el_array;
};
/*}}}*/

/* ┌────────────────────────────────────────────────────────────────────────┐ */
/* │ SPLIT                                                                  │ */
/* └────────────────────────────────────────────────────────────────────────┘ */
/* REGEX {{{*/
/* RegEx Testing {{{
:!start explorer "https://www.compart.com/en/unicode/category"
:!start explorer "https://regexr.com/32oeg"
:!start explorer "https://www.regextester.com/94757"

}}}*/

const                 WORD = "\\s*(?:\\p{L}|_|\\(|-|\\))"    ; /* non-capturing-group */
const             BOUNDARY =     "[\\.,;:?\\n\\r]+(?!\\w)"   ; /* non-capturing-group .. punct .. no adjacent letter */
const            LAST_WORD = WORD    +"{1,}";
const           FIRST_WORD = WORD    +"+";

const CAPTURING_PREV_END   = "("     + LAST_WORD  +")?"      ; /* p1 capturing group */
const CAPTURING_BOUNDARY   = "("     + BOUNDARY   +")"       ; /* p2 capturing group */
const CAPTURING_NEXT_START = "(\\n+|"+ FIRST_WORD +")?"      ; /* p3 capturing group */

/*}}}*/
/*XXX*/
/*➔ t_SENTENCE_SPLIT {{{*/
/*{{{*/
const SYMBOL_GEAR          = "\u2699";
const SYMBOL_THEME         = "\u262F"; /* ☯ */
const SYMBOL_SCROLL        = "\u2933";
/*{{{
const SYMBOL_MAGNIFY_LEFT  = "\uD83D\uDD0D";
const SYMBOL_MAGNIFY_RIGHT = "\uD83D\uDD0E";
}}}*/
const MAGNIFIED_STYLE      = "font-size  : 200% !important;";
const LINE_HEIGHT_STYLE    = "line-height: 1em  !important;";

const THEME_STYLE_BG_DARK  = "rgba( 32, 32, 32,0.8)";
const THEME_STYLE_FG_DARK  = "rgba(255,255,255,0.8)";
const THEME_STYLE_BG_LIGHT = "rgba(255,255,255,0.8)";
const THEME_STYLE_DARK     = "color: #DDD !important; background-color: "+ THEME_STYLE_BG_DARK  +" !important; border-radius:1em;";
const THEME_STYLE_LIGHT    = "color: #222 !important; background-color: "+ THEME_STYLE_BG_LIGHT +" !important; border-radius:1em;";

let     theme_dark = false;
let     magnified  = false;
let     xpath_show = false;
let  scroll_smooth =  true;
let  last_container;
let regexp_SENTENCE;
/*}}}*/
let t_SENTENCE_SPLIT = function(container,e=null)
{
/*{{{*/
let   caller = "t_SENTENCE_SPLIT";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;

let tag_this = DOM_SENTENCE_TAG || log_this;

if( tag_this) log("%c"+caller+"("+t_util.get_n_lbl(container)+")", lbH+lf1);
if( log_this) console_dir("container",container        );
if( log_this && e) log("%c type=["+e.type+"] e.target.id=["+e.target.id+"]", lbH+lf3);
/*}}}*/
    /* tools have precedence {{{*/
    if( check_tool_event(e) ) return;

    /*}}}*/
    /* SYNC SENTENCE COLORS {{{*/
    if((typeof dom_prop) != "undefined") theme_dark = dom_prop.get        ("theme_dark");
    else                                 theme_dark = localStorage_getItem("theme_dark");

    /*}}}*/
    /* SYNC SCROLL_SMOOTH {{{*/
/*
    if((typeof dom_prop) != "undefined") scroll_smooth = dom_prop.get        ("scroll_smooth");
    else                                 scroll_smooth = localStorage_getItem("scroll_smooth");
*/
    document.getElementsByTagName("HTML")[0].style.scrollBehavior
        = scroll_smooth
        ? "smooth"
        : "auto"
    ;
    /*}}}*/
    /* ADD TO SENTENCE CONTAINER COLLECTION {{{*/
    if(!sentence_containers.includes( container ))
        sentence_containers.push    ( container );

    /*}}}*/
    /* UNFOLD DETAILS CONTAINERS {{{*/
    if(container.nodeName == "DETAILS") container.open = true;

    /*}}}*/
    /* [regexp_SENTENCE] .. [Firefox fail safe] {{{*/
    if(!regexp_SENTENCE ) {
        try {
            regexp_SENTENCE = new RegExp(CAPTURING_PREV_END +  CAPTURING_BOUNDARY +  CAPTURING_NEXT_START,"gu");
        } catch(ex) {
            log(ex);
        }
        if(!regexp_SENTENCE)
            regexp_SENTENCE = new RegExp(             "(\\w*)"+CAPTURING_BOUNDARY+"(\\w*)"               ,"gu");
    }
    /*}}}*/
    /* RESTORE [contained containers] {{{*/
    let   el;
    while(el = t_util.get_el_child_with_class(container, dom_sentence.CSS_SENTENCE_CONTAINER))
        t_SENTENCE_RESTORE_EL(el, e);

    t_SENTENCE_RESTORE_EL(container, e);

    /*}}}*/
    /* REPLACE [container children] {{{*/
    sentence_color_next = 1;
/*{{{*/
if( log_this) {
    log("...LAST_WORD            %c"+LAST_WORD           , lbC+lf2);
    log("...BOUNDARY             %c"+BOUNDARY            , lbC+lf3);
    log("...FIRST_WORD           %c"+FIRST_WORD          , lbC+lf2);
    log("...CAPTURING_PREV_END   %c"+CAPTURING_PREV_END  , lbC+lf5);
    log("...CAPTURING_BOUNDARY   %c"+CAPTURING_BOUNDARY  , lbC+lf6);
    log("...CAPTURING_NEXT_START %c"+CAPTURING_NEXT_START, lbC+lf7);
}
if( tag_this) {
    log("regexp_SENTENCE %c prev_end %c boundary %c next_start %c"+LF+regexp_SENTENCE
        ,                lbL+lf5    ,lbC+lf6    ,lbR+lf7      ,"border:1px solid magenta;");
}
/*}}}*/

    let text = t_util.t_get_htmlEntities( container.textContent.trim() );
/*{{{
log("text:%c"+LF+text, lf1)
}}}*/

    text = strip_HTML( container.innerHTML );
/*{{{
log("innerHTML:%c"+LF+text, lf3)
}}}*/
    t_util.t_copy_to_CLIPBOARD( text );

    text = text.replace(regexp_SENTENCE, t_SENTENCE_SPLIT_replace) ;
/*{{{
log("replace:%c"+LF+text, lf3)
}}}*/

    /*}}}*/
    /* SAVE [innerHTML_SAVED] {{{*/
    container.innerHTML_SAVED
        = container.innerHTML;

    /*}}}*/
    /* REPLACE [innerHTML] .. [BUTTONS] .. [CSS_SENTENCE_CONTAINER CLASS] {{{*/
    t_util.add_el_class(container, CSS_SENTENCE_CONTAINER);
    if( theme_dark ) {
        t_util.add_el_class(    container, CSS_DARK);
        t_util.add_el_class(document.body, CSS_DARK);
    }

    container.style.touchAction = "none";

    let button_style
        =                " float: right;"
        +            " clear: right;"
        +           " border: none;"
        +           " margin: 0;"
        +          " padding: 0;"
        + " background-color: transparent;"
        +            " color: #A00;"
        +        " font-size: 24px;"
        +      " font-weight: 900;"
        +      " line-height: 1em;"
    ;
    let span_style
        = "pointer-events: none"
    ;

/*{{{
    let   magnified_symbol
        = magnified
        ? SYMBOL_MAGNIFY_LEFT
        : SYMBOL_MAGNIFY_RIGHT
    ;
}}}*/

    let tools = ""
        +    "<button id='dom_sentence_theme_dark' title='THEME DARK'    style='"+button_style+"'><span style='"+span_style+"'>"+ SYMBOL_THEME     +"</span></button>"
        +    "<button id='dom_scroll_smooth'       title='SCROLL SMOOTH' style='"+button_style+"'><span style='"+span_style+"'>"+ SYMBOL_SCROLL    +"</span></button>"
/*{{{
        +    "<button id='dom_sentence_magnify'    title='MAGNIFY'       style='"+button_style+"'><span style='"+span_style+"'>"+ magnified_symbol +"</span></button>"
}}}*/
        + ((typeof dom_popup != "undefined")
           ? "<button id='dom_sentence_xpath_show' title='XPATH SHOW'    style='"+button_style+"'><span style='"+span_style+"'>"+ SYMBOL_GEAR      +"</span></button>" : "")
    ;

    let   theme_style
        = theme_dark
        ? THEME_STYLE_DARK
        : THEME_STYLE_LIGHT
    ;

    let   magnified_style
        = magnified
        ? MAGNIFIED_STYLE
        : ""
    ;

    container.innerHTML = tools
        + "<pre class='"+CSS_SENTENCE+" bg1' style=' "+LINE_HEIGHT_STYLE+" "+theme_style+" "+magnified_style+"'>"
        +  text
        + "</pre>";

    if( theme_dark )
        t_SENTENCE_SPLIT_set_parent_theme_dark( container );
    else
        t_SENTENCE_SPLIT_clr_parent_theme_dark( container );

    /*}}}*/
    /* ADD [CSS_LAST_CLAUSE] TO EVERY SENTENCE LAST PART {{{*/
    let selector
        = "."+ CSS_CLAUSE   +"+."+ CSS_SENTENCE /* a sentence that follows a clause */
        + ","
        + "."+ CSS_SENTENCE +"+."+ CSS_SENTENCE /* a sentence that follows a sentence */
    ;
/*{{{
document.querySelectorAll(".clause+.sentence");
document.querySelectorAll(".sentence+.sentence");
document.querySelectorAll(".clause+.sentence,.sentence+.sentence");
last_clause.style.outline= "2px dotted navy";
}}}*/
    let sentence_array = container.querySelectorAll( selector );
if( tag_this) console_dir("sentence_array .. selector=["+selector+"]",sentence_array);

    for(let i=0; i < sentence_array.length; ++i)
    {
        let last_clause =   sentence_array[i].previousElementSibling;
        t_util.add_el_class(last_clause, CSS_LAST_CLAUSE);

if( log_this) console.log(last_clause);
    }

    /* Adding last sentence that is not part of those captured by selector .. (as it has no nextSibling) */
    t_util.add_el_class(container.lastElementChild.lastElementChild, CSS_LAST_CLAUSE);

    t_SENTENCE_FONTSIZE_APPLY( container );
    /*}}}*/
    /* OPTIONNAL [POPUP] CONTAINER .. [AND ITS XPATH] {{{*/
    let innerHTML
        = container.outerHTML;

    if( xpath_show )
        innerHTML
            += "<hr>"
            + "<pre class='xpath'>"
            +  t_util.get_parent_tag_id_class_chain( container )
            + "</pre>";

if( tag_this) log("container.innerHTML.length: %c"+container.innerHTML.length, lb7);
if( log_this) log("container.innerHTML:%c"+LF+container.innerHTML, lb7);

    /*}}}*/
/*{{{*/
if( log_this) log_key_val_group(            caller
                               , {              el
                                 , regexp_SENTENCE : String(regexp_SENTENCE)
                                 ,  sentence_array
                                 ,  last_container
                                 ,            text : "(length: "+        text.length+") "       + t_util.ellipsis(text               )
                                 ,       container : "(length: "+container.innerHTML.length+") "+ t_util.ellipsis(container.innerHTML)
                                 ,      theme_dark
                                 ,   scroll_smooth
                                 ,       magnified
                                 ,      xpath_show
                                 ,         callers : dom_log.get_callers && dom_log.get_callers()
                               }, lf4, true);
/*}}}*/
    /* [show_popup] {{{*/
    show_popup(container, innerHTML);

    /*}}}*/
    /* APPLY CURRENT FONT SIZE TO POPUP SENTENCE SPLIT CONTAINER {{{*/
    clear_popup();

    /*}}}*/
    last_container = container;
    t_tools.t_scrollIntoViewIfNeeded( container );
};
/*}}}*/
/*_ strip_HTML {{{*/
/*{{{*/
const regexp_BRLI               = new RegExp("(<br>\\n*)+<\/li>"       , "gi"); /* BR          */
const regexp_BR                 = new RegExp("<br>"                    , "gi"); /* BR          */
const regexp_LI                 = new RegExp("\\s*([\\.,;]\\s*)*<\/li>", "gi"); /* </LI>NL<LI> */
const regexp_MULTI              = new RegExp("(\\s*:\\n*\\s*)+"        , "gms"); /* BR          */

const regexp_HTML               = new RegExp("<[^>]*>"                 , "g" ); /* TAG         */
const regexp_PUNC               = new RegExp("\\s*([\\.,;]\\s*)"       , "g" ); /* SPACE PUNCT */
const regexp_BLANK              = new RegExp("\\s+|(&nbsp;)+"          , "g" ); /* SPACE       */

/*}}}*/
let strip_HTML = function(text)
{
    if(   !text) return "";

    /* BR LI */
    text = text
        .   replace(regexp_BRLI  , "</li>")
        .   replace(regexp_LI    , "."+LF+UNICODE_BULLET)
        .   replace(regexp_BR    , ":"    )
        .   replace(regexp_MULTI , ":"+LF )
    ;

    text = text
        .   replace(regexp_HTML  , " "    )
        .   replace(regexp_PUNC  , "$1"   )
        .   replace(regexp_BLANK , " "    )
    ;

    return text.trim();
};
/*}}}*/
/*_ t_SENTENCE_SPLIT_set_parent_theme_dark {{{*/
let t_SENTENCE_SPLIT_set_parent_theme_dark = function (container) /* eslint-disable-line no-unused-vars */
{
/*{{{
    let el_array = Array.from(document.getElementsByTagName("DIV"));
}}}*/
    let el_array = get_parent_chain(container);
/*{{{
console.log("t_SENTENCE_SPLIT_set_parent_theme_dark:",el_array)
}}}*/
    el_array.forEach((el) => {
        el.style.background_saved         = el.style.background;
        el.style.background               = THEME_STYLE_BG_DARK;

        el.style.color_saved              = el.style.color;
        el.style.color                    = THEME_STYLE_FG_DARK;
    });
};
/*}}}*/
/*_ t_SENTENCE_SPLIT_clr_parent_theme_dark {{{*/
let t_SENTENCE_SPLIT_clr_parent_theme_dark = function (container) /* eslint-disable-line no-unused-vars */
{
/*{{{
    let el_array = Array.from(document.getElementsByTagName("DIV"));
}}}*/
    let el_array = get_parent_chain(container);
/*{{{
console.log("t_SENTENCE_SPLIT_clr_parent_theme_dark:",el_array)
dom_log.log_caller();
}}}*/
    el_array.forEach((el) => {
        el.style.background               = el.style.background_saved || "";
        delete                              el.style.background_saved;

        el.style.color                    = el.style.color_saved      || "";
        delete                              el.style.color_saved;
    });
};
/*}}}*/
/*_ t_SENTENCE_SPLIT_replace {{{*/
/*{{{*/
let sentence_color_next = 1;

/*}}}*/
let t_SENTENCE_SPLIT_replace = function(match, prev_end="", boundary="", next_start="")
{
/*{{{*/
let   caller = "t_SENTENCE_SPLIT_replace";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;
let tag_this = DOM_SENTENCE_TAG || log_this;

if(next_start == LF) next_start = "";

if( tag_this) log(caller+" %c"+prev_end+"%c"+t_util.show_CR_LF(boundary)+"%c"+next_start
                  ,        lbL+lf5      ,lbC+lf6                         ,lbR+lf7       );
/*{{{
if( log_this) log("match=[%c"+t_util.show_CR_LF(match)+"]", lbC);
if( log_this) console.table(arguments);

:silent :!start explorer "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace\#Specifying_a_function_as_a_parameter"
}}}*/
/*}}}*/

    let entering_a_clause
        =  boundary.includes(",")
        || boundary.includes(";")
    /*  || boundary.includes( LF)*/ /* ...caused missing sentence boundary detection */
    /*  || boundary.includes(":")*/
    ;

    if(!entering_a_clause)
        sentence_color_next += 1;

    let className
        = (entering_a_clause ? CSS_CLAUSE : CSS_SENTENCE)
        + " bg"+(sentence_color_next % 10)
    ;

    return prev_end + boundary +"</span><span style='"+LINE_HEIGHT_STYLE+"' class='"+className+"'>"+ next_start;
};
/*}}}*/

/* ┌────────────────────────────────────────────────────────────────────────┐ */
/* │ TODO: inject-or-mark significant text containers                       │ */
/* │                                                                        │ */
/* │ createTreeWalker                                                       │ */
/* │                                                                        │ */
/* │ $APROJECTS/Chrome_Web_Store/SplitterExtension/stylesheet/dom_host.css  │ */
/* │ $WPROJECTS/RTabs/Util/RTabs_Profiles/DEV/script/dom_select.js          │ */
/* │ $WPROJECTS/RTabs/Util/RTabs_Profiles/DEV/script/dom_util.js            │ */
/* │                                                                        │ */
/* └────────────────────────────────────────────────────────────────────────┘ */
/*➔ outline_text_containers_in_view {{{*/
let outline_text_containers_in_view = function(root=document.body)
{
/*{{{*/
let   caller = "outline_text_containers_in_view";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;
let tag_this = DOM_SENTENCE_TAG || log_this;

if( tag_this) log("%c"+caller, lbH+lf7);
/*}}}*/
    t_SENTENCE_restore_text_containers_outlined();
    let { text_container_in_view_array } = get_el_text_container_in_view_array( root );
if(tag_this) console_dir("text_container_in_view_array", text_container_in_view_array);

if(log_this) log("...outlining "+text_container_in_view_array.length+" containers");
    text_container_in_view_array.forEach(
                                         (el) => {
                                             t_util.add_el_class(el, CSS_OUTLINED);
                                             el.addEventListener("transitionend", outlined_transitionend_handler);
                                         }
                                        );

};
/*}}}*/
/*_ outlined_transitionend_handler {{{*/
let outlined_transitionend_handler = function(e)
{
/*{{{*/
let   caller = "outlined_transitionend_handler";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;

/*}}}*/
if(log_this) console_dir(caller+": propertyName=["+e.propertyName+"] .. elapsedTime=["+e.elapsedTime+"]", e);
};
/*}}}*/
/*➔ t_SENTENCE_restore_text_containers_outlined {{{*/
let t_SENTENCE_restore_text_containers_outlined = function()
{
/*{{{*/
let   caller = "t_SENTENCE_restore_text_containers_outlined";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;
let tag_this = DOM_SENTENCE_TAG || log_this;

if( tag_this) log("%c"+caller, lbH+lf8);
/*}}}*/
    node_in_view_filter_clear();
    /* [CSS_OUTLINED] {{{*/
    let outlined_containers = document.querySelectorAll("."+CSS_OUTLINED);
    if( outlined_containers.length)
    {
if(log_this) log("...restoring "+outlined_containers.length+" outlined containers");
        for(let i=0; i < outlined_containers.length; ++i)
        {
            let node = outlined_containers[i] ;

            node.classList.remove( CSS_OUTLINED );

            if(typeof node.title_saved != "undefined") { node.title = node.title_saved; delete       node.title_saved; }
        }
    }
    else {
if(log_this) log("...found no outlined containers to restore");
    }
    /*}}}*/
};
/*}}}*/
/*_ get_el_text_container_in_view_array {{{*/
let get_el_text_container_in_view_array = function(root=document.body)
{
/*{{{*/
let   caller = "get_el_text_container_in_view_array("+t_util.get_n_lbl(root)+")";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;

if( log_this) console.time   (caller);
    let time_start = new Date().getTime();
/*}}}*/
    let text_container_in_view_array = [];
    let node;
    if(node_in_view_filter(root) == NodeFilter.FILTER_ACCEPT)
    {
if( log_this) log("root is a LEAF");
        text_container_in_view_array.push(root);
    }
    else {
        let treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, node_in_view_filter);
        let last_accepted_parent;
        while(node = treeWalker.nextNode())
        {
            if(!last_accepted_parent || !last_accepted_parent.contains(node))
            {
                last_accepted_parent = node;
                text_container_in_view_array.push(node);
            }
        }
    }
    let time_end = new Date().getTime();
if( log_this) console.timeEnd(caller);
if( log_this) console_dir("text_container_in_view_array", text_container_in_view_array);
    return { text_container_in_view_array , search_ms:(time_end - time_start) };
};
/*}}}*/
/*_ node_in_view_filter_clear {{{*/
/*{{{*/
const CCS_REJECTED = "rejected";

/*}}}*/
let node_in_view_filter_clear = function()
{
/*{{{*/
let   caller = "node_in_view_filter_clear";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;

/*}}}*/
    let node_array = document.querySelectorAll("."+CCS_REJECTED);
    if(!node_array.length) return;

if(log_this) log(caller+": restoring "+node_array.length+" rejected containers");
    for(let i=0; i < node_array.length; ++i)
    {
        let node = node_array[i];

        node.classList.remove( CCS_REJECTED);

        if(typeof node.title_saved != "undefined") { node.title = node.title_saved; delete       node.title_saved; }
    }
};
/*}}}*/
/*_ node_in_view_filter {{{*/
/*{{{*/
const FILTER_TAGS
    = [   "PRE"
        , "P"
        , "TD"
        , "TABLE"
        , "BLOCKQUOTE"
        , "DIR"
        , "DIV"
        , "DETAILS"
    ];

const NodeFilter_RETURN_VALUES
    = {   [NodeFilter.FILTER_ACCEPT] : "FILTER_ACCEPT"
        , [NodeFilter.FILTER_REJECT] : "FILTER_REJECT"
        , [NodeFilter.FILTER_SKIP  ] : "FILTER_SKIP"
    };

const TEXT_LEN_MAX = 1024;

/*}}}*/
let node_in_view_filter = function(node)
{
/*{{{*/
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;
let tag_this = DOM_SENTENCE_TAG || log_this;

/*}}}*/
    /* REJECT TOOL {{{*/
    let why = NodeFilter.FILTER_ACCEPT;
    let why_not;

    /*}}}*/
    /* REJECT INVISIBLE {{{*/
    if     ( node.style.display == "none"        ) { why = NodeFilter.FILTER_REJECT; why_not =     "DISPLAY_NONE"; }
    else if( node.tagName       == "SCRIPT"      ) { why = NodeFilter.FILTER_REJECT; why_not =      node.tagName ; }
    else if( node.tagName       == "STYLE"       ) { why = NodeFilter.FILTER_REJECT; why_not =      node.tagName ; }

    /*}}}*/
    /* REJECT FRAMING CONTAINER {{{*/
    else if( node.tagName       == "TR"          ) { why = NodeFilter.FILTER_SKIP  ; why_not =      node.tagName ; }

    /*}}}*/
    /* ACCEPT FIXED CONTAINER {{{*/
    else if( node.style.position == "fixed"      ) { why = NodeFilter.FILTER_ACCEPT; }

    /*}}}*/
    /* SKIP BIG CONTAINER .. EXPLORE SUB-TREE {{{*/
    else if( node.children.length  > 0           ) {
        if(node.textContent.length > TEXT_LEN_MAX) { why = NodeFilter.FILTER_SKIP  ; why_not = "BIG_WITH_CHILDREN"; }
    }
    /*}}}*/
    /* ACCEPT SMALL FILTER_TAGS .. (P PRE TD TABLE ...) {{{*/
/*  else if( node.tagName       == "TABLE"       ) { why = NodeFilter.FILTER_ACCEPT;                               } */
    else if( FILTER_TAGS.includes(node.tagName)  ) { why = NodeFilter.FILTER_ACCEPT;                               }

    /*}}}*/
    /* REJECT LEAF WITH BOUNDING BOX OUT OF VIEW {{{*/
    if(why != NodeFilter.FILTER_REJECT)
    {
        /* REJECT NO DIMENSION LEAF */
        let bcr = node.getBoundingClientRect();
        if(node.children.length == 0)
        {
            if     (bcr.height < 1               ) { why = NodeFilter.FILTER_REJECT; why_not =        "NO HEIGHT"; }
            else if(bcr.width  < 1               ) { why = NodeFilter.FILTER_REJECT; why_not =         "NO WIDTH"; }
            else if(bcr.top > window.innerHeight ) { why = NodeFilter.FILTER_REJECT; why_not =           "BELLOW"; }
            else if(bcr.bottom < 0               ) { why = NodeFilter.FILTER_REJECT; why_not =            "ABOVE"; }
        }
        /* REJECT CONTAINER BELOW VIEW */
        else if(    bcr.top > window.innerHeight ) { why = NodeFilter.FILTER_REJECT; why_not = "CONTAINER BELLOW"; }

        /* REJECT CONTAINER ABOVE VIEW */
        else if(    bcr.bottom < 0               ) { why = NodeFilter.FILTER_REJECT; why_not =  "CONTAINER ABOVE"; }

        /* NOTE: ACCEPT CONTAINER ABOVE VIEW .. (as it may have spreading absolute children) */
    }
    /*}}}*/
/*{{{*/
if(log_this && why_not) log("node_in_view_filter("+t_util.get_n_lbl(node)+"): .. "+why_not);
if(log_this && why    ) log("node_in_view_filter("+t_util.get_n_lbl(node)+"): .. "+why    );
if(tag_this) {
    if(      why_not ) {
        t_util.add_el_class(node, CCS_REJECTED);
        node.title_saved = node.title || "";
        node.title       = node.tagName+" "+why_not;
    }
    else if( why ) {
        node.title_saved = node.title || "";
        node.title       = node.tagName+" "+NodeFilter_RETURN_VALUES[why];
    }
}
/*}}}*/
    return why;
};
/*}}}*/

/* ┌────────────────────────────────────────────────────────────────────────┐ */
/* │ FONTSIZE                                                               │ */
/* └────────────────────────────────────────────────────────────────────────┘ */
/*➔ t_SENTENCE_drag_DXY {{{*/
/*{{{*/
const SENTENCE_DRAG_MOVED_ENOUGH =  64;
const SENTENCE_DRAG_COOLDOWN_MS  = 500;
let   sentence_drag_last_MS      =   0;

let was_on_cooldown;
let was_is_scrolling;
/*}}}*/
let t_SENTENCE_drag_DXY = function(dxy)
{
/*{{{*/
let   caller = "t_SENTENCE_drag_DXY";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.EV0_LISTEN;

let tag_this = DOM_SENTENCE_TAG || log_this;
/*}}}*/
    /* SENTENCE_DRAG_COOLDOWN_MS {{{*/
    let  this_MS = new Date().getTime();

    let time_ellapsed = (this_MS - sentence_drag_last_MS);
    let on_cooldown   = (time_ellapsed <  SENTENCE_DRAG_COOLDOWN_MS);
    let is_scrolling  = (typeof dom_scroll != "undefined") ? dom_scroll.t_scroll_is_scrolling()
        :               (typeof dom_tools  != "undefined") ? dom_tools .t_scroll_is_scrolling()
        :                                                    false;

if( tag_this && (was_on_cooldown  != on_cooldown )) log("%c  COOLDOWN", lbH+lfX[on_cooldown  ? 6:0]);
if( tag_this && (was_is_scrolling != is_scrolling)) log("%c SCROLLING", lbH+lfX[is_scrolling ? 7:0]);
    was_on_cooldown  = on_cooldown ;
    was_is_scrolling = is_scrolling;

    if( on_cooldown || is_scrolling) {
        t_tools.t_add_MOVE_ON_COOLDOWN(SENTENCE_DRAG_COOLDOWN_MS - time_ellapsed);
        sentence_drag_last_MS = this_MS;
        return  true;
    }
    /*}}}*/
    /* ONLY FROM A SENTENCE CONTAINER {{{*/
    let from_container = document.querySelector("."+CSS_SENTENCE_CONTAINER);
/*{{{
console.log("from_container=["+from_container+"]")
}}}*/
    if(!from_container)
        return false;

    /*}}}*/
    /* DXY .. f(SENTENCE_DRAG_MOVED_ENOUGH) {{{*/
    let move_H_or_V  =  Math.abs(dxy.x     ) > Math.abs(dxy.y);
    let move_delta   = move_H_or_V ? dxy.x   :          dxy.y;
    let moved_enough = (Math.abs(move_delta) > SENTENCE_DRAG_MOVED_ENOUGH);

    if(!moved_enough ) {
        t_tools.t_add_NOT_MOVED_ENOUGH();
        return false;
    }
    else {
        t_tools.t_del_NOT_MOVED_ENOUGH();
    }
    /*}}}*/
    /* SENTENCE-SPLIT OR FONT-ADJUST .. f(H or V){{{*/
    let split_or_font = move_H_or_V;
    let split_delta   = (move_delta > 0) ? 1 : -1;

/*{{{*/
if( log_this) log_key_val_group(  caller
                                  , { move_delta
                                    , split_or_font
                                    , split_delta
                                  }
                                  , lfX[split_or_font ? ((split_delta > 0) ? 3:4) : ((split_delta > 0) ? 5:6)]
                                  , true);

/*}}}*/
    /*}}}*/
    /* NEXT OR PREVIOUS SENTENCE-SPLIT {{{*/
    if( split_or_font )
    {
        t_SENTENCE_split_at_offset(from_container, split_delta);
    }
    /*}}}*/
    /* ADJUST SENTENCE FONT SIZE {{{*/
    else {
        t_SENTENCE_FONTSIZE_OFFSET( split_delta );
        t_tools.t_scrollIntoViewIfNeeded( from_container );
    }
    /*}}}*/
if(tag_this) log("%c  DRAG DONE", lbb+lbH+lf3);
    t_tools.t_del_MOVE_ON_COOLDOWN();
    sentence_drag_last_MS = this_MS;
    return true;
};
/*}}}*/
/*_ t_SENTENCE_split_at_offset {{{*/
let t_SENTENCE_split_at_offset = function(from_container,split_delta)
{
/*{{{*/
let   caller = "t_SENTENCE_split_at_offset";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.EV0_LISTEN;

/*
:new C:/LOCAL/DATA/ANDROID/PROJECTS/iwintoo/XPH/javascript/xpath.js
*/
/*}}}*/

    let sibling_container = t_util.get_node_sibling_at_offset(from_container, split_delta);

if( log_this) log_key_val_group( caller+"(split_delta=["+split_delta+"])"
                                , {   from_container
                                  , sibling_container
                                });

    if( sibling_container )
    {
        t_SENTENCE_RESTORE_EL    ( from_container    );
        t_SENTENCE_SPLIT         ( sibling_container );
        t_SENTENCE_FONTSIZE_APPLY( sibling_container );
        t_SENTENCE_OUTLINE       ( sibling_container );

        t_tools.t_scrollIntoViewIfNeeded( sibling_container );
    }
};
/*}}}*/
/*_ t_SENTENCE_OUTLINE {{{*/
let t_SENTENCE_OUTLINE = function(sentence_el)
{
    let sentence_container = t_util.get_el_parent_with_class(sentence_el, CSS_SENTENCE_CONTAINER);
    if( sentence_container ) sentence_container.classList.add(            CSS_OUTLINED          );
};
/*}}}*/
/*_ t_SENTENCE_FONTSIZE_OFFSET {{{*/
let t_SENTENCE_FONTSIZE_OFFSET = function(split_delta=0)
{
/*{{{*/
let   caller = "t_SENTENCE_FONTSIZE_OFFSET";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;

/*}}}*/
    /* APPLY [split_delta] to [e12_font_size] {{{*/
    let num = split_delta + parseInt( e12_font_size.substring(2) );
    num     = Math.max( 1, num);
    num     = Math.min(12, num);

    e12_font_size = "fs"+num;

if( log_this) log(caller+": e12_font_size=["+e12_font_size+"]");
    /*}}}*/
    /* APPLY CURRENT FONT SIZE TO ALL SENTENCE SPLIT CONTAINER {{{*/
    let node_list = document.querySelectorAll("."+CSS_SENTENCE_CONTAINER);
    for(let i=0; i < node_list.length; ++i)
        t_SENTENCE_FONTSIZE_APPLY(node_list[i]);

    /*}}}*/
    /* APPLY CURRENT FONT SIZE TO POPUP SENTENCE SPLIT CONTAINER {{{*/
    clear_popup();

    /*}}}*/
    return node_list.length;
};
/*}}}*/
/*_ t_SENTENCE_FONTSIZE_APPLY {{{*/
let t_SENTENCE_FONTSIZE_APPLY = function(container)
{
    t_util.clear_el_classList(container, E12_FONT_SIZE_LIST);

    container.classList.add( e12_font_size );

    container.parentElement.style.maxHeight = "fit-content";
};
/*}}}*/

/* ┌────────────────────────────────────────────────────────────────────────┐ */
/* │ RESTORE                                                                │ */
/* └────────────────────────────────────────────────────────────────────────┘ */
/*XXX*/
/*➔ t_SENTENCE_RESTORE_EL {{{*/
let t_SENTENCE_RESTORE_EL = function(el,e=null)
{
/*{{{*/
let   caller = "t_SENTENCE_RESTORE_EL";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;
let tag_this = DOM_SENTENCE_TAG || log_this;
if( tag_this) log("%c"+caller+"("+t_util.get_n_lbl(el)+")", lbH+lf2);
if( log_this && e) log("%c type=["+e.type+"] e.target.id=["+e.target.id+"]", lbH+lf3);

    if(!el) return "";
    let consumed_by = "";
/*}}}*/
    if( check_tool_event(e) ) return consumed_by;
    /* RESTORE [CSS_SENTENCE_CONTAINER] CONTAINERS {{{*/
    let container = t_util.get_el_parent_with_class(el, CSS_SENTENCE_CONTAINER);
    if( container )
    {
        consumed_by = "RESTORING CONTAINER SPLIT SENTENCES";

/*{{{
        if(container.nodeName == "DETAILS") container.open = false;
}}}*/

        t_util.del_el_class(    container, CSS_SENTENCE_CONTAINER);
        t_util.add_el_class(    container, CSS_OUTLINED); /* as an highlight history marker */
        t_util.del_el_class(    container, CSS_DARK);
        t_util.del_el_class(document.body, CSS_DARK);

        if( container.innerHTML_SAVED )
        {
if( tag_this) log("%c...innerHTML_SAVED=["+t_util.ellipsis(container.innerHTML_SAVED, 16)+"]", lf3);

            container.style.touchAction = "";

            container.innerHTML         =  container.innerHTML_SAVED;
            delete                         container.innerHTML_SAVED;

        }
        t_SENTENCE_SPLIT_clr_parent_theme_dark( container );

        sentence_containers.splice(sentence_containers.indexOf(container), 1); /* delete container (x1) */
    }
    /*}}}*/

    t_util.clear_el_classList(el, E12_FONT_SIZE_LIST);

    hide_popup();

/*{{{*/
if( log_this) log_key_val_group(        caller
                               , {          el
                                 ,   container
                                 , consumed_by
                                 ,     callers : dom_log.get_callers && dom_log.get_callers()
                               }, lf8, true);
/*}}}*/
if( tag_this) log("...return ["+consumed_by+"]");
    return consumed_by;
};
/*}}}*/
/*➔ t_SENTENCE_RESTORE_ALL {{{*/
let t_SENTENCE_RESTORE_ALL = function(e=null)
{
/*{{{*/
let   caller = "t_SENTENCE_RESTORE_ALL";
let log_this = DOM_SENTENCE_LOG || LOG_MAP.S2_SELECT;

let tag_this = DOM_SENTENCE_TAG || log_this;
if( tag_this) log("%c"+caller, lbH+lf2);
if( log_this && e) log("%c type=["+e.type+"] e.target.id=["+e.target.id+"]", lbH+lf3);
/*}}}*/
    if( check_tool_event(e) ) return;
    /* RESTORE SPLIT CONTAINERS {{{*/
    let node_list = document.querySelectorAll("."+CSS_SENTENCE_CONTAINER);
    for(let i = 0; i <      node_list.length; ++i)
        t_SENTENCE_RESTORE_EL(node_list[i], e);

    /*}}}*/
};
/*}}}*/

/* ┌────────────────────────────────────────────────────────────────────────┐ */
/* │ TOOL                                                                   │ */
/* └────────────────────────────────────────────────────────────────────────┘ */
/*_ t_SENTENCE_onresize {{{*/
/*_ CHECK_TOOL_EVENT_DELAY {{{*/
const CHECK_TOOL_EVENT_DELAY = 250;

let check_tool_event_timer;
/*}}}*/
let t_SENTENCE_onresize = function(e=window.event)
{
    if( check_tool_event_timer ) clearTimeout( check_tool_event_timer );
    /**/check_tool_event_timer = setTimeout(check_tool_event, CHECK_TOOL_EVENT_DELAY, e);
};
/*}}}*/
/*_ t_SENTENCE_set_theme_dark {{{*/
let t_SENTENCE_set_theme_dark = function(_theme_dark)
{
    theme_dark = !!_theme_dark;
    localStorage_setItem("theme_dark", theme_dark);
};
/*}}}*/
/*_ check_tool_event {{{*/
let check_tool_event = function(e=window.event)
{
/*{{{*/
if(!e) return false;

/*{{{
let e_target    = e.target ? e.target : e.currentTarget;
let e_target_id = e_target.id || e_target.tagName || "Window";
console.log("check_tool_event: "+e.type+" ON ["+e_target_id+"]");
console.dir(e);
}}}*/
/*}}}*/
    /* RESIZE {{{*/
    if(    last_container
       && (e.type == "resize")
      ) {
        t_SENTENCE_SPLIT( last_container );

        return true;
    }
    /*}}}*/
    /* TOGGLE [magnified] {{{*/
    if(    last_container
       &&  e
       &&  e.target
       && (e.target.id == "dom_sentence_magnify")
      ) {
        magnified = !magnified;

        t_SENTENCE_SPLIT( last_container );

        return true;
    }
    /*}}}*/
    /* TOGGLE [theme_dark] .. BUTTON CLICKED {{{*/
    if(    last_container
       &&  e
       &&  e.target
       && (e.target.id == "dom_sentence_theme_dark")
      ) {

        /* toggle */
        theme_dark = !theme_dark;

        /* apply */
        localStorage_setItem("theme_dark", theme_dark);

        /* save */
        if((typeof dom_prop) != "undefined") dom_prop.set("theme_dark", theme_dark);

        /* display */
        t_SENTENCE_SPLIT( last_container );

        return true;
    }
    /*}}}*/
    /* TOGGLE [scroll_smooth] {{{*/
    if(    last_container
       &&  e
       &&  e.target
       && (e.target.id == "dom_scroll_smooth")
      ) {

        /* toggle */
        scroll_smooth = !scroll_smooth;

        /* apply */
        document.getElementsByTagName("HTML")[0] .style.scrollBehavior
            = scroll_smooth ? "smooth" : "auto";

        /* animate */
        let distance = scroll_smooth ? 128 :  32;
        let delay    = scroll_smooth ? 500 : 250;
        window                   .scrollBy(0, distance);
        setTimeout(() => { window.scrollBy(0,-distance); }, delay);

        return true;
    }
    /*}}}*/
    /* TOGGLE [xpath_show] {{{*/
    if(    last_container
       &&  e
       &&  e.target
       && (e.target.id == "dom_sentence_xpath_show")
      ) {
        xpath_show = !xpath_show;

        t_SENTENCE_SPLIT( last_container );

        return true;
    }
    /*}}}*/
    return false;
};
/*}}}*/
/*_ show_popup {{{*/
let show_popup_container_shown;
let show_popup = function(container,innerHTML)
{
    if(typeof dom_popup == "undefined") return;

    if( xpath_show ) {
        show_popup_container_shown = container;
        dom_popup.log_popup({ message_HTML: innerHTML , options: "fixed" , theme_dark });
    }
    else
        show_popup_container_shown = null;
};
/*}}}*/
/*_ clear_popup {{{*/
let clear_popup = function()
{
    if(typeof dom_popup == "undefined") return;

    let dom_popup_div = dom_popup.log_popup_div_get();
    if( dom_popup_div ) t_SENTENCE_FONTSIZE_APPLY( dom_popup_div );
};
/*}}}*/
/*_ hide_popup {{{*/
let hide_popup = function()
{
    if(typeof dom_popup == "undefined") return;

    dom_popup.log_popup_hide();
};
/*}}}*/
/*_ get_parent_chain {{{*/
let get_parent_chain = function(el) /* eslint-disable-line no-unused-vars */
{
    let array = [];

    while(          el.parentElement )
    {
        array.push( el.parentElement );
        el        = el.parentElement;
    }

    return array;
};
/*}}}*/


/* ➔ EXPORT {{{*/
/*➔ t_store_set_state {{{*/
let t_store_set_state = function(label,state)
{
    if(    state != undefined)
    {
        if(state) localStorage.setItem   (label, "true");
        else      localStorage.removeItem(label        );
        return !!state;
    }
    else {
        return    localStorage.getItem   (label        );
    }
};
/*}}}*/
return { name : "dom_sentence"
    ,    logging : (state) => DOM_SENTENCE_LOG = t_store_set_state("DOM_SENTENCE_LOG",state)
    ,    tagging : (state) => DOM_SENTENCE_TAG = t_store_set_state("DOM_SENTENCE_TAG",state)
    ,    t_sentence_IMPORT
    ,    CSS_SENTENCE_CONTAINER

    ,    t_SENTENCE_SPLIT

    ,    t_SENTENCE_GET_SENTENCE_CONTAINERS
    ,    t_SENTENCE_GET_SENTENCE_CONTAINERS_IN_VIEWPORT /* ...yet unused */
    ,    t_SENTENCE_GET_EL_CONTAINER


    ,    t_SENTENCE_RESTORE_EL
    ,    t_SENTENCE_RESTORE_ALL
    ,    t_SENTENCE_GET_EL_SENTENCE_CONTAINER
    ,    t_SENTENCE_drag_DXY
    ,    t_SENTENCE_onresize

    ,    t_SENTENCE_set_theme_dark
    ,    t_SENTENCE_restore_text_containers_outlined

    /* DEBUG */
    ,    f : node_in_view_filter_clear
    ,    o : outline_text_containers_in_view
    ,    r : t_SENTENCE_restore_text_containers_outlined
};
/*}}}*/
}());

/*{{{
"┌─────────────────────────────────────────────────────────────────────────────┐
"│                                                                             │
:e  $BROWSEEXT/SplitterExtension/manifest.json

:e  $BROWSEEXT/SplitterExtension/javascript/background.js
:e  $BROWSEEXT/SplitterExtension/javascript/content.js
"...           $RPROFILES/script/dom_sentence.js
:e             $RPROFILES/script/stub/dom_sentence_event.js
:e             $RPROFILES/script/stub/dom_scroll.js
:e             $RPROFILES/script/stub/dom_sentence_util.js
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
/*
:!start /b explorer splitter_embedded.html
*/

