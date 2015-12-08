const HIDDEN_TEXTAREA_STYLE = [
    'height: 0',
    'visibility: hidden',
    'overflow: hidden',
    'position: absolute',
    'z-index: -1000',
    'top: 0',
    'right: 0'
];

const STYLES = [
    'letter-spacing',
    'line-height',
    'padding-top',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'font-family',
    'font-weight',
    'font-size',
    'text-transform',
    'width',
    'border-width',
    'box-sizing'
];

let shadowTextarea = null;

function getStyleInfo(textarea) {
    let computedStyle = window.getComputedStyle(textarea);
    let boxSizing = getPrefixedStyle(computedStyle, 'box-sizing');
    let heightAdjust = 0;
    let padding = getStyleNumber(computedStyle, 'padding-top') + getStyleNumber(computedStyle, 'padding-bottom');
    let border = getStyleNumber(computedStyle, 'border-bottom-width') + getStyleNumber(computedStyle, 'border-top-width');
    if (boxSizing === 'border-box')
        heightAdjust += border;
    else if (boxSizing === 'content-box')
        heightAdjust -= padding;
    return {
        styles: STYLES.map(function(name) {
            return name + ':' + computedStyle.getPropertyValue(name);
        }),
        padding,
        border,
        heightAdjust
    };
}

function getPrefixedStyle(computedStyle, name) {
    let prefix = ['-o-', '-ms-', '-moz-', '-webkit-', ''];
    let tmp;
    for (let i = prefix.length; i--;)
        if (tmp = computedStyle.getPropertyValue(prefix[i] + name))
            return tmp;
    return null;
}

function getStyleNumber(computedStyle, name) {
    return parseFloat(computedStyle.getPropertyValue(name));
}

function getSingleRowHeight(textarea) {
    let tmp = textarea.value;
    textarea.value = 'x';
    let result = textarea.scrollHeight;
    textarea.value = tmp;
    return result;
}

export default function calculateHeight(textarea, minRows, maxRows) {
    if (!shadowTextarea) document.body.appendChild(shadowTextarea = document.createElement('textarea'));
    let _styleInfo = getStyleInfo(textarea);
    let styles = _styleInfo.styles;
    let {
        heightAdjust,
        padding,
        border
    } = _styleInfo;
    shadowTextarea.setAttribute('style', styles.concat(HIDDEN_TEXTAREA_STYLE).join(';'));
    shadowTextarea.value = textarea.value;
    let height = shadowTextarea.scrollHeight + heightAdjust;
    let minHeight = -Infinity;
    let maxHeight = Infinity;

    if (minRows !== null || maxRows !== null) {
        let singleRowHeight = getSingleRowHeight(shadowTextarea) - padding;
        if (minRows !== null) {
            minHeight = singleRowHeight * minRows + padding + heightAdjust;
            height = Math.max(minHeight, height);
        }
        if (maxRows !== null) {
            maxHeight = singleRowHeight * maxRows + padding + heightAdjust;
            height = Math.min(maxHeight, height);
        }
    }

    return {
        height,
        minHeight,
        maxHeight
    };
}