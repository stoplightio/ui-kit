(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./.storybook/config.js":
/*!******************************!*\
  !*** ./.storybook/config.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stoplight_storybook_config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stoplight/storybook-config/config */ "./node_modules/@stoplight/storybook-config/config.js");
/* harmony import */ var _stoplight_storybook_config_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stoplight_storybook_config_config__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./.storybook/theme.js":
/*!*****************************!*\
  !*** ./.storybook/theme.js ***!
  \*****************************/
/*! exports provided: useTheme, ThemeProvider, themes, zones */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTheme", function() { return useTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "themes", function() { return themes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zones", function() { return zones; });
/* harmony import */ var _src_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/theme */ "./src/theme/index.tsx");
/* harmony import */ var _src_theme__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_theme__WEBPACK_IMPORTED_MODULE_0__);
var _createThemedModule=Object(_src_theme__WEBPACK_IMPORTED_MODULE_0__["createThemedModule"])(),useTheme=_createThemedModule.useTheme,ThemeProvider=_createThemedModule.ThemeProvider;var themes=["dark","light"];var zones={app:function app(_ref){var base=_ref.base;return{canvas:"light"===base?{fg:"#111",bg:"#fff"}:{fg:"#fff",bg:"#111"}}},inverted:function inverted(_ref2){var base=_ref2.base;return{container:"dark"===base?{fg:"#111",bg:"#fff"}:{fg:"#fff",bg:"#111"}}},inner:{container:{fg:"white",bg:"purple"}}};

/***/ }),

/***/ "./src/AutoSizer.tsx":
/*!***************************!*\
  !*** ./src/AutoSizer.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const use_resize_observer_1 = __webpack_require__(/*! use-resize-observer */ "./node_modules/use-resize-observer/dist/bundle.esm.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const AutoSizer = props => {
    const { children } = props, rest = tslib_1.__rest(props, ["children"]);
    const [ref, width = '100%', height = '100%'] = use_resize_observer_1.default();
    return (React.createElement(Box_1.Box, Object.assign({}, rest, { ref: ref }), children({ width, height })));
};
exports.AutoSizer = AutoSizer;


/***/ }),

/***/ "./src/Badge.tsx":
/*!***********************!*\
  !*** ./src/Badge.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const _1 = __webpack_require__(/*! ./ */ "./src/index.ts");
var BadgeVariant;
(function (BadgeVariant) {
    BadgeVariant["Pill"] = "pill";
    BadgeVariant["Textual"] = "textual";
    BadgeVariant["Dot"] = "dot";
})(BadgeVariant = exports.BadgeVariant || (exports.BadgeVariant = {}));
var BadgeColor;
(function (BadgeColor) {
    BadgeColor["Error"] = "error";
    BadgeColor["Warning"] = "warning";
    BadgeColor["Default"] = "default";
})(BadgeColor = exports.BadgeColor || (exports.BadgeColor = {}));
const Badge = props => {
    const { color = BadgeColor.Default, variant = BadgeVariant.Pill, children } = props, restProps = tslib_1.__rest(props, ["color", "variant", "children"]);
    const { badge: theme } = _1.useTheme();
    return (React.createElement(_1.Box, Object.assign({}, restProps, { as: "span", css: badgeStyles({ color, variant, theme }) }), variant === BadgeVariant.Dot ? null : children));
};
exports.Badge = Badge;
const badgeStyles = ({ color, variant, theme, }) => {
    return [
        {
            padding: '.25em 0',
            fontSize: '75%',
            fontWeight: 700,
            lineHeight: 1,
            borderRadius: '16px',
            color: theme[color].fg,
            backgroundColor: theme[color].bg,
            margin: '0 2px',
        },
        variant === BadgeVariant.Textual && {
            color: theme[color].bg,
            backgroundColor: 'transparent',
        },
        variant === BadgeVariant.Pill && {
            padding: '.25em .6em',
        },
        variant === BadgeVariant.Dot && {
            padding: '0',
            width: '8px',
            height: '8px',
            display: 'inline-block',
        },
    ];
};


/***/ }),

/***/ "./src/BlockQuote.tsx":
/*!****************************!*\
  !*** ./src/BlockQuote.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const BlockQuote = React.forwardRef(function BlockQuote(props, ref) {
    const { as = 'blockquote', css } = props, rest = tslib_1.__rest(props, ["as", "css"]);
    const { blockQuote } = theme_1.useTheme();
    return React.createElement(Box_1.Box, Object.assign({}, rest, { as: as, ref: ref, css: [exports.blockQuoteStyles(blockQuote), css] }));
});
exports.BlockQuote = BlockQuote;
exports.blockQuoteStyles = (theme) => {
    return {
        color: theme.fg,
        backgroundColor: theme.bg,
        boxShadow: theme.shadow,
        borderLeft: `6px solid ${theme.border}`,
        padding: '20px 30px 20px 20px',
        margin: 0,
        borderRadius: 2,
    };
};
BlockQuote.displayName = 'BlockQuote';


/***/ }),

/***/ "./src/Box.tsx":
/*!*********************!*\
  !*** ./src/Box.tsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const core_1 = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
const pickBy = __webpack_require__(/*! lodash/pickBy */ "./node_modules/lodash/pickBy.js");
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ss = __webpack_require__(/*! styled-system */ "./node_modules/styled-system/dist/index.esm.js");
const flattenDeep = __webpack_require__(/*! lodash/flattenDeep */ "./node_modules/lodash/flattenDeep.js");
const sl = __webpack_require__(/*! ./styles */ "./src/styles.ts");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const validPropsPicker_1 = __webpack_require__(/*! ./utils/validPropsPicker */ "./src/utils/validPropsPicker.ts");
const Box = react_1.forwardRef(function Box(props, ref) {
    const { as = 'div', children, style, border, borderTop, borderBottom, borderLeft, borderRight, borderRadius, boxShadow, boxSizing, cursor, display, fontSize, fontWeight, fontStyle, lineHeight, letterSpacing, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, px, py, flex, alignSelf, textAlign, textOverflow, position, top, bottom, left, right, zIndex, height, minHeight, maxHeight, width, minWidth, maxWidth, opacity, overflow, overflowX, overflowY, textDecoration, textDecorationColor, textTransform, color, backgroundColor, borderColor, transform, whiteSpace, visibility, css } = props, rest = tslib_1.__rest(props, ["as", "children", "style", "border", "borderTop", "borderBottom", "borderLeft", "borderRight", "borderRadius", "boxShadow", "boxSizing", "cursor", "display", "fontSize", "fontWeight", "fontStyle", "lineHeight", "letterSpacing", "m", "mt", "mb", "ml", "mr", "mx", "my", "p", "pt", "pb", "pl", "pr", "px", "py", "flex", "alignSelf", "textAlign", "textOverflow", "position", "top", "bottom", "left", "right", "zIndex", "height", "minHeight", "maxHeight", "width", "minWidth", "maxWidth", "opacity", "overflow", "overflowX", "overflowY", "textDecoration", "textDecorationColor", "textTransform", "color", "backgroundColor", "borderColor", "transform", "whiteSpace", "visibility", "css"]);
    const theme = theme_1.useTheme();
    const styles = [
        sl.color({ color, backgroundColor }),
        ss.borders({ border, borderTop, borderBottom, borderLeft, borderRight }),
        ss.borderRadius({ borderRadius }),
        ss.borderColor({ borderColor }),
        ss.boxShadow({ boxShadow }),
        sl.boxSizing({ boxSizing }),
        sl.space({ theme, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, px, py }),
        ss.flex({ flex }),
        ss.alignSelf({ alignSelf }),
        ss.textAlign({ textAlign }),
        ss.lineHeight({ lineHeight }),
        ss.fontSize({ fontSize }),
        ss.fontWeight({ fontWeight }),
        ss.fontStyle({ fontStyle }),
        ss.letterSpacing({ letterSpacing }),
        ss.display({ display }),
        ss.height({ height }),
        ss.minHeight({ minHeight }),
        ss.maxHeight({ maxHeight }),
        ss.width({ width }),
        ss.minWidth({ minWidth }),
        ss.maxWidth({ maxWidth }),
        ss.position({ position }),
        ss.top({ top }),
        ss.bottom({ bottom }),
        ss.left({ left }),
        ss.right({ right }),
        ss.zIndex({ zIndex }),
        ss.opacity({ opacity }),
        sl.textOverflow({ textOverflow }),
        sl.transform({ transform }),
        sl.textTransform({ textTransform }),
        sl.textDecoration({ textDecoration, textDecorationColor }),
        sl.cursor({ cursor }),
        sl.visibility({ visibility }),
        sl.overflow({ overflow, overflowX, overflowY }),
        sl.whiteSpace({ whiteSpace }),
    ];
    if (css)
        styles.unshift(...flattenDeep([css]));
    if (style)
        styles.push(style);
    return core_1.jsx(as, Object.assign({}, (typeof as === 'string' ? pickBy(rest, validPropsPicker_1.validPropsPicker) : rest), { ref, css: styles }), children);
});
exports.Box = Box;
Box.displayName = 'Box';


/***/ }),

/***/ "./src/Break.tsx":
/*!***********************!*\
  !*** ./src/Break.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const Break = React.forwardRef(function Break(props, ref) {
    const { as = 'hr', thickness = 1, css } = props, rest = tslib_1.__rest(props, ["as", "thickness", "css"]);
    return React.createElement(Box_1.Box, Object.assign({}, rest, { as: as, ref: ref, css: [exports.breakStyles({ thickness }), css] }));
});
exports.Break = Break;
exports.breakStyles = ({ thickness }) => [
    {
        border: '0 none',
        borderTop: `${thickness}px solid`,
        height: 0,
        margin: '0 auto',
    },
];
Break.displayName = 'Break';


/***/ }),

/***/ "./src/Button.tsx":
/*!************************!*\
  !*** ./src/Button.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Flex_1 = __webpack_require__(/*! ./Flex */ "./src/Flex.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const Button = React.forwardRef(function Button(props, ref) {
    const { as = 'button', css } = props, rest = tslib_1.__rest(props, ["as", "css"]);
    const { button } = theme_1.useTheme();
    return (React.createElement(Flex_1.Flex, Object.assign({ px: 11, py: 7, borderRadius: 2 }, rest, { as: as, ref: ref, alignItems: "center", css: [exports.buttonStyles(button, props), css] })));
});
exports.Button = Button;
Button.displayName = 'Button';
exports.buttonStyles = (theme, { disabled } = {}) => {
    return [
        {
            color: theme.fg,
            backgroundColor: theme.bg,
            borderColor: theme.border,
            appearance: 'none',
            cursor: 'pointer',
            ':focus': {
                outline: 'none',
            },
            ':hover': {
                backgroundColor: theme.hoverBg,
                color: theme.hoverFg,
            },
            ':active': {
                borderStyle: 'solid',
            },
        },
        disabled && {
            opacity: 0.6,
            cursor: 'not-allowed',
            ':hover': {
                backgroundColor: theme.bg,
            },
        },
    ];
};


/***/ }),

/***/ "./src/Checkbox.tsx":
/*!**************************!*\
  !*** ./src/Checkbox.tsx ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const _1 = __webpack_require__(/*! ./ */ "./src/index.ts");
const getVariant_1 = __webpack_require__(/*! ./utils/getVariant */ "./src/utils/getVariant.ts");
const Checkbox = React.forwardRef(function Checkbox(props, ref) {
    const { disabled: isDisabled, onChange, variant } = props, rest = tslib_1.__rest(props, ["disabled", "onChange", "variant"]);
    const { checkbox: baseTheme } = _1.useTheme();
    const [checked, setValue] = react_1.useState(!!props.checked);
    const isChecked = props.hasOwnProperty('checked') ? !!props.checked : checked;
    const handleChange = react_1.useCallback(({ target }) => {
        setValue(target.checked);
        if (onChange)
            onChange(target.checked);
    }, []);
    return (React.createElement(_1.Flex, Object.assign({}, rest, { as: "label", ref: ref, css: exports.checkboxStyles(baseTheme, { isDisabled, isChecked, variant }) }),
        React.createElement(_1.Box, { as: "input", type: "checkbox", checked: checked, onChange: handleChange, position: "absolute", css: { clip: 'rect(1px, 1px, 1px, 1px)' } }),
        React.createElement("svg", { "aria-hidden": "true", viewBox: "0 0 512 512", width: "10px", height: "10px" },
            React.createElement("path", { fill: "currentColor", d: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" }))));
});
exports.Checkbox = Checkbox;
Checkbox.displayName = 'Checkbox';
exports.checkboxStyles = (baseTheme, { isChecked, isDisabled, variant }) => {
    const theme = Object.assign({}, baseTheme, getVariant_1.getVariant(baseTheme, variant));
    return [
        {
            color: theme.bg,
            backgroundColor: theme.bg,
            border: theme.border ? `1px solid ${theme.border}` : 'none',
            height: '14px',
            width: '14px',
            margin: 0,
            padding: 0,
            borderRadius: '3px',
            boxSizing: 'border-box',
            cursor: 'pointer',
            overflow: 'hidden',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color .15s ease-in-out',
        },
        isChecked && {
            color: theme.fg,
            backgroundColor: theme.checked,
        },
        isDisabled && {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
    ];
};


/***/ }),

/***/ "./src/Code/Editor.tsx":
/*!*****************************!*\
  !*** ./src/Code/Editor.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
__webpack_require__(/*! prismjs/components/ */ "./node_modules/prismjs/components.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_simple_code_editor_1 = __webpack_require__(/*! react-simple-code-editor */ "./node_modules/react-simple-code-editor/lib/index.js");
const Box_1 = __webpack_require__(/*! ../Box */ "./src/Box.tsx");
const styles_1 = __webpack_require__(/*! ./styles */ "./src/Code/styles.ts");
const highlightCode_1 = __webpack_require__(/*! ./utils/highlightCode */ "./src/Code/utils/highlightCode.ts");
const Editor = React.forwardRef(function Editor(props, ref) {
    const { autoFocus, language, onChange, value, css } = props, rest = tslib_1.__rest(props, ["autoFocus", "language", "onChange", "value", "css"]);
    const highlight = React.useCallback(() => highlightCode_1.highlightCode(value, language), [value, language]);
    return (React.createElement(Box_1.Box, Object.assign({}, rest, { css: [exports.codeEditorStyles(), css] }),
        React.createElement(react_simple_code_editor_1.default, { autoFocus: autoFocus, ref: ref, value: value, onValueChange: onChange, highlight: highlight })));
});
exports.Editor = Editor;
Editor.displayName = 'Editor';
exports.codeEditorStyles = () => {
    return [
        ...styles_1.codeStyles(),
        {
            textarea: {
                '&:focus': {
                    outline: 'none',
                },
            },
        },
    ];
};


/***/ }),

/***/ "./src/Code/Viewer.tsx":
/*!*****************************!*\
  !*** ./src/Code/Viewer.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
__webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ../Box */ "./src/Box.tsx");
const styles_1 = __webpack_require__(/*! ./styles */ "./src/Code/styles.ts");
const astToReact_1 = __webpack_require__(/*! ./utils/astToReact */ "./src/Code/utils/astToReact.ts");
const parseCode_1 = __webpack_require__(/*! ./utils/parseCode */ "./src/Code/utils/parseCode.ts");
const languageMaps = {
    md: 'markdown',
};
exports.Viewer = (_a) => {
    var { language, value, showLineNumbers = false, inline = false, css } = _a, rest = tslib_1.__rest(_a, ["language", "value", "showLineNumbers", "inline", "css"]);
    const codeCss = styles_1.codeStyles({ inline, showLineNumbers });
    const lang = (language && languageMaps[language]) || language;
    if (inline) {
        return (React.createElement(Box_1.Box, Object.assign({}, rest, { css: [codeCss, css], as: "code" }), value));
    }
    const markup = parseCode_1.parseCode(value, lang, showLineNumbers);
    return (React.createElement(Box_1.Box, Object.assign({}, rest, { as: "pre", css: [codeCss, css] }), markup ? markup.map(astToReact_1.astToReact()) : value));
};


/***/ }),

/***/ "./src/Code/styles.ts":
/*!****************************!*\
  !*** ./src/Code/styles.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
const theme_1 = __webpack_require__(/*! ../theme */ "./src/theme/index.tsx");
exports.codeStyles = ({ inline, showLineNumbers } = {}) => {
    const { code } = theme_1.useTheme();
    if (inline) {
        return [
            {
                background: code.inlineBg,
                color: code.inlineFg,
                padding: '3px 4px',
                margin: '0 2px',
                borderRadius: 2,
            },
        ];
    }
    return [
        Object.assign({ background: code.bg }, (code.border && { border: `1px solid ${code.border}` }), { fontFamily: 'monospace', padding: showLineNumbers ? `10px 20px 10px 0` : `15px 20px 15px 18px`, whiteSpace: 'pre-wrap', borderRadius: 5 }),
        core_1.css `
      counter-reset: line;

      .namespace {
        opacity: 0.7;
      }

      .line-number {
        padding-left: 40px;
        position: relative;
        width: calc(100% - 40px);
        display: block;

        &::before {
          content: '';
          display: inline-block;
          user-select: none;
          opacity: 0.3;
          text-align: right;
          min-width: 25px;
          position: absolute;
          left: 0;
          counter-increment: line;
          content: counter(line);
        }
      }

      .token {
        &.comment,
        &.prolog,
        &.doctype,
        &.cdata {
          color: ${code.syntax.comment};
        }

        &.punctuation {
          color: #9e9e9e;
        }

        &.property,
        &.tag,
        &.boolean,
        &.number,
        &.symbol,
        &.deleted {
          color: ${code.syntax.primary};
        }

        &.selector,
        &.attr-name,
        &.string,
        &.char,
        &.builtin,
        &.inserted {
          color: ${code.syntax.secondary};
        }

        &.operator,
        &.entity,
        &.url {
          color: ${code.syntax.operator};
        }

        &.atrule,
        &.attr-value,
        &.keyword {
          color: ${code.syntax.keyword};
        }

        &.function {
          color: ${code.syntax.function};
        }

        &.variable {
          color: ${code.syntax.variable};
        }

        &.regex,
        &.important {
          color: ${code.syntax.regex};
        }

        &.important,
        &.bold {
          font-weight: bold;
        }

        &.italic {
          font-style: italic;
        }

        &.entity {
          cursor: help;
        }
      }
    `,
    ];
};


/***/ }),

/***/ "./src/Code/utils/astToReact.ts":
/*!**************************************!*\
  !*** ./src/Code/utils/astToReact.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function mapChild(child, i, depth) {
    if (child.tagName) {
        return react_1.createElement(child.tagName, Object.assign({ key: `cv-${depth}-${i}` }, child.properties, { className: child.properties && (child.properties.className || []).join(' ') }), child.children && child.children.map(astToReact(depth + 1)));
    }
    return child.value;
}
function astToReact(depth = 0) {
    return function mapChildrenWithDepth(child, i) {
        return mapChild(child, i, depth);
    };
}
exports.astToReact = astToReact;


/***/ }),

/***/ "./src/Code/utils/highlightCode.ts":
/*!*****************************************!*\
  !*** ./src/Code/utils/highlightCode.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const prismjs_1 = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
exports.highlightCode = (code, language) => {
    const langDef = prismjs_1.languages[language];
    return langDef ? prismjs_1.highlight(code, langDef) : code;
};


/***/ }),

/***/ "./src/Code/utils/lineNumberify.ts":
/*!*****************************************!*\
  !*** ./src/Code/utils/lineNumberify.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const newLineRegex = /\n/g;
function getNewLines(str) {
    return str.match(newLineRegex);
}
function createLineElement({ children, lineNumber, className, }) {
    return {
        type: 'element',
        tagName: 'span',
        properties: {
            className: lineNumber === undefined ? className : ['line-number'],
        },
        children,
    };
}
function flattenCodeTree(tree, className = []) {
    const newTree = [];
    for (const node of tree) {
        if (node.type === 'text') {
            newTree.push(createLineElement({
                children: [node],
                className,
            }));
        }
        else if (node.children) {
            const classNames = className.concat(node.properties.className);
            newTree.push(...flattenCodeTree(node.children, classNames));
        }
    }
    return newTree;
}
function lineNumberify(codeTree) {
    const tree = flattenCodeTree(codeTree);
    const newTree = [];
    let lastLineBreakIndex = -1;
    let index = 0;
    while (index < tree.length) {
        const node = tree[index];
        const value = node.children[0].value;
        const newLines = getNewLines(value);
        if (newLines) {
            const splitValue = value.split('\n');
            splitValue.forEach((text, i) => {
                const lineNumber = newTree.length + 1;
                const newChild = { type: 'text', value: `${text}\n` };
                if (i === 0) {
                    const children = tree.slice(lastLineBreakIndex + 1, index).concat(createLineElement({
                        children: [newChild],
                        className: node.properties.className,
                    }));
                    newTree.push(createLineElement({ children, lineNumber }));
                }
                else if (i === splitValue.length - 1) {
                    const stringChild = tree[index + 1] && tree[index + 1].children && tree[index + 1].children[0];
                    if (stringChild) {
                        const lastLineInPreviousSpan = { type: 'text', value: `${text}` };
                        const newElem = createLineElement({
                            children: [lastLineInPreviousSpan],
                            className: node.properties.className,
                        });
                        tree.splice(index + 1, 0, newElem);
                    }
                    else {
                        newTree.push(createLineElement({
                            children: [newChild],
                            lineNumber,
                            className: node.properties.className,
                        }));
                    }
                }
                else {
                    newTree.push(createLineElement({
                        children: [newChild],
                        lineNumber,
                        className: node.properties.className,
                    }));
                }
            });
            lastLineBreakIndex = index;
        }
        index++;
    }
    if (lastLineBreakIndex !== tree.length - 1) {
        const children = tree.slice(lastLineBreakIndex + 1, tree.length);
        if (children && children.length) {
            newTree.push(createLineElement({
                children,
                lineNumber: newTree.length + 1,
            }));
        }
    }
    return newTree;
}
exports.lineNumberify = lineNumberify;


/***/ }),

/***/ "./src/Code/utils/parseCode.ts":
/*!*************************************!*\
  !*** ./src/Code/utils/parseCode.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const refractor = __webpack_require__(/*! refractor */ "./node_modules/refractor/index.js");
const lineNumberify_1 = __webpack_require__(/*! ./lineNumberify */ "./src/Code/utils/lineNumberify.ts");
function parsePlainText(code) {
    return code.split('\n').map((value, i, arr) => ({
        type: 'element',
        tagName: 'span',
        properties: {},
        children: [
            {
                type: 'text',
                value: arr.length - 1 === i ? value : `${value}\n`,
            },
        ],
    }));
}
function safeParse(code, language) {
    if (language) {
        try {
            return refractor.highlight(code, language);
        }
        catch (ex) {
        }
    }
    return parsePlainText(code);
}
function parseCode(code, language, addLineNumbers) {
    try {
        const ast = safeParse(code, language);
        if (addLineNumbers) {
            return lineNumberify_1.lineNumberify(ast);
        }
        return ast;
    }
    catch (ex) {
        return null;
    }
}
exports.parseCode = parseCode;


