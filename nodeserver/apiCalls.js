//2 Types student, professor for user
//3 types in section to include TA
//Threads should not get deleted
//TA should not be able to add more instructors
//TA should not be able to add students course
//TA moderation capabilities
const validUserTypeSet = new Set(['professor','student']);

var mysql      = require('mysql');
//TODO: get correct db login info
var connection = mysql.createConnection({
    host: "10.176.67.70",
    user: "team7",
    password: "idb",
    database:"IntelligentDiscussionBoard"
});


connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database!');
  }
});

/*If username or email is already in database return failure
   @param userID the primary key of the user being inserted
   @param username the username of the user
   @param email the "email address of the user"
   @param userType the type of user (administrator professor, student)
 */
//Note there needs to be a spin lock or MUTEX  mechanism of sort that forces users to be made 1 at a time
// so that its guaranteed everyone has a unique primary key
function insertUser(userID, username, email, userType, callback) {
    //Checks if the username or email already exists
    const checkDuplicatesSql = 'SELECT COUNT(*) as count FROM USER WHERE username = ? OR email = ?';
    const checkDuplicatesValues = [username, email];
    //This is the query that runs if not
    const insertUserSql = 'INSERT INTO USER (userID ,username, email, userType) VALUES (?, ?, ?, ?)';
    const insertUserValues = [userID, username, email, userType];
    const USER_ID_LENGTH = 10;
    const USERNAME_MIN_LENGTH = 5;
    //check if username is too short
    if(username.length < USERNAME_MIN_LENGTH)
    {
        callback("username is too short");
        return;
    }
    if(userID.length != USER_ID_LENGTH)
    {
        callback("userID is invalid length");
        return;
    }
    if(!validUserTypeSet.has(userType) )
    {
        callback("invalid userType");
        return;
    }
    // Check if the username or email already exists in the database
    connection.query(checkDuplicatesSql, checkDuplicatesValues, (error, results, fields) => {
        if (error) {
            callback(error.message);
            return;
        }

        const count = results[0].count;
        if (count > 0) {
            callback('Username or Email already exists');
            return;
        }

        // Insert the new user into the database
        connection.query(insertUserSql, insertUserValues, (error, results, fields) => {
            if (error) {
                console.error(error.message);
                return;
            }
            callback(`New user added with ID: ${results.insertId}`);
        });
    });
}

/*Deletes a User from the USER table
   @param userID the primary key of the user being deleted
 */
/*potential TODO: make it so user has the potential to restore a thread within 24 hours and instead move deleted to a different table until the 24 hours are up
//TODO: delete replies to the threads
 unless thread was deleted by admin then its the admins choice
*/
function deleteUser(userID, callback) {
    const sql = `DELETE FROM USER WHERE userID = ${userID}`;
    connection.query(sql, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
        }
    });
}



/*Changes the permission aka userType of a user
  NOTE: DO NOT USE THIS WITHOUT CHECKING PROPER PERMISSION BEFORE USE
   @param email the email of user ->
        NOTE: this can be changed to something else in the future if you wish to
        get user with primary key that can easily be changed
   @param newUserType the new type for the user
   @param callback returns if the update was successful or failure
 */
//TODO: make a hashSet that contains all valid userType to check if the sent userType is in said hashSet
function changeUserType(userID, newUserType, callback) {
    // first, check if the userID exists in the database
    const query = 'SELECT * FROM USER WHERE userID = ?';
    connection.query(query, [userID], (err, results) => {
        if (err) {
            callback(err);
        } else if (results.length === 0) {
            callback('userID not found in database');
        } else if(validUserTypeSet.has(newUserType)){
            
            // email exists, update the username
            const updateQuery = 'UPDATE USER SET userType = ? WHERE userID = ?';
            connection.query(updateQuery, [newUserType, userID], (updateErr, updateResults) => {
                if (updateErr) {
                    callback(updateErr);
                } else {
                    callback(null, 'userType updated successfully');
                }
            });
        }
        else
          callback('Not legal userType');
    });
}

