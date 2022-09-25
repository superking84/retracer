import { Action } from "./Action";
import { ActionListItem } from "./ActionListItem";

interface ActionListProps {
  actionList: Action[];
  deleteItem(actionId: number): void;
  isForward: boolean;
}
export const ActionList = (props: ActionListProps) => {
  return (
    <ul className="action-list">
      {props.actionList.map((item, i) => (
        <ActionListItem
          key={`${props.isForward ? "forward" : "backward"}-item-${i}`}
          order={i + 1}
          actionId={item.actionId}
          actionType={props.isForward ? item.action : item.mirrorAction}
          actionObject={item.actionObject}
          deleteItem={props.deleteItem}
        />
      ))}
    </ul>
  );
};
