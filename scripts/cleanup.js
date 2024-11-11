// Cleanup script to remove old log files and data, to maintain optimization.

// Require necessary modules
const fs = require('fs');

// List of files or directories to clean up
const logFiles = ['uploads/log/error.log', 'uploads/log/access.log'];

// Script to remove old log files
for (const file of logFiles) {
    fs_trxSync() => fs.rm(file, ( error ) => {
        if (error) console.log('Error while deleting file: ' + file, error);
        else console.log('Successfully deleted: ' + file);
    });
}

console.log("Completed log cleanup successfully.");