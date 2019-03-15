## What is COLAGE?

Converted multi language meta information `CO`untries`LA`nguages`GE`nres.

## Installation

```bash
npm i colage
```

## Usage

Import the library in your code:

```js
const colage = require('colage');
```

Convert country names (string) to ISO 3166-1 (array)
```js
let iso_3166_1 = colage.co('Россия, Deutschland, 中国');
console.log(iso_3166_1); //=> [ 'RU', 'DE', 'CN' ]
```
Convert country ISO 3166-1 (array) to names (array)
```js
let en_countries = colage.co([ 'RU', 'DE', 'CN' ], 'en');
console.log(en_countries);  //=> [ 'Russia', 'Germany', 'China' ]
```

Convert language names (string) to ISO 639-1 (array)
```js
let iso_639_1 = colage.la('русский, deutsch, 中文');
console.log(iso_639_1); //=> [ 'ru', 'de', 'zh' ]
```
Convert language ISO 639-1 (array) to names (array)
```js
let en_languages = colage.la([ 'ru', 'de', 'zh' ], 'en');
console.log(en_languages);  //=> [ 'Russian', 'German', 'Chinese' ]
```

Convert genre names (string) to codes (array)
```js
let codes = colage.ge('комедия, musikalisch, 动作');
console.log(codes); //=> [ '8', '21', '1' ]
```
Convert genre codes (array) to names (array)
```js
let en_genres = colage.ge([ '8', '21', '1' ], 'en');
console.log(en_genres);  //=> [ 'comedy', 'musical', 'action' ]
```

## Running tests

```bash
npm test
```