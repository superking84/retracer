interface ActionListItemProps {
  id: number;
  actionType: string;
  actionObject: string;
  deleteItem(actionTypeId: number): void;
}

export const ActionListItem = (props: ActionListItemProps) => {
  return (
    <li>
      <div className="btn btn-primary px-3">
        <div className="row">
          <div className="col-10">
            <span>{`${props.actionType} ${props.actionObject}`}</span>
          </div>
          <div
            className="delete col-2"
            onClick={(e) => {
              e.stopPropagation();
              props.deleteItem(props.id);
            }}
          >
            <i className="fa fa-trash" />
          </div>
        </div>
      </div>
    </li>
  );
};
