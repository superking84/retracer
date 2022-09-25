import { useState } from "react";
import { Action, ActionType } from "./Action";
import { AddActionModal } from "./AddActionModal";
import { capitalize, makeIdGenerator } from "./utilities";

const getActionId = makeIdGenerator();
const getActionTypeId = makeIdGenerator();
const modalId = "add-action-type-modal";

interface ItemEntryFormProps {
  forwardList: Action[];
  setForwardList: React.Dispatch<React.SetStateAction<Action[]>>;
  backwardList: Action[];
  setBackwardList: React.Dispatch<React.SetStateAction<Action[]>>;
}

export const ItemEntryForm = (props: ItemEntryFormProps) => {
  const [actionTypes, setActionTypes] = useState<ActionType[]>([
    {
      actionTypeId: getActionTypeId(),
      action: "attach",
      mirrorAction: "detach",
    },
    {
      actionTypeId: getActionTypeId(),
      action: "screw in",
      mirrorAction: "unscrew",
    },
    { actionTypeId: getActionTypeId(), action: "fold", mirrorAction: "unfold" },
  ]);
  const [forwardListInput, setForwardListInput] = useState<string>("");
  const [actionTypeId, setActionTypeId] = useState<number>(0);

  const addNewAction = () => {
    if (forwardListInput.length === 0 || actionTypeId < 1) {
      return;
    }

    const actionType = actionTypes.find(
      (ap) => ap.actionTypeId === actionTypeId
    );
    if (actionType) {
      const action: Action = {
        ...actionType,
        actionId: getActionId(),
        actionObject: forwardListInput,
      };
      props.setForwardList([...props.forwardList, action]);
      props.setBackwardList([action, ...props.backwardList]);
      setForwardListInput("");
      setActionTypeId(0);
    }
  };

  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      addNewAction();
    }
  };

  const addNewActionType = (forwardAction: string, backwardAction: string) => {
    setActionTypes([
      ...actionTypes,
      {
        actionTypeId: getActionTypeId(),
        action: forwardAction,
        mirrorAction: backwardAction,
      },
      {
        actionTypeId: getActionTypeId(),
        action: backwardAction,
        mirrorAction: forwardAction,
      },
    ]);
  };

  return (
    <div className="form-group">
      <div className="row mb-3">
        <div className="col-sm-12 mb-3 mt-3 ml-auto gx-1 row">
          <div className="form-floating col-10">
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
          <div className="col-2 vertical-center">
            <button
              className="btn btn-info add-action-type-button"
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#${modalId}`}
              title="Add action type"
            >
              <i className="fa fa-plus fa-2x"></i>
            </button>
          </div>
        </div>

        <div className="form-floating col-sm-12 ml-auto mt-md-3 gx-1">
          <input
            type="text"
            id="forward-list-input"
            className="form-control"
            value={forwardListInput}
            placeholder="placeholder"
            onChange={(e) => setForwardListInput(e.target.value)}
            onKeyUp={onKeyUp}
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
          onClick={addNewAction}
        >
          <i className="fa fa-plus"></i>
          <span className="mx-3 d-none d-sm-inline">Add Item</span>
        </button>
      </div>

      <AddActionModal modalId={modalId} addNewActionType={addNewActionType} />
    </div>
  );
};
