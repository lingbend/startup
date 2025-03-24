import React from 'react';
import '/src/main.css';
import '/src/goals/list.css';
import '/src/goals/feed.css';

function Testing(props) {

    const [detailsToggle, setDetailsToggle] = React.useState(false);
    const [toggleText, setToggleText] = React.useState('more details');
    const [editToggle, setEditToggle] = React.useState(false);

    const [currGoalName, setCurrGoalName] = React.useState(props.goalObj.nameVar || '');
    const [currGoalText, setCurrGoalText] = React.useState(props.goalObj.text || '');
    const [currGoalPublic, setCurrGoalPublic] = React.useState(props.goalObj.publicVar || false);
    const [currGoalID, setCurrGoalID] = React.useState(props.goalObj.goalID || '');
    const [currGoalProg, setCurrGoalProg] = React.useState(props.goalObj.prog || 0);
    const [currGoalStreak, setCurrGoalStreak] = React.useState(props.goalObj.streak || []);


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

    const [newGoalName, setNewGoalName] = React.useState(props.goalObj.nameVar);
    const [newGoalText, setNewGoalText] = React.useState(props.goalObj.text);
    const [newGoalPublic, setNewGoalPublic] = React.useState(props.goalObj.publicVar);

    
    function onDetailsToggle(e) {
        if (toggleText == 'more details') {
            setToggleText('less details');
        }
        else {
            setToggleText('more details');
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



    function saveGoal() {
        new Promise((resolve) => {
            setCurrGoalName(newGoalName);
            console.log(currGoalName + "new goal name");
            setCurrGoalText(newGoalText);
            setCurrGoalPublic(newGoalPublic);
            resolve(newGoalName, newGoalText, newGoalPublic);
        }).then(updateGoal)
        .then(onEditToggle);
    }

    


    function updateGoal() {
        let newGoalObj = props.goalObj;
        newGoalObj.nameVar = newGoalName;
        newGoalObj.text = newGoalText;
        newGoalObj.publicVar = newGoalPublic;
        newGoalObj.prog = currGoalProg;
        newGoalObj.streak = currGoalStreak;
        console.log(newGoalObj.goalID + "goalID");
        console.log(JSON.stringify(newGoalObj));
        localStorage.setItem(newGoalObj.goalID, JSON.stringify(newGoalObj));
    }



    return (
        <tr>
            <td>
                <form id="goal1check" method="post">
                    <input name="goal1check" id="checkoff" type="checkbox" aria-label="Checkoff Goal 1"/>
                </form>
            </td>
            <td>
                <div className="progress" style={{height:"5px"}}>
                    <div className="progress-bar bg-info" style={{width:"50%"}}></div>
                </div>
            </td>
            <td>
                <svg width="32" height="32">
                    <path d="M29 16 A13 13 0 1 1 29 15" stroke="orange" fill="none" strokeWidth="5">progress</path>
                </svg>
            </td>
            <td>
                <div>
                    <h3>{currGoalName}</h3>
                    <p>{currGoalText} <br hidden={!detailsToggle}/><a className="link-info" onClick={onDetailsToggle}>{toggleText}</a></p>
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
                            <textarea wrap="hard" id="goal_input" name="goal1" form="goal1_form" onChange={(e) => setNewGoalText(e.target.value)}>{currGoalText}</textarea>
                        </div>
                        <div>
                            <label for="publicbox" >Public?</label>
                            <input type="checkbox" id="publicbox" name="goal1public" onClick={() => setNewGoalPublic(!newGoalPublic)} checked={currGoalPublic}/>
                        </div>
                        <div>
                            <button className="btn btn-warning" type="button" onClick={saveGoal}>Save</button>
                            <button className="btn btn-warning" type="reset" onClick={onEditToggle}>Cancel</button>
                            <button className="btn btn-warning" type="button">Delete</button>
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
    }, [goalindex, numGoals, newGoalTrigger]);




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
                resultArr.push(<Testing key={(temp2[i]).goalID} goalObj={(temp2[i])}/>);
            }
            
            setGoalsInsert(<>{resultArr}</>);
        }
        )
    }

    
    function Goal(name, text, publicVar) {        
        this.nameVar = name;
        this.text = text;
        this.publicVar = publicVar;
        this.creationDate = today();
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
    }

    async function saveGoal() {
        let newGoal = new Goal(newGoalName, newGoalText, newGoalPublic);
        localStorage.setItem(newGoal.goalID, JSON.stringify(newGoal));
        const prom = new Promise((resolve) => {
            let temp = goalindex;
            if (temp == null || (temp.length == 1 && temp[0] == null)) {
                temp = [newGoal.goalID];
            }
            else {
                temp.push(newGoal.goalID);
            }
            setGoalIndex(temp);
            resolve('true');
        });
        prom.then(() => localStorage.setItem('goalindex', JSON.stringify(goalindex)))
        .then(toggleNewGoal());
        setNewGoalTrigger((state) => !state);
    }

    function today() {
        const day = new Date();
        let todayString = day.toDateString();
        return todayString;
    }




    return (
        <>
            <h2>{props.userName}'s Goals</h2>
            <p>{goalindex}</p>
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
                        <tr>
                            <td>
                                <form id="goal2check" method="post">
                                    <input name="goal2check" id="checkoff" type="checkbox" aria-label="Checkoff Goal 2"/>
                                </form>
                            </td>
                            <td>
                                <div className="progress" style={{height:"5px"}}>
                                    <div className="progress-bar bg-info" style={{width:"50%"}}></div>
                                </div>
                            </td>
                            <td>
                                <svg width="32" height="32">
                                    <path d="M29 16 A13 13 0 0 1 16 29" stroke="orange" fill="none" strokeWidth="5">progress</path>
                                </svg>
                            </td>
                            <td>
                                <div>
                                    <h3>Goal 2 Name</h3>
                                    <p>This goal has these details <a className="link-info" href="">more details</a></p>
                                </div>
                                <div hidden>
                                    <a className="link-info" href="">Edit</a>
                                </div>
                                <div hidden>
                                    <form id="goal2_form" method="post">
                                        <div>
                                            <h3><label for="goal_input">Edit here:</label></h3>
                                            <input id="goal_input" name="goal2name" type="text" placeholder="Goal 2 Name"></input>
                                            <br />
                                            <textarea wrap="hard" id="goal_input" name="goal2" form="goal2_form">This goal has these details. </textarea>
                                        </div>
                                        <div>
                                            <label for="publicbox">Public?</label>
                                            <input type="checkbox" id="publicbox" name="goal2public"/>
                                        </div>
                                        <div>
                                            <button className="btn btn-warning" type="submit">Save</button>
                                            <button className="btn btn-warning" type="reset">Cancel</button>
                                            <button className="btn btn-warning" type="button">Delete</button>
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

                        <tr>
                            <td>
                                <form id="goal3check" method="post">
                                    <input name="goal3check" id="checkoff" type="checkbox" aria-label="Checkoff Goal 3"/>
                                </form>
                            </td>
                            <td>
                                <div className="progress" style={{height:"5px"}}>
                                    <div className="progress-bar bg-info" style={{width:"50%"}}></div>
                                </div>
                            </td>
                            <td>
                                <svg width="32" height="32">
                                    <path d="M29 16 A13 13 0 0 1 3 16" stroke="orange" fill="none" strokeWidth="5">progress</path>
                                </svg>
                            </td>
                            <td>
                                <div hidden>
                                    <h3>Goal 3 Name</h3>
                                    <p>This goal has these details <a className="link-info" href="">more details</a></p>
                                </div>
                                <div hidden>
                                    <a className="link-info" href="">Edit</a>
                                </div>
                                <div>
                                    <form id="goal3_form" method="post">
                                        <div>
                                            <h3><label for="goal_input">Edit here:</label></h3>
                                            <input id="goal_input" name="goal3name" type="text" placeholder="Goal 3 Name"></input>
                                            <br />
                                            <textarea wrap="hard" id="goal_input" name="goal3" form="goal3_form">This goal has these details. </textarea>
                                        </div>
                                        <div>
                                            <label for="publicbox">Public?</label>
                                            <input type="checkbox" id="publicbox" name="goal3public"/>
                                        </div>
                                        <div>
                                            <button className="btn btn-warning" type="submit">Save</button>
                                            <button className="btn btn-warning" type="reset">Cancel</button>
                                            <button className="btn btn-warning" type="button">Delete</button>
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