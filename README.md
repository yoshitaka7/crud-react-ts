#  React TypeScript Firebase CRUD Fuction
<p align="center">
 <a href="https://www.typescriptlang.org/">
  <img src="https://user-images.githubusercontent.com/89970444/173063032-58f7ea37-f0ed-46c2-98d9-344170beaf98.svg" height="45px">
 </a>
 <a href="https://ja.reactjs.org/">
  <img src="https://user-images.githubusercontent.com/89970444/173062775-57dffcbc-788f-4e1d-bf3e-d8fcc04e6d35.svg" height="45px">
 </a>
 <a href="https://firebase.google.com/?hl=ja">
  <img src="https://user-images.githubusercontent.com/89970444/173061737-e0abb641-d8e5-40cf-9266-e2ec203388e9.png" height="50px">
 </a>
</p>

## ref
 [https://erthru.medium.com/crud-firebase-firestore-with-reactjs-typescript-part-1-config-the-project-ad104a7af3c5](https://erthru.medium.com/crud-firebase-firestore-with-reactjs-typescript-part-1-config-the-project-ad104a7af3c5)

## Getting Started
`git clone`

↓

create index.ts under src/db directory

```
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// SDK Snippet
const config = {
  //copy SDK Snippet from firebase console
};

firebase.initializeApp(config);

export default firebase.firestore();
```

↓

`yarn start`
