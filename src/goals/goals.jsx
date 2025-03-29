import React from 'react';
import {Fragment} from 'react';
import '/src/main.css';
import '/src/goals/list.css';
import '/src/goals/feed.css';
import { ProgressBar } from 'react-bootstrap';

function Testing(props) {

    const [detailsToggle, setDetailsToggle] = React.useState(false);
    const [toggleText, setToggleText] = React.useState('...more');
    const [editToggle, setEditToggle] = React.useState(false);

    const [currGoalName, setCurrGoalName] = React.useState(props.goalObj.nameVar || '');
    const [currGoalText, setCurrGoalText] = React.useState(props.goalObj.text || '');
    const [currGoalPublic, setCurrGoalPublic] = React.useState(props.goalObj.publicVar || false);
    const [currGoalID, setCurrGoalID] = React.useState(props.goalObj.goalID || '');
    const [currGoalProg, setCurrGoalProg] = React.useState(props.goalObj.prog || 0);
    const [currGoalStreak, setCurrGoalStreak] = React.useState(props.goalObj.streak || []);
    const [currGoalCreation, setCurrGoalCreation] = React.useState(props.goalObj.creationDate || null);
    const [goalSuggestion, setGoalSuggestion] = React.useState("placeholder")
    const [suggestionGetter, setSuggestionGetter] = React.useState();




    React.useEffect(()=> {
        setSuggestionGetter(() => new getGoalSuggestion());
    },[])

    class getGoalSuggestion {
        constructor(){
            this.suggestionTimer;
        }
        timer(){
            if (this.suggestionTimer) {
                clearInterval(this.suggestionTimer);
                setSuggestionGetter(() => new getGoalSuggestion());
            }
            else {

                async function innerGetSuggestion(){
                    let answer = await new Promise((resolve)=>{
                        let randomGoals = ["Eat your cat.", "Lick a mountain.", "Burn some sugar.", "Bruh", "(Cringy) Hoppy Birthday Party"];
                        let goal = randomGoals.at(Math.floor(Math.random()*randomGoals.length));
                        resolve(goal);
                    })
                    return answer;
                }
                let suggestion = innerGetSuggestion();
            
                setGoalSuggestion(suggestion)

                this.suggestionTimer = setInterval(()=>{
            
                    let suggestion = innerGetSuggestion();
            
                    setGoalSuggestion(suggestion);}, 60000)
            }
        }

    }



    React.useEffect(() => {
        if (props.goalObj) {
            setCurrGoalName(props.goalObj.nameVar);
            setCurrGoalText(props.goalObj.text);
            setCurrGoalPublic(props.goalObj.publicVar);
            setCurrGoalID(props.goalObj.goalID);
            setCurrGoalProg(props.goalObj.prog);
            setCurrGoalStreak(props.goalObj.streak);
        }
    }, [props.goalObj]);

    React.useEffect(() => {
        setStreakPer(() => {
            if (currGoalCreation && currGoalStreak) {
                let daysPast = (Date.now() - currGoalCreation.valueOf()) / 86400000;
                if (currGoalCreation && daysPast < 7) {
                    return ((currGoalStreak.length / 7)*100);
                }
                else {
                    return (((currGoalStreak.length - (findFarthestDateInWeek(currGoalStreak))) / 7)*100);
                }
            }
            else {
                return 0;
            }
    
        });
        setStreakToday(() => {
            if (currGoalStreak) {
                return checkForToday(currGoalStreak);
            }
            else {
                return false;
            }
        })
    }, [currGoalStreak]);

    const [newGoalName, setNewGoalName] = React.useState(props.goalObj.nameVar);
    const [newGoalText, setNewGoalText] = React.useState(props.goalObj.text);
    const [newGoalPublic, setNewGoalPublic] = React.useState(props.goalObj.publicVar);
    const [streakPer, setStreakPer] = React.useState(() => {
        if (currGoalCreation && currGoalStreak) {
            let daysPast = (Date.now() - currGoalCreation.valueOf()) / 86400000;
            if (currGoalCreation && daysPast < 7) {
                return ((currGoalStreak.length / 7)*100);
            }
            else {
                return (((currGoalStreak.length - (findFarthestDateInWeek(currGoalStreak))) / 7)*100);
            }
        }
        else {
            return 0;
        }

    });
    const [streakToday, setStreakToday] = React.useState(() => {
        if (currGoalStreak) {
            return checkForToday(currGoalStreak);
        }
        else {
            return false;
        }
    })
    const [newGoalProg, setNewGoalProg] = React.useState(props.goalObj.prog || 0);
    const [progLoop, setProgLoop] = React.useState(getLoop(newGoalProg));
    const [detailsStyling, setDetailsStyling] = React.useState({maxHeight:"9ex", textOverflow:"ellipsis", overflow:"hidden"})

    function setStreakPercentage() {
        if (currGoalCreation && currGoalStreak) {
            let daysPast = (Date.now() - currGoalCreation.valueOf()) / 86400000;
            if (currGoalCreation && daysPast < 7) {
                setStreakPer((currGoalStreak.length / 7)*100);
            }
            else {
                setStreakPer(((currGoalStreak.length - (findFarthestDateInWeek(currGoalStreak))) / 7)*100);
            }
        }
        else {
            setStreakPer(0);
        }
    };


    React.useEffect(() => {
        setProgLoop(getLoop(newGoalProg));
    }, [newGoalProg]);

    function findFarthestDateInWeek(streak) {
        let i = 0;
        while (Date.parse(streak[i]) < Date(Date.now() - (7 * 86400000)) && i < streak.length) {
            i++;
        }
        return i;
    }

    function checkForToday(streak) {
        for (let i = 0; i < streak.length; i++) {
            if (streak[i] == new Date().toDateString()) {
                return true;
            }
        }
        return false;
    }



    
    function onDetailsToggle(e) {
        if (toggleText == '...more') {
            setToggleText('less...');
            setDetailsStyling({});
        }
        else {
            setToggleText('...more');
            setDetailsStyling({maxHeight:"9ex", textOverflow:"ellipsis", overflow:"hidden"})
        }

        setDetailsToggle((state) => !state);
    }

    function onEditToggle() {
        setEditToggle((state) => !state);
        if (editToggle == false) {
            setNewGoalName(currGoalName);
            setNewGoalText(currGoalText);
            setNewGoalPublic(currGoalPublic);
        }
        suggestionGetter.timer();
    }

    function percentToAngle(percent) {
        return (2 * Math.PI) * (percent / 100);
    }

    function angleToCoords(angle, radius, centerx, centery) {
        let x = (radius * Math.cos(angle)) + centerx;
        let y = radius * Math.sin(angle) + centery;
        return [x, y];
    }

    function assembleProgressLoop(endx, endy, percent) {
        if (percent <= 50) {
            return "M29 16 A13 13 0 0 1 " + String(endx) + " " + String(endy);
        }
        else {
            return "M29 16 A13 13 0 1 1 " + String(endx) + " " + String(endy);
        }
    }

    function getLoop(percent) {
        let angle = percentToAngle(percent);
        let endCoords = angleToCoords(angle, 13, 16.5, 16.5);
        let loop = assembleProgressLoop(endCoords[0], endCoords[1], percent);
        return loop;
    }

    function onProgressSlider(e) {
        let progress = e.target.value;
        setNewGoalProg(progress);
        let loop = getLoop(progress);
        setProgLoop(loop);
    }

    function onStreakToggle() {
        let tempStreak = currGoalStreak;
        new Promise((resolve) => {
            if (streakToday == false) {
                tempStreak.push(props.today());
            }
            else if (streakToday == true) {
                tempStreak.pop();
            }
        resolve(tempStreak)})
        .then(() => {
            setStreakToday((state) => (!state))
        })
        .then(setCurrGoalStreak(tempStreak))
        .then(updateGoal)
        .then(setStreakPercentage);
    }

    function saveGoal() {
        new Promise((resolve) => {
            setCurrGoalName(newGoalName);
            setCurrGoalText(newGoalText);
            setCurrGoalPublic(newGoalPublic);
            resolve(newGoalName, newGoalText, newGoalPublic);
        }).then(updateGoal())
        .then(onEditToggle());
    }

    function updateGoal() {
        let newGoalObj = props.goalObj;
        newGoalObj.nameVar = newGoalName;
        newGoalObj.text = newGoalText;
        newGoalObj.publicVar = newGoalPublic;
        newGoalObj.prog = newGoalProg;
        newGoalObj.streak = currGoalStreak;
        return localStorage.setItem(newGoalObj.goalID, JSON.stringify(newGoalObj));
    }

    function deleteGoal() {
        return new Promise((resolve) => {
            localStorage.removeItem(currGoalID);
            resolve(localStorage.getItem(currGoalID));
        })
        .then(() => onEditToggle())
        .then(props.setGoalIndex(() => {
            let currIndex = JSON.parse(localStorage.getItem('goalindex'));
            currIndex = currIndex.filter((val) => val != currGoalID);
            return currIndex;
        }))
        .then(props.setNumGoals(() => JSON.parse(localStorage.getItem('goalindex')).length))
        .then(props.setNewGoalTrigger((state) => (!state)));
    }



    return (<tr>
            <td>
                <form id="goal1check" method="post">
                    <input name="goal1check" id="checkoff" type="checkbox" aria-label="Checkoff Goal 1" onChange={onStreakToggle} checked={streakToday}/>
                </form>
            </td>
            <td>
                <div style={{height:"5px"}}>
                    <ProgressBar now={streakPer}/>
                </div>
            </td>
            <td>
                <svg width="32" height="32">
                    {newGoalProg < 95 && <path d={progLoop} stroke="orange" fill="none" strokeWidth="5">progress</path>}{newGoalProg >= 95 && <circle cx="16.5" cy="16.5" r="13" stroke="orange" strokeWidth="5"/>}
                </svg>
            </td>
            <td>
                <div>
                    <h3>{currGoalName}</h3>
                    <p style={detailsStyling}>{currGoalText}</p>
                    <a className="link-info" onClick={onDetailsToggle}>{toggleText}</a>
                    <div hidden={!detailsToggle}>
                        <a className="link-info" onClick={onEditToggle}>Edit</a>
                    </div>
                </div>
                <div hidden={(!editToggle || !detailsToggle)}>
                    <form id="goal1_form" method="post">
                        <div>
                            <h3><label htmlFor="goal_input">Edit here:</label></h3>
                            <input id="goal_input" name="goal1name" type="text" placeholder={currGoalName} onChange={(e) => setNewGoalName(e.target.value)}></input>
                            <br />
                            <textarea wrap="hard" id="goal_input" name="goal1" form="goal1_form" onChange={(e) => setNewGoalText(e.target.value)} defaultValue={currGoalText}/>
                        </div>
                        <div>
                            <label htmlFor="publicbox" >Public?</label>
                            <input type="checkbox" id="publicbox" name="goal1public" onChange={() => setNewGoalPublic(!newGoalPublic)} checked={newGoalPublic}/>
                        </div>
                        <div>
                            <label htmlFor="progressSlider">Progress: {newGoalProg}%</label>
                            <input type="range" min="0" max="100" defaultValue={newGoalProg} id="progressSlider" onChange={onProgressSlider}/>
                        </div>
                        <div>
                            <button className="btn btn-warning" type="button" onClick={saveGoal}>Save</button>
                            <button className="btn btn-warning" type="reset" onClick={onEditToggle}>Cancel</button>
                            <button className="btn btn-warning" type="button" onClick={deleteGoal}>Delete</button>
                        </div>
                    </form>
                    <div>
                        <h4>Goal Suggestion</h4>
                        <ul>
                            <li>{goalSuggestion}</li>
                        </ul>
                    </div>
                </div>
            </td>
        </tr>)
}


