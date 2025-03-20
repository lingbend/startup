import React from 'react';
import '/src/main.css';
import '/src/goals/list.css';
import '/src/goals/feed.css';


export function Goals(props) {
    return (
        <>
            <h2>{props.userName}'s Goals</h2>
            <div>
                {/* <iframe src="/src/goals/goal_list.html" title="My Goals" width="68.1%" height="600"></iframe> */}
                <div className="bg-dark text-light container-fluid goal-list">
                    {/* <div> */}
                    <button className="btn btn-warning" type="button">New Goal</button>
                    <div hidden>
                        <form id="goalnew_form" method="post">
                            <div>
                                <h3><label for="goal_input">Edit here:</label></h3>
                                <input id="goal_input" name="goal1name" type="text" placeholder="Name"></input>
                                <br />
                                <textarea wrap="hard" id="goal_input" name="goalnew" form="goalnew_form">Describe your goal here </textarea>
                            </div>
                            <div>
                                <label for="publicbox">Public?</label>
                                <input type="checkbox" id="publicbox" name="goalnewpublic"/>
                            </div>
                            <div>
                                <button className="btn btn-warning" type="submit">Save</button>
                                <button className="btn btn-warning" type="reset">Cancel</button>
                                <button className="btn btn-warning" type="button">Nest/Unnest Goal</button>
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
                        <tr>
                            <th scope="col">Daily Check</th>
                            <th scope="col">Streak</th>
                            <th scope="col">Progress</th>
                            <th scope="col">Goal</th>
                        </tr>
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
                                    <path d="M29 16 A13 13 0 1 1 29 15" stroke="orange" fill="none" stroke-width="5">progress</path>
                                </svg>
                            </td>
                            <td>
                                <div>
                                    <h3>Goal 1 Name</h3>
                                    <p>This goal has these details. <br/><a className="link-info" href="">less details</a></p>
                                </div>
                                <div>
                                    <h4>Nested Goals</h4>
                                    <ul>
                                        <li>Goal 3 Name</li>
                                    </ul>
                                    <a className="link-info" href="">Edit</a>
                                </div>
                                <div hidden>
                                    <form id="goal1_form" method="post">
                                        <div>
                                            <h3><label for="goal_input">Edit here:</label></h3>
                                            <input id="goal_input" name="goal1name" type="text" placeholder="Goal 1 Name"></input>
                                            <br />
                                            <textarea wrap="hard" id="goal_input" name="goal1" form="goal1_form">This goal has these details. </textarea>
                                        </div>
                                        <div>
                                            <label for="publicbox">Public?</label>
                                            <input type="checkbox" id="publicbox" name="goal1public"/>
                                        </div>
                                        <div>
                                            <button className="btn btn-warning" type="submit">Save</button>
                                            <button className="btn btn-warning" type="reset">Cancel</button>
                                            <button className="btn btn-warning" type="button">Nest/Unnest Goal</button>
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
                                    <path d="M29 16 A13 13 0 0 1 16 29" stroke="orange" fill="none" stroke-width="5">progress</path>
                                </svg>
                            </td>
                            <td>
                                <div>
                                    <h3>Goal 2 Name</h3>
                                    <p>This goal has these details <a className="link-info" href="">more details</a></p>
                                </div>
                                <div hidden>
                                    <h4>Nested Goals</h4>
                                    <ul>
                                        <li>Goal 5</li>
                                    </ul>
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
                                            <button className="btn btn-warning" type="button">Nest/Unnest Goal</button>
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
                                    <path d="M29 16 A13 13 0 0 1 3 16" stroke="orange" fill="none" stroke-width="5">progress</path>
                                </svg>
                            </td>
                            <td>
                                <div hidden>
                                    <h3>Goal 3 Name</h3>
                                    <p>This goal has these details <a className="link-info" href="">more details</a></p>
                                </div>
                                <div hidden>
                                    <h4>Nested Goals</h4>
                                    <ul>
                                        <li>None</li>
                                    </ul>
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
                                            <button className="btn btn-warning" type="button">Nest/Unnest Goal</button>
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
                    </table>
                    {/* </div> */}
                </div>
            </div>
            <br />
            <br />
            <h2>Feed</h2>
            <div>
                {/* <iframe src="/src/goals/goal_feed.html" title="Goal Feed" width="68.1%" height="300"></iframe> */}
                <div className="feed">
                    <div>
                    <table>
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
                    </table>
                    </div>
                </div>
            </div>
        </>
    );
}