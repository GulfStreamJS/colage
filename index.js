const CO = require('./countries');
const LA = require('./languages');
const GE = require('./genres');

const C2L = require('./others/country2languages');
const J2D = require('./others/job2department');

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

/**
 * Convert country ISO 3166-1 (string) to languages ISO 639-1 (array)
 *
 * @param {String} item
 * @return {Array}
 */

module.exports.c2l = item => {
    if (item && typeof C2L[item.toLowerCase()] !== 'undefined') {
        return C2L[item.toLowerCase()].split(',');
    } else {
        return [item.toLowerCase()];
    }
};

/**
 * Convert job (string) to department (string)
 *
 * @param {String} item
 * @return {string}
 */

module.exports.j2d = item => {
    if (!item || /other/i.test(item)) return '';
    let department = '';
    if (!department) {
        J2D.forEach(function (d) {
            d.jobs.forEach(function (j) {
                let r = new RegExp('^' + item + '$', 'i');
                if (r.test(j)) department = d['department'];
            });
        });
    }
    if (!department) {
        J2D.forEach(function (d) {
            d.jobs.forEach(function (j) {
                let r = new RegExp(item, 'i');
                if (r.test(j)) department = d['department'];
            });
        });
    }
    return department;
};