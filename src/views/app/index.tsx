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

    // fetch all todos when this view mounted
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        // clean the todos array first
        setTodos([]);

        // fetch todos from repository
        const _todos = await todo.all();

        // set todos to state
        setTodos(_todos);
    };

    const onSubmit = async (e: FormEvent) => {
        // prevent form reload the page
        e.preventDefault();

        // disable the form input and button
        setIsSubmitting(true);

        // repository function to call is depend on isEditMode state
        if (!isEditMode) await todo.create({ activity: activity, date: new Date(date) });
        else await todo.update(selectedId, { activity: activity, date: new Date(date) });

        // clean the form
        setActivity("");
        setDate("");
        setIsSubmitting(false);
        setIsEditMode(false);
        fetchTodos();
    };

    const remove = async (id: string) => {
        // clean the todos state to prevent user double clicking the delete / edit button
        setTodos([]);

        // remove todo
        await todo.remove(id);

        // fetch again the todos
        fetchTodos();
    };

    const toEditMode = (id: string, activity: string, date: any) => {
        // set editmode state
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

        // set the form value
        setActivity(activity);
        setDate(dateString);

        // also the the selectedid state
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

                {/* show if todos is empty */}
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
