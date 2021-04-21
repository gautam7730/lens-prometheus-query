import { LensMainExtension,Store } from "@k8slens/extensions";

export default class ExampleExtensionMain extends LensMainExtension {
  onActivate() {
    console.log('helloworld-sample activated');
    
    const a = Store.clusterStore.clustersList[0].contextHandler;
    //Store.clusterStore.activeCluster
    //const a = Store.clusterStore.activeCluster.contextHandler;
    console.log('c handler:',a);
    if (a){
      console.log('prom path: ',a.getPrometheusPath());
    }
 
  }

  onDeactivate() {
    console.log('helloworld-sample de-activated');
  }

}