/***/ }),

/***/ "./src/ContextMenu.tsx":
/*!*****************************!*\
  !*** ./src/ContextMenu.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_contextmenu_1 = __webpack_require__(/*! react-contextmenu */ "./node_modules/react-contextmenu/es6/index.js");
exports.ContextMenuTrigger = react_contextmenu_1.ContextMenuTrigger;
const _1 = __webpack_require__(/*! ./ */ "./src/index.ts");
const ContextMenu = props => {
    const { id, renderTrigger } = props, rest = tslib_1.__rest(props, ["id", "renderTrigger"]);
    const contextTriggerRef = React.useRef(null);
    return (React.createElement(React.Fragment, null,
        React.createElement(react_contextmenu_1.ContextMenuTrigger, { id: id, ref: contextTriggerRef, holdToDisplay: -1 }, renderTrigger(contextTriggerRef)),
        React.createElement(ContextMenuView, Object.assign({ id: id }, rest))));
};
exports.ContextMenu = ContextMenu;
const ContextMenuView = props => {
    const { menuItems = [] } = props, viewProps = tslib_1.__rest(props, ["menuItems"]);
    const { contextMenu: theme } = _1.useTheme();
    const [isVisible, setIsVisible] = React.useState(false);
    const onShow = React.useCallback(event => {
        setIsVisible(true);
        if (props.onShow) {
            props.onShow(event);
        }
    }, [setIsVisible, props.onShow]);
    const onHide = React.useCallback(event => {
        setIsVisible(false);
        if (props.onHide) {
            props.onHide(event);
        }
    }, [setIsVisible, props.onHide]);
    return (React.createElement(React.Fragment, null,
        props.blockExternalClicks && isVisible ? (React.createElement(_1.Portal, null,
            React.createElement(_1.Box, { onClick: e => e.stopPropagation(), width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: Math.pow(2, 31) - 3, opacity: 0 }))) : null,
        React.createElement(_1.Box, Object.assign({}, viewProps, { zIndex: Math.pow(2, 31) - 2, as: react_contextmenu_1.ContextMenu, onShow: onShow, onHide: onHide, css: menuStyles(theme, menuItems.length > 0) }), menuItems.map((item, index) => {
            return React.createElement(ContextMenuItem, Object.assign({ key: index }, item));
        }))));
};
exports.ContextMenuView = ContextMenuView;
const menuStyles = (theme, hasMenuItems) => {
    if (!hasMenuItems) {
        return [{ display: 'none' }];
    }
    return [
        {
            color: theme.fg,
            backgroundColor: theme.bg,
            border: theme.border ? `1px solid ${theme.border}` : 'none',
            borderRadius: '3px',
            minWidth: '180px',
            maxWidth: '280px',
            ':focus': {
                outline: '0 none',
            },
            '.react-contextmenu-submenu': {
                '.react-contextmenu': { display: 'none' },
                '.react-contextmenu--visible': { display: 'block' },
            },
        },
    ];
};
const ContextMenuItem = props => {
    const { attributes, data, title, shortcut, divider, disabled, preventClose, onClick, menuItems = [] } = props, rest = tslib_1.__rest(props, ["attributes", "data", "title", "shortcut", "divider", "disabled", "preventClose", "onClick", "menuItems"]);
    const { contextMenu: theme } = _1.useTheme();
    const isSubMenu = menuItems.length > 0;
    const menuItem = (React.createElement(_1.Box, Object.assign({}, rest, { css: exports.contextMenuItemStyles(theme, { onClick, divider, disabled }), as: (asProps) => (React.createElement(react_contextmenu_1.MenuItem, { attributes: asProps, data: data, preventClose: preventClose, disabled: disabled, onClick: onClick },
            React.createElement(_1.Flex, { alignItems: "center", justifyContent: "space-around" },
                title ? React.createElement(_1.Box, { flex: 1 }, title) : null,
                shortcut ? (React.createElement(_1.Box, { opacity: 0.5, fontSize: "0.8rem" }, shortcut)) : null,
                isSubMenu ? (React.createElement(_1.Box, { pl: "6px", fontSize: "10px" }, "\u25BA")) : null),
            divider ? React.createElement(_1.Break, { thickness: 1, m: "5px", color: theme.border }) : null)) })));
    if (isSubMenu) {
        return (React.createElement(_1.Box, Object.assign({}, rest, { css: menuStyles(theme, true), as: ({ className }) => {
                return (React.createElement(react_contextmenu_1.SubMenu, { title: menuItem, className: className }, menuItems.map((item, index) => {
                    return React.createElement(ContextMenuItem, Object.assign({ key: index }, item));
                })));
            } })));
    }
    return menuItem;
};
exports.ContextMenuItem = ContextMenuItem;
exports.contextMenuItemStyles = (theme, { onClick, divider, disabled }) => {
    return [
        {
            padding: '10px 14px',
            fontSize: '14px',
            borderRadius: '2px',
            ':hover': {
                background: theme.hoverBg,
            },
            ':focus': {
                outline: '0 none',
            },
        },
        onClick && {
            cursor: 'pointer',
        },
        disabled && {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
        (divider || disabled) && {
            ':hover': {
                background: 'inherit',
                color: 'inherit',
            },
        },
    ];
};


/***/ }),

/***/ "./src/Dialog.tsx":
/*!************************!*\
  !*** ./src/Dialog.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const Flex_1 = __webpack_require__(/*! ./Flex */ "./src/Flex.tsx");
const Overlay_1 = __webpack_require__(/*! ./Overlay */ "./src/Overlay.tsx");
const Portal_1 = __webpack_require__(/*! ./Portal */ "./src/Portal.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const Dialog = React.forwardRef(function Dialog(props, ref) {
    const { children, show, onClickOutside, onClick, css } = props, rest = tslib_1.__rest(props, ["children", "show", "onClickOutside", "onClick", "css"]);
    const { dialog } = theme_1.useTheme();
    const onOverlayClick = React.useCallback(e => {
        if (onClickOutside !== undefined) {
            onClickOutside(e);
        }
    }, []);
    const onBoxClick = React.useCallback(e => {
        e.stopPropagation();
        if (onClick !== undefined) {
            onClick(e);
        }
    }, []);
    if (!show) {
        return null;
    }
    return (React.createElement(Portal_1.Portal, null,
        React.createElement(Overlay_1.Overlay, { as: Flex_1.Flex, alignItems: "center", justifyContent: "center", onClick: onOverlayClick },
            React.createElement(Box_1.Box, Object.assign({}, rest, { ref: ref, onClick: onBoxClick, css: [exports.dialogStyles(dialog), css] }), children))));
});
exports.Dialog = Dialog;
Dialog.displayName = 'Dialog';
exports.dialogStyles = (dialog) => {
    return {
        color: dialog.fg,
        backgroundColor: dialog.bg,
        border: dialog.border ? `1px solid ${dialog.border}` : 'none',
        maxWidth: '95vw',
        maxHeight: '95vh',
    };
};


/***/ }),

/***/ "./src/Flex.tsx":
/*!**********************!*\
  !*** ./src/Flex.tsx ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const flattenDeep = __webpack_require__(/*! lodash/flattenDeep */ "./node_modules/lodash/flattenDeep.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ss = __webpack_require__(/*! styled-system */ "./node_modules/styled-system/dist/index.esm.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const sl = __webpack_require__(/*! ./styles */ "./src/styles.ts");
const Flex = React.forwardRef(function Flex(props, ref) {
    const { flexBasis, flexFlow, flexDirection, flexWrap, alignItems, justifyContent, css } = props, rest = tslib_1.__rest(props, ["flexBasis", "flexFlow", "flexDirection", "flexWrap", "alignItems", "justifyContent", "css"]);
    const styles = [
        ...flattenDeep([css]),
        ss.flexBasis({ flexBasis }),
        ss.flexDirection({ flexDirection }),
        ss.flexWrap({ flexWrap }),
        ss.alignItems({ alignItems }),
        ss.justifyContent({ justifyContent }),
        sl.flexFlow({ flexFlow }),
        exports.flexStyles(),
    ];
    return React.createElement(Box_1.Box, Object.assign({}, rest, { ref: ref, css: styles }));
});
exports.Flex = Flex;
Flex.displayName = 'Flex';
exports.flexStyles = () => ({ display: 'flex' });


/***/ }),

/***/ "./src/Heading.tsx":
/*!*************************!*\
  !*** ./src/Heading.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Text_1 = __webpack_require__(/*! ./Text */ "./src/Text.tsx");
const Heading = React.forwardRef(function Heading(props, ref) {
    const { as = 'h2', css } = props, rest = tslib_1.__rest(props, ["as", "css"]);
    return React.createElement(Text_1.Text, Object.assign({}, rest, { as: as, ref: ref, css: [headingStyles(), css] }));
});
exports.Heading = Heading;
Heading.displayName = ' Heading';
const headingStyles = () => ({ magin: '0', fontWeight: 900 });


/***/ }),

/***/ "./src/Icon.tsx":
/*!**********************!*\
  !*** ./src/Icon.tsx ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const fontawesome_svg_core_1 = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
const react_fontawesome_1 = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
exports.IconLibrary = fontawesome_svg_core_1.library;
const Icon = React.forwardRef(function Icon(props, ref) {
    const { css } = props, rest = tslib_1.__rest(props, ["css"]);
    return React.createElement(Box_1.Box, Object.assign({}, rest, { as: react_fontawesome_1.FontAwesomeIcon, ref: ref, css: [iconStyles(), css] }));
});
exports.Icon = Icon;
Icon.displayName = 'Icon';
const iconStyles = () => [{ background: 'transparent' }];


/***/ }),

/***/ "./src/Image.tsx":
/*!***********************!*\
  !*** ./src/Image.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const Image = React.forwardRef(function Image(props, ref) {
    const { hidden, responsive, css } = props, rest = tslib_1.__rest(props, ["hidden", "responsive", "css"]);
    return React.createElement(Box_1.Box, Object.assign({}, rest, { as: "img", ref: ref, css: exports.imageStyles({ hidden, responsive, css }) }));
});
exports.Image = Image;
Image.displayName = 'Image';
exports.imageStyles = ({ hidden, responsive, css } = {}) => [
    hidden && {
        display: 'none',
    },
    responsive && {
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    css,
];


/***/ }),

/***/ "./src/Input.tsx":
/*!***********************!*\
  !*** ./src/Input.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const noop = __webpack_require__(/*! lodash/noop */ "./node_modules/lodash/noop.js");
const react_input_autosize_1 = __webpack_require__(/*! react-input-autosize */ "./node_modules/react-input-autosize/lib/AutosizeInput.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const getVariant_1 = __webpack_require__(/*! ./utils/getVariant */ "./src/utils/getVariant.ts");
const AutosizeWrapper = React.forwardRef((_a, ref) => {
    var { className } = _a, props = tslib_1.__rest(_a, ["className"]);
    return (React.createElement(react_input_autosize_1.default, Object.assign({}, props, { ref: ref, inputClassName: className, placeholderIsMinWidth: true })));
});
const Input = React.forwardRef(function Input(props, ref) {
    const { autosize, onChange = noop, type, invalid, css } = props, rest = tslib_1.__rest(props, ["autosize", "onChange", "type", "invalid", "css"]);
    const { input: theme } = theme_1.useTheme();
    const [value, setValue] = React.useState(props.value);
    const internalValue = props.hasOwnProperty('value') ? props.value : value;
    const handleChange = React.useCallback(e => {
        setValue(e.target.value);
        onChange(e);
    }, [onChange, setValue]);
    return (React.createElement(Box_1.Box, Object.assign({ p: "10px", borderRadius: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, rest, { as: autosize ? AutosizeWrapper : 'input', ref: ref, type: type, value: internalValue, onChange: handleChange, css: inputStyles(theme, props) })));
});
exports.Input = Input;
Input.displayName = 'Input';
const inputStyles = (baseTheme, { disabled, variant, css }) => {
    const theme = Object.assign({}, baseTheme, getVariant_1.getVariant(baseTheme, variant));
    return [
        {
            color: theme.fg,
            backgroundColor: theme.bg,
            border: theme.border ? `1px solid ${theme.border}` : 'none',
            boxSizing: 'border-box',
            ':focus': {
                outline: 'none',
            },
        },
        disabled && {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
        css,
    ];
};


/***/ }),

/***/ "./src/Link.tsx":
/*!**********************!*\
  !*** ./src/Link.tsx ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const Link = React.forwardRef(function Link(props, ref) {
    const { css } = props, rest = tslib_1.__rest(props, ["css"]);
    const { link } = theme_1.useTheme();
    return React.createElement(Box_1.Box, Object.assign({}, rest, { as: "a", ref: ref, css: exports.linkStyles(link, css) }));
});
exports.Link = Link;
exports.linkStyles = (theme, css) => {
    return [
        {
            color: theme.fg,
            textDecoration: 'none',
            padding: '0 3px',
        },
        theme.bg && {
            backgroundColor: theme.bg,
        },
        theme.hoverBg && {
            ':hover': {
                backgroundColor: theme.hoverBg,
            },
        },
        theme.hoverFg && {
            ':hover': {
                color: theme.hoverFg,
            },
        },
        theme.visitedFg && {
            ':visited': {
                color: theme.visitedFg,
            },
        },
        theme.border && {
            borderBottom: `1px solid ${theme.border}`,
        },
        theme.hoverBorder && {
            ':hover': {
                borderColor: theme.hoverBorder,
            },
        },
        css,
    ];
};
Link.displayName = 'Link';


/***/ }),

/***/ "./src/List.tsx":
/*!**********************!*\
  !*** ./src/List.tsx ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const sl = __webpack_require__(/*! ./styles */ "./src/styles.ts");
const List = React.forwardRef(function List(props, ref) {
    const { as = 'ul', listStyle, listStylePosition, css } = props, rest = tslib_1.__rest(props, ["as", "listStyle", "listStylePosition", "css"]);
    return React.createElement(Box_1.Box, Object.assign({}, rest, { as: as, ref: ref, css: [exports.listStyles({ listStyle, listStylePosition }), css] }));
});
exports.List = List;
List.displayName = 'List';
exports.listStyles = ({ listStyle, listStylePosition }) => {
    return sl.listStyle({ listStyle, listStylePosition });
};


/***/ }),

/***/ "./src/Menu.tsx":
/*!**********************!*\
  !*** ./src/Menu.tsx ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const Flex_1 = __webpack_require__(/*! ./Flex */ "./src/Flex.tsx");
const useHover_1 = __webpack_require__(/*! ./hooks/useHover */ "./src/hooks/useHover.ts");
const Icon_1 = __webpack_require__(/*! ./Icon */ "./src/Icon.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const defaultRenderMenuItem = (item, index) => {
    return React.createElement(MenuItem, Object.assign({ key: index }, item));
};
const defaultRenderMenu = (styles, menuItems, renderMenuItem) => {
    return (React.createElement(Flex_1.Flex, { css: styles, key: "menu-items" }, menuItems.map(renderMenuItem)));
};
const Menu = React.forwardRef(function Menu(props, ref) {
    const { menuItems, posX = 'center', posY = 'bottom', offset, renderTrigger, renderMenuItem = defaultRenderMenuItem, renderMenu = defaultRenderMenu, hideDelay = 200, key } = props, rest = tslib_1.__rest(props, ["menuItems", "posX", "posY", "offset", "renderTrigger", "renderMenuItem", "renderMenu", "hideDelay", "key"]);
    const { menu: theme } = theme_1.useTheme();
    const [isShown, handlers] = useHover_1.useHover(false, props, hideDelay);
    const styles = exports.menuStyles();
    const listStyles = exports.menuListStyles(theme, {
        posX,
        posY,
        offset,
        hasTrigger: !!renderTrigger,
    });
    return (React.createElement(Box_1.Box, Object.assign({ key: key, ref: ref, css: styles }, rest, handlers),
        renderTrigger && renderTrigger(isShown),
        (!renderTrigger || isShown) && renderMenu(listStyles, menuItems, renderMenuItem)));
});
exports.Menu = Menu;
Menu.displayName = 'Menu';
exports.menuListStyles = (theme, { hasTrigger, posX, posY, offset }) => {
    return [
        {
            flexDirection: 'column',
            color: theme.fg,
            backgroundColor: theme.bg,
            border: `1px solid ${theme.border}`,
            borderRadius: '4px',
            zIndex: 10000,
            position: hasTrigger ? 'absolute' : 'relative',
            margin: offset && `${offset.y || 0}px ${offset.x || 0}px`,
        },
        posY === 'bottom' ? { top: '100%' } : { bottom: '100%' },
        posX === 'center' && {
            left: '50%',
            transform: 'translateX(-50%)',
        },
        posX === 'left' && { right: '100%' },
        posX === 'right' && { left: '100%' },
    ];
};
exports.menuStyles = () => {
    return [
        {
            display: 'inline-flex',
            position: 'relative',
            width: 'auto',
            overflow: 'visible',
            whiteSpace: 'nowrap',
        },
    ];
};
const MenuItem = React.forwardRef(function MenuItem(props, ref) {
    const { icon, title, subtitle, onClick, disabled } = props, rest = tslib_1.__rest(props, ["icon", "title", "subtitle", "onClick", "disabled"]);
    const { menu: theme } = theme_1.useTheme();
    const styles = menuItemStyles(theme, { disabled, onClick });
    return (React.createElement(Flex_1.Flex, Object.assign({}, rest, { ref: ref, onClick: onClick, css: styles }),
        icon && (React.createElement(Flex_1.Flex, { key: "menu-icon", alignItems: "center", justifyContent: "center", width: "20px", pr: title || subtitle ? 10 : 0 },
            React.createElement(Icon_1.Icon, { icon: icon }))),
        (title || subtitle) && (React.createElement("span", { key: "menu-title" },
            title && React.createElement("span", null, title),
            subtitle && React.createElement("span", null, subtitle)))));
});
exports.MenuItem = MenuItem;
MenuItem.displayName = 'MenuItem';
const menuItemStyles = (theme, { disabled, onClick }) => {
    return [
        {
            alignItems: 'center',
            padding: '6px 10px',
            cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
            opacity: disabled ? 0.6 : 1,
            ':hover': {
                backgroundColor: theme.hoverBg,
            },
        },
    ];
};


/***/ }),

/***/ "./src/Overlay.tsx":
/*!*************************!*\
  !*** ./src/Overlay.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const Overlay = React.forwardRef(function Overlay(props, ref) {
    const { overlay: theme } = theme_1.useTheme();
    return React.createElement(Box_1.Box, Object.assign({}, props, { ref: ref, css: exports.overlayStyles(theme) }));
});
exports.Overlay = Overlay;
Overlay.displayName = 'Overlay';
exports.overlayStyles = (theme) => {
    return {
        position: 'fixed',
        left: '0',
        top: '0',
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.bg,
        zIndex: Math.pow(2, 31) - 2,
    };
};


/***/ }),

/***/ "./src/Popup/Popup.tsx":
/*!*****************************!*\
  !*** ./src/Popup/Popup.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const useWindowResize_1 = __webpack_require__(/*! ../hooks/useWindowResize */ "./src/hooks/useWindowResize.ts");
const theme_1 = __webpack_require__(/*! ../theme */ "./src/theme/index.tsx");
const PopupContent_1 = __webpack_require__(/*! ./PopupContent */ "./src/Popup/PopupContent.tsx");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/Popup/utils.ts");
const Popup = props => {
    const { hideDelay, width, offset, posX, posY, show = false } = props;
    const theme = theme_1.useTheme();
    const controlled = 'show' in props;
    const triggerRef = React.useRef(null);
    const contentRef = React.useRef(null);
    const [visibility, setVisibility] = React.useState(false);
    const isVisible = controlled ? show : visibility;
    const lastResizeTimestamp = useWindowResize_1.useWindowResize();
    const [style, setStyle] = React.useState(utils_1.getInitialStyle(props));
    let isOverTrigger = false;
    let isOverContent = false;
    let willHide = null;
    const repaint = React.useCallback(() => {
        if (isVisible) {
            setStyle(Object.assign({}, utils_1.getDefaultStyle(props), utils_1.calculateStyles(triggerRef, contentRef, props)));
        }
    }, [triggerRef.current, contentRef.current, width, offset, posX, posY, isVisible]);
    if (typeof window !== 'undefined') {
        React.useEffect(repaint, [lastResizeTimestamp, contentRef.current]);
    }
    const showPopup = React.useCallback(() => {
        if (controlled)
            return;
        if (willHide !== null) {
            clearTimeout(willHide);
            willHide = null;
        }
        setVisibility(true);
    }, [willHide, isVisible, controlled]);
    const hidePopup = React.useCallback(() => {
        if (willHide !== null || controlled) {
            return;
        }
        willHide = setTimeout(() => {
            isOverTrigger = false;
            isOverContent = false;
            setVisibility(false);
        }, hideDelay);
    }, [willHide, isVisible, controlled]);
    const { renderTrigger, renderContent } = props;
    const funcs = {
        isVisible,
        showPopup,
        hidePopup,
    };
    const handleMouseEnter = React.useCallback(({ target }) => {
        if (target === triggerRef.current) {
            isOverTrigger = true;
        }
        else if (target === contentRef.current) {
            isOverContent = true;
        }
        showPopup();
    }, [triggerRef.current, contentRef.current, isVisible]);
    const handleMouseLeave = React.useCallback(({ target }) => {
        if (target === triggerRef.current) {
            isOverTrigger = false;
        }
        else if (target === contentRef.current) {
            isOverContent = false;
        }
        if (isVisible && !isOverTrigger && !isOverContent) {
            hidePopup();
        }
    }, [triggerRef.current, contentRef.current, isVisible]);
    return (React.createElement(React.Fragment, null,
        React.cloneElement(renderTrigger(Object.assign({}, funcs, { isOver: isOverTrigger })), {
            ref: triggerRef,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        }),
        isVisible && (React.createElement(PopupContent_1.PopupContent, { ref: contentRef, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, style: style, repaint: repaint }, renderContent(Object.assign({}, funcs, { isOver: isOverContent, theme }))))));
};
exports.Popup = Popup;
Popup.displayName = 'Popup';
Popup.defaultProps = {
    padding: 15,
    hideDelay: 200,
    posX: 'left',
    posY: 'top',
};


/***/ }),

/***/ "./src/Popup/PopupContent.tsx":
/*!************************************!*\
  !*** ./src/Popup/PopupContent.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Portal_1 = __webpack_require__(/*! ../Portal */ "./src/Portal.tsx");
