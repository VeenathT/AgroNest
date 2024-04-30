import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, IconButton, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from './SearchBar';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || title.length > 70 || /\d/.test(title)) {
      setFormError('Title should be less than 71 characters and cannot contain numbers.');
      return;
    }
    try {
      if (selectedArticle) {
        await axios.put(`http://localhost:8070/api/articles/${selectedArticle._id}`, { title, content });
      } else {
        await axios.post('http://localhost:8070/api/articles', { title, content });
      }
      setTitle('');
      setContent('');
      setSelectedArticle(null);
      setFormError(null);
      alert(selectedArticle ? 'Article updated successfully!' : 'Article added successfully!');
      fetchArticles(); // Update the articles after adding or updating
    } catch (err) {
      console.error('Error adding/updating article:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/articles/${id}`);
      setArticles(articles.filter(article => article._id !== id)); // Update articles state after deletion
      alert('Article deleted successfully!');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleUpdate = (article) => {
    setTitle(article.title);
    setContent(article.content);
    setSelectedArticle(article);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.length > 70 || /\d/.test(e.target.value)) {
      setFormError('Title should be less than 71 characters and cannot contain numbers.');
    } else {
      setFormError(null);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <div style={{ padding: '20px', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleSearch}
            margin="normal"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </div>
        <h2 style={{ color: '#4CAF50' }}>Add Article</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={handleTitleChange}
            fullWidth
            margin="normal"
            error={formError && !title}
            helperText={formError && <span style={{ color: 'red' }}>{formError}</span>}
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            {selectedArticle ? 'Update' : 'Add'}
          </Button>
        </form>
        <h2 style={{ color: '#4CAF50', marginTop: '20px' }}>Articles</h2>
        {filteredArticles.map((article) => (
          <Card key={article._id} style={{ marginBottom: '20px', backgroundColor: '#FFFFFF' }}>
            <CardContent>
              <Typography variant="h5" component="h2" style={{ color: '#4CAF50', maxWidth: '100%' }}>
                {article.title}
              </Typography>
              <Typography color="textSecondary">
                {new Date(article.date).toLocaleString()}
              </Typography>
              <Typography variant="body2" component="p">
                {article.content}
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(article._id)}>
                  <DeleteIcon />
                </IconButton>
                <Button variant="outlined" color="primary" onClick={() => handleUpdate(article)}>
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default ArticleForm;
