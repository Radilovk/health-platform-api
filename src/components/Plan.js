import React from 'react';

const Plan = () => {
    const planDetails = "Your personalized health plan details go here.";

    return (
        <div id="plan-container" className="plan-container">
            <h2>Your Health Plan</h2>
            <p>{planDetails}</p>
        </div>
    );
};

export default Plan;
