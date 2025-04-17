import React from 'react';
import {Fragment} from 'react';
import '/src/main.css';
import '/src/goals/list.css';
import '/src/goals/feed.css';
import { FeedItem } from '/src/goals/feedItem.jsx';


export function FeedWrapper(props){
    const [feedList, setFeedList] = React.useState(()=>{
        let feedList = sessionStorage.getItem("feedList") ? JSON.parse(sessionStorage.getItem("feedList")) : [{icon:"bi bi-hand-thumbs-up", text:"Suzie decided to eat styrofoam!", visible:true}];
        return feedList;
    });


    React.useEffect(() => {

        props?.webSocket?.addEventListener("message", async (message) => {
            let temp = await JSON.parse(await message.data.text());
            let newFeedList = await saveMessage(temp);
            setFeedList(() => structuredClone(newFeedList));
        }) 
        
        }, [props.webSocket]);

    async function saveMessage(temp) {
        let oldFeedList = sessionStorage.getItem("feedList") ? await JSON.parse(sessionStorage.getItem("feedList")) : feedList;
        if (oldFeedList == null) {
            return [temp];
        }
        if (oldFeedList.length >= 5) {
            oldFeedList.shift();
        }
        let newFeedList = (structuredClone(oldFeedList));
        newFeedList.push(temp);
        sessionStorage.setItem("feedList", await JSON.stringify(newFeedList));
        return newFeedList;
    }

    return (<Fragment>
            <FeedItem num={0} feedList={feedList}/>
            <FeedItem num={1} feedList={feedList}/>
            <FeedItem num={2} feedList={feedList}/>
            <FeedItem num={3} feedList={feedList}/>
            <FeedItem num={4} feedList={feedList}/>
            </Fragment>)
}