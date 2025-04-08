import React from 'react';
import {Fragment} from 'react';
import '/src/main.css';
import '/src/goals/list.css';
import '/src/goals/feed.css';
import {GoalItem} from '/src/goals/goalsItem.jsx';
import {GoalWrapper} from '/src/goals/goalsWrapper.jsx';
import {FeedWrapper} from '/src/goals/feedWrapper.jsx';

export function Goals(props) {

    const [displayNewGoal, setDisplayNewGoal] = React.useState(true);
    const [newGoalName, setNewGoalName] = React.useState('Name');
    const [newGoalText, setNewGoalText] = React.useState('Insert text here');
    const [newGoalPublic, setNewGoalPublic] = React.useState(false);
    const [goalindex, setGoalIndex] = React.useState(()=>{
        let localgoalindex = localStorage.getItem('goalindex');
        if (localgoalindex != "undefined" && localgoalindex != "null" && localgoalindex) {
            return JSON.parse(localgoalindex);
        }
        else {
            return [-1];
        }});
    const [goalsInsert, setGoalsInsert] = React.useState(<Fragment>[]</Fragment>);
    const [numGoals, setNumGoals] = React.useState(goalindex ? goalindex.length : 0);
    const [goalSuggestion, setGoalSuggestion] = React.useState("placeholder")
    const [suggestionGetter, setSuggestionGetter] = React.useState();

    React.useEffect(() => {
        fetch('/api/goals/index', {
            method: 'GET',
            headers: {
                'Content-type':'application/json'
            }}).then(response => {
                if (response?.status == 200) {
                    return response;
                }
                else {
                }
            }).then((response) => response.json())
            .then((jsonResponse) => {
                setNumGoals(jsonResponse.goalindex.length);
                setGoalIndex(jsonResponse.goalindex);
                localStorage.setItem('goalindex', jsonResponse.goalindex);
                localStorage.setItem('nextGoalID', jsonResponse.nextGoalID);
            });
    }, []);

    

    React.useEffect(() => {
        localStorage.setItem('goalindex', JSON.stringify(goalindex));
    }, [goalindex]);

    function Goal(nameVar, text, publicVar) {        
        this.nameVar = nameVar;
        this.text = text;
        this.publicVar = publicVar;
        this.creationDate = new Date();
        this.goalID = localStorage.getItem('nextGoalID');
        this.prog = 0;
        this.streak = [];
    }

    React.useEffect(() => {
        resetGoalsDom();
     }, [goalindex]);
 
     async function resetGoalsDom(){
         let insert = <Fragment>{((await GoalsInsertFunc()).props.children)}</Fragment>;
         setGoalsInsert(insert);
     };

    async function GoalsInsertFunc() {
        let temp = [];
        let promises = [];
        let goals = await getGoalsFromServer();
        
        
        return await new Promise((resolve) => {
            for (let i = 0; i < numGoals; i++) {
                let id = String(goalindex[i]);
                const getData = new Promise ((resolve) => {
                    let val = goals?.[id];
                    resolve(val);
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
                resultArr.push(<GoalItem key={(temp2[i]).goalID} goalObj={(temp2[i])} setNumGoals={setNumGoals} setGoalIndex={setGoalIndex} today={today}/>);
            }
            
            return (<Fragment>{resultArr}</Fragment>);
        }
        )
    }

    async function getGoalsFromServer() {
        let response = await fetch('/api/goals', {
            method: 'GET', 
            headers: {
                'Content-type':'application/json'
            }})
            .then((response) => {
                if (response?.status == 200) {
                    return response;
                }
                else {
                }
            }).then((response) => response.json())
            .then((jsonResponse) => {
                return jsonResponse.goalList;
            });
        return response;
    }

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

                    let formattedQuotes = [];
                    let quotesResponse = await fetch("https://thequoteshub.com/api/");
                    let jsonQuotes = await quotesResponse.json();
                    let author = jsonQuotes?.["author"];
                    let quote = jsonQuotes?.["text"];

                    formattedQuotes.push(quote + " - " + author);
      
                    let answer = await new Promise((resolve)=>{

                        let goal = formattedQuotes[0];
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

    
    function toggleNewGoal(){
        setDisplayNewGoal(state => !state);
        if (!displayNewGoal) {
            setNewGoalName('');
            setNewGoalText('');
            setNewGoalPublic(false);
        }
        suggestionGetter.timer();
        return true;
    }

    function saveGoalWrapper() {
        let newGoal = new Goal(newGoalName, newGoalText, newGoalPublic);

        setDisplayNewGoal(state => !state);

        saveGoal(newGoal);
    }

    async function saveGoal(newGoal) {
        let response = await saveGoalToServer(newGoal);
        let tempIndex = response?.goalindex;

        await new Promise((resolve) => {
            localStorage.setItem('goalindex', JSON.stringify(tempIndex));
            let tempInsert = goalsInsert.props.children;
            tempInsert.push(<GoalItem key={newGoal.goalID} goalObj={newGoal} setNumGoals={setNumGoals} setGoalIndex={setGoalIndex} today={today}/>);
            resolve(setGoalsInsert(<Fragment>{tempInsert}</Fragment>));});
        setNewGoalName('');
        setNewGoalText('');
        setNewGoalPublic(false);
        if (response?.status == 200) {
            localStorage.setItem('nextGoalID', jsonResponse.nextGoalID);
            setNumGoals(tempIndex?.length);
            setGoalIndex(tempIndex);
        }
    }

    async function saveGoalToServer(newGoal) {
        let response = await fetch('/api/goals/'+newGoal.goalID, {
            method: 'POST', 
            body: JSON.stringify({
                goal: {
                    nameVar: newGoal.nameVar,
                    text: newGoal.text,
                    publicVar: newGoal.publicVar,
                    creationDate: newGoal.creationDate,
                    goalID: newGoal.goalID,
                    prog: newGoal.prog,
                    streak: newGoal.streak,
                }
            }),
            headers: {
                'Content-type':'application/json'
            },})
            if (response?.status == 200) {
            }

            let jsonResponse = await response.json();

            if (response?.status == 400) {
                return await new Promise((resolve) => resolve(jsonResponse)).then( (jsonResponse) => {
                    localStorage.setItem('nextGoalID', jsonResponse.nextGoalID);
                    newGoal.goalID = jsonResponse.nextGoalID;
                    return saveGoalToServer(newGoal)});
            }
            else if (response?.status != 200) {
                return;
            }

        return jsonResponse;
    }

    function today() {
        const day = new Date();
        let todayString = day.toDateString();
        return todayString;
    }

    async function getJSON(response) {
        let jsonResponse = await response.json();
        return jsonResponse;
    }

    return (
        <>
            <h2>{props.userName}'s Goals</h2>
            <div>
                <div className="bg-dark text-light container-fluid goal-list">
                    <button className="btn btn-warning" type="button" onClick={toggleNewGoal}>New Goal</button>
                    <div hidden={displayNewGoal} className="new-goal">
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
                                <button className="btn btn-warning" type="reset" onClick={saveGoalWrapper}>Save</button>
                                <button className="btn btn-warning" type="reset" onClick={toggleNewGoal}>Cancel</button>
                            </div>
                        </form>
                        <div>
                            <h4>Inspiration</h4>
                            <ul>
                                <li>{goalSuggestion}</li>
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
                        <GoalWrapper resultArr={goalsInsert}/>
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