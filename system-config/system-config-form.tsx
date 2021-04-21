import React from 'react';

import { observer } from 'mobx-react';

import {
  errorNotification,
  failureCallback,
  FORM_ERROR,
  InputField,
  successNotification,
  withFormWrapper,
} from 'common';
import { systemConfigStore } from './model';
import './style.scss';
import { IFormElements } from './utils';

const { REQUIRED } = FORM_ERROR;

async function successCallback(formData: IFormElements) {
  try {
    const result = await updateSystemConfig(formData);
    if (result) {
      successNotification(`System Configuration values Updated successfully`);
      systemConfigStore.setDrawerStatus(false);
      systemConfigStore.setLoadingStatus(false);
      systemConfigStore
        .getSystemConfigTable()
        .setData(systemConfigStore.getStoreValues());
    }
  } catch (err) {
    errorNotification(`Error during System Config Update`);
  }

  function updateSystemConfig(formData: IFormElements) {
    return systemConfigStore.updateSystemConfiguration(formData);
  }
}

@observer
class ISystemConfigFormHoc extends React.Component {
  public render() {
    return (
      <div className="form-contents">
        <InputField name="autonomousSystem" rules={[REQUIRED]} />
        <InputField name="4BytesASN" rules={[REQUIRED]} />
      </div>
    );
  }
}

export const SystemConfigForm = withFormWrapper(ISystemConfigFormHoc, {
  successCallback,
  failureCallback,
  store: systemConfigStore,
});
