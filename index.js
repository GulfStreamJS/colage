const CO = require('./countries');
const LA = require('./languages');
const GE = require('./genres');

let countries = {};
let languages = {};
let genres = {};

for (let i = 0; i < CO.length; i++) {
    countries[CO[i].locale] = CO[i].countries;
}
for (let i = 0; i < LA.length; i++) {
    languages[LA[i].locale] = LA[i].languages;
}
for (let i = 0; i < GE.length; i++) {
    genres[GE[i].locale] = GE[i].genres;
}

/**
 * Convert country names (string) to ISO 3166-1 (array)
 * Convert country ISO 3166-1 (array) to names (array)
 *
 * @param {String|Array} items
 * @param {String} [lang]
 * @param {String} [separator]
 * @return {Array}
 */

module.exports.co = (items, lang, separator) => {
    return parse(items, lang, separator, countries);
};

/**
 * Convert language names (string) to ISO 639-1 (array)
 * Convert language ISO 639-1 (array) to names (array)
 *
 * @param {String|Array} items
 * @param {String} [lang]
 * @param {String} [separator]
 * @return {Array}
 */

module.exports.la = (items, lang, separator) => {
    return parse(items, lang, separator, languages);
};

/**
 * Convert genre names (string) to codes (array)
 * Convert genre codes (array) to names (array)
 *
 * @param {String|Array} items
 * @param {String} [lang]
 * @param {String} [separator]
 * @return {Array}
 */

module.exports.ge = (items, lang, separator) => {
    return parse(items, lang, separator, genres);
};

const parse = (items, lang, separator, data) => {
    if (typeof separator === 'undefined') {
        separator = ',';
    }
    if (!items) {
        return [];
    }
    if (typeof items === 'string') {
        return items.split(separator).map(title => {
            title = title
                .replace(/\s+/g, ' ')
                .replace(/(^\s*)|(\s*)$/g, '')
                .toLowerCase();
            if (typeof lang === 'undefined') {
                let langs = Object.keys(data);
                for (let l = 0; l < langs.length; l++) {
                    let codes = Object.keys(data[langs[l]]);
                    for (let c = 0; c < codes.length; c++) {
                        if (data[langs[l]][codes[c]].toLowerCase() === title) {
                            return codes[c];
                        }
                    }
                }
            }
            else if (typeof lang === 'string') {
                lang = lang.toLowerCase();
                if (!data[lang]) return false;
                let codes = Object.keys(data[lang]);
                for (let c = 0; c < codes.length; c++) {
                    if (data[lang][codes[c]].toLowerCase() === title) {
                        return codes[c];
                    }
                }
            }
            else {
                return false;
            }
        }).filter(Boolean);
    }
    if (typeof items === 'object') {
        lang = typeof lang === 'undefined'
            ? 'en'
            : lang.toLowerCase();
        if (!data[lang]) return [];
        return items.map(code => {
            return (data[lang] && data[lang][code])
                ? data[lang][code]
                : false;
        }).filter(Boolean);
    }
};

