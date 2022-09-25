import { useEffect, useState } from "react";

interface AddActionModalProps {
  modalId: string;
  addNewActionType(forwardAction: string, backwardAction: string): void;
}

export const AddActionModal = (props: AddActionModalProps) => {
  const [forwardAction, setForwardAction] = useState<string>("");
  const [backwardAction, setBackwardAction] = useState<string>("");

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  useEffect(() => {
    if (
      forwardAction.length > 0 &&
      backwardAction.length > 0 &&
      forwardAction !== backwardAction
    ) {
      setIsFormValid(true);
    }
  }, [forwardAction, backwardAction]);

  return (
    <div
      className="modal fade"
      id={props.modalId}
      tabIndex={-1}
      aria-labelledby="add-action-type-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="add-action-type-modal-label">
              Add new action type
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-floating col-sm-12 ml-auto gx-1">
              <input
                type="text"
                id="forward-list-input"
                className="form-control"
                value={forwardAction}
                placeholder="placeholder"
                onChange={(e) => setForwardAction(e.target.value)}
                aria-label="describe forward action"
              />
              <label className="" htmlFor="forward-list-input">
                Forward Action
              </label>
            </div>
            <div className="form-floating col-sm-12 ml-auto mt-3 gx-1">
              <input
                type="text"
                id="backward-list-input"
                className="form-control"
                value={backwardAction}
                placeholder="placeholder"
                onChange={(e) => setBackwardAction(e.target.value)}
                aria-label="describe backward action"
              />
              <label className="" htmlFor="backward-list-input">
                Retrace Action
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              id="close-modal-button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              {...(isFormValid && { "data-bs-dismiss": "modal" })}
              onClick={() => {
                if (isFormValid) {
                  props.addNewActionType(forwardAction, backwardAction);
                  setForwardAction("");
                  setBackwardAction("");
                }
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
