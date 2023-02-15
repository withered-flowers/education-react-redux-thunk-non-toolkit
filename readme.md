# Education React Redux Thunk (Non-Toolkit)

## Table of Contents

- Revisit Redux
- Combined Reducers
- Middleware
- Currying & Thunk
- Redux Thunk
- Let's Demo

### Revisiting Redux

Dalam membuat State Management dengan menggunakan Redux, maka biasanya kita akan membuat beberapa hal:

- Pure function untuk mengubah state (Reducers)
- Action Type (tipe aksi yang dilakukan) dan
- Action Creator (fungsi untuk mengembalikan action yang akan dibuat)
- Store yang akan menyimpan reducer yang akan digunakan.

Namun pada pengembangannya nanti, mungkin kita akan menggunakan lebih dari satu reducer, padahal di dalam Store kita hanya bisa menyelipkan sebuah reducer saja.

Bagaimanakah cara kita mengakalinya?

Caranya adalah dengan menggunakan `combineReducers` yang disediakan oleh `Redux`.

### Combined Reducers

`combinedReducers` adalah sebuah fungsi yang memperbolehkan kita untuk menggabungkan seluruh reducer yang ada ke dalam sebuah reducer yang baru yang berisi gabungan dari seluruh reducer yang ada. (Anggap saja ini adalah suatu reducer yang di-_join_-kan).

Cara penggunaannya adalah pada store yang akan dibuat kita akan menuliskan kode sebagai berikut:

```js
import { legacy_createStore as createStore, combineReducers } from "redux";

// import reducer yang akan digunakan di sini
import reducerPertama from "/path/to/reducerPertama";
import reducerKedua from "/path/to/reducerKedua";

// Kita gabungkan menjadi sebuah reducer yang baru
// sebut saja namanya adalah rootReducer
const rootReducer = combineReducers({
  // combineReducers menerima parameter sebuah object
  // yang akan menerima parameternya adalah
  // namaAliasReducer: reducerYangDigunakan

  // dalam contoh ini berarti:
  // - pertama adalah alias
  // - reducerPertama adalah reducer yang digunakan
  pertama: reducerPertama

  // dalam contoh ini berarti:
  // - kedua adalah alias
  // - reducerKedua adalah reducer yang digunakan
  kedua: reducerKedua
});

// Store akan menggunakan rootReducer jadinya !
const store = createStore(rootReducer);

export default store;
```

Selanjutnya perbedaannya adalah pada selector yang akan digunakan.

Karena sekarang `rootReducer` ini berupa sebuah "object", maka pada saat menggunakan `useSelector` cara memilihnya pun harus diselipkan sebuah `object` yang baru.

Misalkan kita mengetahui pada `reducerPertama` memiliki initial state sebagai berikut:

```js
// reducerPertama.js
const initialState = {
  counter: 0,
};
```

Maka pada saat kita ingin meng-`select` state reducer pertama pada sebuah `Component` caranya adalah sebagai berikut:

```js
import { useSelector } from "react-redux";

const SebuahComponent = () => {
  // Sebelumnya
  // const { counter } = useSelector((state) => state);

  // Sekarang karena rootReducer berupa object
  // dan alias untuk reducerPertama adalah "pertama"
  // maka cara selectnya adalah...
  const { counter } = useSelector((state) => state.pertama);

  ...
};
```

Nah setelah teman teman mengetahui hal ini, mari kita naik level yah untuk mempelajari tentang Middleware !

### Middleware

Seperti yang kita ketahui sebelumnya, bahwa di dalam reducer itu WAJIB membuatu suat `Pure Function` dalam artian bahwa fungsi tersebut harus memiliki hasil return yang absolute, tidak boleh relatif.

Contoh: `fetch data` adalah hal yang relatif, karena bisa berhasil, bisa tidak, tergantung faktornya. Nah hal ini berarti fungsi fetch tidak boleh dilakukan di dalam reducer.

Oleh karena itu di dalam Redux sendiri, untuk bisa mencapai fetch data kemudian dispatch, biasanya kita akan menggunakan `Middleware`.

Middleware ini sendiri sebenarnya mirip dengan ketika kita menggunakan `Express` ataupun BE Framework sejenisnya.

Hanya saja perbedaannya adalah:

- Pada BE Framework, `Middleware` diselipkan di-tengah-tengah perjalanan `Request` dan `Response`
- Pada Redux, `Middleware` ini diselipkan di-tengah-tengah saat `Dispatch` dipanggil dan sebelum `Reducer` dijalankan !

