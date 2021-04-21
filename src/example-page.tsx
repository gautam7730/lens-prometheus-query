import { LensRendererExtension, Component } from "@k8slens/extensions";
import path from "path";
import React from "react"
import {LineChart} from "./charts/LineChart"
import {TilesDiv} from "./charts/TilesDiv"

export function ExampleIcon(props: Component.IconProps) {
  return <Component.Icon {...props} material="pages" tooltip={path.basename(__filename)}/>
}

export class ExamplePage extends React.Component<{ extension: LensRendererExtension }> {
  


  render() {

    return (
      <div className="flex column gaps align-flex-start">
        <div className="float-container">
          <TilesDiv label='No. of Nodes' metric='kube_node_info'/>
          <TilesDiv label='No. of Pods' metric='kube_pod_info'/>
          <TilesDiv label='No. of Services' metric='kube_service_created'/>
          
          
        </div>
        <LineChart/>
        
      </div>
    )
  }
}
