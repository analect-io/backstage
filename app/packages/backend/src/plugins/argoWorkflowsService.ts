import {
    IArgoWorkflowService,
    WorkflowSubmitRequest,
    WorkflowResponse,
    WorkflowParameters,
    WorkflowTemplateResourceKind,
    ArgoWorkflowRoute,
    ArgoDefaultNamespace,
  } from './argo-service/types';
  import { fetch } from 'cross-fetch';
  
  enum HttpMethod {
    POST = 'POST',
    GET = 'GET',
  }
  
  export class ArgoWorkflowService implements IArgoWorkflowService {
    private argoWorkflowUrl: URL;
    private argoNamespace: string;
  
    constructor(argoHost: URL, argoNamespace?: string) {
      this.argoNamespace = !argoNamespace ? ArgoDefaultNamespace : argoNamespace;
  
      const argoHostBase =
        argoHost.toString().slice(-1) == '/' ? argoHost : new URL(`${argoHost}/`);
  
      this.argoWorkflowUrl = new URL(
        `${argoHostBase}${ArgoWorkflowRoute}/${this.argoNamespace}`,
      );
    }
  
    async getAsync(name: string): Promise<WorkflowResponse> {
      if (!name) {
        throw new Error('Missing template name');
      }
  
      return this.callApiAsync<WorkflowResponse>(
        new URL(`${this.argoWorkflowUrl}/${name}`),
        HttpMethod.GET,
      );
    }
  
    async submitAsync(
      name: string,
      parameters?: WorkflowParameters,
    ): Promise<WorkflowResponse> {
      if (!name) {
        throw new Error('Missing template name');
      }
  
      const body: WorkflowSubmitRequest = {
        namespace: this.argoNamespace,
        resourceName: name,
        resourceKind: WorkflowTemplateResourceKind,
        submitOptions: {
          parameters: this.toStringArray(parameters),
        },
      };
  
      return this.callApiAsync<WorkflowResponse>(
        new URL(`${this.argoWorkflowUrl}/submit`),
        HttpMethod.POST,
        body,
      );
    }
  
    private toStringArray(parameters?: WorkflowParameters): string[] {
      if (!parameters) return [];
  
      const separator = '#-';
      let strParameters = '';
      parameters!.forEach(
        (item, key) => (strParameters += `${key}=${item}${separator}`),
      );
  
      return strParameters.slice(0, -1 * separator.length).split(separator);
    }
  
    private async callApiAsync<ReturnType>(
      url: URL,
      method: HttpMethod,
      body?: object,
    ): Promise<ReturnType> {
      const response = await fetch(url.toString(), {
        method: method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
  
      return await this.getResponseBodyIfNotError<ReturnType>(response);
    }
  
    private async getResponseBodyIfNotError<ReturnType>(response: Response) {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
  
      return (await response.json()) as ReturnType;
    }
  }
  