import React from 'react';
import {Fragment} from 'react';
import '/src/main.css';
import '/src/goals/list.css';
import '/src/goals/feed.css';


export function GoalWrapper(props){
    if (typeof props == typeof undefined ) {
        return <Fragment></Fragment>;
    }
    const [wrap, setWrap] = React.useState(props.resultArr);
    React.useEffect(() => {
        setWrap(props.resultArr);
    },[props])

    return(<tbody>{wrap}</tbody>);
}