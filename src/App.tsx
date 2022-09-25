import { useState } from "react";
import { Action } from "./Action";
import { ActionList } from "./ActionList";
import "./App.css";
import { ItemEntryForm } from "./ItemEntryForm";

const App = () => {
  const [forwardList, setForwardList] = useState<Action[]>([]);
  const [backwardList, setBackwardList] = useState<Action[]>([]);
  const [isForward, setIsForward] = useState<boolean>(true);

  const deleteItem = (actionId: number) => {
    setForwardList(forwardList.filter((x) => x.actionId !== actionId));
    setBackwardList(backwardList.filter((x) => x.actionId !== actionId));
  };

  return (
    <div className="App">
      <div id="entry-form" className="collapse show">
        <ItemEntryForm
          forwardList={forwardList}
          backwardList={backwardList}
          setForwardList={setForwardList}
          setBackwardList={setBackwardList}
        />
      </div>

      <hr />

      <div className="row mb-5">
        <button
          type="button"
          id="collapse-form-button"
          className="btn btn-info col"
          data-bs-toggle="collapse"
          data-bs-target="#entry-form"
          aria-controls="entry-form"
          aria-expanded="true"
        >
          <i className="fa fa-arrow-up"></i>
          <span className="mx-3 d-none d-sm-inline">Expand/Collapse</span>
        </button>
        <button
          type="button"
          id="flip-list-button"
          className="btn btn-warning col"
          style={{ width: "100%" }}
          onClick={() => setIsForward(!isForward)}
        >
          <i className="fa fa-refresh"></i>
          <span className="mx-3 d-none d-sm-inline">Show other list</span>
        </button>
      </div>

      <h3 className="display-3">test</h3>
      <ActionList
        actionList={isForward ? forwardList : backwardList}
        deleteItem={deleteItem}
        isForward={isForward}
      />
    </div>
  );
};

export default App;