/*Creates a new thread if a thread with the same title does not exist
   Note: timestamp being used is current timestamp
   @param threadID the primary key of the thread
   @param userID the userID of the poster of the thread
   @param threadType the type the thread is
   @param title the title of thread
   @param text the text of the thread
 */
//Note there needs to be a spin lock or MUTEX mechanism of sort that forces new threads to come in one at a time
// so that its guaranteed every thread has a unique id
function insertThread(threadID, userID, threadType, title, text) {
    //Checks if thread with same title already exists
    const checkDuplicatesSql = 'SELECT COUNT(*) as count FROM THREAD WHERE title = ?;'
    const checkDuplicatesValues = [title];
    //This is the query that runs if not
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const insertThreadSql = 'INSERT INTO THREAD (threadID, userID, ,currentTimestamp ,threadType, title, text) VALUES (?, ?, ?, ?, ?)';
    const insertThreadValues = [threadID, userID, currentTimestamp, threadType, title, text];
    // Check if the thread with same title already exists
    connection.query(checkDuplicatesSql, checkDuplicatesValues, (error, results, fields) => {
        if (error) {
            console.error(error.message);
            return;
        }

        const count = results[0].count;
        if (count > 0) {
            console.log('Thread with same title already exists');
            return;
        }

        // Insert the new thread into the database
        connection.query(insertThreadSql, insertThreadValues, (error, results, fields) => {
            if (error) {
                console.error(error.message);
                return;
            }
            console.log(`New Thread added with id: ${results.insertId}`);
        });
    });
}

/*Deletes a thread from the thread table
   @param threadID the primary key of the thread being deleted
 */
/*potential TODO: make it so user has the potential to restore a thread within 24 hours and instead move deleted to a different table until the 24 hours are up
//TODO: delete replies to the threads
 unless thread was deleted by admin then its the admins choice
*/
function deleteThread(threadId, callback) {
    const sql = `DELETE FROM THREAD WHERE ThreadID = ${threadId}`;
    connection.query(sql, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
            if(results != null)
            {
              const sql2 = `DELETE FROM REPLY WHERE ThreadID = ${threadId}`;
              connection.query(sql2, (error, results) => {
                if (error) {
                    callback(error);
                } else {
                  callback(null, results); 
                }
              });
            }
        }
    });
}
/* inserts a reply to a thread
Note: timestamp being used is current timestamp and every reply starts with
    0 up votes and 0 down votes
   @param replyID the primary key of the reply
   @param userID the userID of the poster of the thread
   @param threadRepID the id of the thread or reply being replied to
   @param replyType the type of reply
   @param text the text of the reply
 */

//Note there needs to be a spin lock or MUTEX mechanism of sort that forces new reply to come in one at a time
// so that its guaranteed every reply has a unique id
//DOUBLE NOTE: With the current schema I am kind of clueless on how to go about handling a reply to a reply
//potential TODO: either change the schema to better handle replies to replies or implement reply to reply
//ANOTHER POTENTIAL TODO:will have to make it check if the thread exists or userID exists possibly
function insertReply(replyId, userID, threadRepID, replyType, text) {
    //This is the query that runs if not
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const insertUserSql = 'INSERT INTO reply (replyId, userID, threadRepID, replyType, currentTimestamp, upVotes, downVotes, text) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const insertUserValues = [replyId, userID, threadRepID, replyType, currentTimestamp, 0 , 0, text];
    // Insert the new reply
    connection.query(insertUserSql, insertUserValues, (error, results, fields) => {
            if (error) {
                console.error(error.message);
                return;
            }
            console.log(`New Reply added with id: ${results.insertId}`);
    });
}

/*Deletes a reply from the reply table
   @param replyID the primary key of the reply being deleted
 */
