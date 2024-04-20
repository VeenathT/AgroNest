import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container } from '@material-ui/core';
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
    <Container>
      <div style={{ padding: '20px', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Typography variant="h4" style={{ marginBottom: '20px', color: '#4CAF50' }}>Articles</Typography>
        <Grid container spacing={3}>
          {filteredArticles.map(article => (
            <Grid item key={article._id} xs={12}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom style={{ color: '#4CAF50' }}>
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
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default ArticleList;