const PopupContent = React.forwardRef(function PopupContent(props, ref) {
    const { children, onMouseEnter, onMouseLeave, repaint, style } = props;
    React.useEffect(repaint, []);
    return (React.createElement(Portal_1.Portal, null,
        React.createElement("div", { onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, ref: ref, style: style }, children)));
});
exports.PopupContent = PopupContent;
PopupContent.displayName = 'PopupContent';


/***/ }),

/***/ "./src/Popup/index.tsx":
/*!*****************************!*\
  !*** ./src/Popup/index.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./Popup */ "./src/Popup/Popup.tsx"), exports);


/***/ }),

/***/ "./src/Popup/utils.ts":
/*!****************************!*\
  !*** ./src/Popup/utils.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getOffset = (offset) => Object.assign({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
}, offset || null);
exports.getDefaultStyle = ({ width, padding }) => ({
    position: 'fixed',
    zIndex: 999,
    padding,
    width,
    opacity: 1,
    transition: 'opacity 0.2s',
});
exports.getInitialStyle = (args) => (Object.assign({}, exports.getDefaultStyle(args), { opacity: 0 }));
exports.calculateStyles = (trigger, content, props) => {
    if (!trigger.current || !content.current)
        return null;
    const offset = getOffset(props.offset);
    let posX = props.posX;
    const posY = props.posY;
    const style = {};
    const triggerDimensions = trigger.current.getBoundingClientRect();
    const contentDimensions = content.current.getBoundingClientRect();
    const contentWidth = props.width || contentDimensions.width;
    style.minWidth = triggerDimensions.width + 25;
    if (posY === 'center') {
        if (posX === 'left') {
            posX = 'right';
        }
        else {
            posX = 'left';
        }
    }
    if (posX === 'left' || posX === 'center') {
        style.left = triggerDimensions.left;
        if (posX === 'center') {
            style.left += triggerDimensions.width / 2 - contentWidth / 2;
        }
        else {
            style.left -= props.padding;
            if (posY === 'center') {
                style.left += triggerDimensions.width + props.padding;
            }
        }
        style.left += offset.left || 0;
        style.left -= offset.right || 0;
        style.left = Math.max(0, style.left);
        let clientWidth = 0;
        if (typeof document !== 'undefined') {
            clientWidth = document.body.clientWidth;
        }
        style.left = Math.min(style.left, clientWidth - contentWidth - 5);
    }
    else {
        style.right = window.innerWidth - triggerDimensions.left - triggerDimensions.width - props.padding;
        if (posY === 'center') {
            style.right += triggerDimensions.width + props.padding;
        }
        style.right -= offset.left;
        style.right += offset.right;
        style.right = Math.max(0, style.right);
    }
    if (posY === 'top') {
        style.bottom = window.innerHeight - triggerDimensions.top + offset.bottom;
    }
    else if (posY === 'bottom') {
        style.top = triggerDimensions.top + triggerDimensions.height + offset.top;
    }
    else {
        style.top = style.top = triggerDimensions.top + triggerDimensions.height / 2 - contentDimensions.height / 2;
        style.top += offset.top;
        style.top -= offset.bottom;
    }
    if (style.top) {
        style.top = Math.min(window.innerHeight - contentDimensions.height, style.top);
        style.top = Math.max(0, style.top);
        if (style.top + contentDimensions.height > window.innerHeight) {
            style.bottom = 0;
            style.overflow = 'auto';
        }
    }
    else if (style.bottom) {
        style.bottom = Math.min(window.innerHeight, style.bottom);
        style.bottom = Math.max(0, style.bottom);
        if (style.bottom + contentDimensions.height > window.innerHeight) {
            style.top = 0;
            style.overflow = 'auto';
        }
    }
    return style;
};


/***/ }),

/***/ "./src/Portal.tsx":
/*!************************!*\
  !*** ./src/Portal.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
class Portal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.root = typeof document === 'object' ? document.body : null;
        this.renderChildren = () => {
            const { children } = this.props;
            if (typeof children === 'function') {
                return children();
            }
            return React.Children.map(this.props.children, child => React.cloneElement(child));
        };
        if (typeof document === 'undefined' || typeof document.createElement !== 'function')
            return;
        this.el = document.createElement('div');
        if (props.className !== undefined) {
            this.el.className = props.className;
        }
    }
    componentDidMount() {
        if (this.el !== undefined && this.root !== null) {
            this.root.appendChild(this.el);
        }
    }
    componentWillUnmount() {
        if (this.el !== undefined && this.root !== null) {
            this.root.removeChild(this.el);
        }
    }
    render() {
        if (this.el === undefined) {
            return null;
        }
        return ReactDOM.createPortal(this.renderChildren(), this.el);
    }
}
exports.Portal = Portal;


/***/ }),

/***/ "./src/ScrollBox.tsx":
/*!***************************!*\
  !*** ./src/ScrollBox.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_custom_scrollbars_1 = __webpack_require__(/*! react-custom-scrollbars */ "./node_modules/react-custom-scrollbars/lib/index.js");
exports.IScrollbars = react_custom_scrollbars_1.default;
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const useScrollToHash_1 = __webpack_require__(/*! ./hooks/useScrollToHash */ "./src/hooks/useScrollToHash.ts");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const scroll_1 = __webpack_require__(/*! ./utils/scroll */ "./src/utils/scroll.ts");
const ScrollbarThumb = React.forwardRef(function ScrollbarThumb(props, ref) {
    const { isScrolling, css } = props, rest = tslib_1.__rest(props, ["isScrolling", "css"]);
    const { scrollbar: theme } = theme_1.useTheme();
    return React.createElement(Box_1.Box, Object.assign({}, rest, { ref: ref, css: [scrollbarStyles(theme, { isScrolling }), css] }));
});
ScrollbarThumb.displayName = 'ScrollbarThumb';
const scrollbarStyles = (theme, { isScrolling }) => {
    return {
        backgroundColor: theme.bg,
        borderRadius: '5px',
        cursor: 'grab',
        opacity: isScrolling ? 1 : 0,
        transition: 'opacity .1s',
    };
};
const ScrollBox = (props) => {
    const { scrollTo, children, onUpdate, autoHeight = true, autoHideTimeout = 500, innerRef } = props, scrollbarProps = tslib_1.__rest(props, ["scrollTo", "children", "onUpdate", "autoHeight", "autoHideTimeout", "innerRef"]);
    const [isScrolling, setIsScrolling] = React.useState(null);
    useScrollToHash_1.useScrollToHash(scrollTo);
    const scrollbars = innerRef || React.useRef(null);
    const position = (scrollbars.current && scrollbars.current.getValues()) || {};
    const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = position;
    const thumbHorizontal = scroll_1.getThumbDimension({ scroll: scrollWidth, client: clientWidth }) || 0;
    const thumbVertical = scroll_1.getThumbDimension({ scroll: scrollHeight, client: clientHeight }) || 0;
    return (React.createElement(react_custom_scrollbars_1.default, Object.assign({}, scrollbarProps, { ref: scrollbars, autoHideTimeout: autoHideTimeout, autoHeight: autoHeight, onUpdate: onUpdate, onScroll: (e) => {
            if (isScrolling !== null) {
                clearTimeout(isScrolling);
            }
            setIsScrolling(setTimeout(() => {
                setIsScrolling(null);
            }, autoHideTimeout));
        }, renderView: ({ style }) => {
            return (React.createElement("div", { style: Object.assign({}, style, { marginRight: '-15px', marginBottom: '-15px' }) }));
        }, renderTrackHorizontal: () => React.createElement("div", { style: scroll_1.horizontalTrackStyle() }), renderThumbHorizontal: () => (React.createElement(ScrollbarThumb, { isScrolling: isScrolling !== null, height: "6px", width: thumbHorizontal, transform: `translateX(${scroll_1.getScrollTransform(clientWidth, scrollWidth, scrollLeft, thumbHorizontal)}px)` })), renderTrackVertical: () => React.createElement("div", { style: scroll_1.verticalTrackStyle() }), renderThumbVertical: () => (React.createElement(ScrollbarThumb, { isScrolling: isScrolling !== null, height: thumbVertical, width: "6px", transform: `translateY(${scroll_1.getScrollTransform(clientHeight, scrollHeight, scrollTop, thumbVertical)}px)` })) }), children));
};
exports.ScrollBox = ScrollBox;
ScrollBox.displayName = 'ScrollBox';


/***/ }),

/***/ "./src/ScrollList.tsx":
/*!****************************!*\
  !*** ./src/ScrollList.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const core_1 = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const ReactWindow = __webpack_require__(/*! react-window */ "./node_modules/react-window/dist/index.esm.js");
const AutoSizer_1 = __webpack_require__(/*! ./AutoSizer */ "./src/AutoSizer.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
var react_window_1 = __webpack_require__(/*! react-window */ "./node_modules/react-window/dist/index.esm.js");
exports.areEqual = react_window_1.areEqual;
exports.shouldComponentUpdate = react_window_1.shouldComponentUpdate;
exports.IFixedSizeList = react_window_1.FixedSizeList;
exports.IVariableSizeList = react_window_1.VariableSizeList;
const FixedSizeList = react_1.forwardRef(function FixedSizeList(props, ref) {
    const { scrollbar: theme } = theme_1.useTheme();
    const { width, height, css } = props, rest = tslib_1.__rest(props, ["width", "height", "css"]);
    return (core_1.jsx(AutoSizer_1.AutoSizer, { width: width, height: height }, ({ width: listWidth, height: listHeight }) => (core_1.jsx(ReactWindow.FixedSizeList, Object.assign({}, rest, { ref: ref, css: exports.scrollListStyles(theme, css), height: listHeight, width: listWidth })))));
});
exports.FixedSizeList = FixedSizeList;
FixedSizeList.displayName = 'FixedSizeList';
const VariableSizeList = react_1.forwardRef(function VariableSizeList(props, ref) {
    const { width, height, css } = props, rest = tslib_1.__rest(props, ["width", "height", "css"]);
    const { scrollbar: theme } = theme_1.useTheme();
    return (core_1.jsx(AutoSizer_1.AutoSizer, { width: width, height: height }, ({ width: listWidth, height: listHeight }) => (core_1.jsx(ReactWindow.VariableSizeList, Object.assign({}, rest, { ref: ref, css: exports.scrollListStyles(theme, css), height: listHeight, width: listWidth })))));
});
exports.VariableSizeList = VariableSizeList;
VariableSizeList.displayName = 'VariableSizeList';
exports.scrollListStyles = (theme, css) => {
    return [
        core_1.css `
      &::-webkit-scrollbar {
        height: 6px;
        background-color: transparent;
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${theme.bg};
        border-radius: 10px;
      }

      scrollbar-color: ${theme.bg} transparent;
      scrollbar-width: thin;
    `,
        css,
    ];
};


/***/ }),

/***/ "./src/Select.tsx":
/*!************************!*\
  !*** ./src/Select.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_select_1 = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
const Async_1 = __webpack_require__(/*! react-select/lib/Async */ "./node_modules/react-select/lib/Async.js");
const AsyncCreatable_1 = __webpack_require__(/*! react-select/lib/AsyncCreatable */ "./node_modules/react-select/lib/AsyncCreatable.js");
const Creatable_1 = __webpack_require__(/*! react-select/lib/Creatable */ "./node_modules/react-select/lib/Creatable.js");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const types_1 = __webpack_require__(/*! ./types */ "./src/types.ts");
const getVariant_1 = __webpack_require__(/*! ./utils/getVariant */ "./src/utils/getVariant.ts");
const Select = props => {
    const { multi, loading, disabled, clearable, searchable, searchValue, isOpen, onOpen, onClose, onSearch, onScrollToTop, onScrollToBottom, blurOnSelect = !props.multi, closeOnSelect = !props.multi, closeOnScroll = false, loadingMessage = 'Loading...', noOptionsMessage = 'No Options', allowCreate = false, variant = types_1.Variant.Default } = props, selectProps = tslib_1.__rest(props, ["multi", "loading", "disabled", "clearable", "searchable", "searchValue", "isOpen", "onOpen", "onClose", "onSearch", "onScrollToTop", "onScrollToBottom", "blurOnSelect", "closeOnSelect", "closeOnScroll", "loadingMessage", "noOptionsMessage", "allowCreate", "variant"]);
    const { select: theme } = theme_1.useTheme();
    const actualProps = Object.assign({ blurInputOnSelect: blurOnSelect, closeMenuOnSelect: closeOnSelect, closeMenuOnScroll: closeOnScroll, inputValue: searchValue, isClearable: clearable, isDisabled: disabled, isLoading: loading, isMulti: multi, menuIsOpen: isOpen, isSearchable: searchable, loadingMessage: () => loadingMessage, noOptionsMessage: () => noOptionsMessage, onInputChange: onSearch, onMenuOpen: onOpen, onMenuClose: onClose, onMenuScrollToTop: onScrollToTop, onMenuScrollToBottom: onScrollToBottom }, selectProps, { styles: selectProps.styles || exports.selectStyles(theme, variant) });
    if ('loadOptions' in props && ('onCreateOption' in props || allowCreate)) {
        return React.createElement(AsyncCreatable_1.default, Object.assign({}, actualProps));
    }
    if ('loadOptions' in props) {
        return React.createElement(Async_1.default, Object.assign({}, actualProps));
    }
    if ('onCreateOption' in props || allowCreate) {
        return React.createElement(Creatable_1.default, Object.assign({}, actualProps));
    }
    return React.createElement(react_select_1.default, Object.assign({}, actualProps));
};
exports.Select = Select;
exports.selectStyles = (baseTheme, variant) => {
    if (!baseTheme) {
        return {};
    }
    const { chip: chipTheme, menu: menuTheme } = baseTheme;
    const theme = Object.assign({}, baseTheme, getVariant_1.getVariant(baseTheme, variant));
    return {
        clearIndicator: (provided, { isDisabled }) => (Object.assign({}, provided, { color: theme.border || theme.fg, padding: '0px', ':hover': {
                color: theme.border || theme.fg,
                opacity: !isDisabled && 0.6,
            } })),
        container: (provided) => (Object.assign({}, provided, { pointerEvents: null })),
        control: (provided, { isDisabled }) => (Object.assign({}, provided, { color: theme.fg, backgroundColor: theme.bg, border: theme.border ? `1px solid ${theme.border}` : 'none', minWidth: '147px', minHeight: '35px', padding: '0px 5px 0px 10px', boxSizing: 'border-box', fontSize: '11px', borderRadius: '2px', boxShadow: null, outline: '0 !important', cursor: isDisabled ? 'not-allowed' : 'pointer', opacity: isDisabled && 0.6, ':hover': {
                borderColor: theme.border,
            } })),
        dropdownIndicator: (provided, { isDisabled }) => (Object.assign({}, provided, { color: theme.border || theme.fg, padding: '0px', ':hover': {
                color: theme.border || theme.fg,
                opacity: !isDisabled && 0.6,
            } })),
        indicatorSeparator: (provided) => (Object.assign({}, provided, { backgroundColor: theme.border || theme.fg, marginLeft: '5px', marginRight: '5px' })),
        input: (provided, { isDisabled }) => (Object.assign({}, provided, { color: theme.fg, padding: '0px', cursor: isDisabled ? 'not-allowed' : 'pointer', userSelect: 'none' })),
        loadingIndicator: (provided) => (Object.assign({}, provided, { color: theme.border || theme.fg, padding: '0px' })),
        loadingMessage: (provided) => (Object.assign({}, provided, { color: menuTheme.fg, padding: '0px', fontSize: '14px' })),
        menu: (provided) => (Object.assign({}, provided, { color: menuTheme.fg, backgroundColor: menuTheme.bg, border: menuTheme.border ? `1px solid ${menuTheme.border}` : 'none', zIndex: 10000, padding: '5px 7px', borderRadius: '3px', minWidth: '180px', maxWidth: '280px', boxShadow: 'none' })),
        multiValue: (provided) => (Object.assign({}, provided, { alignItems: 'center', color: chipTheme.fg, backgroundColor: chipTheme.bg, fontWeight: 500, margin: '0px 5px 0px 0px', borderRadius: '3px', overflow: 'hidden', borderWidth: '1px', borderStyle: 'solid', borderColor: chipTheme.border })),
        multiValueLabel: (provided) => (Object.assign({}, provided, { color: chipTheme.fg, backgroundColor: chipTheme.bg, borderRadius: '0px' })),
        multiValueRemove: (provided) => (Object.assign({}, provided, { color: chipTheme.fg, backgroundColor: chipTheme.bg, paddingLeft: '0px', borderRadius: '0px', ':hover': {
                color: chipTheme.fg,
                backgroundColor: chipTheme.bg,
            } })),
        noOptionsMessage: (provided) => (Object.assign({}, provided, { color: menuTheme.fg, fontSize: '14px', padding: '0px' })),
        option: (provided, { isMulti, isSelected }) => {
            return Object.assign({}, provided, { padding: '5px 7px', fontSize: '14px', borderRadius: '2px', cursor: isMulti || !isSelected ? 'pointer' : 'default', color: menuTheme.fg, backgroundColor: isSelected ? menuTheme.selectedBg : 'transparent', ':active': {
                    backgroundColor: isSelected ? menuTheme.selectedBg : menuTheme.hoverBg,
                }, ':hover': {
                    backgroundColor: isSelected ? menuTheme.selectedBg : menuTheme.hoverBg,
                } });
        },
        placeholder: (provided) => (Object.assign({}, provided, { color: theme.fg, opacity: 0.6 })),
        singleValue: (provided) => (Object.assign({}, provided, { color: theme.fg, padding: '0px' })),
        valueContainer: (provided) => (Object.assign({}, provided, { padding: '0px' })),
    };
};


/***/ }),

/***/ "./src/Table.tsx":
/*!***********************!*\
  !*** ./src/Table.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const Table = React.forwardRef(function Table(props, ref) {
    const { children, isSelected, css } = props, rest = tslib_1.__rest(props, ["children", "isSelected", "css"]);
    const { table: theme } = theme_1.useTheme();
    return (React.createElement(Box_1.Box, Object.assign({}, rest, { as: "table", ref: ref, css: [exports.tableStyles(theme, { isSelected }), css] }),
        React.createElement("tbody", null, children)));
});
exports.Table = Table;
Table.displayName = 'Table';
exports.tableStyles = (theme, { isSelected }) => {
    return [
        {
            border: '1px solid',
            borderCollapse: 'collapse',
            borderColor: theme.border,
            tr: {
                '&:first-of-type': {
                    fontWeight: 'bold',
                },
            },
        },
        isSelected && {
            boxShadow: theme.shadow,
        },
    ];
};
const TableRow = React.forwardRef(function TableRow(props, ref) {
    const { table: theme } = theme_1.useTheme();
    return React.createElement(Box_1.Box, Object.assign({}, props, { as: "tr", ref: ref, css: exports.tableRowStyles(theme) }));
});
exports.TableRow = TableRow;
exports.tableRowStyles = (theme) => {
    return [
        {
            border: '0 none',
            borderBottom: '1px solid',
            borderColor: theme.border,
            '&:last-child': {
                borderBottom: '0 none',
            },
            '&:nth-of-type(even)': {
                backgroundColor: theme.evenBg,
            },
        },
    ];
};
TableRow.displayName = 'TableRow';
const TableCell = React.forwardRef(function TableCell(props, ref) {
    const { as = 'td', isSelected, textAlign } = props, rest = tslib_1.__rest(props, ["as", "isSelected", "textAlign"]);
    const { table: theme } = theme_1.useTheme();
    return React.createElement(Box_1.Box, Object.assign({}, rest, { as: as, ref: ref, css: exports.tableCellStyles(theme, { as, isSelected, textAlign }) }));
});
exports.TableCell = TableCell;
TableCell.displayName = 'TableCell';
const textAlignPadding = {
    left: '10px 40px 10px 15px',
    center: '10px 15px 10px 15px',
    right: '10px 15px 10px 40px',
};
exports.tableCellStyles = (theme, { isSelected, textAlign = 'left' }) => {
    return [
        {
            border: '0 none',
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderColor: theme.border,
            textAlign,
            padding: textAlignPadding[textAlign],
            '&:first-of-type': {
                borderLeft: '0 none',
            },
            '&:last-child': {
                borderRight: '0 none',
            },
        },
        isSelected && {
            boxShadow: theme.shadow,
        },
    ];
};


/***/ }),

/***/ "./src/Tabs/Tab.tsx":
/*!**************************!*\
  !*** ./src/Tabs/Tab.tsx ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const core_1 = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
const react_tabs_1 = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");
const theme_1 = __webpack_require__(/*! ../theme */ "./src/theme/index.tsx");
const StyledTab = props => {
    const { tabs: theme } = theme_1.useTheme();
    const styles = tabStyles(theme);
    const { children, ref } = props, rest = tslib_1.__rest(props, ["children", "ref"]);
    return (core_1.jsx(core_1.ClassNames, null, ({ css: getClassName }) => (core_1.jsx(react_tabs_1.Tab, Object.assign({}, rest, { className: getClassName(styles.tabStyle), disabledClassName: getClassName(styles.disabledTabStyle), selectedClassName: getClassName(styles.selectedTabStyle) }), children))));
};
exports.Tab = StyledTab;
StyledTab.tabsRole = 'Tab';
const tabStyles = (theme) => {
    return {
        tabStyle: {
            display: 'inline-block',
            border: `1px solid ${theme.border}`,
            fontWeight: 'bold',
            bottom: '-1px',
            position: 'relative',
            listStyle: 'none',
            padding: '8px 15px',
            cursor: 'pointer',
            backgroundColor: theme.bg,
            color: theme.fg,
            zIndex: 2,
            marginLeft: -1,
            ':first-of-type': {
                borderTopLeftRadius: '3px',
                marginLeft: 0,
            },
            ':last-of-type': {
                borderTopRightRadius: '3px',
            },
            ':focus': {
                outline: 'none',
            },
            ':hover': {
                color: theme.selectedFg,
            },
        },
        selectedTabStyle: {
            backgroundColor: theme.selectedBg,
            borderBottomColor: theme.selectedBg,
            color: theme.selectedFg,
        },
        disabledTabStyle: {
            cursor: 'default',
            opacity: 0.5,
        },
    };
};


/***/ }),

/***/ "./src/Tabs/TabList.tsx":
/*!******************************!*\
  !*** ./src/Tabs/TabList.tsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const core_1 = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
const react_tabs_1 = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");
const StyledTabList = props => {
    const { children, ref } = props, rest = tslib_1.__rest(props, ["children", "ref"]);
    return (core_1.jsx(react_tabs_1.TabList, Object.assign({}, rest, { css: tabListStyle }), children));
};
exports.TabList = StyledTabList;
StyledTabList.tabsRole = 'TabList';
const tabListStyle = {
    margin: '0',
    padding: '0',
    userSelect: 'none',
};


/***/ }),

