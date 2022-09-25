import { useState } from "react";
import { Action } from "./Action";
import { ActionList } from "./ActionList";
import "./App.css";
import { ItemEntryForm } from "./ItemEntryForm";

const App = () => {
  const [forwardList, setForwardList] = useState<Action[]>([]);
  const [backwardList, setBackwardList] = useState<Action[]>([]);

  const deleteItem = (actionId: number) => {
    setForwardList(forwardList.filter((x) => x.actionId !== actionId));
    setBackwardList(backwardList.filter((x) => x.actionId !== actionId));
  };

  return (
    <div className="App">
      <ItemEntryForm
        forwardList={forwardList}
        backwardList={backwardList}
        setForwardList={setForwardList}
        setBackwardList={setBackwardList}
      />

      <hr />

      <ActionList
        actionList={forwardList}
        deleteItem={deleteItem}
        isForward={true}
      />

      <ActionList
        actionList={backwardList}
        deleteItem={deleteItem}
        isForward={false}
      />
    </div>
  );
};

export default App;
