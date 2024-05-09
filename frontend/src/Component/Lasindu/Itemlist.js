import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const ItemButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  width: '20%',
  margin: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.4,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.2,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  zIndex: 999,
  backgroundColor: theme.palette.background.paper,
  width: '50%',
  margin: '0 auto',
}));

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8070/item/displayAll')
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ marginTop: '150px', textAlign: 'center' }}>
      <SearchBar
        placeholder="Search items"
        variant="outlined"
        color='success'
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '30px' }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error.message}</Typography>
        ) : (
          filteredItems.map((item, index) => (
            <ItemButton
              key={item._id}
              focusRipple
              component={Link}
              to={`/item/${item._id}`}
              sx={{ margin: '20px' }} 
            >
              <ImageSrc style={{ backgroundImage: `url('https://t3.ftcdn.net/jpg/05/18/01/82/360_F_518018267_kVSFbWv58Or4c4ihnoXNzNVPpltTqdqY.jpg')` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="white"
                  sx={{
                    position: 'relative',
                    fontSize: '30px',
                    p: 2,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {item.name}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ItemButton>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ItemList;
