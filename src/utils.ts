import { K8sApi } from "@k8slens/extensions";
import {toJS} from 'mobx';


export interface IqueryRangeParam{
    start: number,
    end: number,
    step: number,
    query: string,
}

export interface IqueryParam{
    time: number,
    step: number,
    query: string,
}

export function getMetricsPath(queryParam:IqueryRangeParam) {
    const prometheusPath = getPrometheusPathFromServicesList();
    const metricsPath = `/api-kube/api/v1/namespaces/${prometheusPath}/proxy/api/v1/query_range?query=${queryParam.query}&end=${queryParam.end}&start=${queryParam.start}&step=${queryParam.step}`; 
    return metricsPath;
}


export function getPrometheusPathFromServicesList():string {
    const serviceStore = K8sApi.apiManager.getStore(K8sApi.serviceApi);
    serviceStore.loadAll(); 
    const serviceList = toJS(serviceStore.items) ;
    const promArr = serviceList.filter(filerPromethuesNamedServices)
    const promethuesService:any = promArr.filter(filerPromethuesByPort);    

    if(!promethuesService)
    return '';

    const serviceVal = {
        namespace: promethuesService[0].metadata.namespace,
        service: promethuesService[0].metadata.name,
        port: promethuesService[0].spec.ports[0].port
      };
    const prometheusPath = `${serviceVal.namespace}/services/${serviceVal.service}:${serviceVal.port}`;
    return prometheusPath;  
}

function filerPromethuesNamedServices(value:any){
    return value.metadata.name.indexOf('prometheus')!==-1;
}

function filerPromethuesByPort(value:any){
    return value.spec.ports[0].port === 80 && value.spec.ports[0].targetPort === 9090;
}

export function convertToIntValueArray(arrWihStringValue:any[]){
    const arrWithIntValue:any[] = [];
    const arr1:any[] = arrWihStringValue;
    for(let i=0;i<arrWihStringValue.length;i++){
        let newArr:any= arrWihStringValue[i];
        newArr[1]=+newArr[1];
        arrWithIntValue.push(newArr);
    }  
    return arrWithIntValue;             
}

export function getMetricsPathForQuery(queryParam:IqueryParam) {
    const prometheusPath = getPrometheusPathFromServicesList();
    const metricsPath = `/api-kube/api/v1/namespaces/${prometheusPath}/proxy/api/v1/query?query=${queryParam.query}&time=${queryParam.time}&step=${queryParam.step}`; 
    return metricsPath;
}




