import React from 'react';
import '/src/main.css';

export function Goals() {
    return (
        <>
            <h2>Username's Goals</h2>
            <div>
                <iframe src="/src/goals/goal_list.html" title="My Goals" width="68.1%" height="600"></iframe>
            </div>
            <br />
            <br />
            <h2>Feed</h2>
            <div>
                <iframe src="/src/goals/goal_feed.html" title="Goal Feed" width="68.1%" height="300"></iframe>
            </div>
        </>
    );
}