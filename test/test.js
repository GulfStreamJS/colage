const colage = require('../index');

const assert = require('assert');

describe('CO', function() {
    let iso_3166_1 = colage.co('Россия, Deutschland, 中国');
    let en_countries = colage.co(iso_3166_1, 'en');
    describe('country names to ISO 3166-1', function() {
        it('should return array ISO 3166-1', function() {
            assert.deepEqual(iso_3166_1, [ 'RU', 'DE', 'CN' ]);
        });
    });
    describe('country ISO 3166-1 to names', function() {
        it('should return array names', function() {
            assert.deepEqual(en_countries, [ 'Russia', 'Germany', 'China' ]);
        });
    });
});

describe('LA', function() {
    let iso_639_1 = colage.la('русский, deutsch, 中文');
    let en_languages = colage.la(iso_639_1, 'en');
    describe('language names to ISO 639-1', function() {
        it('should return array ISO 639-1', function() {
            assert.deepEqual(iso_639_1, [ 'ru', 'de', 'zh' ]);
        });
    });
    describe('language ISO 639-1 to names', function() {
        it('should return array names', function() {
            assert.deepEqual(en_languages, [ 'Russian', 'German', 'Chinese' ]);
        });
    });
});

describe('GE', function() {
    let codes = colage.ge('комедия, musikalisch, 动作');
    let en_genres = colage.ge(codes, 'en');
    describe('genre names to codes', function() {
        it('should return array codes', function() {
            assert.deepEqual(codes, [ '8', '21', '1' ]);
        });
    });
    describe('genre codes to names', function() {
        it('should return array names', function() {
            assert.deepEqual(en_genres, [ 'comedy', 'musical', 'action' ]);
        });
    });
});

describe('C2L', function() {
    let iso_639_1 = colage.c2l('CH');
    describe('country ISO 3166-1 to languages ISO 639-1', function() {
        it('should return array ISO 639-1', function() {
            assert.deepEqual(iso_639_1, [ 'de', 'fr', 'it', 'rm' ]);
        });
    });
});

describe('J2D', function() {
    let department = colage.j2d('Story');
    describe('job to department', function() {
        it('should return string name department', function() {
            assert.deepEqual(department, 'Writing');
        });
    });
});