import React from 'react';

function Plan() {
    const dietPlan = "Your personalized diet plan will appear here.";
    return (
        <div id="plan-container" className="plan-container">
            <h2>Your Diet Plan</h2>
            <p>{dietPlan}</p>
        </div>
    );
}

export default Plan;