/***/ "./src/Tabs/TabPanel.tsx":
/*!*******************************!*\
  !*** ./src/Tabs/TabPanel.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const core_1 = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_tabs_1 = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");
const theme_1 = __webpack_require__(/*! ../theme */ "./src/theme/index.tsx");
const StyledTabPanel = props => {
    const { children, ref } = props, rest = tslib_1.__rest(props, ["children", "ref"]);
    const { tabs: theme } = theme_1.useTheme();
    const tabPanelCSS = tabPanelStyle(theme);
    return (React.createElement(core_1.ClassNames, null, ({ css: getClassName }) => (React.createElement(react_tabs_1.TabPanel, Object.assign({}, rest, { className: getClassName(tabPanelCSS), selectedClassName: getClassName(selectedTabPanelStyle) }), children))));
};
exports.TabPanel = StyledTabPanel;
StyledTabPanel.tabsRole = 'TabPanel';
const tabPanelStyle = (theme) => {
    return {
        border: `1px solid ${theme.border}`,
        display: 'none',
        padding: '25px',
        borderRadius: 3,
    };
};
const selectedTabPanelStyle = { display: 'block' };


/***/ }),

/***/ "./src/Tabs/index.tsx":
/*!****************************!*\
  !*** ./src/Tabs/index.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const react_tabs_1 = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");
exports.Tabs = react_tabs_1.Tabs;
const Tab_1 = __webpack_require__(/*! ./Tab */ "./src/Tabs/Tab.tsx");
exports.Tab = Tab_1.Tab;
const TabList_1 = __webpack_require__(/*! ./TabList */ "./src/Tabs/TabList.tsx");
exports.TabList = TabList_1.TabList;
const TabPanel_1 = __webpack_require__(/*! ./TabPanel */ "./src/Tabs/TabPanel.tsx");
exports.TabPanel = TabPanel_1.TabPanel;


/***/ }),

/***/ "./src/Text.tsx":
/*!**********************!*\
  !*** ./src/Text.tsx ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const Text = React.forwardRef(function Text(props, ref) {
    const { as = 'p', leading: lineHeight, casing: textTransform, tracking: letterSpacing, italic, css } = props, rest = tslib_1.__rest(props, ["as", "leading", "casing", "tracking", "italic", "css"]);
    return (React.createElement(Box_1.Box, Object.assign({}, rest, { letterSpacing: letterSpacing, lineHeight: lineHeight, textTransform: textTransform, fontStyle: italic ? 'italic' : undefined, as: as, ref: ref, css: [exports.textStyles(), css] })));
});
exports.Text = Text;
Text.displayName = 'Text';
exports.textStyles = () => ({
    margin: '0',
});


/***/ }),

/***/ "./src/Textarea.tsx":
/*!**************************!*\
  !*** ./src/Textarea.tsx ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const noop = __webpack_require__(/*! lodash/noop */ "./node_modules/lodash/noop.js");
const react_textarea_autosize_1 = __webpack_require__(/*! react-textarea-autosize */ "./node_modules/react-textarea-autosize/dist/react-textarea-autosize.esm.browser.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const getVariant_1 = __webpack_require__(/*! ./utils/getVariant */ "./src/utils/getVariant.ts");
const Textarea = React.forwardRef(function Textarea(props, ref) {
    const { autosize, onChange = noop, variant, css } = props, rest = tslib_1.__rest(props, ["autosize", "onChange", "variant", "css"]);
    const { textarea: theme } = theme_1.useTheme();
    const [value, setValue] = React.useState(props.value || '');
    const internalValue = props.hasOwnProperty('value') ? props.value : value;
    const handleChange = (event) => {
        setValue(event.currentTarget.value);
        onChange(event);
    };
    return (React.createElement(Box_1.Box, Object.assign({}, rest, { as: autosize ? react_textarea_autosize_1.default : 'textarea', ref: ref, value: internalValue, onChange: handleChange, css: [exports.textareaStyles(theme, props), css] })));
});
exports.Textarea = Textarea;
Textarea.displayName = 'Textarea';
exports.textareaStyles = (baseTheme, { autosize, disabled, variant }) => {
    const theme = Object.assign({}, baseTheme, getVariant_1.getVariant(baseTheme, variant));
    return [
        {
            color: theme.fg,
            backgroundColor: theme.bg,
            border: theme.border ? `1px solid ${theme.border}` : 'none',
            padding: '7px 10px',
            minHeight: '30px',
            minWidth: '147px',
            lineHeight: '15px',
            borderRadius: '3px',
            boxSizing: 'border-box',
            ':focus': {
                outline: 'none',
            },
        },
        disabled && {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
        autosize && {
            resize: 'none',
        },
    ];
};


/***/ }),

/***/ "./src/Toast/ToastContainer.tsx":
/*!**************************************!*\
  !*** ./src/Toast/ToastContainer.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const core_1 = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_toastify_1 = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
__webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
const theme_1 = __webpack_require__(/*! ../theme */ "./src/theme/index.tsx");
const index_1 = __webpack_require__(/*! ./index */ "./src/Toast/index.tsx");
exports.ToastContainer = (props) => {
    const { toast: theme } = theme_1.useTheme();
    const { transition = 'zoom' } = props, containerProps = tslib_1.__rest(props, ["transition"]);
    return (React.createElement(core_1.ClassNames, null, ({ css: getClassName }) => (React.createElement(react_toastify_1.ToastContainer, Object.assign({ progressClassName: getClassName(progressStyles(theme)), toastClassName: getClassName(toastStyles()), bodyClassName: getClassName(bodyStyles()), closeOnClick: false, position: "bottom-right", transition: index_1.ToastTransitionMap[transition] }, containerProps, { closeButton: false })))));
};
const progressStyles = (theme) => ({
    background: theme.progressBg,
    margin: '0px 10px 5px 10px',
    borderRadius: '9999px',
});
const bodyStyles = () => ({
    margin: 0,
    width: '100%',
    cursor: 'default',
});
const toastStyles = () => ({
    padding: 0,
    borderRadius: 2,
});


/***/ }),

/***/ "./src/Toast/ToastContent.tsx":
/*!************************************!*\
  !*** ./src/Toast/ToastContent.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const noop = __webpack_require__(/*! lodash/noop */ "./node_modules/lodash/noop.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ../Box */ "./src/Box.tsx");
const Button_1 = __webpack_require__(/*! ../Button */ "./src/Button.tsx");
const Flex_1 = __webpack_require__(/*! ../Flex */ "./src/Flex.tsx");
const Icon_1 = __webpack_require__(/*! ../Icon */ "./src/Icon.tsx");
const Text_1 = __webpack_require__(/*! ../Text */ "./src/Text.tsx");
const theme_1 = __webpack_require__(/*! ../theme */ "./src/theme/index.tsx");
const ToastContent = React.forwardRef(function ToastContent(props, ref) {
    const { title, message, type = 'default', icon, closeIcon, actions = [], closeToast = noop, css } = props, rest = tslib_1.__rest(props, ["title", "message", "type", "icon", "closeIcon", "actions", "closeToast", "css"]);
    const { toast: theme } = theme_1.useTheme();
    const showCloseIcon = closeIcon !== false;
    const toastActions = actions.map((action, index) => {
        const { label, onClick = noop, css: buttonCss = {} } = action, buttonProps = tslib_1.__rest(action, ["label", "onClick", "css"]);
        return (React.createElement(Button_1.Button, Object.assign({ key: index, m: "5px", color: theme.actionFg, backgroundColor: theme.actionBg, border: "transparent", css: Object.assign({}, { ':hover': { backgroundColor: 'inherit', ':active': { border: 'inherit' } } }, buttonCss), onClick: () => {
                onClick({ closeToast });
            } }, buttonProps), label));
    });
    return (React.createElement(Flex_1.Flex, Object.assign({ justifyContent: "center", flexDirection: "column" }, rest, { ref: ref, css: [exports.toastContentStyles(props, theme), css] }),
        showCloseIcon && (React.createElement(Icon_1.Icon, { icon: closeIcon || 'times', onClick: closeToast, position: "absolute", cursor: "pointer", right: 10, top: 10 })),
        React.createElement(Flex_1.Flex, { alignItems: "center" },
            icon && React.createElement(Icon_1.Icon, { mr: "5px", icon: icon, color: theme.toastFg }),
            React.createElement(Box_1.Box, null,
                title && (React.createElement(Text_1.Text, { letterSpacing: "0.5px", fontWeight: 600 }, title)),
                message && (React.createElement(Text_1.Text, { maxHeight: "120px", overflow: "auto" }, message)),
                toastActions.length ? (React.createElement(Flex_1.Flex, { mt: "10px", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }, toastActions)) : null))));
});
exports.ToastContent = ToastContent;
ToastContent.displayName = 'ToastContent';
exports.toastContentStyles = (props, theme) => {
    const type = props.type;
    return [
        {
            background: theme.toastBg,
            color: theme.toastFg,
            borderLeft: type && `4px solid ${theme[type]}`,
            boxSizing: 'border-box',
            fontSize: '15px',
            padding: '15px',
            height: '100%',
        },
    ];
};


/***/ }),

/***/ "./src/Toast/index.tsx":
/*!*****************************!*\
  !*** ./src/Toast/index.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const isNil = __webpack_require__(/*! lodash/isNil */ "./node_modules/lodash/isNil.js");
const pickBy = __webpack_require__(/*! lodash/pickBy */ "./node_modules/lodash/pickBy.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const react_toastify_1 = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
__webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
const ToastContent_1 = __webpack_require__(/*! ./ToastContent */ "./src/Toast/ToastContent.tsx");
function Toast(options) {
    const { actions = [], type = 'default', transition, onOpen, onClose, toastId, progress, pauseOnHover, pauseOnFocusLoss, closeOnClick, autoClose, position, progressClassName, progressStyle, className, bodyClassName, hideProgressBar, draggable, draggablePercent } = options, contentProps = tslib_1.__rest(options, ["actions", "type", "transition", "onOpen", "onClose", "toastId", "progress", "pauseOnHover", "pauseOnFocusLoss", "closeOnClick", "autoClose", "position", "progressClassName", "progressStyle", "className", "bodyClassName", "hideProgressBar", "draggable", "draggablePercent"]);
    return react_toastify_1.toast(React.createElement(ToastContent_1.ToastContent, Object.assign({ type: type, actions: actions }, contentProps)), pickBy({
        onOpen,
        onClose,
        toastId,
        progress,
        pauseOnHover,
        pauseOnFocusLoss,
        closeOnClick,
        position,
        progressClassName,
        progressStyle,
        className,
        bodyClassName,
        hideProgressBar,
        draggable,
        draggablePercent,
        autoClose: options.hasOwnProperty('autoClose') ? autoClose : actions.length ? false : undefined,
        transition: transition && exports.ToastTransitionMap[transition],
    }, val => !isNil(val)));
}
exports.Toast = Toast;
exports.ToastTransitionMap = {
    bounce: react_toastify_1.Bounce,
    flip: react_toastify_1.Flip,
    slide: react_toastify_1.Slide,
    zoom: react_toastify_1.Zoom,
};
tslib_1.__exportStar(__webpack_require__(/*! ./ToastContent */ "./src/Toast/ToastContent.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./ToastContainer */ "./src/Toast/ToastContainer.tsx"), exports);


/***/ }),

/***/ "./src/Toggle.tsx":
/*!************************!*\
  !*** ./src/Toggle.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const _1 = __webpack_require__(/*! ./ */ "./src/index.ts");
const Toggle = React.forwardRef(function Toggle(props, ref) {
    const { disabled: isDisabled, onChange, css } = props, rest = tslib_1.__rest(props, ["disabled", "onChange", "css"]);
    const { toggle: theme } = _1.useTheme();
    const [checked, setValue] = React.useState(!!props.checked);
    const isChecked = props.hasOwnProperty('checked') ? !!props.checked : checked;
    const handleChange = React.useCallback(({ target }) => {
        setValue(target.checked);
        if (onChange)
            onChange(target.checked);
    }, []);
    return (React.createElement(_1.Flex, Object.assign({}, rest, { as: "label", ref: ref, css: [toggleStyles(theme, { isDisabled, isChecked }), css] }),
        React.createElement(_1.Box, { as: "input", type: "checkbox", checked: checked, onChange: handleChange, position: "absolute", css: { clip: 'rect(1px, 1px, 1px, 1px)' } }),
        React.createElement(_1.Box, { as: "span", css: circleStyles(theme, { isChecked }) })));
});
exports.Toggle = Toggle;
Toggle.displayName = 'Toggle';
const toggleStyles = (theme, { isDisabled, isChecked }) => {
    return [
        {
            backgroundColor: theme.bg,
            border: theme.border ? `1px solid ${theme.border}` : 'none',
            height: '16px',
            width: '32px',
            padding: 0,
            margin: 0,
            borderRadius: '100px',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'background-color .15s ease-in-out',
        },
        isChecked && {
            backgroundColor: theme.checked,
        },
        isDisabled && {
            cursor: 'not-allowed',
            opacity: 0.6,
        },
    ];
};
const circleStyles = (theme, { isChecked }) => {
    return [
        {
            backgroundColor: theme.fg,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            marginLeft: '4px',
            display: 'inline-block',
            transition: 'margin-left .15s ease-in-out',
        },
        isChecked && {
            marginLeft: '18px',
        },
    ];
};


/***/ }),

/***/ "./src/Tooltip.tsx":
/*!*************************!*\
  !*** ./src/Tooltip.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const capitalize = __webpack_require__(/*! lodash/capitalize */ "./node_modules/lodash/capitalize.js");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/Box.tsx");
const Flex_1 = __webpack_require__(/*! ./Flex */ "./src/Flex.tsx");
const theme_1 = __webpack_require__(/*! ./theme */ "./src/theme/index.tsx");
const getVariant_1 = __webpack_require__(/*! ./utils/getVariant */ "./src/utils/getVariant.ts");
const Tooltip = React.forwardRef(function Tooltip(props, ref) {
    const { children, posX, posY, variant, css } = props, rest = tslib_1.__rest(props, ["children", "posX", "posY", "variant", "css"]);
    const { tooltip: theme } = theme_1.useTheme();
    return (React.createElement(Box_1.Box, Object.assign({}, rest, { css: tooltipStyles(theme, props), ref: ref }),
        React.createElement(Caret, Object.assign({}, props)),
        React.createElement(Flex_1.Flex, { position: "relative" },
            React.createElement(Box_1.Box, { css: contentStyles(theme, props) }, children))));
});
exports.Tooltip = Tooltip;
Tooltip.displayName = 'Tooltip';
const Caret = React.forwardRef(function Caret(props, ref) {
    const { tooltip: theme } = theme_1.useTheme();
    return React.createElement(Box_1.Box, { position: "absolute", style: caretStyles(theme, props), ref: ref });
});
exports.Caret = Caret;
Caret.displayName = 'Caret';
const tooltipStyles = (baseTheme, { variant, posX = 'left', posY = 'top', css }) => {
    const theme = Object.assign({}, baseTheme, getVariant_1.getVariant(baseTheme, variant));
    const margin = {};
    if (posY !== 'center') {
        margin[opposingMargin(posY)] = `${caretHeight}px`;
    }
    else if (posY === 'center' && posX !== 'center') {
        margin[opposingMargin(posX)] = `${caretHeight}px`;
    }
    return [
        Object.assign({ color: theme.fg, backgroundColor: theme.bg, border: `1px solid ${theme.border || theme.fg}`, position: 'relative', borderRadius: 2, margin: 0, display: 'inline-block', maxWidth: 400 }, margin),
        css,
    ];
};
const contentStyles = (baseTheme, { variant }) => {
    const theme = Object.assign({}, baseTheme, getVariant_1.getVariant(baseTheme, variant));
    return [
        {
            backgroundColor: theme.bg,
            margin: `2px 5px`,
            padding: 8,
        },
    ];
};
const caretStyles = (baseTheme, { variant, posX = 'left', posY = 'top' }) => {
    const theme = Object.assign({}, baseTheme, getVariant_1.getVariant(baseTheme, variant));
    const s = {};
    s.width = `${sz}px`;
    s.height = `${sz}px`;
    s.border = `${b}px solid ${theme.border}`;
    s.backgroundColor = theme.bg;
    if (posY === 'bottom') {
        if (posX === 'right') {
            caretCorner(s, 'top', 'left');
            rotate(s, 'top', 'right');
            move(s, 'top', 'right');
        }
        else if (posX === 'center') {
            caretCorner(s, 'top', 'left');
            rotate(s, 'center', 'center');
            move(s, 'top', 'center');
        }
        else if (posX === 'left') {
            caretCorner(s, 'top', 'right');
            rotate(s, 'top', 'left');
            move(s, 'top', 'left');
        }
    }
    else if (posY === 'top') {
        if (posX === 'right') {
            caretCorner(s, 'bottom', 'left');
            rotate(s, 'bottom', 'right');
            move(s, 'bottom', 'right');
        }
        else if (posX === 'center') {
            caretCorner(s, 'bottom', 'right');
            rotate(s, 'center', 'center');
            move(s, 'bottom', 'center');
        }
        else if (posX === 'left') {
            caretCorner(s, 'bottom', 'right');
            rotate(s, 'bottom', 'left');
            move(s, 'bottom', 'left');
        }
    }
    else if (posY === 'center') {
        if (posX === 'right') {
            caretCorner(s, 'top', 'left');
            rotate(s, 'top', 'left');
            move(s, 'center', 'left');
        }
        else if (posX === 'center') {
            s.visibility = 'hidden';
        }
        else if (posX === 'left') {
            caretCorner(s, 'top', 'right');
            rotate(s, 'top', 'right');
            move(s, 'center', 'right');
        }
    }
    return s;
};
const b = 1;
const sz = 12;
const caretHeight = (sz * Math.SQRT2) / 2;
const oppositeSide = (side) => {
    switch (side) {
        case 'center':
            return 'center';
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        case 'top':
            return 'bottom';
        case 'bottom':
            return 'top';
    }
};
const opposingMargin = (side) => 'margin' + capitalize(oppositeSide(side));
const opposingBorderWidth = (side) => 'border' + capitalize(oppositeSide(side)) + 'Width';
const rotate = (styles, side1, side2) => {
    if (side1 !== 'center' && side2 !== 'center') {
        styles.transformOrigin = `${side1} ${side2}`;
        const signs = [[-1, 1], [1, -1]];
        const sign = signs[side1 === 'top' ? 0 : 1][side2 === 'left' ? 0 : 1];
        const deg = 45 * sign;
        styles.transform = `rotate(${deg}deg)`;
    }
    else {
        styles.transform = 'rotate(45deg)';
    }
};
const move = (styles, side1, side2) => {
    if (side1 !== 'center') {
        if (side2 !== 'center') {
            styles[side1] = `-${b}px`;
            styles[side2] = `${sz}px`;
        }
        else {
            styles[side1] = `-${b + sz / 2}px`;
            styles.left = `calc(50% - ${caretHeight}px)`;
        }
    }
    else {
        styles.top = '50%';
        styles[side2] = `-${b + caretHeight}px`;
    }
};
const caretCorner = (styles, side1, side2) => {
    styles[opposingBorderWidth(side1)] = 0;
    styles[opposingBorderWidth(side2)] = 0;
};


/***/ }),

/***/ "./src/__stories__/Code/Editor.tsx":
/*!*****************************************!*\
  !*** ./src/__stories__/Code/Editor.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const storybook_state_1 = __webpack_require__(/*! @sambego/storybook-state */ "./node_modules/@sambego/storybook-state/dist/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Editor_1 = __webpack_require__(/*! ../../Code/Editor */ "./src/Code/Editor.tsx");
const store = new storybook_state_1.Store({
    value: 'stoplight.uiKit();',
});
exports.codeEditorKnobs = (tabName = 'Code Editor') => ({
    language: react_1.text('language', 'javascript', tabName),
    value: react_1.text('value', 'const defaultValue = stoplight.io();', tabName),
    onChange: addon_actions_1.action('onChange'),
});
react_2.storiesOf('Code|Editor', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => React.createElement(Editor_1.Editor, Object.assign({}, exports.codeEditorKnobs(), { onChange: addon_actions_1.action('onChange') })))
    .add('with store', () => (React.createElement(storybook_state_1.State, { store: store },
    React.createElement(Editor_1.Editor, Object.assign({}, exports.codeEditorKnobs(), { value: store.get('value'), onChange: (value) => store.set({ value }) })))))
    .add('with store autofocus', () => (React.createElement(storybook_state_1.State, { store: store },
    React.createElement(Editor_1.Editor, Object.assign({}, exports.codeEditorKnobs(), { value: store.get('value'), onChange: (value) => store.set({ value }), autoFocus: true })))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Code/Viewer.tsx":
/*!*****************************************!*\
  !*** ./src/__stories__/Code/Viewer.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ../../Box */ "./src/Box.tsx");
const Viewer_1 = __webpack_require__(/*! ../../Code/Viewer */ "./src/Code/Viewer.tsx");
exports.codeViewerKnobs = (tabName = 'Code Viewer') => ({
    language: react_1.text('language', 'javascript', tabName),
    value: react_1.text('value', 'const defaultValue = stoplight.io();', tabName),
    inline: addon_knobs_1.boolean('inline', false, tabName),
    showLineNumbers: addon_knobs_1.boolean('showLineNumbers', false, tabName),
});
react_2.storiesOf('Code|Viewer', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement(Box_1.Box, { maxWidth: "500px" },
    React.createElement(Viewer_1.Viewer, Object.assign({}, exports.codeViewerKnobs())))))
    .add('inline', () => (React.createElement(Box_1.Box, { maxWidth: "500px" },
    React.createElement(Viewer_1.Viewer, Object.assign({}, exports.codeViewerKnobs(), { inline: true })))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Code/index.ts":
/*!***************************************!*\
  !*** ./src/__stories__/Code/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./Editor */ "./src/__stories__/Code/Editor.tsx");
__webpack_require__(/*! ./Viewer */ "./src/__stories__/Code/Viewer.tsx");


/***/ }),

/***/ "./src/__stories__/Data/List.tsx":
/*!***************************************!*\
  !*** ./src/__stories__/Data/List.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const List_1 = __webpack_require__(/*! ../../List */ "./src/List.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const _utils_2 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
exports.listKnobs = (tabName = 'List') => {
    return _utils_2.cleanKnobs({
        listStyle: react_1.select('listStyle', _utils_1.ListStyleType, '', tabName),
        listStylePosition: react_1.select('listStylePosition', _utils_1.ListStylePosition, 'initial', tabName),
    });
};
react_2.storiesOf('List & Tables|List', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement(List_1.List, Object.assign({}, exports.listKnobs()),
    React.createElement("li", null, "Item 1"),
    React.createElement("li", null, "Item 2"),
    React.createElement("li", null, "Item 3"),
    React.createElement("li", null, "Item 4"))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Data/ScrollList.tsx":
/*!*********************************************!*\
  !*** ./src/__stories__/Data/ScrollList.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const __1 = __webpack_require__(/*! ../.. */ "./src/index.ts");
