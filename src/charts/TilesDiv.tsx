import React,{Component} from 'react';
import {getMetricsPathForQuery,IqueryParam,convertToIntValueArray} from '../utils';
import './../../App.scss'





export class TilesDiv extends Component<{[key: string]: any}, { [key: string]: any}>{
    constructor(props:any) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          itemValue: Number
        };
      }
    componentDidMount(){
        const queryParams: IqueryParam = {
            time: 1618475724,
            step: 30,
            query:this.props.metric 
        }
        
            const metricPath:any = getMetricsPathForQuery(queryParams);
            fetch(metricPath)
                .then(res => res.json())
                .then(
                    (result:any) => {
                    this.setState({
                        isLoaded: true,
                        itemValue: result.data.result.length,
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
        return(
                <div className="card">
                    <div className="container">
                        <h4><b>{this.props.label}</b></h4> 
                        <h1 className="label-value">{this.state.itemValue}</h1>
                    </div>
                </div>
        )
    }
}
