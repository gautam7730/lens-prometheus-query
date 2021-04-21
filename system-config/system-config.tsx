import React from 'react';
import { systemConfigStore as store } from './index';
import { Table, Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { Drawer } from './system-config-drawer';
import { TITLE } from './consts';
import { systemConfigStore } from './model';
import { IConfigObject } from './utils';

export interface IState {
  list: IConfigObject[];
}

export class SystemConfig extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: [],
    };
  }

  public setData(items: any) {
    const obj = store.convertItemSpecValueToArrayOfObject(items);
    this.setState({ list: obj });
  }

  public onEditClick = () => {
    const items = systemConfigStore.getItems();
    systemConfigStore.setFormData(
      systemConfigStore.convertArrayOfObjectIntoOject(this.state.list),
    );
    store.setDrawerStatus(true);
    systemConfigStore.setSystemConfigTable(this);
    if (items.length > 0) {
      systemConfigStore.setYamlData(items[0]);
    }
  };

  public componentDidMount() {
    return this.setData(systemConfigStore.getStoreValues());
  }

  public render() {
    const columns = [
      {
        title: 'Settings',
        dataIndex: 'settings',
        key: 'settings',
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
      },
    ];

    return (
      <>
        <Button
          icon={<EditFilled />}
          onClick={this.onEditClick}
          className="edit-button"
        >
          Edit
        </Button>

        <Table
          dataSource={this.state.list}
          columns={columns}
          pagination={false}
          className="table-row"
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
        />
        <Drawer name={TITLE} />
      </>
    );
  }
}