const ScrollList_1 = __webpack_require__(/*! ../../ScrollList */ "./src/ScrollList.tsx");
exports.variableSizeListKnobs = (tabName = 'VariableSizeList') => ({
    itemSize: () => 0,
    direction: addon_knobs_1.select('direction', ['vertical', 'horizontal'], 'vertical', tabName),
    height: addon_knobs_1.text('height', '500px', tabName),
    width: addon_knobs_1.text('width', '100%', tabName),
    itemCount: addon_knobs_1.number('itemCount', 20, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
});
exports.fixedSizeListKnobs = (tabName = 'FixedSizeList') => (Object.assign({}, exports.variableSizeListKnobs(tabName), { itemSize: addon_knobs_1.number('itemSize', 50, { min: 0, max: Infinity, range: false, step: 1 }, tabName) }));
const Row = ({ index, style, key }) => (React.createElement(__1.Flex, { key: key, style: style, alignItems: "center", borderBottom: "1px solid", borderColor: "currentColor" },
    "Item ",
    index));
const MemoizedRow = React.memo(props => React.createElement(Row, Object.assign({}, props)), __1.areEqual);
react_1.storiesOf('List & Tables|FixedSizeList', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(storyFn => (React.createElement(__1.Box, { css: { outline: '2px solid currentColor' }, width: "500px" }, storyFn())))
    .add('with defaults', () => React.createElement(ScrollList_1.FixedSizeList, Object.assign({}, exports.fixedSizeListKnobs()), Row))
    .add('memoized', () => React.createElement(ScrollList_1.FixedSizeList, Object.assign({}, exports.fixedSizeListKnobs()), MemoizedRow));
react_1.storiesOf('List & Tables|VariableSizeList', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(storyFn => (React.createElement(__1.Box, { css: { outline: '2px solid currentColor' }, width: "500px" }, storyFn())))
    .add('with defaults', () => (React.createElement(ScrollList_1.VariableSizeList, Object.assign({}, exports.variableSizeListKnobs(), { itemSize: index => Math.max(20, index * 10) }), Row)))
    .add('memoized', () => (React.createElement(ScrollList_1.VariableSizeList, Object.assign({}, exports.variableSizeListKnobs(), { itemSize: index => Math.max(20, index * 10) }), MemoizedRow)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Data/Table.tsx":
/*!****************************************!*\
  !*** ./src/__stories__/Data/Table.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Table_1 = __webpack_require__(/*! ../../Table */ "./src/Table.tsx");
react_1.storiesOf('List & Tables|Table', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement(Table_1.Table, null,
    React.createElement(Table_1.TableRow, null,
        React.createElement(Table_1.TableCell, { as: "th" }, "Site"),
        React.createElement(Table_1.TableCell, { as: "th" }, "Views")),
    React.createElement(Table_1.TableRow, null,
        React.createElement(Table_1.TableCell, null, "stoplight.io"),
        React.createElement(Table_1.TableCell, null, "27341")),
    React.createElement(Table_1.TableRow, null,
        React.createElement(Table_1.TableCell, null, "example.com"),
        React.createElement(Table_1.TableCell, null, "2351")))))
    .add('with minWidth', () => (React.createElement(Table_1.Table, null,
    React.createElement(Table_1.TableRow, null,
        React.createElement(Table_1.TableCell, { minWidth: "300px", as: "th" }, "Site"),
        React.createElement(Table_1.TableCell, { as: "th" }, "Views")),
    React.createElement(Table_1.TableRow, null,
        React.createElement(Table_1.TableCell, null, "stoplight.io"),
        React.createElement(Table_1.TableCell, null, "27341")),
    React.createElement(Table_1.TableRow, null,
        React.createElement(Table_1.TableCell, null, "example.com"),
        React.createElement(Table_1.TableCell, null, "2351")))))
    .add('with selection', () => (React.createElement(Table_1.Table, null,
    React.createElement(Table_1.TableRow, null,
        React.createElement(Table_1.TableCell, { as: "th" }, "Site"),
        React.createElement(Table_1.TableCell, { as: "th" }, "Views")),
    React.createElement(Table_1.TableRow, null,
        React.createElement(Table_1.TableCell, { isSelected: true }, "stoplight.io"),
        React.createElement(Table_1.TableCell, null, "27341")),
    React.createElement(Table_1.TableRow, null,
        React.createElement(Table_1.TableCell, null, "example.com"),
        React.createElement(Table_1.TableCell, null, "2351")))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Data/index.ts":
/*!***************************************!*\
  !*** ./src/__stories__/Data/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./List */ "./src/__stories__/Data/List.tsx");
__webpack_require__(/*! ./ScrollList */ "./src/__stories__/Data/ScrollList.tsx");
__webpack_require__(/*! ./Table */ "./src/__stories__/Data/Table.tsx");


/***/ }),

/***/ "./src/__stories__/Forms/Button.tsx":
/*!******************************************!*\
  !*** ./src/__stories__/Forms/Button.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Button_1 = __webpack_require__(/*! ../../Button */ "./src/Button.tsx");
const Box_1 = __webpack_require__(/*! ../Layout/Box */ "./src/__stories__/Layout/Box.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
exports.buttonKnobs = (tabName = 'Button') => {
    return _utils_1.cleanKnobs(Object.assign({}, Box_1.boxKnobs(), { disabled: react_1.boolean('disabled', false, tabName) }));
};
react_2.storiesOf('Forms|Button', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => {
    return React.createElement(Button_1.Button, Object.assign({}, exports.buttonKnobs()), "Button Text");
})
    .add('disabled', () => (React.createElement(Button_1.Button, Object.assign({}, exports.buttonKnobs(), { disabled: true }), "Button Text")));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Forms/Checkbox.tsx":
/*!********************************************!*\
  !*** ./src/__stories__/Forms/Checkbox.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const storybook_state_1 = __webpack_require__(/*! @sambego/storybook-state */ "./node_modules/@sambego/storybook-state/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Checkbox_1 = __webpack_require__(/*! ../../Checkbox */ "./src/Checkbox.tsx");
const types_1 = __webpack_require__(/*! ../../types */ "./src/types.ts");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const store = new storybook_state_1.Store({
    checked: false,
});
exports.checkboxKnobs = (tabName = 'Checkbox') => {
    return _utils_1.cleanKnobs({
        disabled: react_1.boolean('disabled', false, tabName),
        checked: react_1.boolean('checked', false, tabName),
        variant: addon_knobs_1.select('variant', Object.values(types_1.Variant), types_1.Variant.Default, tabName),
    });
};
react_2.storiesOf('Forms|Checkbox', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('uncontrolled', () => (React.createElement("div", null,
    React.createElement(Checkbox_1.Checkbox, Object.assign({ id: "1" }, exports.checkboxKnobs())),
    " Text")))
    .add('checked', () => React.createElement(Checkbox_1.Checkbox, Object.assign({ id: "2" }, exports.checkboxKnobs(), { checked: true })))
    .add('controlled', () => (React.createElement(storybook_state_1.State, { store: store },
    React.createElement(Checkbox_1.Checkbox, Object.assign({ id: "3" }, exports.checkboxKnobs(), { checked: store.get('checked'), onChange: (checked) => {
            store.set({ checked });
        } })))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Forms/Input.tsx":
/*!*****************************************!*\
  !*** ./src/__stories__/Forms/Input.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const storybook_state_1 = __webpack_require__(/*! @sambego/storybook-state */ "./node_modules/@sambego/storybook-state/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const omit = __webpack_require__(/*! lodash/omit */ "./node_modules/lodash/omit.js");
const react_3 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const useAutoFocus_1 = __webpack_require__(/*! ../../hooks/useAutoFocus */ "./src/hooks/useAutoFocus.ts");
const Input_1 = __webpack_require__(/*! ../../Input */ "./src/Input.tsx");
const types_1 = __webpack_require__(/*! ../../types */ "./src/types.ts");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const Box_1 = __webpack_require__(/*! ../Layout/Box */ "./src/__stories__/Layout/Box.tsx");
const store = new storybook_state_1.Store({
    value: 'Input Text',
});
const CustomInput = react_3.forwardRef(function CustomInput(_a, ref) {
    var { autoFocus } = _a, props = tslib_1.__rest(_a, ["autoFocus"]);
    const [nodeRef] = useAutoFocus_1.useAutoFocus(autoFocus, ref);
    return React.createElement(Input_1.Input, Object.assign({}, props, { ref: nodeRef }));
});
exports.inputKnobs = (tabName = 'Input') => {
    return _utils_1.cleanKnobs(Object.assign({}, omit(Box_1.boxKnobs(), 'opacity'), { disabled: react_1.boolean('disabled', false, tabName), type: react_1.select('type', _utils_1.InlineInputType, 'text', tabName), placeholder: react_1.text('placeholder', 'placeholder', tabName), variant: react_1.select('variant', Object.values(types_1.Variant), types_1.Variant.Default, tabName) }));
};
exports.autosizeInputKnobs = (tabName = 'Input') => {
    return _utils_1.cleanKnobs(Object.assign({}, exports.inputKnobs(), { type: react_1.select('type', _utils_1.AutosizeInputType, 'text', tabName) }));
};
react_2.storiesOf('Forms|Input', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('uncontrolled', () => React.createElement(Input_1.Input, Object.assign({}, exports.inputKnobs())))
    .add('uncontrolled autofocus', () => React.createElement(Input_1.Input, Object.assign({}, exports.inputKnobs(), { autoFocus: true })))
    .add('autosize', () => React.createElement(Input_1.Input, Object.assign({}, exports.autosizeInputKnobs(), { autosize: true })))
    .add('autosize autofocus', () => React.createElement(Input_1.Input, Object.assign({}, exports.autosizeInputKnobs(), { autosize: true, autoFocus: true })))
    .add('with controlled autofocus', () => (React.createElement(CustomInput, Object.assign({}, exports.inputKnobs(), { autoFocus: react_1.boolean('autoFocus', true, 'Input') }))))
    .add('controlled set', () => React.createElement(Input_1.Input, Object.assign({}, exports.inputKnobs(), { value: "not editable" })))
    .add('controlled store', () => (React.createElement(storybook_state_1.State, { store: store },
    React.createElement(Input_1.Input, Object.assign({}, exports.inputKnobs(), { value: store.get('value'), onChange: (event) => store.set({ value: event.currentTarget.value }) })))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Forms/Select.tsx":
/*!******************************************!*\
  !*** ./src/__stories__/Forms/Select.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Box_1 = __webpack_require__(/*! ../../Box */ "./src/Box.tsx");
const Select_1 = __webpack_require__(/*! ../../Select */ "./src/Select.tsx");
const types_1 = __webpack_require__(/*! ../../types */ "./src/types.ts");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
exports.selectKnobs = (tabName = 'Select') => {
    return _utils_1.cleanKnobs({
        options: [],
        multi: react_1.boolean('multi', false),
        loading: react_1.boolean('loading', false),
        disabled: react_1.boolean('disabled', false),
        clearable: react_1.boolean('clearable', true),
        searchable: react_1.boolean('searchable', true),
        placeholder: react_1.text('placeholder', 'choose...'),
        loadingMessage: react_1.text('loadingMessage', 'loadingMessage'),
        noOptionsMessage: react_1.text('noOptionsMessage', 'no results'),
        minMenuHeight: react_1.number('minMenuHeight', 140),
        maxMenuHeight: react_1.number('maxMenuHeight', 300),
        menuPlacement: react_1.select('menuPlacement', ['auto', 'bottom', 'top'], 'auto'),
        menuIsOpen: react_1.boolean('menuIsOpen', false),
        blurOnSelect: react_1.boolean('blurOnSelect', true),
        closeOnSelect: react_1.boolean('closeOnSelect', true),
        closeOnScroll: react_1.boolean('closeOnScroll', false),
        hideSelectedOptions: react_1.boolean('hideSelectedOptions', false),
        backspaceRemovesValue: react_1.boolean('backspaceRemovesValue', true),
        onChange: addon_actions_1.action('onChange'),
        variant: react_1.select('variant', Object.values(types_1.Variant), types_1.Variant.Default),
    });
};
react_2.storiesOf('Forms|Select', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement(Box_1.Box, { width: "40%" },
    React.createElement(Select_1.Select, Object.assign({}, exports.selectKnobs(), { options: [
            { label: 'option1', value: 1 },
            { label: 'option2', value: 2 },
            { label: 'option3', value: 3 },
            { label: 'option4', value: 4 },
            { label: 'option5', value: 5 },
        ] })))))
    .add('with defaults autofocus', () => (React.createElement(Box_1.Box, { width: "40%" },
    React.createElement(Select_1.Select, Object.assign({}, exports.selectKnobs(), { autoFocus: true, options: [
            { label: 'option1', value: 1 },
            { label: 'option2', value: 2 },
            { label: 'option3', value: 3 },
            { label: 'option4', value: 4 },
            { label: 'option5', value: 5 },
        ] })))))
    .add('No Options', () => (React.createElement(Box_1.Box, { width: "40%" },
    React.createElement(Select_1.Select, Object.assign({}, exports.selectKnobs(), { options: [] })))))
    .add('async', () => (React.createElement(Box_1.Box, { width: "40%" },
    React.createElement(Select_1.Select, Object.assign({}, exports.selectKnobs(), { defaultOptions: [{ label: 'option1', value: 2 }], loadOptions: inputValue => {
            return new Promise(resolve => {
                setTimeout(resolve, 500, [0, 1, 2, 3].map(index => ({
                    label: `${inputValue}${index}`,
                    value: index,
                })));
            });
        } })))))
    .add('creatable multi', () => (React.createElement(Box_1.Box, { width: "40%" },
    React.createElement(Select_1.Select, Object.assign({}, exports.selectKnobs(), { isMulti: true, allowCreate: true, defaultOptions: [{ label: 'option1', value: 2 }], options: react_1.array('options', ['1', '2', '3', '4']).map(x => ({ value: x, label: x })) })))))
    .add('creatable async', () => (React.createElement(Box_1.Box, { width: "40%" },
    React.createElement(Select_1.Select, Object.assign({}, exports.selectKnobs(), { allowCreate: true, defaultOptions: [{ label: 'option1', value: 2 }], loadOptions: inputValue => {
            return new Promise(resolve => {
                setTimeout(() => resolve([0, 1, 2, 3].map(index => ({
                    label: `${inputValue}${index}`,
                    value: `${index}`,
                }))), 250);
            });
        } })))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Forms/Textarea.tsx":
/*!********************************************!*\
  !*** ./src/__stories__/Forms/Textarea.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const storybook_state_1 = __webpack_require__(/*! @sambego/storybook-state */ "./node_modules/@sambego/storybook-state/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Textarea_1 = __webpack_require__(/*! ../../Textarea */ "./src/Textarea.tsx");
const types_1 = __webpack_require__(/*! ../../types */ "./src/types.ts");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const Box_1 = __webpack_require__(/*! ../Layout/Box */ "./src/__stories__/Layout/Box.tsx");
const store = new storybook_state_1.Store({
    value: 'TextArea Text',
});
exports.textareaKnobs = (tabName = 'Textarea') => {
    return _utils_1.cleanKnobs(Object.assign({}, Box_1.boxKnobs(), { autosize: react_1.boolean('autosize', false, tabName), disabled: react_1.boolean('disabled', false, tabName), variant: addon_knobs_1.select('variant', Object.values(types_1.Variant), types_1.Variant.Default, tabName) }));
};
exports.textareaAutosizeKnobs = (tabName = 'Textarea') => {
    return _utils_1.cleanKnobs(Object.assign({}, exports.textareaKnobs(tabName), { minRows: react_1.number('minRows', 0, {
            min: 0,
            range: false,
            max: Infinity,
            step: 1,
        }, tabName), maxRows: react_1.number('maxRows', 10, {
            min: 1,
            range: false,
            max: Infinity,
            step: 1,
        }, tabName) }));
};
react_2.storiesOf('Forms|Textarea', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('uncontrolled', () => React.createElement(Textarea_1.Textarea, Object.assign({}, exports.textareaKnobs(), { autoFocus: true })))
    .add('uncontrolled autofocus', () => React.createElement(Textarea_1.Textarea, Object.assign({}, exports.textareaKnobs(), { autoFocus: true })))
    .add('autosize', () => React.createElement(Textarea_1.Textarea, Object.assign({}, exports.textareaAutosizeKnobs(), { autosize: true })))
    .add('autosize autofocus', () => React.createElement(Textarea_1.Textarea, Object.assign({}, exports.textareaAutosizeKnobs(), { autosize: true, autoFocus: true })))
    .add('controlled set', () => React.createElement(Textarea_1.Textarea, Object.assign({}, exports.textareaKnobs(), { value: "not-editable" })))
    .add('controlled store', () => (React.createElement(storybook_state_1.State, { store: store },
    React.createElement(Textarea_1.Textarea, Object.assign({}, exports.textareaKnobs(), { value: store.get('value'), onChange: (event) => store.set({ value: event.currentTarget.value }) })))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Forms/Toggle.tsx":
/*!******************************************!*\
  !*** ./src/__stories__/Forms/Toggle.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const storybook_state_1 = __webpack_require__(/*! @sambego/storybook-state */ "./node_modules/@sambego/storybook-state/dist/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Toggle_1 = __webpack_require__(/*! ../../Toggle */ "./src/Toggle.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const store = new storybook_state_1.Store({
    checked: false,
});
exports.toggleKnobs = (tabName = 'Toggle') => {
    return _utils_1.cleanKnobs({
        disabled: react_1.boolean('disabled', false, tabName),
        checked: react_1.boolean('checked', false, tabName),
    });
};
exports.toggleActions = () => ({
    onChange: addon_actions_1.action('onChange'),
});
react_2.storiesOf('Forms|Toggle', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('uncontrolled', () => React.createElement(Toggle_1.Toggle, Object.assign({}, exports.toggleKnobs(), exports.toggleActions)))
    .add('checked', () => React.createElement(Toggle_1.Toggle, Object.assign({}, exports.toggleKnobs(), exports.toggleActions, { checked: true })))
    .add('controlled', () => (React.createElement(storybook_state_1.State, { store: store },
    React.createElement(Toggle_1.Toggle, Object.assign({ id: "2" }, exports.toggleKnobs(), { checked: store.get('checked'), onChange: (checked) => {
            store.set({ checked });
        } })))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Forms/index.ts":
/*!****************************************!*\
  !*** ./src/__stories__/Forms/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./Button */ "./src/__stories__/Forms/Button.tsx");
__webpack_require__(/*! ./Checkbox */ "./src/__stories__/Forms/Checkbox.tsx");
__webpack_require__(/*! ./Input */ "./src/__stories__/Forms/Input.tsx");
__webpack_require__(/*! ./Select */ "./src/__stories__/Forms/Select.tsx");
__webpack_require__(/*! ./Textarea */ "./src/__stories__/Forms/Textarea.tsx");
__webpack_require__(/*! ./Toggle */ "./src/__stories__/Forms/Toggle.tsx");


/***/ }),

/***/ "./src/__stories__/Layout/Box.tsx":
/*!****************************************!*\
  !*** ./src/__stories__/Layout/Box.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Box_1 = __webpack_require__(/*! ../../Box */ "./src/Box.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const _utils_2 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
exports.boxKnobs = (tabName = 'Box') => {
    return _utils_2.cleanKnobs({
        color: react_1.text('color', null, tabName),
        backgroundColor: react_1.text('backgroundColor', null, tabName),
        textAlign: react_1.select('textAlign', _utils_1.TextAlign, 'initial', tabName),
        fontSize: react_1.text('fontSize', null, tabName),
        fontWeight: react_1.select('fontWeight', [100, 200, 300, 400, 500, 600, 700, 800, 900], 400, tabName),
        m: react_1.text('m', null, tabName),
        mt: react_1.text('mt', null, tabName),
        mr: react_1.text('mr', null, tabName),
        mb: react_1.text('mb', null, tabName),
        ml: react_1.text('ml', null, tabName),
        mx: react_1.text('mx', null, tabName),
        my: react_1.text('my', null, tabName),
        p: react_1.text('p', null, tabName),
        pt: react_1.text('pt', null, tabName),
        pr: react_1.text('pr', null, tabName),
        pb: react_1.text('pb', null, tabName),
        pl: react_1.text('pl', null, tabName),
        px: react_1.text('px', null, tabName),
        py: react_1.text('py', null, tabName),
        height: react_1.text('height', null, tabName),
        maxHeight: react_1.text('maxHeight', null, tabName),
        minHeight: react_1.text('minHeight', null, tabName),
        width: react_1.text('width', null, tabName),
        maxWidth: react_1.text('maxWidth', null, tabName),
        minWidth: react_1.text('minWidth', null, tabName),
        border: react_1.text('border', null, tabName),
        borderColor: react_1.text('borderColor', null, tabName),
        borderTop: react_1.text('borderTop', null, tabName),
        borderLeft: react_1.text('borderLeft', null, tabName),
        borderRight: react_1.text('borderRight', null, tabName),
        borderBottom: react_1.text('borderBottom', null, tabName),
        borderRadius: react_1.text('borderRadius', null, tabName),
        boxShadow: react_1.text('boxShadow', null, tabName),
        opacity: react_1.number('opacity', 1, {
            min: 0,
            max: 1,
            step: 0.01,
            range: false,
        }, tabName),
        display: react_1.select('display', _utils_1.Display, '', tabName),
        overflow: react_1.select('overflow', _utils_1.OverFlow, '', tabName),
        overflowX: react_1.select('overflowX', _utils_1.OverFlow, '', tabName),
        overflowY: react_1.select('overflowX', _utils_1.OverFlow, '', tabName),
        position: react_1.select('position', _utils_1.PositionOpts, '', tabName),
        top: react_1.number('top', 0, {}, tabName),
        bottom: react_1.number('bottom', 0, {}, tabName),
        left: react_1.number('left', 0, {}, tabName),
        right: react_1.number('right', 0, {}, tabName),
        z: react_1.number('z', 0, {}, tabName),
    });
};
react_2.storiesOf('Layout|Box', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => React.createElement(Box_1.Box, Object.assign({}, exports.boxKnobs()), "Box with child."));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Layout/Break.tsx":
/*!******************************************!*\
  !*** ./src/__stories__/Layout/Break.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Break_1 = __webpack_require__(/*! ../../Break */ "./src/Break.tsx");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/__stories__/Layout/Box.tsx");
exports.breakKnobs = (tabName = 'Break') => ({
    thickness: react_1.number('thickness', 10, { min: 0, max: Infinity, step: 1, range: false }, tabName),
});
react_2.storiesOf('Layout|Break', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => React.createElement(Break_1.Break, Object.assign({}, Box_1.boxKnobs(), exports.breakKnobs(), { minWidth: "500px" })));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Layout/Flex.tsx":
/*!*****************************************!*\
  !*** ./src/__stories__/Layout/Flex.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const __1 = __webpack_require__(/*! ../../ */ "./src/index.ts");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const Box_1 = __webpack_require__(/*! ./Box */ "./src/__stories__/Layout/Box.tsx");
exports.flexKnobs = (tabName = 'Flex') => {
    return _utils_1.cleanKnobs(Object.assign({}, Box_1.boxKnobs(), { alignItems: react_1.select('alignItems', _utils_1.AlignItems, '', tabName), justifyContent: react_1.select('justifyContent', _utils_1.JustifyContent, '', tabName), flexDirection: react_1.select('flexDirection', _utils_1.FlexDirection, '', tabName), flexWrap: react_1.select('flexWrap', _utils_1.FlexWrap, '', tabName) }));
};
react_2.storiesOf('Layout|Flex', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement(__1.Flex, Object.assign({}, exports.flexKnobs(), { width: "500px", border: "1px solid blue" }),
    React.createElement(__1.Box, { flex: 1, border: "@xs" }, "Flex 1"),
    React.createElement(__1.Box, { flex: 1, border: "@xs" }, "Flex 1"),
    React.createElement(__1.Box, { flex: 2, border: "@xs" }, "Flex 2"))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Layout/index.ts":
/*!*****************************************!*\
  !*** ./src/__stories__/Layout/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./Box */ "./src/__stories__/Layout/Box.tsx");
__webpack_require__(/*! ./Break */ "./src/__stories__/Layout/Break.tsx");
__webpack_require__(/*! ./Flex */ "./src/__stories__/Layout/Flex.tsx");


/***/ }),

/***/ "./src/__stories__/Menus/ContextMenu.tsx":
/*!***********************************************!*\
  !*** ./src/__stories__/Menus/ContextMenu.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const __1 = __webpack_require__(/*! ../.. */ "./src/index.ts");
const ContextMenu_1 = __webpack_require__(/*! ../../ContextMenu */ "./src/ContextMenu.tsx");
exports.contextMenuKnobs = (tabName = 'ContextMenu') => {
    return {
        hideOnLeave: react_1.boolean('hideOnLeave', false, tabName),
    };
};
react_2.storiesOf('Menus|Context Menu', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement(__1.Flex, { flexDirection: "column", alignItems: "center" },
    React.createElement(__1.Button, { display: "block", onClick: () => alert('hey') }, "Try to click me while the context menu is opened"),
    React.createElement(ContextMenu_1.ContextMenu, { id: "defaultContextMenu", renderTrigger: () => 'trigger', menuItems: [
            { title: 'Menu Item 1' },
            { title: 'Menu Item 2' },
            { title: 'Menu Item 3' },
            { divider: true },
            { title: 'Disabled Menu Item', disabled: true },
        ], onShow: addon_actions_1.action('onShow'), onHide: addon_actions_1.action('onHide') }),
    React.createElement(__1.Button, { display: "block", onClick: () => alert('hey') }, "Try to click me while the context menu is opened"))))
    .add('block external clicks', () => (React.createElement(__1.Flex, { flexDirection: "column", alignItems: "center" },
    React.createElement(__1.Button, { display: "block", onClick: () => alert('hey') }, "Try to click me while the context menu is opened"),
    React.createElement(ContextMenu_1.ContextMenu, { id: "defaultContextMenu", blockExternalClicks: true, renderTrigger: () => 'trigger', menuItems: [
            { title: 'Menu Item 1' },
            { title: 'Menu Item 2' },
            { title: 'Menu Item 3' },
            { divider: true },
            { title: 'Disabled Menu Item', disabled: true },
        ], onShow: addon_actions_1.action('onShow'), onHide: addon_actions_1.action('onHide') }),
    React.createElement(__1.Button, { display: "block", onClick: () => alert('hey') }, "Try to click me while the context menu is opened"))))
    .add('with no menu items', () => React.createElement(ContextMenu_1.ContextMenu, { id: "defaultContextMenu", renderTrigger: () => 'trigger' }))
    .add('open on click', () => (React.createElement(ContextMenu_1.ContextMenu, { id: "defaultContextMenu", renderTrigger: ref => {
        return (React.createElement("div", { onClick: e => ref.current ? ref.current.handleContextClick(e) : undefined }, "trigger"));
    }, menuItems: [
        { title: 'Menu Item 1' },
        { title: 'Menu Item 2' },
        { title: 'Menu Item 3' },
        { divider: true },
        { title: 'Disabled Menu Item', disabled: true },
    ], onShow: addon_actions_1.action('onShow'), onHide: addon_actions_1.action('onHide') })))
    .add('custom items', () => (React.createElement(ContextMenu_1.ContextMenu, { id: "defaultContextMenu", renderTrigger: () => 'Right Click Me!', menuItems: [
        { title: 'Menu Item 1', color: 'success', onClick: addon_actions_1.action('onClick') },
        { title: 'Menu Item 2', color: 'warning', shortcut: '⌘⌥K' },
        { title: 'Menu Item 3', color: 'error' },
        { divider: true, borderColor: 'fg' },
        {
            title: 'Disabled Menu Item',
            disabled: true,
            fontStyle: 'italic',
        },
    ], onShow: addon_actions_1.action('onShow'), onHide: addon_actions_1.action('onHide') })))
    .add('sub menu', () => (React.createElement(ContextMenu_1.ContextMenu, { id: "defaultContextMenu", renderTrigger: () => 'Right Click Me!', menuItems: [
        { title: 'Menu Item 1', color: 'success', onClick: addon_actions_1.action('onClick') },
        {
            title: 'SubMenu Item',
            color: 'warning',
            menuItems: [
                { title: 'SubMenu Item 1', color: 'success', onClick: addon_actions_1.action('onClick') },
                {
                    title: 'Nested SubMenu Item 2',
                    color: 'warning',
                    menuItems: [
                        { title: 'SubMenu Item 1', color: 'success', onClick: addon_actions_1.action('onClick') },
                        { title: 'SubMenu Item 2', color: 'warning' },
                        { title: 'SubMenu Item 3', color: 'error' },
                        { divider: true, borderColor: 'fg' },
                        {
                            title: 'Disabled SubMenu Item',
                            disabled: true,
                            fontStyle: 'italic',
                        },
                    ],
                },
                { title: 'SubMenu Item 3', color: 'error' },
                {
                    title: 'Nested SubMenu Item 4',
                    color: 'warning',
                    menuItems: [
                        { title: 'SubMenu Item 1', color: 'success', onClick: addon_actions_1.action('onClick') },
                        { title: 'SubMenu Item 2', color: 'warning' },
                        { title: 'SubMenu Item 3', color: 'error' },
                        { divider: true, borderColor: 'fg' },
                        {
                            title: 'Disabled SubMenu Item',
                            disabled: true,
                            fontStyle: 'italic',
                        },
                    ],
                },
                { divider: true, borderColor: 'fg' },
                {
                    title: 'Disabled SubMenu Item',
                    disabled: true,
                    fontStyle: 'italic',
                },
            ],
        },
        { title: 'Menu Item 3', color: 'error' },
        { divider: true, borderColor: 'fg' },
        {
            title: 'Disabled Menu Item',
            disabled: true,
            fontStyle: 'italic',
        },
    ], onShow: addon_actions_1.action('onShow'), onHide: addon_actions_1.action('onHide') })));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Menus/Menu.tsx":
/*!****************************************!*\
  !*** ./src/__stories__/Menus/Menu.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const __1 = __webpack_require__(/*! ../.. */ "./src/index.ts");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
exports.menuKnobs = (tabName = 'Menu') => {
    return _utils_1.cleanKnobs({
        posX: addon_knobs_1.select('posX', ['left', 'center', 'right'], 'right', tabName),
        posY: addon_knobs_1.select('posY', ['top', 'bottom'], 'bottom', tabName),
        hideDelay: addon_knobs_1.number('hideDelay', 200, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
        offset: {
            x: addon_knobs_1.number('offset.x', 0, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
            y: addon_knobs_1.number('offset.y', 0, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
        },
    });
};
react_1.storiesOf('Menus|Menu', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement(__1.Menu, Object.assign({}, exports.menuKnobs(), { menuItems: [
        { onClick: addon_actions_1.action('onClick'), title: React.createElement("span", null, "Has onClick") },
        { title: 'No onClick' },
        { title: 'Disabled Item', disabled: true },
    ] }))))
    .add('with icons', () => (React.createElement(__1.Menu, Object.assign({}, exports.menuKnobs(), { menuItems: [
        { onClick: addon_actions_1.action('onClick'), title: React.createElement("span", null, "Has onClick"), icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
    ] }))))
    .add('with actions', () => (React.createElement(__1.Menu, Object.assign({}, exports.menuKnobs(), { menuItems: [
        { onClick: addon_actions_1.action('onClick'), title: React.createElement("span", null, "Has onClick"), icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
    ] }))))
    .add('with icons only', () => (React.createElement(__1.Menu, Object.assign({}, exports.menuKnobs(), { menuItems: [
        { onClick: addon_actions_1.action('onClick'), icon: 'marker' },
        { icon: 'image' },
        { disabled: true, icon: 'times-circle' },
    ] }))))
    .add('with subtext', () => (React.createElement(__1.Menu, Object.assign({}, exports.menuKnobs(), { menuItems: [
        { onClick: addon_actions_1.action('onClick'), title: React.createElement("span", null, "Has onClick"), subtitle: 'has subtitle', icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
    ] }))))
    .add('with trigger', () => (React.createElement(__1.Menu, Object.assign({}, exports.menuKnobs(), { renderTrigger: () => React.createElement(__1.Icon, { icon: "heading" }), menuItems: [
        { onClick: addon_actions_1.action('onClick'), title: React.createElement("span", null, "Has onClick"), subtitle: 'has subtitle', icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
    ] }))))
    .add('with custom renderMenu', () => (React.createElement(__1.Menu, Object.assign({}, exports.menuKnobs(), { menuItems: [
        { onClick: addon_actions_1.action('onClick'), title: React.createElement("span", null, "Has onClick"), subtitle: 'has subtitle', icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
    ] }))))
    .add('with custom renderMenuItem', () => (React.createElement(__1.Menu, Object.assign({}, exports.menuKnobs(), { renderMenuItem: (item) => React.createElement("span", null, item.title), menuItems: [
        { onClick: addon_actions_1.action('onClick'), title: React.createElement("span", null, "Has onClick"), subtitle: 'has subtitle', icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
    ] }))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Menus/index.ts":
/*!****************************************!*\
  !*** ./src/__stories__/Menus/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./ContextMenu */ "./src/__stories__/Menus/ContextMenu.tsx");
__webpack_require__(/*! ./Menu */ "./src/__stories__/Menus/Menu.tsx");


/***/ }),

/***/ "./src/__stories__/Misc/Dialog.tsx":
/*!*****************************************!*\
  !*** ./src/__stories__/Misc/Dialog.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_actions_1 = __webpack_require__(/*! @storybook/addon-actions */ "./node_modules/@storybook/addon-actions/dist/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Button_1 = __webpack_require__(/*! ../../Button */ "./src/Button.tsx");
const Dialog_1 = __webpack_require__(/*! ../../Dialog */ "./src/Dialog.tsx");
const Heading_1 = __webpack_require__(/*! ../../Heading */ "./src/Heading.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const Box_1 = __webpack_require__(/*! ../Layout/Box */ "./src/__stories__/Layout/Box.tsx");
exports.dialogKnobs = (tabName = 'Dialog') => {
    return _utils_1.cleanKnobs(Object.assign({}, Box_1.boxKnobs(), { show: react_1.boolean('show', true, tabName) }));
};
react_2.storiesOf('Miscellaneous|Dialog', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement(Dialog_1.Dialog, Object.assign({}, exports.dialogKnobs(), { onClickOutside: addon_actions_1.action('onClickOutside') }),
    React.createElement(Heading_1.Heading, { py: 15, px: 20, textAlign: "center" }, "Remove file?"),
    React.createElement(Button_1.Button, { width: "50%", display: "inline-block" }, "yes"),
    React.createElement(Button_1.Button, { width: "50%", display: "inline-block" }, "no"))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Misc/Image.tsx":
/*!****************************************!*\
  !*** ./src/__stories__/Misc/Image.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Image_1 = __webpack_require__(/*! ../../Image */ "./src/Image.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const Box_1 = __webpack_require__(/*! ../Layout/Box */ "./src/__stories__/Layout/Box.tsx");
exports.imageKnobs = (tabName = 'Image') => {
    return _utils_1.cleanKnobs(Object.assign({}, Box_1.boxKnobs(), { height: react_1.text('height', null, tabName), hidden: react_1.boolean('hidden', false, tabName), responsive: react_1.boolean('responsive', false, tabName), src: react_1.text('src', 'https://placehold.it/150x50', tabName), alt: react_1.text('alt', 'Placeholder', tabName), title: react_1.text('title', 'Placeholder', tabName), width: react_1.text('width', null, tabName) }));
};
react_2.storiesOf('Miscellaneous|Image', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(storyFn => React.createElement("div", { style: { width: '300px' } }, storyFn()))
    .add('with defaults', () => React.createElement(Image_1.Image, Object.assign({}, exports.imageKnobs())))
    .add('responsive', () => React.createElement(Image_1.Image, Object.assign({}, exports.imageKnobs(), { responsive: true })));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Misc/Popup.tsx":
/*!****************************************!*\
  !*** ./src/__stories__/Misc/Popup.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const __1 = __webpack_require__(/*! ../.. */ "./src/index.ts");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const TAB_NAME = 'Popup';
exports.popupKnobs = (tabName = TAB_NAME) => {
    return _utils_1.cleanKnobs({
        posX: react_1.select('posX', ['left', 'center', 'right'], 'left', tabName),
        posY: react_1.select('posY', ['top', 'center', 'bottom'], 'top', tabName),
        offset: {
            top: react_1.number('offset.top', 0, { min: 0 }, tabName),
            bottom: react_1.number('offset.bottom', 0, { min: 0 }, tabName),
            left: react_1.number('offset.left', 0, { min: 0 }, tabName),
            right: react_1.number('offset.right', 0, { min: 0 }, tabName),
        },
        padding: react_1.number('padding', 0, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
        width: react_1.number('width', 0, { min: 0 }, tabName),
        hideDelay: react_1.number('hideDelay', 200, { min: 0 }, tabName),
    });
};
const PopupContent = (_a) => {
    var { children } = _a, props = tslib_1.__rest(_a, ["children"]);
    const theme = __1.useTheme();
    return (React.createElement(__1.Box, Object.assign({ backgroundColor: theme.canvas.bg, color: theme.canvas.fg }, props), children));
};
react_2.storiesOf('Miscellaneous|Popup', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .addDecorator(storyFn => (React.createElement(__1.ThemeZone, { name: "app" },
    React.createElement(__1.Box, { height: "500px", width: "500px" }, storyFn()))))
    .add('with defaults', () => (React.createElement(__1.Popup, Object.assign({}, exports.popupKnobs(), { renderTrigger: () => React.createElement(__1.Box, { as: "span" }, "With Defaults"), renderContent: () => React.createElement(PopupContent, null, react_1.text('content', 'here is the popup content')) }))))
    .add('with icon', () => (React.createElement(__1.Popup, Object.assign({}, exports.popupKnobs(), { renderTrigger: () => {
        return (React.createElement(__1.Box, { as: "span" },
            "Hover me ",
            React.createElement(__1.Icon, { icon: "globe" })));
    }, renderContent: () => React.createElement(PopupContent, { as: "span" }, "Globe") }))))
    .add('with controlled mode', () => (React.createElement(__1.Popup, Object.assign({}, exports.popupKnobs(), { show: addon_knobs_1.boolean('show', false, TAB_NAME), renderTrigger: () => React.createElement(__1.Box, { as: "span" }, "I am controlled, so hovering is no-op!"), renderContent: () => React.createElement(PopupContent, null, react_1.text('content', 'here is the popup content')) }))))
    .add('inside Flexbox', () => (React.createElement(__1.Flex, { width: "100%" },
    React.createElement(__1.Popup, Object.assign({}, exports.popupKnobs(), { renderTrigger: () => (React.createElement(__1.Flex, { flex: "1", backgroundColor: "red" }, '<Flex> flex=1')), renderContent: () => React.createElement(PopupContent, null, react_1.text('content', 'here is the popup content')) })),
    React.createElement(__1.Popup, Object.assign({}, exports.popupKnobs(), { renderTrigger: () => (React.createElement(__1.Input, { type: "text", value: "<Input> flex=2", onChange: () => void 0, flex: "2", invalid: true })), renderContent: () => React.createElement(PopupContent, null, react_1.text('content', 'here is the popup content')) })),
    React.createElement(__1.Popup, Object.assign({}, exports.popupKnobs(), { renderTrigger: () => React.createElement(__1.Button, { backgroundColor: "green" }, '<Button> no flex'), renderContent: () => React.createElement(PopupContent, null, react_1.text('content', 'here is the popup content')) })))))
    .add('form validation', () => (React.createElement(__1.Popup, Object.assign({}, exports.popupKnobs(), { padding: 3, renderContent: () => (React.createElement(PopupContent, { border: `1px solid red`, borderRadius: "10px", p: 7 }, "This is a tooltip message.")), renderTrigger: () => (React.createElement(__1.Flex, { width: "100%", alignItems: "center" },
        React.createElement(__1.Box, { flex: "1" },
            React.createElement(__1.Text, { as: "label" }, "Title")),
        React.createElement(__1.Flex, { flex: "1", width: "100%" },
            React.createElement(__1.Box, null,
                React.createElement(__1.Input, { type: "text", value: "Here is some text", onChange: () => void 0, flex: "1", invalid: true }))))) }))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Misc/Tabs.tsx":
/*!***************************************!*\
  !*** ./src/__stories__/Misc/Tabs.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Tabs_1 = __webpack_require__(/*! ../../Tabs */ "./src/Tabs/index.tsx");
react_1.storiesOf('Miscellaneous|Tabs', module)
    .addDecorator(storyFn => React.createElement("div", { style: { width: '300px' } }, storyFn()))
    .add('with defaults', () => (React.createElement(Tabs_1.Tabs, null,
    React.createElement(Tabs_1.TabList, null,
        React.createElement(Tabs_1.Tab, null, "Title 1"),
        React.createElement(Tabs_1.Tab, null, "Title 2")),
    React.createElement(Tabs_1.TabPanel, null,
        React.createElement("h3", null, "Any content 1")),
    React.createElement(Tabs_1.TabPanel, null,
        React.createElement("h2", null, "Any content 2")))))
    .add('disabled tab', () => (React.createElement(Tabs_1.Tabs, null,
    React.createElement(Tabs_1.TabList, null,
        React.createElement(Tabs_1.Tab, null, "Title 1"),
        React.createElement(Tabs_1.Tab, { disabled: true }, "Title 2")),
    React.createElement(Tabs_1.TabPanel, null,
        React.createElement("h3", null, "Any content 1")),
    React.createElement(Tabs_1.TabPanel, null,
        React.createElement("h2", null, "Any content 2")))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Misc/Toast.tsx":
/*!****************************************!*\
  !*** ./src/__stories__/Misc/Toast.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const Box_1 = __webpack_require__(/*! ../../Box */ "./src/Box.tsx");
const Toast_1 = __webpack_require__(/*! ../../Toast */ "./src/Toast/index.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
exports.toastKnobs = (tabName = 'Toaster') => {
    return _utils_1.cleanKnobs({
        type: addon_knobs_1.select('type', ['info', 'error', 'success', 'warning', 'default'], 'default', tabName),
        title: addon_knobs_1.text('title', 'Title', tabName),
        message: addon_knobs_1.text('message', 'Message', tabName),
        transition: addon_knobs_1.select('transition', ['zoom', 'bounce', 'slide', 'flip'], 'zoom', tabName),
        position: addon_knobs_1.select('position', ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'], 'bottom-right', tabName),
    });
};
react_1.storiesOf('Miscellaneous|Toast', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement(Box_1.Box, null,
    React.createElement(Toast_1.ToastContainer, { position: exports.toastKnobs().position }),
    React.createElement("button", { onClick: () => Toast_1.Toast({
            title: exports.toastKnobs().title,
            message: exports.toastKnobs().message,
            type: exports.toastKnobs().type,
            transition: exports.toastKnobs().transition,
        }) }, "Toast!"))))
    .add('with actions', () => (React.createElement(Box_1.Box, null,
    React.createElement(Toast_1.ToastContainer, { position: exports.toastKnobs().position }),
    React.createElement("button", { onClick: () => Toast_1.Toast({
            title: exports.toastKnobs().title,
            message: exports.toastKnobs().message,
            type: exports.toastKnobs().type,
            transition: exports.toastKnobs().transition,
            actions: [
                {
                    label: 'Check Dev.Console',
                    onClick: () => console.log('clicked'),
                },
                {
                    label: 'Close on Click',
                    onClick: ({ closeToast }) => {
                        closeToast();
                    },
                },
                { label: 'Disabled Action', disabled: true },
            ],
        }) }, "Toast!"))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Misc/Tooltip.tsx":
/*!******************************************!*\
  !*** ./src/__stories__/Misc/Tooltip.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Button_1 = __webpack_require__(/*! ../../Button */ "./src/Button.tsx");
const Popup_1 = __webpack_require__(/*! ../../Popup */ "./src/Popup/index.tsx");
const Tooltip_1 = __webpack_require__(/*! ../../Tooltip */ "./src/Tooltip.tsx");
const types_1 = __webpack_require__(/*! ../../types */ "./src/types.ts");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const Box_1 = __webpack_require__(/*! ../Layout/Box */ "./src/__stories__/Layout/Box.tsx");
exports.TooltipKnobs = (tabName = 'Tooltip') => {
    return _utils_1.cleanKnobs(Object.assign({}, Box_1.boxKnobs(), { variant: addon_knobs_1.select('variant', Object.values(types_1.Variant), types_1.Variant.Default, tabName), posX: addon_knobs_1.select('posX', ['left', 'center', 'right'], 'left', tabName), posY: addon_knobs_1.select('posY', ['top', 'center', 'bottom'], 'top', tabName) }));
};
const sometext = `Here is some tooltip text Here is some tooltip text Here is some tooltip text Here is some tooltip text Here is some tooltip text`;
react_2.storiesOf('Miscellaneous|Tooltip', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement(Tooltip_1.Tooltip, Object.assign({}, exports.TooltipKnobs()),
    React.createElement("div", null, react_1.text('children', 'Here is some tooltip text', 'Tooltip')))))
    .add('inside Popups', () => (React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '403px', margin: '100px' } },
    React.createElement(Popup_1.Popup, { posY: "top", posX: "left", padding: 2, renderContent: () => (React.createElement(Tooltip_1.Tooltip, { maxWidth: "400px", posX: "left", posY: "top" }, sometext)), renderTrigger: () => React.createElement(Button_1.Button, null, "top left") }),
    React.createElement(Popup_1.Popup, { posY: "top", posX: "center", padding: 2, renderContent: () => (React.createElement(Tooltip_1.Tooltip, { maxWidth: "400px", posX: "center", posY: "top" }, sometext)), renderTrigger: () => React.createElement(Button_1.Button, null, "top center") }),
    React.createElement(Popup_1.Popup, { posY: "top", posX: "right", padding: 2, renderContent: () => (React.createElement(Tooltip_1.Tooltip, { maxWidth: "400px", posX: "right", posY: "top" }, sometext)), renderTrigger: () => React.createElement(Button_1.Button, null, "top right") }),
    React.createElement(Popup_1.Popup, { posY: "center", posX: "left", padding: 2, renderContent: () => (React.createElement(Tooltip_1.Tooltip, { maxWidth: "200px", posX: "left", posY: "center" }, sometext)), renderTrigger: () => React.createElement(Button_1.Button, null, "center left") }),
    React.createElement(Popup_1.Popup, { posY: "center", posX: "center", padding: 2, renderContent: () => (React.createElement(Tooltip_1.Tooltip, { maxWidth: "400px", posX: "center", posY: "center" }, sometext)), renderTrigger: () => React.createElement(Button_1.Button, null, "center center") }),
    React.createElement(Popup_1.Popup, { posY: "center", posX: "right", padding: 2, renderContent: () => (React.createElement(Tooltip_1.Tooltip, { maxWidth: "200px", posX: "right", posY: "center" }, sometext)), renderTrigger: () => React.createElement(Button_1.Button, null, "center right") }),
    React.createElement(Popup_1.Popup, { posY: "bottom", posX: "left", padding: 2, renderContent: () => (React.createElement(Tooltip_1.Tooltip, { maxWidth: "400px", posX: "left", posY: "bottom" }, sometext)), renderTrigger: () => React.createElement(Button_1.Button, null, "bottom left") }),
    React.createElement(Popup_1.Popup, { posY: "bottom", posX: "center", padding: 2, renderContent: () => (React.createElement(Tooltip_1.Tooltip, { maxWidth: "400px", posX: "center", posY: "bottom" }, sometext)), renderTrigger: () => React.createElement(Button_1.Button, null, "bottom center") }),
    React.createElement(Popup_1.Popup, { posY: "bottom", posX: "right", padding: 2, renderContent: () => (React.createElement(Tooltip_1.Tooltip, { maxWidth: "400px", posX: "right", posY: "bottom" }, sometext)), renderTrigger: () => React.createElement(Button_1.Button, null, "bottom right") }))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Misc/index.ts":
/*!***************************************!*\
  !*** ./src/__stories__/Misc/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./Dialog */ "./src/__stories__/Misc/Dialog.tsx");
__webpack_require__(/*! ./Image */ "./src/__stories__/Misc/Image.tsx");
__webpack_require__(/*! ./Popup */ "./src/__stories__/Misc/Popup.tsx");
__webpack_require__(/*! ./Tabs */ "./src/__stories__/Misc/Tabs.tsx");
__webpack_require__(/*! ./Toast */ "./src/__stories__/Misc/Toast.tsx");
__webpack_require__(/*! ./Tooltip */ "./src/__stories__/Misc/Tooltip.tsx");


/***/ }),

/***/ "./src/__stories__/Typography/BlockQuote.tsx":
/*!***************************************************!*\
  !*** ./src/__stories__/Typography/BlockQuote.tsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const BlockQuote_1 = __webpack_require__(/*! ../../BlockQuote */ "./src/BlockQuote.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const Text_1 = __webpack_require__(/*! ./Text */ "./src/__stories__/Typography/Text.tsx");
exports.blockQuoteKnobs = (tabName = 'Block Quote') => {
    return _utils_1.cleanKnobs(Object.assign({}, Text_1.textKnobs(), { children: addon_knobs_1.text('content', 'a quote', tabName), isSelected: addon_knobs_1.boolean('isSelected', false, tabName) }));
};
react_1.storiesOf('Typography|BlockQuote', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => React.createElement(BlockQuote_1.BlockQuote, Object.assign({}, exports.blockQuoteKnobs())))
    .add('with shadow', () => React.createElement(BlockQuote_1.BlockQuote, Object.assign({}, exports.blockQuoteKnobs(), { isSelected: true })));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Typography/Heading.tsx":
/*!************************************************!*\
  !*** ./src/__stories__/Typography/Heading.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Heading_1 = __webpack_require__(/*! ../../Heading */ "./src/Heading.tsx");
const Text_1 = __webpack_require__(/*! ./Text */ "./src/__stories__/Typography/Text.tsx");
exports.headingKnobs = (tabName = 'Heading') => (Object.assign({}, Text_1.textKnobs(), { as: react_1.select('as', ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], 'h1', tabName) }));
react_2.storiesOf('Typography|Heading', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => React.createElement(Heading_1.Heading, Object.assign({}, exports.headingKnobs()), "Some Text in a H* tag"));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Typography/Link.tsx":
/*!*********************************************!*\
  !*** ./src/__stories__/Typography/Link.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Link_1 = __webpack_require__(/*! ../../Link */ "./src/Link.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const Box_1 = __webpack_require__(/*! ../Layout/Box */ "./src/__stories__/Layout/Box.tsx");
exports.linkKnobs = (tabName = 'Link') => {
    return _utils_1.cleanKnobs(Object.assign({}, Box_1.boxKnobs(), { href: addon_knobs_1.text('href', 'https://www.stoplight.io', tabName), title: addon_knobs_1.text('title', 'Stoplight.io', tabName), children: addon_knobs_1.text('content', 'stoplight.io', tabName) }));
};
react_1.storiesOf('Typography|Link', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => React.createElement(Link_1.Link, Object.assign({}, exports.linkKnobs())));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Typography/Text.tsx":
/*!*********************************************!*\
  !*** ./src/__stories__/Typography/Text.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Text_1 = __webpack_require__(/*! ../../Text */ "./src/Text.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const _utils_2 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const Box_1 = __webpack_require__(/*! ../Layout/Box */ "./src/__stories__/Layout/Box.tsx");
exports.textKnobs = (tabName = 'Text') => {
    return _utils_2.cleanKnobs(Object.assign({}, Box_1.boxKnobs(), { tracking: react_1.select('tracking', _utils_1.LetterSpacing, '', tabName), leading: react_1.select('leading', _utils_1.LineHeight, '', tabName), casing: react_1.select('casing', _utils_1.Casing, '', tabName), textDecoration: react_1.select('textDecoration', _utils_1.Decoration, '', tabName), textDecorationColor: react_1.text('textDecorationColor', null, tabName), italic: react_1.boolean('italic', false, tabName) }));
};
react_2.storiesOf('Typography|Text', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => React.createElement(Text_1.Text, Object.assign({}, exports.textKnobs()), "Some Text in a P tag"));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Typography/index.ts":
/*!*********************************************!*\
  !*** ./src/__stories__/Typography/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./BlockQuote */ "./src/__stories__/Typography/BlockQuote.tsx");
__webpack_require__(/*! ./Heading */ "./src/__stories__/Typography/Heading.tsx");
__webpack_require__(/*! ./Link */ "./src/__stories__/Typography/Link.tsx");
__webpack_require__(/*! ./Text */ "./src/__stories__/Typography/Text.tsx");


/***/ }),

/***/ "./src/__stories__/Utilities/Badge.tsx":
/*!*********************************************!*\
  !*** ./src/__stories__/Utilities/Badge.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const Badge_1 = __webpack_require__(/*! ../../Badge */ "./src/Badge.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
exports.badgeKnobs = (tabName = 'Badge') => {
    return _utils_1.cleanKnobs({
        color: react_1.select('color', Object.values(Badge_1.BadgeColor), Badge_1.BadgeColor.Default, tabName),
        variant: react_1.select('getVariant', Object.values(Badge_1.BadgeVariant), Badge_1.BadgeVariant.Pill, tabName),
    });
};
react_2.storiesOf('Utilities|Badge', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement("div", null,
    React.createElement(Badge_1.Badge, Object.assign({ key: "badge" }, exports.badgeKnobs()), "5"))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Utilities/Icon.tsx":
/*!********************************************!*\
  !*** ./src/__stories__/Utilities/Icon.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const _brandIcons = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "./node_modules/@fortawesome/free-brands-svg-icons/index.es.js");
const _regularIcons = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "./node_modules/@fortawesome/free-regular-svg-icons/index.es.js");
const _solidIcons = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const map = __webpack_require__(/*! lodash/map */ "./node_modules/lodash/map.js");
const Icon_1 = __webpack_require__(/*! ../../Icon */ "./src/Icon.tsx");
const _utils_1 = __webpack_require__(/*! ../_utils */ "./src/__stories__/_utils.ts");
const { fab, prefix: brandPrefix } = _brandIcons, brandIcons = tslib_1.__rest(_brandIcons, ["fab", "prefix"]);
const { far, prefix: regularPrefix } = _regularIcons, regularIcons = tslib_1.__rest(_regularIcons, ["far", "prefix"]);
const { fas, prefix: solidPrefix } = _solidIcons, solidIcons = tslib_1.__rest(_solidIcons, ["fas", "prefix"]);
Icon_1.IconLibrary.add(fab, far, fas);
exports.iconKnobs = (tabName = 'Icon') => {
    const prefix = react_1.select('prefix', [brandPrefix, regularPrefix, solidPrefix], solidPrefix, 'Icon');
    let icons;
    switch (prefix) {
        case 'fab':
            icons = map(brandIcons, icon => icon.iconName).filter(Boolean);
            break;
        case 'far':
            icons = map(regularIcons, icon => icon.iconName).filter(Boolean);
            break;
        case 'fas':
        default:
            icons = map(solidIcons, icon => icon.iconName).filter(Boolean);
            break;
    }
    const iconName = react_1.select('icon', icons, icons[10], tabName);
    const flip = react_1.select('flip', ['', 'horizontal', 'vertical', 'both'], '', tabName) || undefined;
    const rotation = Number(react_1.select('rotation', ['0', '90', '180', '270'], '0', tabName)) || undefined;
    const props = {
        icon: [prefix, iconName],
        flip,
        rotation,
        spin: react_1.boolean('spin', false, tabName),
        pulse: react_1.boolean('pulse', false, tabName),
    };
    return _utils_1.cleanKnobs(props);
};
react_2.storiesOf('Utilities|Icon', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => (React.createElement("div", { style: { fontSize: 40 } },
    React.createElement(Icon_1.Icon, Object.assign({ key: "icon" }, exports.iconKnobs())))));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Utilities/ScrollBox.tsx":
/*!*************************************************!*\
  !*** ./src/__stories__/Utilities/ScrollBox.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const __1 = __webpack_require__(/*! ../../ */ "./src/index.ts");
const Viewer_1 = __webpack_require__(/*! ../../Code/Viewer */ "./src/Code/Viewer.tsx");
const ScrollBox_1 = __webpack_require__(/*! ../../ScrollBox */ "./src/ScrollBox.tsx");
exports.scrollBoxKnobs = (tabName = 'ScrollBox') => ({
    scrollTo: react_1.select('scrollTo', ['', 'ul-list', 'sub-heading2', 'sub-heading3'], '', tabName),
});
react_2.storiesOf('Utilities|ScrollBox', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('with defaults', () => React.createElement(WithRef, null))
    .add('with scrollTo on load', () => (React.createElement(__1.Box, { width: "50%", height: "50%", m: "@auto", border: "@sm" },
    React.createElement(ScrollBox_1.ScrollBox, { scrollTo: "sub-heading2" },
        React.createElement(ScrollContent, null)))))
    .add('with Code Viwer inside', () => (React.createElement(__1.Box, { width: "50%", height: "50%", m: "@auto", border: "@sm" },
    React.createElement(ScrollBox_1.ScrollBox, null,
        React.createElement(Viewer_1.Viewer, { language: "javascript", showLineNumbers: true, value: `import { boolean, withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { IViewer, Viewer } from '../../Code/Viewer';

export const codeViewerKnobs = (tabName = 'Code Viewer'): IViewer => ({
  language: text('language', 'javascript', tabName),
  value: text('value', 'const defaultValue = stoplight.io();', tabName),
  inline: boolean('inline', false, tabName),
  showLineNumbers: boolean('showLineNumbers', false, tabName),
});

storiesOf('Code:Viewer', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Viewer {...codeViewerKnobs()} />)
  .add('inline', () => <Viewer {...codeViewerKnobs()} inline />);
` })))));
const WithRef = () => {
    const ref = React.useRef(null);
    return (React.createElement(__1.Box, { width: "500px", height: "50%", m: "@auto", border: "@sm" },
        React.createElement(__1.Flex, { p: "@lg" },
            React.createElement(__1.Button, { onClick: () => {
                    if (!ref.current)
                        return;
                    ref.current.scrollToBottom();
                } }, "Scroll To Bottom"),
            React.createElement(__1.Button, { onClick: () => {
                    if (!ref.current)
                        return;
                    ref.current.scrollToTop();
                } }, "Scroll To Top")),
        React.createElement(ScrollBox_1.ScrollBox, Object.assign({}, exports.scrollBoxKnobs(), { innerRef: ref }),
            React.createElement(ScrollContent, null))));
};
const ScrollContent = () => {
    return (React.createElement("div", null,
        React.createElement("div", { style: { padding: 20 } },
            React.createElement("h1", null, "This is the primary heading and there should only be one of these per page sadassadasdsdasdaslkdmaslkdmasldkmalskdmasldmasldkamsldkamsdlkasmdlkamsdlkmsadlksamdlksamdlaskdmasldkmsakdmasldkmasdkmalskdmlaskdm"),
            React.createElement("p", null,
                "A small paragraph to ",
                React.createElement("em", null, "emphasis"),
                " and show ",
                React.createElement("strong", null, "important"),
                " bits."),
            React.createElement("a", { href: "#ul-list", id: "ul-list" }),
            React.createElement("ul", null,
                React.createElement("li", null, "This is a list item"),
                React.createElement("li", null, "So is this - there could be more"),
                React.createElement("li", null,
                    "Make sure to style list items to:",
                    React.createElement("ul", null,
                        React.createElement("li", null, "Not forgetting child list items"),
                        React.createElement("li", null, "Not forgetting child list items"),
                        React.createElement("li", null, "Not forgetting child list items"),
                        React.createElement("li", null, "Not forgetting child list items"))),
                React.createElement("li", null, "A couple more"),
                React.createElement("li", null, "top level list items")),
            React.createElement("p", null,
                "Don't forget ",
                React.createElement("strong", null, "Ordered lists"),
                ":"),
            React.createElement("ol", null,
                React.createElement("li", null, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),
                React.createElement("li", null,
                    "Aliquam tincidunt mauris eu risus.",
                    React.createElement("ol", null,
                        React.createElement("li", null, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),
                        React.createElement("li", null, "Aliquam tincidunt mauris eu risus."))),
                React.createElement("li", null, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."),
                React.createElement("li", null, "Aliquam tincidunt mauris eu risus.")),
            React.createElement("a", { href: "#sub-heading2", id: "sub-heading2" }),
            React.createElement("h2", null, "A sub heading which is not as important as the first, but is quite imporant overall"),
            React.createElement("p", null, "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo."),
            React.createElement("a", { href: "#sub-heading3", id: "sub-heading3" }),
            React.createElement("h3", null, "A sub heading which is not as important as the second, but should be used with consideration"),
            React.createElement("p", null, "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo."))));
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Utilities/index.ts":
/*!********************************************!*\
  !*** ./src/__stories__/Utilities/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./Badge */ "./src/__stories__/Utilities/Badge.tsx");
__webpack_require__(/*! ./Icon */ "./src/__stories__/Utilities/Icon.tsx");
__webpack_require__(/*! ./ScrollBox */ "./src/__stories__/Utilities/ScrollBox.tsx");


/***/ }),

/***/ "./src/__stories__/Views/Components.tsx":
/*!**********************************************!*\
  !*** ./src/__stories__/Views/Components.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const free_solid_svg_icons_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/addon-knobs/react */ "./node_modules/@storybook/addon-knobs/react.js");
const react_2 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const __1 = __webpack_require__(/*! ../../ */ "./src/index.ts");
const Select_1 = __webpack_require__(/*! ../../Select */ "./src/Select.tsx");
const types_1 = __webpack_require__(/*! ../../types */ "./src/types.ts");
__1.IconLibrary.add(free_solid_svg_icons_1.faPlus);
const knobs = () => ({
    variant: addon_knobs_1.select('variant', Object.values(types_1.Variant), types_1.Variant.Default),
    disabled: react_1.boolean('disabled', false),
});
react_2.storiesOf('Views|Components', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('Form Components', () => React.createElement(App, null));
const App = () => {
    return (React.createElement(__1.Flex, { alignItems: "center" },
        React.createElement(__1.Box, { mr: "3" },
            React.createElement(__1.Button, Object.assign({}, knobs()), "Button")),
        React.createElement(__1.Box, { mr: "3" },
            React.createElement(__1.Button, Object.assign({}, knobs()),
                React.createElement(__1.Icon, { icon: "plus" }))),
        React.createElement(__1.Box, { mr: "3" },
            React.createElement(__1.Checkbox, Object.assign({}, knobs()))),
        React.createElement(__1.Box, { mr: "3" },
            React.createElement(__1.Toggle, Object.assign({}, knobs()))),
        React.createElement(__1.Box, { mr: "3" },
            React.createElement(__1.Input, Object.assign({ placeholder: "placeholder" }, knobs()))),
        React.createElement(__1.Box, { mr: "3" },
            React.createElement(__1.Textarea, Object.assign({ placeholder: "placeholder" }, knobs()))),
        React.createElement(__1.Box, { mr: "3" },
            React.createElement(Select_1.Select, Object.assign({ placeholder: "select" }, knobs(), { options: ['1', '2', '3', '4'].map(x => ({ value: x, label: x })) }))),
        React.createElement(__1.Box, { mr: "3" },
            React.createElement(Select_1.Select, Object.assign({ placeholder: "select-multi" }, knobs(), { isMulti: true, options: ['1', '2', '3', '4'].map(x => ({ value: x, label: x })) })))));
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/Views/Layout.tsx":
/*!******************************************!*\
  !*** ./src/__stories__/Views/Layout.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const addon_knobs_1 = __webpack_require__(/*! @storybook/addon-knobs */ "./node_modules/@storybook/addon-knobs/dist/index.js");
const react_1 = __webpack_require__(/*! @storybook/react */ "./node_modules/@storybook/react/dist/client/index.js");
const __1 = __webpack_require__(/*! ../../ */ "./src/index.ts");
const { ThemeZone, useTheme } = __1.createThemedModule();
react_1.storiesOf('Views|Kitchen Sink', module)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('Flex and Box', () => React.createElement(App, null));
const App = () => {
    const theme = useTheme();
    return (React.createElement(__1.Flex, { flexDirection: "column", textAlign: "center", p: 7, pt: 15, position: "relative", border: "1px solid" },
        React.createElement(BoxBadge, { color: theme.link.fg }, "Flex Column"),
        React.createElement(CustomStoryBox, { p: 15 }, "[zone: none] the default root theme values, with some extra padding"),
        React.createElement(__1.Flex, { p: 7, pt: 15, mt: 7, position: "relative", backgroundColor: "red" },
            React.createElement(BoxBadge, null, "Flex Row"),
            React.createElement(ThemeZone, { name: "inner" },
                React.createElement(CustomStoryBox, { flex: "1", p: 11, pt: 15, mr: 7 },
                    React.createElement(__1.Box, null, "[zone: 'inner'] defaults canvas.bg to purple and canvas.fg to white"),
                    React.createElement(__1.Button, { mt: 11 }, "Go"))),
            React.createElement(ThemeZone, { name: "inverted" },
                React.createElement(CustomStoryBox, { flex: "1", p: 11, pt: 15 },
                    React.createElement(__1.Box, null, "[zone: 'inverted'] inverts canvas bg and fg"),
                    React.createElement(__1.Button, { mt: 11 }, "Go"))))));
};
const BoxBadge = props => (React.createElement(__1.Box, Object.assign({ fontSize: 0, position: "absolute", top: 0, right: 0, px: 4, py: "1px", fontStyle: "italic" }, props, { borderBottom: "1px solid", borderLeft: "1px solid" })));
const CustomStoryBox = (_a) => {
    var { children } = _a, props = tslib_1.__rest(_a, ["children"]);
    const theme = useTheme();
    return (React.createElement(__1.Box, Object.assign({ backgroundColor: theme.container && theme.container.bg, color: theme.container && theme.container.fg, position: "relative" }, props),
        children,
        React.createElement(BoxBadge, null, "Box")));
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/__stories__/_utils.ts":
/*!***********************************!*\
  !*** ./src/__stories__/_utils.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cleanDeep = __webpack_require__(/*! clean-deep */ "./node_modules/clean-deep/dist/index.js");
exports.TextAlign = ['left', 'right', 'center', 'justify', 'initial', 'inherit'];
exports.OverFlow = ['visible', 'hidden', 'scroll', 'auto', 'initial', 'inherit'];
exports.PositionOpts = ['static', 'relative', 'fixed', 'absolute', 'sticky', 'inherit', 'initial'];
exports.Display = [
    '',
    'inline',
    'block',
    'contents',
    'flex',
    'grid',
    'inline-block',
    'inline-flex',
    'inline-grid',
    'inline-table',
    'list-item',
    'run-in',
    'table',
    'table-caption',
    'table-column-group',
    'table-header-group',
    'table-footer-group',
    'table-row-group',
    'table-cell',
    'table-column',
    'table-row',
    'none',
    'initial',
    'inherit',
];
exports.AlignItems = ['', 'stretch', 'center', 'flex-start', 'flex-end', 'baseline', 'initial', 'inherit'];
exports.JustifyContent = [
    '',
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'initial',
    'inherit',
];
exports.FlexDirection = ['row', 'row-reverse', 'column', 'column-reverse', 'initial', 'inherit'];
exports.FlexWrap = ['nowrap', 'wrap', 'wrap-reverse', 'initial', 'inherit'];
exports.Decoration = ['', 'none', 'underline', 'overline', 'line-through', 'initial', 'inherit'];
exports.Casing = ['none', 'capitalize', 'uppercase', 'lowercase', 'initial', 'inherit'];
exports.LineHeight = ['', 'reset', 'none', 'tight', 'normal', 'loose'];
exports.LetterSpacing = ['', 'tight', 'normal', 'wide'];
exports.ListStylePosition = ['inside', 'outside', 'initial', 'inherit', 'revert'];
exports.ListStyleType = [
    '',
    'circle',
    'disc',
    'square',
    'armenian',
    'cjk-ideographic',
    'decimal',
    'decimal-leading-zero',
    'georgian',
    'hebrew',
    'hiragana',
    'hiragana-iroha',
    'katakana',
    'katakana-iroha',
    'lower-alpha',
    'lower-greek',
    'lower-latin',
    'lower-roman',
    'upper-alpha',
    'upper-greek',
    'upper-latin',
    'upper-roman',
    'none',
    'inherit',
];
exports.InlineInputType = [
    'text',
    'date',
    'datetime-local',
    'email',
    'number',
    'password',
    'search',
    'time',
    'url',
];
exports.AutosizeInputType = ['text', 'email', 'password', 'search', 'url'];
function cleanKnobs(props) {
    return cleanDeep(props, {
        emptyArrays: false,
        emptyObjects: false,
        emptyStrings: true,
        nullValues: true,
        undefinedValues: true,
    });
}
exports.cleanKnobs = cleanKnobs;


/***/ }),

/***/ "./src/__stories__/index.ts":
/*!**********************************!*\
  !*** ./src/__stories__/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./Code/ */ "./src/__stories__/Code/index.ts");
__webpack_require__(/*! ./Data/ */ "./src/__stories__/Data/index.ts");
__webpack_require__(/*! ./Forms */ "./src/__stories__/Forms/index.ts");
__webpack_require__(/*! ./Layout */ "./src/__stories__/Layout/index.ts");
__webpack_require__(/*! ./Menus/ */ "./src/__stories__/Menus/index.ts");
__webpack_require__(/*! ./Misc/ */ "./src/__stories__/Misc/index.ts");
__webpack_require__(/*! ./Typography */ "./src/__stories__/Typography/index.ts");
__webpack_require__(/*! ./Utilities/ */ "./src/__stories__/Utilities/index.ts");
__webpack_require__(/*! ./Views/Components */ "./src/__stories__/Views/Components.tsx");
__webpack_require__(/*! ./Views/Layout */ "./src/__stories__/Views/Layout.tsx");


/***/ }),

/***/ "./src/hooks/useAutoFocus.ts":
/*!***********************************!*\
  !*** ./src/hooks/useAutoFocus.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.useAutoFocus = (autoFocus, ref) => {
    const nodeRef = react_1.useRef(null);
    react_1.useEffect(() => {
        if (!ref)
            return;
        if (typeof ref === 'function') {
            ref(nodeRef.current);
        }
        else if ('current' in ref) {
            ref.current = nodeRef.current;
        }
    }, [nodeRef.current, ref]);
    react_1.useEffect(() => {
        const { current: node } = nodeRef;
        if (autoFocus && node !== null && node.focus) {
            node.focus();
        }
    }, [autoFocus, nodeRef.current]);
    return [nodeRef];
};


/***/ }),

/***/ "./src/hooks/useHover.ts":
/*!*******************************!*\
  !*** ./src/hooks/useHover.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
exports.useHover = (initialState, props, hideDelay) => {
    let timer = null;
    const [state, setState] = react_1.useState(initialState);
    const onMouseEnter = e => {
        if (props && props.onMouseEnter) {
            props.onMouseEnter(e);
        }
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
        setState(true);
    };
    const onMouseLeave = e => {
        if (props && props.onMouseLeave) {
            props.onMouseLeave(e);
        }
        if (hideDelay !== undefined) {
            timer = setTimeout(setState, hideDelay, false);
        }
        else {
            setState(false);
        }
    };
    react_1.useEffect(() => {
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
    }, [timer]);
    return [
        state,
        {
            onMouseEnter,
            onMouseLeave,
        },
    ];
};


/***/ }),

