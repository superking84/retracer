import React, { useState } from "react";
import "./App.css";

interface ActionPair {
  id: number;
  action: string;
  mirrorAction: string;
}

type Action = ActionPair & { actionObject: string };

let actionPairs: ActionPair[] = [
  { id: 1, action: "attach", mirrorAction: "detach" },
  { id: 2, action: "screw in", mirrorAction: "unscrew" },
  { id: 3, action: "fold", mirrorAction: "unfold" },
];

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

function App() {
  const [forwardList, setForwardList] = useState<Action[]>([]);
  const [forwardListInput, setForwardListInput] = useState<string>("");
  const [actionTypeId, setActionTypeId] = useState<number>(0);

  const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(false);

  const [backwardList, setBackwardList] = useState<Action[]>([]);

  const updateLists = () => {
    if (forwardListInput.length === 0 || actionTypeId < 1) {
      return;
    }

    const pair = actionPairs.find((ap) => ap.id === actionTypeId);
    if (pair) {
      const action: Action = {
        ...pair,
        actionObject: forwardListInput,
      };
      setForwardList([...forwardList, action]);
      setBackwardList([action, ...backwardList]);
      setForwardListInput("");
    }
  };

  return (
    <div className="App">
      <ol>
        FORWARD LIST
        {forwardList.map((item, i) => (
          <li
            key={`forward-item-${i}`}
          >{`${item.action} ${item.actionObject}`}</li>
        ))}
      </ol>

      <div className="form-group">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="forward-list-select">Select an action</label>
            <select
              className="form-select"
              defaultValue={0}
              onChange={function (e) {
                setActionTypeId(parseInt(e.target.value));
              }}
              aria-label="choose action type"
            >
              <option value={0}>Choose an action</option>
              {actionPairs.map((ap) => (
                <option key={`action-type-${ap.id}`} value={ap.id}>
                  {capitalize(ap.action)}
                </option>
              ))}
            </select>
          </div>

          <div className="col">
            <label htmlFor="forward-list-input">
              What are you performing the action on?
            </label>
            <input
              type="text"
              id="forward-list-input"
              className="form-control"
              value={forwardListInput}
              onChange={(e) => setForwardListInput(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <button
            className="btn btn-primary add-forward-item-button"
            type="button"
            onClick={updateLists}
            disabled={addButtonDisabled}
          >
            Add Item
          </button>
        </div>
      </div>
      <hr />
      <ol>
        BACKWARD LIST
        {backwardList.map((item, i) => (
          <li
            key={`backward-item-${i}`}
          >{`${item.mirrorAction} ${item.actionObject}`}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
