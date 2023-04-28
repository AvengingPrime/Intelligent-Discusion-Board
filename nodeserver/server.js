const apicalls = require('./apiCalls');
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const IP_ADDRESS = '0.0.0.0';
app.listen(PORT, IP_ADDRESS, { backlog: 100, timeout: 120000 }, () => {
    console.log(`Server listening on port ${PORT}`);
});


const { insertUser } = require('./apiCalls');
app.use(morgan('combined'));

app.use(cors());
//TODO make sure there is a confirmation system so someone cannot spam create accounts
app.post('/insertUser/:userID/:username/:email/:userType', (req, res) => {
    const { userID, username, email, userType } = req.params;

    apicalls.insertUser(userID, username, email, userType, (err, result) => {
        if (err) {
            console.error(err + "\n");
            res.status(500).send(err + "\n");
        } else {
            res.status(201).send('Request received');
        }
    });
});

app.post('/insertThread/:sectionID/:userID/:threadType/:title/:text', (req, res) => {
    const { sectionID, userID, threadType, title, text } = req.params;
    apicalls.insertThread(sectionID, userID, threadType, title, text, (err) => {
      if (err) {
        console.error(err+"\n");
        res.status(500).send(err+"\n");
      } else {
        res.send(JSON.parse("REQUEST RECEIVED"))
        res.status(201).send('Request received');
      }
    });
  });

app.get('/getReply/:replyID', (req, res) => {
    const replyID = req.params.replyID;
    apicalls.getReply(replyID, (err, reply) => {
        if (err) {
            res.status(500).send('Error fetching reply');
        } else {
            if (reply != null)
                res.send(JSON.parse(JSON.stringify(reply)));
            else
                res.status(404).send('Error reply not found');
        }
    });
});

app.get('/getSection/:sectionID', (req, res) => {
    const sectionID = req.params.sectionID;
    apicalls.getSection(sectionID, (err, reply) => {
        if (err) {
            res.status(500).send('Error fetching section');
        } else {
            if (reply != null)
                res.send(JSON.parse(JSON.stringify(reply)));
            else
                res.status(404).send('Error reply not found');
        }
    });
});

app.get('/getThread/:threadID', (req, res) => {
    const threadID = req.params.threadID;
    apicalls.getThread(threadID, (err, thread) => {
        if (err) {
            res.status(500).send('Error fetching thread');
        } else {
            if (thread != null) {
                console.log(JSON.parse(JSON.stringify(thread)));
                res.send(JSON.parse(JSON.stringify(thread)));

            }
            else
                res.status(404).send('Error thread not found');
        }
    });
});



app.get('/getUser/:userID', (req, res) => {
    const userID = req.params.userID;
    apicalls.getUser(userID, (err, reply) => {
        if (err) {
            res.status(500).send('Error fetching reply');
        } else {
            if (reply != null)
                res.send(JSON.parse(JSON.stringify(reply)));
            else
                res.status(404).send('Error reply not found');
        }
    });
});

app.get('/getSectionsOfStudent/:userID', (req, res) => {
    const userID = req.params.userID;
    apicalls.getSectionsOfStudent(userID, (err, reply) => {
        if (err) {
            res.status(500).send('Error fetching reply');
        } else {
            if (reply != null)
                res.send(JSON.parse(JSON.stringify(reply)));
            else
                res.status(404).send('Error reply not found');
        }
    });
});


app.get('/getThreadForSection/:sectionID', (req, res) => {
    const sectionID = req.params.sectionID;
    apicalls.getThreadForSection(sectionID, (err, thread) => {
        if (err) {
            res.status(500).send('Error fetching thread');
        } else {
            if (thread != null)
                res.send(JSON.parse(JSON.stringify(thread)));
            else
                res.status(404).send('Error thread not found');
        }
    });
});


app.get('/getThreadReplies/:threadID', (req, res) => {
    const threadID = req.params.threadID;
    apicalls.getThreadReplies(threadID, (err, thread) => {
        if (err) {
            res.status(500).send('Error fetching reply');
        }
        else {
            if (thread != null)
                res.send(thread);
            else
                res.status(404).send('Error thread replies not found');
        }
    });
});

app.get('/getTopLevelReplies/:threadID', (req, res) => {
    const threadID = req.params.threadID;
    apicalls.getTopLevelReplies(threadID, (err, thread) => {
        if (err) {
            res.status(500).send('Error fetching reply');
        }
        else {
            if (thread != null)
                res.send(thread);
            else
                res.status(404).send('Error thread replies not found');
        }
    });
});

app.get('/getSubReplies/:replyID', (req, res) => {
    const replyID = req.params.replyID;
    apicalls.getSubReplies(replyID, (err, thread) => {
        if (err) {
            res.status(500).send('Error fetching reply');
        }
        else {
            if (thread != null)
                res.send(thread);
            else
                res.status(404).send('Error thread replies not found');
        }
    });
});

app.get('/test', (req, res) => {
    res.send('This is an empty endpoint!');
});

apicalls.getThread('0000000001', (err, thread) => {
    if (err) {
        console.log("loser");
    } else {
        console.log("winner winner chicken dinner");
    }
});