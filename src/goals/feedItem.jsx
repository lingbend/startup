import React from 'react';
import '/src/main.css';
import '/src/goals/list.css';
import '/src/goals/feed.css';

export function FeedItem(props) {

    if (props.feedList == null) {
        return;
    }

    const [thisNum, setThisNum] = React.useState(props.num);

    return (
    <tr hidden={props?.feedList?.[thisNum]?.visible}>
        <td>
            <i className={props?.feedList?.[thisNum]?.icon}></i>
        </td>
        <td>{props?.feedList?.[thisNum]?.text}</td>
    </tr>)
}