var ctl = {
    'ad': 'ca',
    'ae': 'ar',
    'af': 'fa,ps',
    'ag': 'en',
    'ai': 'en',
    'al': 'sq',
    'am': 'hy',
    'an': 'nl,en',
    'ao': 'pt',
    // 'aq': '',
    'ar': 'es',
    'as': 'en,sm',
    'at': 'de',
    'au': 'en',
    'aw': 'nl,pap',
    'ax': 'sv',
    'ba': 'bs,hr,sr',
    'bb': 'en',
    'bd': 'bn',
    'be': 'nl,fr,de',
    'bf': 'fr',
    'bh': 'ar',
    'bi': 'fr',
    'bj': 'fr',
    'bl': 'fr',
    'bm': 'en',
    'bn': 'ms',
    'bo': 'es,qu,ay',
    'br': 'pt',
    'bs': 'en',
    'bt': 'dz',
    'bv': 'no',
    'bw': 'en,tn',
    'by': 'be,ru',
    'bz': 'en',
    'ca': 'en,fr',
    'cc': 'en',
    'cd': 'fr',
    'cf': 'fr',
    'cg': 'fr',
    'ch': 'de,fr,it,rm',
    'ci': 'fr',
    'ck': 'en,rar',
    'cl': 'es',
    'cm': 'fr,en',
    'cn': 'zh',
    'co': 'es',
    'cr': 'es',
    'cu': 'es',
    'cv': 'pt',
    'cx': 'en',
    'cy': 'el,tr',
    'cz': 'cs',
    // 'de': 'de',
    'dj': 'fr,ar,so',
    'dk': 'da',
    'dm': 'en',
    'do': 'es',
    'dz': 'ar',
    'ec': 'es',
    'ee': 'et',
    'eg': 'ar',
    'eh': 'ar,es,fr',
    'er': 'ti,ar,en',
    'es': 'ast,ca,es,eu,gl',
    'et': 'am,om',
    'fi': 'fi,sv,se',
    'fj': 'en',
    'fk': 'en',
    'fm': 'en',
    // 'fo': 'fo',
    // 'fr': 'fr',
    'ga': 'fr',
    'gb': 'en,ga,cy,gd,kw',
    'gd': 'en',
    'ge': 'ka',
    'gf': 'fr',
    'gg': 'en',
    'gh': 'en',
    'gi': 'en',
    'gl': 'kl,da',
    'gm': 'en',
    'gn': 'fr',
    'gp': 'fr',
    'gq': 'es,fr,pt',
    'gr': 'el',
    'gs': 'en',
    'gt': 'es',
    'gu': 'en,ch',
    'gw': 'pt',
    'gy': 'en',
    'hk': 'zh,en',
    'hm': 'en',
    'hn': 'es',
    // 'hr': 'hr',
    'ht': 'fr,ht',
    // 'hu': 'hu',
    // 'id': 'id',
    'ie': 'en,ga',
    'il': 'he',
    'im': 'en',
    'in': 'hi,en',
    'io': 'en',
    'iq': 'ar,ku',
    'ir': 'fa',
    // 'is': 'is',
    'it': 'it,de,fr',
    'je': 'en',
    'jm': 'en',
    'jo': 'ar',
    'jp': 'ja',
    'ke': 'sw,en',
    'kg': 'ky,ru',
    'kh': 'km',
    'ki': 'en',
    'km': 'ar,fr',
    'kn': 'en',
    'kp': 'ko',
    'kr': 'ko,en',
    'kw': 'ar',
    'ky': 'en',
    'kz': 'kk,ru',
    'la': 'lo',
    'lb': 'ar,fr',
    'lc': 'en',
    'li': 'de',
    'lk': 'si,ta',
    'lr': 'en',
    'ls': 'en,st',
    // 'lt': 'lt',
    'lu': 'lb,fr,de',
    // 'lv': 'lv',
    'ly': 'ar',
    'ma': 'ar',
    'mc': 'fr',
    'md': 'ru,uk,ro',
    'me': 'srp,sq,bs,hr,sr',
    'mf': 'fr',
    'mg': 'mg,fr',
    'mh': 'en,mh',
    // 'mk': 'mk',
    'ml': 'fr',
    'mm': 'my',
    // 'mn': 'mn',
    'mo': 'zh,pt',
    'mp': 'ch',
    'mq': 'fr',
    'mr': 'ar,fr',
    'ms': 'en',
    'mt': 'mt,en',
    'mu': 'mfe,fr,en',
    'mv': 'dv',
    'mw': 'en,ny',
    'mx': 'es',
    'my': 'ms',
    'mz': 'pt',
    'na': 'en,sf,de',
    'nc': 'fr',
    'ne': 'fr',
    'nf': 'en,pih',
    'ng': 'en',
    'ni': 'es',
    // 'nl': 'nl',
    'no': 'nb,nn,no,se',
    'np': 'ne',
    'nr': 'na,en',
    'nu': 'niu,en',
    'nz': 'mi,en',
    'om': 'ar',
    'pa': 'es',
    'pe': 'es',
    'pf': 'fr',
    'pg': 'en,tpi,ho',
    'ph': 'en,tl',
    'pk': 'en,ur',
    // 'pl': 'pl',
    'pm': 'fr',
    'pn': 'en,pih',
    'pr': 'es,en',
    'ps': 'ar,he',
    // 'pt': 'pt',
    'pw': 'en,pau,ja,sov,tox',
    'py': 'es,gn',
    'qa': 'ar',
    're': 'fr',
    // 'ro': 'ro',
    'rs': 'sr',
    // 'ru': 'ru',
    'rw': 'rw,fr,en',
    'sa': 'ar',
    'sb': 'en',
    'sc': 'fr,en,crs',
    'sd': 'ar,en',
    'se': 'sv',
    'sg': 'en,ms,zh,ta',
    'sh': 'en',
    'si': 'sl',
    'sj': 'no',
    // 'sk': 'sk',
    'sl': 'en',
    'sm': 'it',
    'sn': 'fr',
    'so': 'so,ar',
    'sr': 'nl',
    'st': 'pt',
    'ss': 'en',
    'sv': 'es',
    'sy': 'ar',
    'sz': 'en,ss',
    'tc': 'en',
    'td': 'fr,ar',
    'tf': 'fr',
    'tg': 'fr',
    // 'th': 'th',
    'tj': 'tg,ru',
    'tk': 'tkl,en,sm',
    'tl': 'pt,tet',
    'tm': 'tk',
    'tn': 'ar',
    'to': 'en',
    // 'tr': 'tr',
    'tt': 'en',
    'tv': 'en',
    'tw': 'zh',
    'tz': 'sw,en',
    'ua': 'uk',
    'ug': 'en,sw',
    'um': 'en',
    'us': 'en',
    'uy': 'es',
    'uz': 'uz,kaa',
    'va': 'it',
    'vc': 'en',
    've': 'es',
    'vg': 'en',
    'vi': 'en',
    'vn': 'vi',
    'vu': 'bi,en,fr',
    'wf': 'fr',
    'ws': 'sm,en',
    'ye': 'ar',
    'yt': 'fr',
    'za': 'zu,xh,af,st,tn,en',
    'zm': 'en',
    'zw': 'en,sn,nd'
};

/**
 * Convert country ISO 3166-1 (string) to languages ISO 639-1 (array)
 *
 * @param {String} item
 * @return {Array}
 */

module.exports.c2l = item => {
    if (item && typeof ctl[item.toLowerCase()] !== 'undefined') {
        return ctl[item.toLowerCase()].split(',');
    } else {
        return [item.toLowerCase()];
    }
};