/***/ "./src/hooks/useScrollToHash.ts":
/*!**************************************!*\
  !*** ./src/hooks/useScrollToHash.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const scroll_1 = __webpack_require__(/*! ../utils/scroll */ "./src/utils/scroll.ts");
exports.useScrollToHash = (elementId) => {
    const targetScrollTo = elementId || (typeof window !== 'undefined' ? window.location.hash : null);
    React.useEffect(() => {
        if (targetScrollTo) {
            scroll_1.scrollToHash(targetScrollTo);
        }
    }, [targetScrollTo]);
};


/***/ }),

/***/ "./src/hooks/useWindowResize.ts":
/*!**************************************!*\
  !*** ./src/hooks/useWindowResize.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debounce = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function useWindowResize() {
    const [timestamp, setTimestamp] = React.useState(0);
    if (typeof window !== 'undefined') {
        React.useEffect(() => {
            const resizeHandler = debounce((e) => {
                setTimestamp(e.timeStamp);
            }, 16);
            window.addEventListener('resize', resizeHandler);
            return () => {
                window.removeEventListener('resize', resizeHandler);
            };
        }, []);
    }
    return timestamp;
}
exports.useWindowResize = useWindowResize;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
tslib_1.__exportStar(__webpack_require__(/*! ./Badge */ "./src/Badge.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./BlockQuote */ "./src/BlockQuote.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Box */ "./src/Box.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Break */ "./src/Break.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Button */ "./src/Button.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Checkbox */ "./src/Checkbox.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Dialog */ "./src/Dialog.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Flex */ "./src/Flex.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Heading */ "./src/Heading.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Icon */ "./src/Icon.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Image */ "./src/Image.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Input */ "./src/Input.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Link */ "./src/Link.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./List */ "./src/List.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Menu */ "./src/Menu.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Overlay */ "./src/Overlay.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Popup */ "./src/Popup/index.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Portal */ "./src/Portal.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./ScrollList */ "./src/ScrollList.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Table */ "./src/Table.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Tabs */ "./src/Tabs/index.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Text */ "./src/Text.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Textarea */ "./src/Textarea.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Toast */ "./src/Toast/index.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Toggle */ "./src/Toggle.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Tooltip */ "./src/Tooltip.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./theme */ "./src/theme/index.tsx"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./types */ "./src/types.ts"), exports);


