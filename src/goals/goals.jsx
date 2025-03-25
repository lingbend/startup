import React from 'react';
import '/src/main.css';
import '/src/goals/list.css';
import '/src/goals/feed.css';

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
                    console.log("if");
                    return {width:(String((currGoalStreak.length / 7)*100) + "%")};
                }
                else {
                    return {width:(String(((currGoalStreak.length - (findFarthestDateInWeek(currGoalStreak))) / 7)*100) + "%")};
                }
            }
            else {
                return {width:"0%"};
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
                return {width:(String((currGoalStreak.length / 7)*100) + "%")};
            }
            else {
                return {width:(String(((currGoalStreak.length - (findFarthestDateInWeek(currGoalStreak))) / 7)*100) + "%")};
            }
        }
        else {
            return {width:"0%"};
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
                console.log(streak[i] + props.goalObj.nameVar);
                return true;
            }
        }
        console.log(false);
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
        .then(updateGoal);
    }



    function saveGoal() {
        new Promise((resolve) => {
            setCurrGoalName(newGoalName);
            console.log(currGoalName + "new goal name");
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
        console.log(newGoalObj.goalID + "goalID");
        console.log(JSON.stringify(newGoalObj));
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



    return (
        <tr>
            <td>
                <form id="goal1check" method="post">
                    <input name="goal1check" id="checkoff" type="checkbox" aria-label="Checkoff Goal 1" onChange={onStreakToggle} checked={streakToday}/>
                </form>
            </td>
            <td>
                <div className="progress" style={{height:"5px"}}>
                    <div className="progress-bar bg-info" style={streakPer}></div>
                </div>
            </td>
            <td>
                <svg width="32" height="32">
                    {newGoalProg < 95 && <path d={progLoop} stroke="orange" fill="none" strokeWidth="5">progress</path>}
                    {newGoalProg >= 95 && <circle cx="16.5" cy="16.5" r="13" stroke="orange" strokeWidth="5"/>}
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
                            <h3><label for="goal_input">Edit here:</label></h3>
                            <input id="goal_input" name="goal1name" type="text" placeholder={currGoalName} onChange={(e) => setNewGoalName(e.target.value)}></input>
                            <br />
                            <textarea wrap="hard" id="goal_input" name="goal1" form="goal1_form" onChange={(e) => setNewGoalText(e.target.value)} defaultValue={currGoalText}></textarea>
                        </div>
                        <div>
                            <label for="publicbox" >Public?</label>
                            <input type="checkbox" id="publicbox" name="goal1public" onChange={() => setNewGoalPublic(!newGoalPublic)} checked={newGoalPublic}/>
                        </div>
                        <div>
                            <label for="progressSlider">Progress: {newGoalProg}%</label>
                            <input type="range" min="0" max="100" defaultValue={newGoalProg} id="progressSlider" onChange={onProgressSlider}/>
                        </div>
                        <div>
                            <button className="btn btn-warning" type="button" onClick={saveGoal}>Save</button>
                            <button className="btn btn-warning" type="reset" onClick={onEditToggle}>Cancel</button>
                            <button className="btn btn-warning" type="button" onClick={deleteGoal}>Delete</button>
                        </div>
                    </form>
                    <div>
                        <h4>Goal Suggestions</h4>
                        <ul>
                            <li>Eat your cat</li>
                            <li>Eat your hair</li>
                            <li>Invent a new language</li>
                        </ul>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export function Goals(props) {

    const [displayNewGoal, setDisplayNewGoal] = React.useState(true);
    const [newGoalName, setNewGoalName] = React.useState('');
    const [newGoalText, setNewGoalText] = React.useState('');
    const [newGoalPublic, setNewGoalPublic] = React.useState(false);
    const [numGoals, setNumGoals] = React.useState(0);
    const [goalindex, setGoalIndex] = React.useState(JSON.parse(localStorage.getItem('goalindex')) || null);
    const [goalsInsert, setGoalsInsert] = React.useState('');
    const [newGoalTrigger, setNewGoalTrigger] = React.useState(false);

    React.useEffect(() => {if (localStorage.getItem('goalindex') && localStorage.getItem('goalindex') != 'null' ) {
        setNumGoals(JSON.parse(localStorage.getItem('goalindex')).length)};
        if (!localStorage.getItem('nextGoalID')) {
            localStorage.setItem('nextGoalID', 1);
        }
    }, []);

    React.useEffect(() => {
        GoalsInsertFunc();
    }, [goalindex, numGoals, newGoalTrigger, localStorage.getItem('goalindex')]);

    React.useEffect(() => {
        localStorage.setItem('goalindex', JSON.stringify(goalindex));
    }, [goalindex]);




    function GoalsInsertFunc() {
        let temp = [];
        let promises = [];
        new Promise ((resolve) => {
            for (let i = 0; i < numGoals; i++) {
                let id = String(goalindex[i]);
                const getData = new Promise ((resolve) => {
                    let val = localStorage.getItem(id);
                    let val2 = JSON.parse(val);
                    console.log(val2);
                    resolve(val2);
                })
                promises.push(getData);
            }
            Promise.allSettled(promises).then((results) => {            
                for (let i in results) {
                temp.push(results[i].value);
            }}).then(()=> resolve(temp));
        }
        ).then((temp2) => {
            console.log(temp2);
            console.log(temp2.length);

            let resultArr = [];

            for (let i in temp2) {
                if (temp2[i] == null) {
                    continue;
                }
                console.log('inside');
                console.log(temp2[i].goalID);
                resultArr.push(<Testing key={(temp2[i]).goalID} goalObj={(temp2[i])} setNewGoalTrigger={setNewGoalTrigger}
                setNumGoals={setNumGoals} setGoalIndex={setGoalIndex} newGoalTrigger={newGoalTrigger} today={today}/>);
            }
            
            setGoalsInsert(() => <>{resultArr}</>);
        }
        )
    }

    
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

    
    function toggleNewGoal(){
        setDisplayNewGoal(state => !state);
        if (!displayNewGoal) {
            setNewGoalName('');
            setNewGoalText('');
            setNewGoalPublic(false);
        }
        return true;
    }

    function saveGoal() {
        let newGoal = new Goal(newGoalName, newGoalText, newGoalPublic);
        let tempIndex;
        localStorage.setItem(newGoal.goalID, JSON.stringify(newGoal));
        new Promise((resolve) => {
            let temp = goalindex;
            if (temp == null || (temp.length == 1 && temp[0] == null)) {
                temp = [newGoal.goalID];
            }
            else {
                temp.push(newGoal.goalID);
            }
            tempIndex = temp;
            setGoalIndex(temp)
            let temp2 = goalsInsert.props.children;
            temp2.push(<Testing key={newGoal.goalID} goalObj={newGoal} setNewGoalTrigger={setNewGoalTrigger}
            setNumGoals={setNumGoals} setGoalIndex={setGoalIndex} newGoalTrigger={newGoalTrigger} today={today}/>);
            resolve(setGoalsInsert(<>{temp2}</>));
        }).then(() => localStorage.setItem('goalindex', JSON.stringify(tempIndex)))
        .then(() => toggleNewGoal())
        .then(() => setNewGoalTrigger((state) => (!state)))
        .then(console.log(newGoalTrigger + "triggered"));
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
                                <h3><label for="goal_input">Edit here:</label></h3>
                                <input id="goal_input" name="goal1name" type="text" placeholder="Name"
                                 onChange={(e) => setNewGoalName(e.target.value)}></input>
                                <br />
                                <textarea wrap="hard" id="goal_input" name="goalnew" form="goalnew_form"
                                 onChange={(e) => setNewGoalText(e.target.value)}>Describe your goal here </textarea>
                            </div>
                            <div>
                                <label for="publicbox">Public?</label>
                                <input type="checkbox" id="publicbox" name="goalnewpublic" onClick={() => setNewGoalPublic(!newGoalPublic)}/>
                            </div>
                            <div>
                                {/* May need to change save button type later */}
                                <button className="btn btn-warning" type="button" onClick={saveGoal}>Save</button>
                                <button className="btn btn-warning" type="reset" onClick={toggleNewGoal}>Cancel</button>
                            </div>
                        </form>
                        <div>
                            <h4>Goal Suggestions</h4>
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
                        <tbody>
                        {goalsInsert}
                        </tbody>
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
                        <tr>
                            <td>
                                <i className="bi bi-hand-thumbs-up"></i>
                            </td>
                            <td>
                                Suzie made a goal to eat more Styrofoam!
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className="bi bi-check2-circle"></i>
                            </td>
                            <td>
                                Johnnie climbed Mt. Everest!
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <i className="bi bi-check2-circle"></i>
                            </td>
                            <td>
                                Mr. Potatohead started a pizza company.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </>
    );
}