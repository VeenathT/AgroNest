import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container, Button } from '@material-ui/core';
import SearchBar from './SearchBar';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

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

  const ArticlePDF = ({ title, content }) => (
    <Document>
      <Page>
        <Text>{content}</Text>
      </Page>
    </Document>
  );

  return (
    <Container>
      <div style={{ padding: '20px', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Typography variant="h4" style={{ marginBottom: '20px', color: '#4CAF50' }}>Articles</Typography>
        <Grid container spacing={3}>
          {filteredArticles.map((article, index) => (
            <Grid item key={article._id} xs={12} sm={6} md={6} lg={6}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                  <PDFDownloadLink
                    document={<ArticlePDF title={article.title} content={article.content} />}
                    fileName={`${article.title}.pdf`}
                  >
                    {({ loading }) => (
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                        disabled={loading}
                      >
                        {loading ? 'Loading document...' : 'Download PDF'}
                      </Button>
                    )}
                  </PDFDownloadLink>
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
