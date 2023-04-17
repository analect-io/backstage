export const ArgoDefaultNamespace = 'argo';
export const ArgoWorkflowRoute = 'api/v1/workflows';

export interface IArgoWorkflowService {
  getAsync(name: string): Promise<WorkflowResponse>;
  submitAsync(
    name: string,
    parameters?: WorkflowParameters,
  ): Promise<WorkflowResponse>;
}

export type WorkflowParameters = Map<string, string> | undefined;

export enum WorkflowStatus {
  Pending = 'Pending',
  Running = 'Running',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Error = 'Error',
}

export const WorkflowTemplateResourceKind: ResourceKind = 'WorkflowTemplate';

export type ResourceKind = string;

export interface WorkflowSubmitRequest {
  namespace: string;
  resourceKind: ResourceKind;
  resourceName: string;
  submitOptions: {
    parameters: string[];
  };
}

export interface WorkflowResponse {
  metadata: {
    name: string;
  };
  status: {
    phase: WorkflowStatus;
    message: string;
    outputs?: {
      parameters: Parameter[];
    };
  };
}

export interface Parameter {
  name: string;
  value: string;
}
