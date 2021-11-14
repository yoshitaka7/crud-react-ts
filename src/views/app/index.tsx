import React, { FormEvent, useEffect, useState } from "react";
import "./style.css";
import * as todo from "../../db/repositories/todo";

const App = () => {
    // some needed states
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [todos, setTodos] = useState<Array<todo.Todo>>([]);
    const [activity, setActivity] = useState("");
    const [date, setDate] = useState("");
    const [selectedId, setSelectedId] = useState("");

    // mount時にfetch
    useEffect(() => {
        fetchTodos();
    }, []);

    // todo取得・setState
    const fetchTodos = async () => {
        // todosのstateを初期化
        setTodos([]);

        // 取得したtodosを変数に格納
        const _todos = await todo.all();

        //todoをsetState
        setTodos(_todos);
    };


    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // データ送信時は入力エリアを無効に
        setIsSubmitting(true);

        if (!isEditMode) await todo.create({ activity: activity, date: new Date(date) });  //編集モードでなければ入力したデータをもとにcreate
        else await todo.update(selectedId, { activity: activity, date: new Date(date) });  //編集モードの場合は入力したデータをもとにupdate

        setActivity("");  //本文をクリア
        setDate("");  //日付エリアをクリア
        setIsSubmitting(false);  //入力エリアを再び有効化
        setIsEditMode(false);  //編集モードも無効化
        fetchTodos();  //再度fetchし直して表示
    };

    const remove = async (id: string) => {
        // stateを初期化
        setTodos([]);

        // 選択したtodoのidをもとにremove
        await todo.remove(id);

        // fetchし直して表示
        fetchTodos();
    };

    const toEditMode = (id: string, activity: string, date: any) => {
        // 編集モードをonに
        setIsEditMode(true);

        // need to tweak the date first before put it in input datetime local
        const _date =
            new Date(date.toDate()).getFullYear() +
            "-" +
            (new Date(date.toDate()).getMonth() + 1) +
            "-" +
            (new Date(date.toDate()).getDate().toString().length === 1 ? "0" + new Date(date.toDate()).getDate() : new Date(date.toDate()).getDate());

        const time =
            new Date(date.toDate()).toLocaleTimeString().replaceAll("AM", "").replaceAll("PM", "").replace(/\s/g, "").length === 7
                ? "0" + new Date(date.toDate()).toLocaleTimeString().replaceAll("AM", "").replaceAll("PM", "").replace(/\s/g, "")
                : new Date(date.toDate()).toLocaleTimeString().replaceAll("AM", "").replaceAll("PM", "").replace(/\s/g, "");

        const dateString = (_date + "T" + time).toString();

        // 選択したtodoの本文、日付をformにset
        setActivity(activity);
        setDate(dateString);

        // 選択したidをset
        setSelectedId(id);
    };

    return (
        <div className="app">
            <div className="container">
                {/* form for create or update the value */}
                <form onSubmit={onSubmit}>
                    <label>Activity</label>

                    <input
                        type="text"
                        placeholder="Ex: Writing medium story"
                        required
                        disabled={isSubmitting}
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                    />

                    <label style={{ marginTop: "12px" }}>Date</label>

                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Ex: Writing medium story"
                        required
                        disabled={isSubmitting}
                    />

                    {/* change the button value depends on isEditMode state  */}
                    <button type="submit" style={{ marginTop: "12px", backgroundColor: isEditMode ? "#eb9834" : "#44c922" }} disabled={isSubmitting}>
                        {isEditMode ? "Edit" : "Add"}
                    </button>
                </form>

                <h2>Todos:</h2>

                {/* todoが空のときの表示 */}
                {todos.length === 0 ? (
                    <div className="loading">
                        <span>Fetching Todos ....</span>
                    </div>
                ) : null}

                {/* todos item  */}
                {todos.map((todo, index) => (
                    <div className="list-item" key={todo.id} style={{ marginTop: index > 0 ? "12px" : "" }}>
                        <span className="activity">{todo.activity}</span>
                        <span className="date">On: {todo.date.toDate().toDateString()}</span>

                        <span className="edit" onClick={() => toEditMode(todo.id!!, todo.activity, todo.date)}>
                            Edit
                        </span>

                        <span className="delete" onClick={() => remove(todo.id!!)}>
                            Delete
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
