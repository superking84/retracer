import { useState } from "react";
import { Action, ActionType } from "./Action";
import { capitalize } from "./utilities";

const getId = (() => {
  let id = 0;

  return () => {
    id += 1;

    return id;
  };
})();

let actionTypes: ActionType[] = [
  { actionTypeId: 1, action: "attach", mirrorAction: "detach" },
  { actionTypeId: 2, action: "screw in", mirrorAction: "unscrew" },
  { actionTypeId: 3, action: "fold", mirrorAction: "unfold" },
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

    const actionType = actionTypes.find(
      (ap) => ap.actionTypeId === actionTypeId
    );
    if (actionType) {
      const action: Action = {
        ...actionType,
        actionId: getId(),
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
            {actionTypes.map((ap) => (
              <option
                key={`action-type-${ap.actionTypeId}`}
                value={ap.actionTypeId}
              >
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
          className="btn btn-success add-forward-item-button"
          type="button"
          onClick={updateLists}
        >
          <i className="fa fa-plus"></i>
          <span className="mx-3 d-none d-sm-inline">Add Item</span>
        </button>
      </div>
    </div>
  );
};
