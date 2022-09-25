import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (forwardList.length === 0) {
      setIsForward(true);
    }
  }, [forwardList]);

  return (
    <div className="App">
      <h1 className="display-1">Retracer</h1>
      <div id="entry-form" className="collapse show">
        <h2 className="display-6">Easily retrace your steps!</h2>
        <h6>
          Select an action and an item, hit the Add button below, and Retracer
          will help you retrace your steps so you can easily put that Ikea bed
          back together!
        </h6>
        <h6>
          A couple of prebuilt actions are provided, but you can easily add more
          by pressing the big button next to the action list.
        </h6>
        <h6>
          After adding your actions, just hit the "Show Retraced Steps" button
          at the bottom!
        </h6>
        <ItemEntryForm
          forwardList={forwardList}
          backwardList={backwardList}
          setForwardList={setForwardList}
          setBackwardList={setBackwardList}
        />
        <hr />
      </div>

      <div className="row mb-5 mt-2">
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
          <span className="mx-3 d-none d-sm-inline">Show Retraced Steps</span>
        </button>
      </div>

      {forwardList.length > 0 && (
        <>
          <h3 className="display-4">
            {isForward ? "What you've done:" : "Retrace your steps:"}
          </h3>

          <ActionList
            actionList={isForward ? forwardList : backwardList}
            deleteItem={deleteItem}
            isForward={isForward}
          />
        </>
      )}
    </div>
  );
};

export default App;
