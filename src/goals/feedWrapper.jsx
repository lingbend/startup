import React from 'react';
import {Fragment} from 'react';
import '/src/main.css';
import '/src/goals/list.css';
import '/src/goals/feed.css';
import { FeedItem } from '/src/goals/feedItem.jsx';


export function FeedWrapper(){
    const [feedList, setFeedList] = React.useState(null);
    React.useEffect(() => {

        if (feedList == null) {
            setFeedList(() => [{icon:"bi bi-hand-thumbs-up", text:"Suzie decided to eat styrofoam!", visible:false}]);
        }
        let port = window.location.port;
        let protocol = window.location.protocol == "https" ? "wss" : "ws";
        let webSocket = new WebSocket(protocol + "://" + window.location.host + ":" + port + "/ws");
        webSocket.onmessage(async (message) => {
            let temp = await JSON.parse(message);
            setFeedList((feedList) => {
                if (feedList == null) {
                    return [temp];
                }
                if (feedList.length > 5) {
                    feedList.shift();
                }
                let newFeedList = (structuredClone(feedList))
                newFeedList.push(temp);
                return newFeedList;
            })
            
        })

        // setInterval(() => {
        //     let fillerList = [{icon:"bi bi-hand-thumbs-up", text:"Suzie decided to eat styrofoam!", visible:false}, 
        //         {icon:"bi bi-check2-circle", text:"Johnny planted an appleseed!", visible:false}
        //     ];
        //     let temp = fillerList.at(Math.floor(Math.random()*2));
        //     setFeedList((feedList) => {
        //         if (feedList == null) {
        //             return [temp];
        //         }
        //         if (feedList.length > 5) {
        //             feedList.shift();
        //         }
        //         let newFeedList = (structuredClone(feedList))
        //         newFeedList.push(temp);
        //         return newFeedList;
        //     });
        // }, 2000);
    },[])
    return (<Fragment>
            <FeedItem num={0} feedList={feedList}/>
            <FeedItem num={1} feedList={feedList}/>
            <FeedItem num={2} feedList={feedList}/>
            <FeedItem num={3} feedList={feedList}/>
            <FeedItem num={4} feedList={feedList}/>
            </Fragment>)
}