import { Action } from "./Action";
import { ActionListItem } from "./ActionListItem";

interface ActionListProps {
  actionList: Action[];
  deleteItem(actionTypeId: number): void;
  isForward: boolean;
}
export const ActionList = (props: ActionListProps) => {
  return (
    <ul>
      {props.actionList.map((item, i) => (
        <ActionListItem
          key={`${props.isForward ? "forward" : "backward"}-item-${i}`}
          id={item.id}
          actionType={props.isForward ? item.action : item.mirrorAction}
          actionObject={item.actionObject}
          deleteItem={props.deleteItem}
        />
      ))}
    </ul>
  );
};
