import express from 'express';
import bodyparser from 'body-parser';

const app = express();
const port = 3000;
// run app : npx babel-node src/server.js
app.use(bodyparser.json());

const articleInfo = {
  'learn-react': {
    upvotes: 0,
    comments: [],
  },
  'learn-node': {
    upvotes: 0,
    comments: [],
  },
  'my-thought-on-resumes': {
    upvotes: 0,
    comments: [],
  },
};

// post upvotes
app.post('/api/articles/:name/upvote', (req, res) => {
  const name = req.params.name;
  if (articleInfo[name]) {
    res
      .status(200)
      .send(`${name} now has ${(articleInfo[name].upvotes += 1)} upvotes`);
  } else {
    res.status(400).send('Name not found');
  }
});

// post comments
app.post('/api/articles/:name/add-comment', (req, res) => {
  const articleName = req.params.name;
  const commentList = articleInfo[articleName].comments;
  const { username, text } = req.body;

  if (articleInfo[articleName]) {
    commentList.push({ username, text });
    res.status(200).send(articleInfo[articleName]);
  } else {
    res.send('Article not found');
  }
});
app.listen(port, () => {
  console.log('Server is running at port 3000');
});
