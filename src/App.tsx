import { useState } from "react";
import { Action, ActionPair } from "./Action";
import { ActionList } from "./ActionList";
import "./App.css";
import { ItemEntryForm } from "./ItemEntryForm";

const App = () => {
  const [forwardList, setForwardList] = useState<Action[]>([]);
  const [backwardList, setBackwardList] = useState<Action[]>([]);

  const deleteItem = (id: number) => {
    setForwardList(forwardList.filter((x) => x.id !== id));
    setBackwardList(backwardList.filter((x) => x.id !== id));
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
