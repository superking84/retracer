import { capitalize } from "./utilities";

interface ActionListItemProps {
  actionId: number;
  order: number;
  actionType: string;
  actionObject: string;
  deleteItem(actionTypeId: number): void;
}

export const ActionListItem = (props: ActionListItemProps) => {
  return (
    <li className="action-list-item mb-1">
      <div className="btn btn-primary px-3">
        <div className="row">
          <div className="col-1">
            <span>{props.order}</span>
          </div>

          <div className="col-9">
            <span>
              {capitalize(`${props.actionType} ${props.actionObject}`)}
            </span>
          </div>

          <div
            className="delete col-2 border-start"
            onClick={(e) => {
              e.stopPropagation();
              props.deleteItem(props.actionId);
            }}
          >
            <i className="fa fa-trash" />
          </div>
        </div>
      </div>
    </li>
  );
};
