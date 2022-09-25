export interface ActionType {
    actionTypeId: number;
    action: string;
    mirrorAction: string;
}
  
export type Action = ActionType & { actionId: number; actionObject: string };