/*potential TODO: make it so user has the potential to restore a reply within 24 hours and instead move deleted to a different table until the 24 hours are up
 unless reply was deleted by admin then its the admins choice
*/
function deleteReply(replyId, callback) {
    const sql = `DELETE FROM reply WHERE replyID = ${replyId}`;
    connection.query(sql, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
        }
    });
}

/* returns a reply given a replyID
* @param replyID the ID of the reply
* @param callback returns null on FAILURE returns the query on SUCCESS
* note that if you wish to get votes to use this function
*/
function getReply(replyID, callback)
{
    connection.query('SELECT * FROM REPLY WHERE ReplyID = ?', [replyID], function(error, results, fields) {
        if (error) {
            callback(error);
        } else {
            callback(null, results[0]);
        }
    });
}

/*returns if a given userID has voted to a thread if inputs are invalid return null
 *@param userID the name of the student
 *@param replyID the id of the reply
 */
function hasVotedToReply(userID, replyID, callback){
    const query = "SELECT * FROM UpVotes WHERE replyID = ? AND userID = ?";
    const params = [replyID, userID];

    // Run the query and check if any rows are returned
    connection.query(query, params, (err, rows) => {
        if (err) {
            console.error(err);
            return callback(err, false);
        }

        const exists = rows.length > 0;
        return callback(null, exists);
    });
}




/*Recursively finds all replies that belong to a given threadID in reply table
 *@param threadID is the ID of the thread your looking at
 *@param callback on success will be the data from query your looking for ON FAILURE it is NULL
 */
// TODO: REIMPLEMENT
function getThreadReplies(threadID, callback) {
    //Recursively find the replies that have a reply id to a thread id and replies that have a reply id to a reply id
    //to a thread id and so forth
     connection.query('SELECT * FROM REPLY WHERE ThreadID = ?', [threadID], function(error, results, fields) {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
        }
    });
}

/* gets a thread given the threadID
 *@param threadID the the ID of the thread you want to get
 *@param callback on error is null on success of the query it will be the row with the thread id in thread
 */
async function getThread(threadID, callback) {
    connection.query('SELECT * FROM THREAD WHERE threadID = ?', [threadID], function(error, results, fields) {
        if (error) {
            callback(error);
        } else {
            callback(null, results[0]);
        }
    });
}




/*Inserts a new section to the section table given a sectionID, userID, courseName, courseNumber, courseType, Description,
 and syllabus
 * @param sectionID the ID of section in CHAR(10)
 * @param userID the userID of the professor of the section
 * @param courseName the name of the course
 * @param courseType the type of course it is
 * @param description the text description of the course
 * @param syllabus the syllabus for the course in binary format
 */


//Potential TODO: check if sectionID already exists and make sure its simultaneous usage safe
function insertSection(sectionID, userID, courseName, courseNumber, courseType, description, syllabus) {
    //This is the query that runs if not
    const insertSectionSql = 'INSERT INTO section (sectionID, userID, courseName, courseNumber, courseType, Description, Syllabus) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const insertUserValues = [sectionID, userID, courseName, courseNumber, courseType, Description, Syllabus];
        // Insert the new section into the database
        connection.query(insertSectionSql, insertUserValues, (error, results, fields) => {
            if (error) {
                console.error(error.message);
                return;
            }
            console.log(`New Section added with id: ${results.insertId}`);
        });
}

//Gets Students in a section
function getStudentsInSection(sectionID,callback)
{
  const sql = `SELECT UserID FROM Section_Users WHERE SectionID = ${mysql.escape(sectionID)}`;
    connection.query(sql, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
        }
    });
}

/*Deletes a section from the section table
   @param sectionID the primary key of the section being deleted
 */
/*potential TODO: make it so user has the potential to restore a reply within 24 hours and instead move deleted to a different table until the 24 hours are up
*/
//TODO:if a section is deleted make sure to remove all students in section
function deleteSection(sectionID, callback) {
    const sql = `DELETE FROM section WHERE sectionID = ${sectionID}`;
    connection.query(sql, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
        }
    });
}



