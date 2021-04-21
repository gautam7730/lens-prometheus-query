import React, { FunctionComponent } from 'react';

import { Tabs } from 'antd';

import { SystemConfigForm } from './system-config-form';
import { SystemConfigYamlEditor } from './system-config-yaml';

const { TabPane } = Tabs;

export const SystemConfigTabs: FunctionComponent = () => {
  return (
    <Tabs defaultActiveKey="tab-network">
      <TabPane tab="Form" key="tab-network" className="vn-create-network-tab">
        <SystemConfigForm />
      </TabPane>
      <TabPane tab="Yaml" key="tab-yaml">
        <SystemConfigYamlEditor />
      </TabPane>
    </Tabs>
  );
};
