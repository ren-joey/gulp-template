/**
 * 左側補零工具
 * @param {string|number} str 原始字串或數字
 * @param {number} length 目標總長度
 * @returns {string} 補完零後的字串，其長度等於指定總長
 */
const paddingLeft = (str, length) => {
    if (str.length >= length) { return str; }
    return paddingLeft(`0${str}`, length);
};

/**
 * 右側補零工具
 * @param {string|number} str 原始字串或數字
 * @param {number} length 目標總長度
 * @returns {string} 補完零後的字串，其長度等於指定總長
 */
const paddingRight = (str, length) => {
    if (str.length >= length) { return str; }
    return paddingRight(`${str}0`, length);
};

/**
 * 網址參數取得器
 * @param {string} name 參數名稱
 * @param {string} [url] 目標url(選填，預設值為當前網址)
 * @returns {string} 結果參數值
 */
const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * 網址參數清除器
 * @param {string} [url] 目標url(選填，預設值為當前網址)
 * @returns {string} 清除後的完整網址
 */
const clearParameters = (url) => {
    if (!url) url = window.location.href;

    const urlparts = url.split('?');
    return urlparts[0];
};

/**
 * 網址參數移除器
 * @param {string} parameter 參數名稱
 * @param {string} [url] 目標url(選填，預設值為當前網址)
 * @returns {string} 清除指定餐數後的網址
 */
const removeParameterByName = (parameter, url) => {
    if (!url) url = window.location.href;
    // prefer to use l.search if you have a location/link object
    const urlparts = url.split('?');
    if (urlparts.length >= 2) {
        const prefix = `${encodeURIComponent(parameter)}=`;
        const pars = urlparts[1].split(/[&]/g);

        // reverse iteration as may be destructive
        for (let i = pars.length; i-- > 0;) {
            // idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }
        return urlparts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '');
    }
    return url;
};

((document, window, $, TimelineMax, TweenMax) => {
    //
})(document, window, jQuery, TimelineMax, TweenMax)