/* Insert a given user to a section
 * @param sectionID the ID of the section the user is being inserted to
 * @param userID the ID of the user being inserted into the section
 * @param userType the privilege level of the student for the class
 */
function insertUserToSection(sectionID, userID, userType) {
    //This is the query that runs if not
    const insertUserToSectionSql = 'INSERT INTO section_users (sectionID, userID, userType) VALUES (?, ?, ?)';
    const insertUserToSectionValues = [sectionID, userID, userType];
    // Insert the new section into the database
    connection.query(insertUserToSectionSql, insertUserToSectionValues , (error, results, fields) => {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log(`New User inserted to section added with id:`+ userID + ' to section '+ sectionID );
    });
}


/*Deletes a given user from a given section
*   @param sectionID the ID of the section of that the user is being removed from
*   @oaram userID the ID of the user being deleted from the section
*
*/
//potential TODO: ensure safe concurrent usage
function deleteUserFromSection(sectionID, userID, callback) {
    const sql = `DELETE FROM section_users WHERE sectionID = ${sectionID} AND userID =${userID}`;
    connection.query(sql, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
        }
    });
}


/* Insert a section document to the section_document table
 * @param sectionID the ID of the section the user is being inserted to
 * @param document the document in binary format being inserted
 * @param title the title of the document
 * @param desc the description of the document
 */
//TODO: ensure safe concurrent usage that and also fail to insert on duplicate documents
function insertSectionDocument(sectionID, document, title, desc) {
    //This is the query that runs if not
    const insertDoc= 'INSERT INTO section_users (sectionID, document, title, desc)) VALUES (?, ?, ?, ?)';
    const insertDocValues = [sectionID, document, title, desc];
    // Insert the new section into the database
    connection.query(insertDoc, insertDocValues  , (error, results, fields) => {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log(`New section document has been inserted`);
    });
}

/*Deletes a given section document
*   @param sectionID the ID of the section of that the user is being removed from
*   @oaram title the ID of the user being deleted from the section
*
*/
//potential TODO: ensure safe concurrent usage
function deleteSectionDocument(sectionID, title,  callback) {
    const sql = `DELETE FROM section_documents WHERE sectionID = ${sectionID} AND document_title =${title}`;
    connection.query(sql, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
        }
    });
}

/* Mutes a student
 * @param sectionID the ID of the section the user is being muted in
 * @param userID the ID of the user being muted
 * @param timeEnd a timestamp of when the user will be done with being mute
 */
//TODO: implement something that will remove student once its time to remove them
function muteStudent(sectionID, userID, timeEnd) {
    //This is the query that runs if not
    const insertUserToMute = 'INSERT INTO mutedStudents (sectionID, userID, timeEnd) VALUES (?, ?, ?)';
    const insertUserToMuteValues = [sectionID, userID, timeEnd];
    // Insert the new section into the database
    connection.query(insertUserToMute, insertUserToMuteValues , (error, results, fields) => {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log(`User with the userID:`+ userID + ' has been muted');
    });
}

/* unmutes a student from a section given sectionID and the student
*   @param sectionID the ID of the section of that the user is being removed from
*   @oaram userID the ID of the user being deleted from the section
*
*/
//potential TODO: ensure safe concurrent usage and proper priveleges on usage
function unmuteStudent(sectionID, userID, callback) {
    const sql = `DELETE FROM mutedStudents WHERE sectionID = ${sectionID} AND userID =${userID}`;
    connection.query(sql, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
        }
    });
}
module.exports = {
    getThread: getThread,
    insertUser: insertUser,
    getReply: getReply
};


console.log("testing");
var result  =  null;
getThread('0000000004', (error, result) => {
  if (error) {
    console.error(error);
    
  }
  else
  {
    console.log(result);
  }
});



