import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Container, 
  Button, 
  makeStyles, 
  Fade, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@material-ui/core';
import SearchBar from './SearchBar';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    position: 'relative',
    '&:hover $imageOverlay': {
      opacity: 1,
      visibility: 'visible',
    },
    '&:hover $image': {
      filter: 'brightness(50%)',
    },
  },
  image: {
    width: '40%',
    borderRadius: theme.spacing(1),
    transition: 'filter 0.3s ease',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    color: '#FFF',
    textAlign: 'center',
  },
  videoPlayer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: 'auto',
  },
}));

const ArticleList = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showVideo, setShowVideo] = useState(false);

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

  const sortedArticles = filteredArticles.sort((a, b) => {
    if (sortBy === 'wordCount') {
      return a.content.split(/\s+/).length - b.content.split(/\s+/).length;
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const ArticlePDF = ({ title, content }) => (
    <Document>
      <Page>
        <Text>{content}</Text>
      </Page>
    </Document>
  );

  const handleWatchNow = () => {
    setShowVideo(true);
  };

  const handleVideoClose = () => {
    setShowVideo(false);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div style={{ padding: '50px', width:'auto', backgroundColor: '#F5F5F5', minHeight: '300vh' }}>
      <Container >
        <div style={{ padding: '20px', backgroundColor: '#F5F5F5' }}>
        <Typography 
          variant="h1" 
          style={{
            marginBottom: '20px', 
            color: '#196F3D',
            textAlign: 'center', 
            fontFamily: 'serif', 
            letterSpacing: '5px'
            
          }}
        >
          Articles
        </Typography>

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {/* Sorting Section */}
          <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by-select"
              value={sortBy}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="wordCount">Word Count</MenuItem>
            </Select>
          </FormControl>

          {/* Image or Video */}
          <div className={classes.imageContainer}>
            <img src="https://res.cloudinary.com/ds3n13gyv/image/upload/v1713824971/AgroNest/ghhdgotwunlm9l6t60fc.jpg" alt="Cloudinary Image" className={classes.image} />
            <Fade in={true} timeout={500}>
              <div className={classes.imageOverlay}>
                {showVideo ? (
                  <video
                    className={classes.videoPlayer}
                    controls
                    autoPlay
                    loop
                    onClick={handleVideoClose}
                  >
                    <source src="https://res.cloudinary.com/ds3n13gyv/video/upload/v1713826245/AgroNest/lebuodtnrh6mcbhtimt3.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className={classes.overlayContent}>
                    <Typography variant="h5">A short reference</Typography>
                    <Button variant="contained" color="primary" onClick={handleWatchNow}>Watch now</Button>
                  </div>
                )}
              </div>
            </Fade>
          </div>

          {sortedArticles.map((article, index) => (
            <Card key={article._id} style={{ marginBottom: '20px' }}>
              <CardContent>
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
                      style={{ marginTop: '30px' }}
                      disabled={loading}
                    >
                      {loading ? 'Loading document...' : 'Download PDF'}
                    </Button>
                  )}
                </PDFDownloadLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ArticleList;
