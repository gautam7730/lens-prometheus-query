import React,{Component} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {getMetricsPath,IqueryRangeParam,convertToIntValueArray} from '../utils';


const queryParams: IqueryRangeParam = {
        start: 1618475724,
        end: 1618476724,
        step: 30,
        query:'kubelet_http_requests_total' 
}


export class LineChart extends Component<{}, { [key: string]: any}>{
    constructor(props:any) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    componentDidMount(){
        const metricPath:any = getMetricsPath(queryParams);
        fetch(metricPath)
            .then(res => res.json())
            .then(
                (result:any) => {
                this.setState({
                    isLoaded: true,
                    items: convertToIntValueArray(result.data.result[0].values)
                });
                },
                (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
                }
            )
    }
    

    render(){
        const options = {
            title: {
                text: 'Http Request Total over time'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Total requests'
                }
            },
            series: [{
                type: 'area',
                name: 'Http Request Total',
                data: this.state.items,
            }]
        }
        return(
            
                <HighchartsReact highcharts={Highcharts} options={options}/>
           
        )
    }
}