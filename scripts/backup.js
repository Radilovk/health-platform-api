// Script to automate backup of the database to protect user data.
const fs = require('fs');
const path = require('path');
const tryBackup = async () => {
    const backupResponse = await fc.copy('database/current.db.back.zip', 'path/to/backup/directory');
    console.log('Backup completed successfully.');
};
tryBackup();