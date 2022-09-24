import { useState } from "react";
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

const App = () => {
  const [forwardList, setForwardList] = useState<Action[]>([]);
  const [forwardListInput, setForwardListInput] = useState<string>("");
  const [actionTypeId, setActionTypeId] = useState<number>(0);

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
      setActionTypeId(0);
    }
  };

  const deleteItem = (id: number) => {
    setForwardList(forwardList.filter((x) => x.id !== id));
    setBackwardList(backwardList.filter((x) => x.id !== id));
  };

  return (
    <div className="App">
      <ul>
        Actions taken...
        {forwardList.map((item, i) => (
          <ActionListItem
            key={`forward-item-${i}`}
            id={item.id}
            isForwards={true}
            actionType={item.action}
            actionObject={item.actionObject}
            deleteItem={deleteItem}
          />
        ))}
      </ul>

      <div className="form-group">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="forward-list-select">Select an action</label>
            <select
              className="form-select"
              value={actionTypeId}
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
          >
            Add Item
          </button>
        </div>
      </div>
      <hr />

      <ol>
        To go back...
        {backwardList.map((item, i) => (
          <ActionListItem
            key={`backward-item-${i}`}
            id={item.id}
            isForwards={false}
            actionType={item.mirrorAction}
            actionObject={item.actionObject}
            deleteItem={deleteItem}
          />
        ))}
      </ol>
    </div>
  );
};

interface ActionListItemProps {
  id: number;
  isForwards: boolean;
  actionType: string;
  actionObject: string;
  deleteItem(actionTypeId: number): void;
}

const ActionListItem = (props: ActionListItemProps) => {
  return (
    <li>
      <div className="card">
        <div className="card-body">
          <div className="row card-text">
            <div className="col-10">
              <span>{`${props.actionType} ${props.actionObject}`}</span>
            </div>
            <div
              className="delete col-2"
              onClick={() => props.deleteItem(props.id)}
            >
              <i className="fa fa-trash" />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default App;
