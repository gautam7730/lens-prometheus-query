import React from 'react';

import { observer } from 'mobx-react';

import { DrawerWithClose } from 'common/index';
import { systemConfigStore as store } from './model';
import { SystemConfigTabs } from './system-config-tabs';

export interface IDrawerProps {
  name: string;
}

@observer
export class Drawer extends React.Component<IDrawerProps> {
  public closeDrawer = () => {
    store.setDrawerStatus(false);
  };

  public render() {
    const { name } = this.props;
    const { drawerStatusOpen: isOpen } = store;
    const title = `${name} Update:`;

    return (
      <DrawerWithClose
        open={isOpen}
        title={title}
        closeDrawer={this.closeDrawer}
      >
        <SystemConfigTabs />
      </DrawerWithClose>
    );
  }
}
