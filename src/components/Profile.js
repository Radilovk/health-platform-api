import React from 'react';

const Profile = () => {
    const userName = "User's Name";  // Initialize const variables properly
    const userGoal = "User's goal for health and fitness";

    return (
        <div id="profile-container" className="profile-container">
            <h2>{userName}'s Profile</h2>
            <p>Goal: {userGoal}</p>
        </div>
    );
};

export default Profile;
