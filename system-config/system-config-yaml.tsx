import React, { FunctionComponent } from 'react';

import yaml from 'js-yaml';
import { YamlEditor, YamlEditorProps } from 'common/components/yaml-editor';
import { errorNotification, successNotification } from 'common/utils';
import { systemConfigStore } from './model';

const onSubmit: YamlEditorProps['onSubmit'] = (yamlContents) => {
  systemConfigStore.updateSystemConfigurationViaYaml(yamlContents[0]).then(
    () => {
      successNotification(`${name} updated successfully`);
      onClose();
    },
    (err: string) => {
      getErrorNotification('updating', err);
    },
  );
};

const getErrorNotification = (oper: string, err: string) => {
  errorNotification(
    `Error while ${oper} global virtual router configuration: ${err}`,
  );
  systemConfigStore.setLoadingStatus(false);
};

const onClose = () => {
  systemConfigStore.setDrawerStatus(false);
  systemConfigStore.setLoadingStatus(false);
  systemConfigStore
    .getSystemConfigTable()
    .setData(systemConfigStore.getStoreValues());
};

export const SystemConfigYamlEditor: FunctionComponent = () => {
  const { yamlData } = systemConfigStore;
  const yamlContents = yaml.dump(yamlData);

  return (
    <YamlEditor
      onSubmit={onSubmit}
      store={systemConfigStore}
      onClose={onClose}
      value={yamlContents}
    />
  );
};
