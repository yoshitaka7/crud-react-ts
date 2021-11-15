##  react typescript firebase CRUD処理

### ref
[https://erthru.medium.com/crud-firebase-firestore-with-reactjs-typescript-part-1-config-the-project-ad104a7af3c5] (https://erthru.medium.com/crud-firebase-firestore-with-reactjs-typescript-part-1-config-the-project-ad104a7af3c5)

`git clone`

↓

src/db配下にindex.ts作成

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