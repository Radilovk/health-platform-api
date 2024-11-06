import React from 'react';

function Profile() {
    const userName = "User Name";
    return (
        <div id="profile-container" className="profile-container">
            <h2>Profile</h2>
            <p>Welcome, {userName}! Here is your profile information.</p>
        </div>
    );
}

export default Profile;
