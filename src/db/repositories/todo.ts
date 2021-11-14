// import db config
import db from "..";

// fire storeに自分でつけたコレクション名
const COLLECTION_NAME = "todos";

// todoの型宣言
export type Todo = {
    id?: string;
    activity: string;
    date: any;
};

// todoの全件取得
export const all = async (): Promise<Array<Todo>> => {
    const snapshot = await db.collection(COLLECTION_NAME).get();  //指定のコレクション内のデータを取得
    const data: Array<any> = [];

    snapshot.docs.map((_data) => { //idとともにpush
        data.push({
            id: _data.id, // because id field in separate function in firestore
            ..._data.data(),
        });
    });

    // return and convert back it array of todo
    return data as Array<Todo>;  //データが入った配列を返す
};

// create a todo
export const create = async (todo: Todo): Promise<Todo> => {
    const docRef = await db.collection(COLLECTION_NAME).add(todo);  //指定のコレクション内にデータを追加

    return {
        id: docRef.id,
        ...todo,
    } as Todo;
};

// update a todo
export const update = async (id: string, todo: Todo): Promise<Todo> => {
    await db.collection(COLLECTION_NAME).doc(id).update(todo);

    // return updated todo
    return {
        id: id,
        ...todo,
    } as Todo;
};

// idをもとに削除
export const remove = async (id: string) => {
    await db.collection(COLLECTION_NAME).doc(id).delete();
};