/***/ }),

/***/ "./src/styles.ts":
/*!***********************!*\
  !*** ./src/styles.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const isNil = __webpack_require__(/*! lodash/isNil */ "./node_modules/lodash/isNil.js");
const ss = __webpack_require__(/*! styled-system */ "./node_modules/styled-system/dist/index.esm.js");
exports.boxSizing = (props) => ({
    boxSizing: props.boxSizing,
});
exports.color = (props) => ({
    color: props.color,
    backgroundColor: props.backgroundColor,
});
exports.cursor = (props) => ({
    cursor: props.cursor,
});
exports.flexFlow = (props) => ({
    flexFlow: props.flexFlow,
});
exports.listStyle = (props) => ({
    listStyle: props.listStyle,
    listStylePosition: props.listStylePosition,
});
exports.overflow = (props) => ({
    overflow: props.overflow,
    overflowX: props.overflowX,
    overflowY: props.overflowY,
});
exports.textDecoration = (props) => ({
    textDecoration: props.textDecoration,
    textDecorationColor: props.textDecorationColor,
});
exports.textOverflow = (props) => ({
    textOverflow: props.textOverflow,
});
exports.textTransform = (props) => ({
    textTransform: props.textTransform,
});
exports.transform = (props) => ({
    transform: props.transform,
});
exports.visibility = (props) => ({
    visibility: props.visibility,
});
exports.whiteSpace = (props) => ({
    whiteSpace: props.whiteSpace,
});
exports.space = ss.mapProps((props) => (Object.assign({}, props, { mt: !isNil(props.mt) ? props.mt : props.my, mb: !isNil(props.mb) ? props.mb : props.my, ml: !isNil(props.ml) ? props.ml : props.mx, mr: !isNil(props.mr) ? props.mr : props.mx, pt: !isNil(props.pt) ? props.pt : props.py, pb: !isNil(props.pb) ? props.pb : props.py, pl: !isNil(props.pl) ? props.pl : props.px, pr: !isNil(props.pr) ? props.pr : props.px })))(ss.compose(ss.margin, ss.marginTop, ss.marginBottom, ss.marginLeft, ss.marginRight, ss.padding, ss.paddingTop, ss.paddingBottom, ss.paddingLeft, ss.paddingRight));