Mari kita coba lihat contoh dari Middleware yang disediakan oleh Redux [- DI SINI -](https://redux.js.org/understanding/history-and-design/middleware#the-final-approach) yah !

```js
// File: store/index.js
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import reducerPertama from "/path/to/reducerPertama";
import reducerKedua from "/path/to/reducerKedua";

const rootReducer = combineReducers({
  pertama: reducerPertama,
  kedua: reducerKedua,
});

const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

// Store akan menggunakan rootReducer jadinya !
const store = createStore(
  rootReducer,
  // Di sini kita akan menggunakan logger dengan menggunakan applyMiddleware
  applyMiddleware(logger)
);

export default store;
```

Wah... kode untuk `Middlewarenya` aneh sekali yah !

> **_Kok kurung dalam kurung dalam kurung begitu !?_**

Nah untuk bisa mengerti kode yang dimaksud ini, mari kita coba pelajari tentang 2 konsep pemrograman ini dulu yah:

- `Currying`
- `Thunk`

### Currying & Thunk

Currying adalah suatu teknik dalam pemrograman dimana sebuah fungsi yang memiliki beberapa argumen DIUBAH menjadi serangkaian fungsi dengan satu argumen.

Dengan Currying, sebuah fungsi dapat dibangun dengan cara menggabungkan serangkaian fungsi yang lebih kecil dan lebih sederhana.

Contoh:

```js
const fnTambah = (a, b) => {
  return a + b;
};

// Currying
const fnTambahCurrying = (a) => {
  return (b) => {
    return a + b;
  };
};

// Cara invokenya
console.log(fnTambah(2, 3));
console.log(fnTambahCurrying(2)(3));
```

Nah dengan menggunakan currying ini kita bisa melakukan suatu konsep baru lagi di dalam pemrograman yang bernama `Thunk`.

`Thunk` adalah sebuah fungsi yang dibuat untuk menunda atau menjalankan kode lainnya sampai dibutuhkan. Umumnya digunakan untuk membuat suatu hal yang bersifat _malas_ (**Lazy Evaluation**)

Intinya di dalam Redux ini, `Currying` digunakan untuk membuat `Thunk`, dimana kita bisa menunda eksekusi dispatch ke reducer dengan menyelipkan eksekusi logic di tengah tengah (e.g.: Menggunakan Fetch di tengah tengah dispatch dan reducer logic !).

Nah karena membuatnya secara manual cukup sulit. Maka dari si Tim Redux ini sendiri, memberikan suatu library tambahan lagi yang bernama `Redux Thunk`.

### Redux Thunk

`Redux Thunk` adalah suatu `Middleware` yang diberikan untuk mempermudah kita dalam membuat logic untuk `Thunk`, sehingga dalam `Action Creator` yang ingin kita buat, kita bisa menyelipkan fungsi yang bersifat relatif / indeterministik (e.g. fetch data).

Cara penggunaannya adalah:

1. Memasang / menginstall library `redux-thunk`
   ```sh
   npm install redux-thunk
   ```
1. Meng-apply middleware `redux-thunk` pada store

   ```js
   // File: store/index.js
   import {
     legacy_createStore as createStore,
     combineReducers,
     applyMiddleware,
   } from "redux";
   // import thunk
   import thunk from "redux-thunk";

   import reducerPertama from "/path/to/reducerPertama";
   import reducerKedua from "/path/to/reducerKedua";

   const rootReducer = combineReducers({
     pertama: reducerPertama,
     kedua: reducerKedua,
   });

   const logger = (store) => (next) => (action) => {
     console.log("dispatching", action);
     let result = next(action);
     console.log("next state", store.getState());
     return result;
   };

   const store = createStore(
     rootReducer,
     // Di sini kita akan menyelipkan thunk di dalam middleware yang ada
     applyMiddleware(logger, thunk)
   );

   export default store;
   ```

1. Kemudian di dalam actionCreator yang sudah pernah dibuat, kita bisa mengimplementasikan Action yang membutuhkan Thunk di dalamnya dengan cara sebagai berikut:

   ```js
   const actionDenganThunk = () => {
     // Nah di sini biasanya kita akan me-return sebuah Action (Object)
     // Dengan "type" dan "payload"
     // Namun karena di sini kita menggunakan Redux Thunk, kita bisa tidak
     // mengembalikan Object, namun mengembalikan sebuah Fungsi yang baru.
     // Namun ada persyaratannya !
     // Syaratnya adalah fungsi ini sudah ditentukan parameternya !
     // (Max 2 parameter, OPTIONAL)
     // - dispatch (untuk memanggil dispatcher)
     // - getState (untuk membaca seluruh state yang ada sekarang ini)

     // Function di bawah ini JUGA BOLEH DITULISKAN SECARA ASYNC / AWAIT !!
     return (dispatch, getState) => {
       // Di dalam sinilah kita bisa menggunakan logic untuk melakukan
       // Lazy Evaluation
       // seperti fetch, dll dkk yang membutuhkan waktu yang tidak menentu.
     };
   };
   ```

### Let's Demo

Pada demo yang ada, sudah disiapkan sebuah _starter pack_ di mana sudah menggunakan `Redux` dan `React Router` untuk membaca sebuah counter, dan untuk mengambil data dari https://restcountries.com

Nah selanjutnya kita akan mencoba untuk extend aplikasi ini untuk bisa mengambil data dari Jikan (https://jikan.moe), khususnya dari endpoint https://api.jikan.moe/v4/seasons/now.

Untuk mengambil data dari Jikan ini, kita akan menggunakan `redux-thunk` untuk mempermudah kita membuat `action` yang digunakan yah !
