import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from './SearchBar';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);

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
    try {
      await axios.post('http://localhost:8070/api/articles', { title, content });
      setTitle('');
      setContent('');
      alert('Article added successfully!');
      fetchArticles(); // Update the articles after adding a new one
    } catch (err) {
      console.error('Error adding article:', err);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
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
      <h2>Add Article</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
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
          Add
        </Button>
      </form>
      <h2>Articles:</h2>
      {filteredArticles.map((article) => (
        
        <Card key={article._id} style={{ marginBottom: '20px' }}>
           
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
            <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(article._id)}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ArticleForm;
