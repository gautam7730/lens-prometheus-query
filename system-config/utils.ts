import { SystemConfigObject } from './index';

export interface IFormElements {
  '4BytesASN'?: boolean;
  autonomousSystem?: number;
}

export interface IFormData {
  initialValues: IFormElements;
  values: IFormElements;
}

export interface IConfigObject {
  settings: string;
  value: string | number;
}

export interface IConfigItem {
  spec: {
    autonomousSystem: number;
    enable4bytesAS: boolean;
  };
}

export function getSystemConfigApiTemplate(
  item: SystemConfigObject,
  formData: IFormElements,
) {
  const globalVRConfigObject: any = {
    apiVersion: item.apiVersion,
    kind: 'GlobalSystemConfig',
    metadata: {
      name: item.metadata.name,
      selfLink: item.metadata.selfLink,
      uid: item.metadata.uid,
      resourceVersion: item.metadata.resourceVersion,
      creationTimestamp: item.metadata.creationTimestamp,
      labels: item.metadata.labels,
      managedFields: item.metadata.managedFields,
    },
    spec: {
      enable4bytesAS: formData['4BytesASN'].toString() === 'true',
      autonomousSystem: +formData.autonomousSystem,
      fqName: [item.metadata.name],
      bgpRouterReferences: item.spec.bgpRouterReferences,
    },
  };

  return globalVRConfigObject;
}
