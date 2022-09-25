interface ActionListItemProps {
  id: number;
  isForwards: boolean;
  actionType: string;
  actionObject: string;
  deleteItem(actionTypeId: number): void;
}

export const ActionListItem = (props: ActionListItemProps) => {
  return (
    <li>
      <div className="card">
        <div className="card-body">
          <div className="row">
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
