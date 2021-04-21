import { K8sApi } from '@k8slens/extensions';
import { SystemConfigConst } from '../consts';

export class SystemConfigObject extends K8sApi.KubeObject {
  public static kind = SystemConfigConst.kind;
  public static namespaced = false;
  public static apiBase = SystemConfigConst.apiBase;
  public static apiVersion = SystemConfigConst.apiVersions[0];

  public settings?: string;
  public value?: string;

  public metadata: {
    name: string;
    namespace?: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    labels: {
      [key: string]: string;
    };
    managedFields?: any[];
    annotations?: {
      [key: string]: string;
    };
  };

  public spec?: {
    fqName?: string[];
    enable4bytesAS?: boolean;
    autonomousSystem?: number;
    parent?: {
      apiVersion: string;
      kind: string;
      name: string;
    };
    bgpRouterReferences?: [
      {
        kind: string;
        namespace: string;
        name: string;
        uid: string;
        apiVersion: string;
        fqName: string[];
      },
    ];
  };

  public status?: {
    state: string;
  };

  public getStatus() {
    return this.status ? this.status.state : '-';
  }
}

export const systemConfigApi = new K8sApi.KubeApi({
  objectConstructor: SystemConfigObject,
});
