import { useState } from "react";
import { Action, ActionPair } from "./Action";

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
let actionPairs: ActionPair[] = [
  { id: 1, action: "attach", mirrorAction: "detach" },
  { id: 2, action: "screw in", mirrorAction: "unscrew" },
  { id: 3, action: "fold", mirrorAction: "unfold" },
];

interface ItemEntryFormProps {
  forwardList: Action[];
  setForwardList: React.Dispatch<React.SetStateAction<Action[]>>;
  backwardList: Action[];
  setBackwardList: React.Dispatch<React.SetStateAction<Action[]>>;
}
export const ItemEntryForm = (props: ItemEntryFormProps) => {
  const [forwardListInput, setForwardListInput] = useState<string>("");
  const [actionTypeId, setActionTypeId] = useState<number>(0);

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
      props.setForwardList([...props.forwardList, action]);
      props.setBackwardList([action, ...props.backwardList]);
      setForwardListInput("");
      setActionTypeId(0);
    }
  };

  return (
    <div className="form-group">
      <div className="row mb-3">
        <div className="form-floating col-md-6 col-sm-12 mb-3 mt-3 ml-auto gx-1">
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
          <label htmlFor="forward-list-select">Select an action</label>
        </div>

        <div className="form-floating col-md-6 col-sm-12 ml-auto mt-md-3 gx-1">
          <input
            type="text"
            id="forward-list-input"
            className="form-control"
            value={forwardListInput}
            placeholder="placeholder"
            onChange={(e) => setForwardListInput(e.target.value)}
            aria-label="describe object of action"
          />
          <label className="" htmlFor="forward-list-input">
            Description
          </label>
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
  );
};
