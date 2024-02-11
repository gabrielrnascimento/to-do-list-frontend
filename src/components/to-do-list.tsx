import { useEffect, useState } from "react";
import { ToDoItem } from "./to-do-item";
import { type ListToDosUseCase } from "../@core/domain/usecases/list-to-dos.usecase";

type ToDo = {
    done: boolean;
    description: string;
};

type Props = {
    listToDosUseCase: ListToDosUseCase;
};

export const ToDoList = ({ listToDosUseCase }: Props): JSX.Element => {
    const [toDos, setToDos] = useState<ToDo[]>([]);

    const handleAddToDo = (): void => {
        setToDos([...toDos, { done: false, description: "" }]);
    };

    const handleToDoDescriptionChange = (
        index: number,
        description: string
    ): void => {
        const newToDos = [...toDos];
        newToDos[index].description = description;
        setToDos(newToDos);
    };

    const handleDeleteToDo = (index: number): void => {
        const newToDos = [...toDos];
        newToDos.splice(index, 1);
        setToDos(newToDos);
    };

    const handleToDoStatusChange = (index: number): void => {
        const newToDos = [...toDos];
        newToDos[index].done = !newToDos[index].done;
        setToDos(newToDos);
    };

    useEffect(() => {
        listToDosUseCase
            .listToDos()
            .then()
            .catch((error) => {
                console.error(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>things to do</h1>
            <ul>
                {toDos.map((todo, key) => (
                    <ToDoItem
                        key={key}
                        description={todo.description}
                        isDone={todo.done}
                        onDescriptionChange={(newDescription: string) => {
                            handleToDoDescriptionChange(key, newDescription);
                        }}
                        onDelete={() => {
                            handleDeleteToDo(key);
                        }}
                        onStatusChange={() => {
                            handleToDoStatusChange(key);
                        }}
                    />
                ))}
            </ul>
            <button onClick={handleAddToDo}>add to-do</button>
        </>
    );
};
