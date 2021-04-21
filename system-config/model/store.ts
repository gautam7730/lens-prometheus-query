/* eslint-disable @typescript-eslint/no-floating-promises */
import { K8sApi } from '@k8slens/extensions';
import { action, observable } from 'mobx';

import { systemConfigApi, SystemConfigObject } from './api';
import {
  getSystemConfigApiTemplate,
  IFormData,
  IFormElements,
  IConfigObject,
  IConfigItem,
} from '../utils';
import { SystemConfigKeyNames } from '../consts';

export class SystemConfigStore extends K8sApi.KubeObjectStore<
  SystemConfigObject
> {
  public api = systemConfigApi;
  public yamlData: any;
  public systemConfigTable: any;

  public formData: IFormData = {
    initialValues: {},
    values: {
      '4BytesASN': false,
      autonomousSystem: 0,
    },
  };

  @observable public drawerStatusOpen = false;
  @observable public loadingStatus = false;

  constructor() {
    super();
    this.loadAll();
  }

  @action
  public setDrawerStatus(status: boolean) {
    this.drawerStatusOpen = status;
  }

  @action
  public setLoadingStatus(status: boolean) {
    this.loadingStatus = status;
  }

  @action
  public setFormData(data: IFormData) {
    this.formData = data;
    this.setDrawerStatus(true);
  }

  @action
  public setYamlData(data: any) {
    this.yamlData = data;
    this.setDrawerStatus(true);
  }

  @action
  public getYamlData() {
    return this.yamlData;
  }

  @action
  public resetYamlData() {
    this.yamlData = {};
  }

  @action
  public setSystemConfigTable(systemConfigObj: any) {
    return (this.systemConfigTable = systemConfigObj);
  }

  @action
  public getSystemConfigTable() {
    this.loadAll();

    return this.systemConfigTable;
  }

  public getStoreValues() {
    return this.getItems();
  }

  public updateSystemConfiguration(formData: IFormElements) {
    const item = this.getItems()[0];
    const systemConfigObject = getSystemConfigApiTemplate(item, formData);

    return this.update(item, systemConfigObject);
  }

  public updateSystemConfigurationViaYaml(yamlData: any) {
    const item = this.getItems()[0];
    const formData: IFormElements = {
      '4BytesASN': yamlData.spec.enable4bytesAS,
      autonomousSystem: yamlData.spec.autonomousSystem,
    };
    const systemConfigObject = getSystemConfigApiTemplate(item, formData);

    return this.update(item, systemConfigObject);
  }

  public convertItemSpecValueToArrayOfObject(items: IConfigItem[]) {
    const obj = [];
    if (items && items.length > 0) {
      obj.push({
        settings: SystemConfigKeyNames.autonomousSystem,
        value: items[0].spec.autonomousSystem,
      });
      obj.push({
        settings: SystemConfigKeyNames.enable4bytesAS,
        value: items[0].spec.enable4bytesAS.toString(),
      });
    }

    return obj;
  }

  public convertArrayOfObjectIntoOject(items: IConfigObject[]) {
    const obj: any = {};
    obj.values = {};
    if (items && items.length > 0) {
      obj.values.autonomousSystem = items[0].value;
      obj.values['4BytesASN'] = items[1].value;
      obj.initialValues = {
        autonomousSystem: items[0].value,
        '4BytesASN': items[1].value,
      };
    }

    return obj;
  }
}

export const systemConfigStore = new SystemConfigStore();
