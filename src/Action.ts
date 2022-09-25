export interface ActionPair {
    id: number;
    action: string;
    mirrorAction: string;
}
  
export type Action = ActionPair & { actionObject: string };