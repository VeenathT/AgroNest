import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@material-ui/core';
import SearchBar from './SearchBar';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8070/api/articles')
      .then(res => {
        setArticles(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>Articles:</h2>
      {filteredArticles.map(article => (
        <Card key={article._id} style={{ marginBottom: '20px', maxWidth: '600px' }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {article.title}
            </Typography>
            <Typography color="textSecondary">
              {new Date(article.date).toLocaleString()}
            </Typography>
            <Typography variant="body2" component="p">
              {article.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ArticleList;