/***/ }),

/***/ "./src/theme/configuration.ts":
/*!************************************!*\
  !*** ./src/theme/configuration.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const space = {
    0: '0px',
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    5: '5px',
    6: '6px',
    7: '8px',
    8: '10px',
    9: '12px',
    10: '14px',
    11: '18px',
    12: '22px',
    13: '26px',
    14: '30px',
    15: '34px',
    16: '40px',
    17: '46px',
    18: '52px',
    19: '60px',
    20: '66px',
    21: '78px',
    22: '86px',
    23: '94px',
    24: '102px',
    25: '110px',
};
exports.configuration = { space };


/***/ }),

/***/ "./src/theme/dark.ts":
/*!***************************!*\
  !*** ./src/theme/dark.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const opacityBorder = 'rgba(16,22,26,.15)';
const inputTheme = {
    fg: '#f5f8fa',
    bg: 'rgb(65, 65, 65)',
    border: opacityBorder,
    invalidFg: 'red',
    invalidBg: 'rgb(45, 18, 17)',
    invalidBorder: 'darkred',
    warningFg: 'yellow',
    warningBg: 'rgb(45, 41, 17)',
    warningBorder: '#9c9c00',
};
const buttonTheme = {
    fg: 'white',
    bg: 'rgb(65, 65, 65)',
    border: opacityBorder,
    hoverBg: 'rgb(89, 89, 89)',
};
const checkboxTheme = Object.assign({}, buttonTheme, { fg: 'rgb(65, 65, 65)', checked: 'steelblue', invalidFg: 'red', invalidBg: 'rgb(45, 18, 17)', invalidChecked: 'rgb(45, 18, 17)', invalidBorder: 'darkred', warningFg: 'yellow', warningBg: 'rgb(45, 41, 17)', warningChecked: 'rgb(45, 41, 17)', warningBorder: '#9c9c00' });
const menuTheme = {
    fg: 'white',
    bg: '#222',
    border: opacityBorder,
    hoverBg: 'rgba(167,182,194,.3)',
};
exports.darkTheme = {
    base: 'dark',
    badge: {
        default: {
            fg: '#fff',
            bg: '#6c757e',
        },
        warning: {
            fg: '#21252a',
            bg: '#ffc108',
        },
        error: {
            fg: '#fff',
            bg: '#dc3546',
        },
    },
    button: buttonTheme,
    blockQuote: {
        bg: '#093e6f',
        border: '#247aca',
        shadow: '0 0 1px rgba(72, 164, 249, 0.15)',
    },
    checkbox: checkboxTheme,
    code: {
        bg: '#28303a',
        border: 'rgb(83, 89, 97)',
        inlineFg: 'inherit',
        inlineBg: 'rgb(77, 77, 77)',
        syntax: {
            primary: '#e91e63',
            secondary: '#4caf50',
            comment: '#c2cbd0',
            punctuation: '#c3c9cc',
            keyword: '#FFFFC7',
            function: '#f44336',
            variable: '#FFFFC7',
            operator: '#795548',
            regex: '#ff9800',
        },
    },
    contextMenu: menuTheme,
    dialog: {
        bg: '#222',
        fg: '#fff',
    },
    input: inputTheme,
    link: {
        fg: '#3498db',
        hoverFg: '#c6f6ff',
    },
    menu: menuTheme,
    overlay: {
        bg: 'rgba(255, 255, 255, 0.4)',
    },
    scrollbar: {
        bg: 'rgba(255, 255, 255, 0.7)',
    },
    select: Object.assign({}, inputTheme, { menu: Object.assign({}, menuTheme, { selectedBg: '#193d6b' }), chip: {
            fg: '#BFCCD6',
            bg: buttonTheme.bg,
            border: opacityBorder,
        } }),
    table: {
        fg: 'inherit',
        border: 'rgb(77, 77, 77)',
        shadow: '0 0 10px 1px rgba(255,255,255,0.6) inset',
        evenBg: 'rgb(29, 29, 29)',
    },
    textarea: inputTheme,
    tabs: {
        bg: '#28303a',
        fg: 'rgb(168, 172, 175)',
        border: 'rgb(65, 65, 65)',
        selectedFg: '#fff',
        selectedBg: '#1b2129',
    },
    toggle: Object.assign({}, checkboxTheme, { bg: 'gainsboro' }),
    tooltip: inputTheme,
    toast: {
        toastFg: '#f0f0f0',
        toastBg: '#222',
        actionFg: '#f0f0f0',
        actionBg: 'rgba(138,155,168,0.25)',
        progressBg: '#fff',
        info: 'blue',
        success: 'green',
        warning: 'orange',
        error: 'red',
    },
};


/***/ }),

/***/ "./src/theme/index.tsx":
/*!*****************************!*\
  !*** ./src/theme/index.tsx ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
const merge = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
const React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
const configuration_1 = __webpack_require__(/*! ./configuration */ "./src/theme/configuration.ts");
const dark_1 = __webpack_require__(/*! ./dark */ "./src/theme/dark.ts");
const light_1 = __webpack_require__(/*! ./light */ "./src/theme/light.ts");
tslib_1.__exportStar(__webpack_require__(/*! ./utils */ "./src/theme/utils.ts"), exports);
function createThemedModule() {
    return {
        ThemeProvider: exports.ThemeProvider,
        ThemeZone: exports.ThemeZone,
        useTheme: exports.useTheme,
        useThemeZones: exports.useThemeZones,
    };
}
exports.createThemedModule = createThemedModule;
const baseThemes = {
    dark: dark_1.darkTheme,
    light: light_1.lightTheme,
};
const defaultTheme = baseThemes.light;
const Theme = React.createContext(defaultTheme);
exports.useTheme = () => React.useContext(Theme);
exports.ThemeProvider = ({ children, theme, zones = {} }) => {
    const targetTheme = theme || defaultTheme;
    return (React.createElement(Theme.Provider, { value: merge({}, configuration_1.configuration, baseThemes[targetTheme.base], targetTheme) },
        React.createElement(ThemeZones.Provider, { value: zones }, children)));
};
const ThemeZones = React.createContext({});
exports.useThemeZones = () => React.useContext(ThemeZones);
exports.ThemeZone = ({ children, name }) => {
    const parentTheme = exports.useTheme();
    const zones = exports.useThemeZones();
    const zoneTheme = zones[name] || {};
    return (React.createElement(Theme.Provider, { value: merge({}, parentTheme, typeof zoneTheme === 'function' ? zoneTheme(parentTheme) : zoneTheme) }, children));
};


/***/ }),

/***/ "./src/theme/light.ts":
/*!****************************!*\
  !*** ./src/theme/light.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const opacityBorder = 'rgba(16,22,26,.15)';
const inputTheme = {
    fg: '#222',
    bg: '#fff',
    border: opacityBorder,
    invalidFg: 'red',
    invalidBg: 'rgb(248, 222, 220)',
    invalidBorder: 'red',
    warningFg: '#6b6b00',
    warningBg: '#fffbe8',
    warningBorder: '#c3c300',
};
const buttonTheme = {
    fg: 'black',
    bg: 'white',
    border: opacityBorder,
    hoverBg: '#ebf1f5',
};
const checkboxTheme = Object.assign({}, buttonTheme, { fg: 'white', checked: 'steelblue', invalidFg: 'red', invalidBg: 'rgb(248, 222, 220)', invalidChecked: 'rgb(248, 222, 220)', invalidBorder: 'red', warningFg: '#6b6b00', warningBg: '#fffbe8', warningChecked: '#fffbe8', warningBorder: '#c3c300' });
const menuTheme = {
    fg: '#111',
    bg: '#fff',
    border: opacityBorder,
    hoverBg: 'rgba(167,182,194,.3)',
};
exports.lightTheme = {
    base: 'light',
    badge: {
        default: {
            fg: '#fff',
            bg: '#6c757e',
        },
        warning: {
            fg: '#21252a',
            bg: '#ffc108',
        },
        error: {
            fg: '#fff',
            bg: '#dc3546',
        },
    },
    button: buttonTheme,
    blockQuote: {
        bg: '#f4faff',
        border: '#48a4f9',
        shadow: '0 0 1px rgba(72, 164, 249, 0.15)',
    },
    checkbox: checkboxTheme,
    code: {
        bg: '#F5F7F9',
        border: '#E6ECF1',
        inlineFg: '#1a1a1a',
        inlineBg: 'rgb(255, 247, 211)',
        syntax: {
            primary: '#e91e63',
            secondary: '#4caf50',
            comment: '#90a4ae',
            punctuation: '#9e9e9e',
            keyword: '#3f51b5',
            function: '#f44336',
            variable: '#ff9800',
            operator: '#795548',
            regex: '#ff9800',
        },
    },
    contextMenu: menuTheme,
    dialog: {
        bg: '#fff',
        fg: '#111',
    },
    input: inputTheme,
    link: {
        fg: '#72bcd4',
    },
    menu: menuTheme,
    overlay: {
        bg: 'rgba(0, 0, 0, 0.4)',
    },
    scrollbar: {
        bg: 'hsla(0, 0%, 27%, 0.84)',
    },
    select: Object.assign({}, inputTheme, { menu: Object.assign({}, menuTheme, { selectedBg: 'rgba(79, 99, 114, 0.47)' }), chip: {
            fg: 'white',
            bg: 'rgb(118, 130, 143)',
            border: 'transparent',
        } }),
    table: {
        fg: '#111',
        border: '#E6ECF1',
        shadow: '0 0 8px 1px rgba(0, 0, 0, 0.6) inset',
        evenBg: '#F5F7F9',
    },
    textarea: inputTheme,
    tabs: {
        fg: '#9DAAB6',
        bg: '#F5F7F9',
        border: '#E6ECF1',
        selectedFg: '#32373D',
        selectedBg: '#fff',
    },
    toggle: Object.assign({}, checkboxTheme, { bg: 'gainsboro' }),
    tooltip: inputTheme,
    toast: {
        toastFg: 'rgb(245, 248, 250)',
        toastBg: 'rgb(24, 26, 27)',
        actionFg: 'rgb(245, 248, 250)',
        actionBg: 'rgba(138,155,168,0.25)',
        progressBg: 'rgb(245, 248, 250)',
        info: '#137cbd',
        success: '#0f9960',
        warning: '#d9822b',
        error: '#db3737',
    },
};


/***/ }),

/***/ "./src/theme/utils.ts":
/*!****************************!*\
  !*** ./src/theme/utils.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(/*! ./ */ "./src/theme/index.tsx");
exports.colorMixin = (state, componentName) => {
    const theme = _1.useTheme()[componentName];
    if (typeof theme !== 'object') {
        return null;
    }
    const backgroundColor = theme[state === '' ? 'bg' : `${state}Bg`];
    const color = theme[state === '' ? 'fg' : `${state}Fg`];
    const borderColor = theme[state === '' ? 'border' : `${state}Border`];
    const values = Object.assign({}, (backgroundColor ? { backgroundColor } : null), (color ? { color } : null), (borderColor ? { borderColor } : null));
    return state === '' ? values : { [`:${state}`]: values };
};


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Variant;
(function (Variant) {
    Variant["Default"] = "";
    Variant["Invalid"] = "invalid";
    Variant["Warning"] = "warning";
})(Variant = exports.Variant || (exports.Variant = {}));


/***/ }),

/***/ "./src/utils/getVariant.ts":
/*!*********************************!*\
  !*** ./src/utils/getVariant.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
exports.getVariant = (baseTheme, variant = types_1.Variant.Default) => {
    switch (variant) {
        case types_1.Variant.Invalid:
            return Object.assign({ fg: baseTheme.invalidFg, bg: baseTheme.invalidBg, border: baseTheme.invalidBorder }, ('invalidChecked' in baseTheme && { checked: baseTheme.invalidChecked }));
        case types_1.Variant.Warning:
            return Object.assign({ fg: baseTheme.warningFg, bg: baseTheme.warningBg, border: baseTheme.warningBorder }, ('warningChecked' in baseTheme && { checked: baseTheme.warningChecked }));
        default:
            return null;
    }
};


/***/ }),

/***/ "./src/utils/scroll.ts":
/*!*****************************!*\
  !*** ./src/utils/scroll.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const replace = __webpack_require__(/*! lodash/replace */ "./node_modules/lodash/replace.js");
exports.getScrollTransform = (client = 0, scroll = 0, currentLocation = 0, thumb = 0) => {
    const trackSize = client - 28;
    return (currentLocation / (scroll - client)) * (trackSize - thumb);
};
exports.getThumbDimension = ({ scroll = 0, client = 0 }) => {
    if (scroll < client)
        return 0;
    const track = client - 28;
    const height = Math.ceil((client / scroll) * track);
    return Math.max(height, 30);
};
exports.horizontalTrackStyle = (style) => (Object.assign({ background: 'transparent', position: 'absolute', cursor: 'pointer', right: 10, bottom: 2, left: 2 }, style));
exports.verticalTrackStyle = (style) => (Object.assign({ background: 'transparent', position: 'absolute', cursor: 'pointer', top: 2, right: 2, bottom: 10 }, style));
exports.scrollToHash = (hash) => {
    const element = document.getElementById(replace(hash || window.location.hash, '#', ''));
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
};


/***/ }),

/***/ "./src/utils/validPropsPicker.ts":
/*!***************************************!*\
  !*** ./src/utils/validPropsPicker.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const is_prop_valid_1 = __webpack_require__(/*! @emotion/is-prop-valid */ "./node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js");
exports.validPropsPicker = (value, prop) => {
    const includeProp = is_prop_valid_1.default(prop);
    if (!includeProp && "production" !== 'production') {
        console.error(`Invalid prop ${prop} given.`);
    }
    return includeProp;
};


/***/ }),

/***/ 0:
/*!*****************************************************************************************************************************************************************!*\
  !*** multi ./node_modules/@storybook/core/dist/server/common/polyfills.js ./node_modules/@storybook/core/dist/server/preview/globals.js ./.storybook/config.js ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/circleci/project/node_modules/@storybook/core/dist/server/common/polyfills.js */"./node_modules/@storybook/core/dist/server/common/polyfills.js");
__webpack_require__(/*! /home/circleci/project/node_modules/@storybook/core/dist/server/preview/globals.js */"./node_modules/@storybook/core/dist/server/preview/globals.js");
module.exports = __webpack_require__(/*! /home/circleci/project/.storybook/config.js */"./.storybook/config.js");


/***/ })

},[[0,"runtime~main","vendors~main"]]]);
//# sourceMappingURL=main.4e0bac84bb830cc5f90e.bundle.js.map