function FeedWrapper(){
    const [feedList, setFeedList] = React.useState(null);
    React.useEffect(() => {

        if (feedList == null) {
            setFeedList(() => [{icon:"bi bi-hand-thumbs-up", text:"Suzie decided to eat styrofoam!", visible:false}]);
        }
        setInterval(() => {
            let fillerList = [{icon:"bi bi-hand-thumbs-up", text:"Suzie decided to eat styrofoam!", visible:false}, 
                {icon:"bi bi-check2-circle", text:"Johnny planted an appleseed!", visible:false}
            ];
            let temp = fillerList.at(Math.floor(Math.random()*2));
            setFeedList((feedList) => {
                if (feedList == undefined || feedList == null) {
                    return [temp];
                }
                if (feedList.length > 5) {
                    feedList.shift();
                }
                let newFeedList = (structuredClone(feedList))
                newFeedList.push(temp);
                return newFeedList;
            });
        }, 2000);
    },[])
    return (<Fragment>
            <FeedItem num={0} feedList={feedList}/>
            <FeedItem num={1} feedList={feedList}/>
            <FeedItem num={2} feedList={feedList}/>
            <FeedItem num={3} feedList={feedList}/>
            <FeedItem num={4} feedList={feedList}/>
            </Fragment>)
}

function FeedItem(props) {

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


function Wrapper(props){
    if (typeof props == typeof undefined ) {
        return <Fragment></Fragment>;
    }
    const [wrap, setWrap] = React.useState(props.resultArr);
    React.useEffect(() => {
        setWrap(props.resultArr);
    },[props])

    return(<tbody>{wrap}</tbody>);
}

export function Goals(props) {

    const [displayNewGoal, setDisplayNewGoal] = React.useState(true);
    const [newGoalName, setNewGoalName] = React.useState('Name');
    const [newGoalText, setNewGoalText] = React.useState('Insert text here');
    const [newGoalPublic, setNewGoalPublic] = React.useState(false);
    const [goalindex, setGoalIndex] = React.useState(JSON.parse(localStorage.getItem('goalindex')) || [-1]);
    const [goalsInsert, setGoalsInsert] = React.useState(<Fragment></Fragment>);
    const [newGoalTrigger, setNewGoalTrigger] = React.useState(false);
    const [numGoals, setNumGoals] = React.useState(goalindex ? goalindex.length : 0);

    React.useEffect(() => {if (localStorage.getItem('goalindex') && localStorage.getItem('goalindex') != 'null' ) {
        setNumGoals(JSON.parse(localStorage.getItem('goalindex')).length)};
        if (!localStorage.getItem('nextGoalID')) {
            localStorage.setItem('nextGoalID', 1);
        }
    }, []);

    React.useEffect(() => {
;       resetGoalsDom();
    }, [goalindex]);

    async function resetGoalsDom(){
        let insert = <Fragment>{((await GoalsInsertFunc()).props.children)}</Fragment>;
        setGoalsInsert(insert);
    }

    React.useEffect(() => {
        localStorage.setItem('goalindex', JSON.stringify(goalindex));
    }, [goalindex]);

    function Goal(name, text, publicVar) {        
        this.nameVar = name;
        this.text = text;
        this.publicVar = publicVar;
        this.creationDate = new Date();
        this.goalID = localStorage.getItem('nextGoalID');
        this.prog = 0;
        this.streak = [];
        localStorage.setItem('nextGoalID', parseInt(this.goalID) + 1);
    }

    async function GoalsInsertFunc() {
        let temp = [];
        let promises = [];
        return await new Promise ((resolve) => {
            for (let i = 0; i < numGoals; i++) {
                let id = String(goalindex[i]);
                const getData = new Promise ((resolve) => {
                    let val = localStorage.getItem(id);
                    let val2 = JSON.parse(val);
                    resolve(val2);
                })
                promises.push(getData);
            }
            Promise.allSettled(promises).then((results) => {            
                for (let i in results) {
                temp.push(results[i].value);
            }}).then(()=> resolve(temp));
        }
        )
        .then((temp2) => {

            let resultArr = [];

            for (let i in temp2) {
                if (temp2[i] == null) {
                    continue;
                }
                resultArr.push(<Testing key={(temp2[i]).goalID} goalObj={(temp2[i])} setNewGoalTrigger={setNewGoalTrigger} setNumGoals={setNumGoals} setGoalIndex={setGoalIndex} newGoalTrigger={newGoalTrigger} today={today}/>);
            }
            
            return (<Fragment>{resultArr}</Fragment>);
        }
        )
    }

    
    function toggleNewGoal(){
        setDisplayNewGoal(state => !state);
        if (!displayNewGoal) {
            setNewGoalName('');
            setNewGoalText('');
            setNewGoalPublic(false);
        }
        return true;
    }

    function saveGoalWrapper() {
        let newGoal = new Goal(newGoalName, newGoalText, newGoalPublic);

        setDisplayNewGoal(state => !state);

        let tempIndex;
        let temp = goalindex;
        if (temp == null || (temp.length == 1 && temp[0] == -1)) {
            temp = [newGoal.goalID];
        }
        else {
            temp.push(newGoal.goalID);
        }
        saveGoal(newGoal, temp);
    }

    async function saveGoal(newGoal, tempIndex) {
        await new Promise((resolve) => {localStorage.setItem(newGoal.goalID, JSON.stringify(newGoal));
        localStorage.setItem('goalindex', JSON.stringify(tempIndex));
        let temp2 = goalsInsert.props.children;
        temp2.push(<Testing key={newGoal.goalID} goalObj={newGoal} setNewGoalTrigger={setNewGoalTrigger}
        setNumGoals={setNumGoals} setGoalIndex={setGoalIndex} newGoalTrigger={newGoalTrigger} today={today}/>);
        resolve(setGoalsInsert(<Fragment>{temp2}</Fragment>));});
        setNewGoalName('');
        setNewGoalText('');
        setNewGoalPublic(false);
        setGoalIndex(tempIndex);
    }

    function today() {
        const day = new Date();
        let todayString = day.toDateString();
        return todayString;
    }




    return (
        <>
            <h2>{props.userName}'s Goals</h2>
            <div>
                <div className="bg-dark text-light container-fluid goal-list">
                    <button className="btn btn-warning" type="button" onClick={toggleNewGoal}>New Goal</button>
                    <div hidden={displayNewGoal}>
                        <form id="goalnew_form" method="post">
                            <div>
                                <h3><label htmlFor="goal_input">Edit here:</label></h3>
                                <input id="goal_input" name="goal1name" type="text" placeholder={newGoalName}
                                 onChange={(e) => setNewGoalName(e.target.value)}></input>
                                <br />
                                <textarea wrap="hard" id="goal_input" name="goalnew" form="goalnew_form"
                                 onChange={(e) => setNewGoalText(e.target.value)} defaultValue={newGoalText}/>
                            </div>
                            <div>
                                <label htmlFor="publicbox">Public?</label>
                                <input type="checkbox" id="publicbox" name="goalnewpublic" checked={newGoalPublic} onClick={() => setNewGoalPublic(!newGoalPublic)}/>
                            </div>
                            <div>
                                <button className="btn btn-warning" type="button" onClick={saveGoalWrapper}>Save</button>
                                <button className="btn btn-warning" type="reset" onClick={toggleNewGoal}>Cancel</button>
                            </div>
                        </form>
                        <div>
                            <h4>Goal Suggestion</h4>
                            <ul>
                                <li>Eat your cat</li>
                                <li>Eat your hair</li>
                                <li>Invent a new language</li>
                            </ul>
                        </div>
                    </div>
                    <br />
                    <table className="goal_list">
                        <thead>
                            <tr>
                                <th scope="col">Daily Check</th>
                                <th scope="col">Streak</th>
                                <th scope="col">Progress</th>
                                <th scope="col">Goal</th>
                            </tr>
                        </thead>
                        <Wrapper resultArr={goalsInsert}/>
                    </table>
                </div>
            </div>
            <br />
            <br />
            <h2>Feed</h2>
            <div>
                <div className="feed">
                    <div>
                    <table>
                        <tbody>
                            <FeedWrapper/>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </>
    );
}