import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Grid } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { Link } from 'react-router-dom';
import Sidebar from '../../../Component/Thisaravi/Sidebar';

const images = [
  {
    url: 'https://img.freepik.com/free-vector/app-installation-illustration-concept_114360-908.jpg?w=740&t=st=1714887232~exp=1714887832~hmac=3f6acba232b0b1a03a373cb8b42c4500e173a9d472900881ac064ee8363967e3',
    title: 'Request for a Soil Test',
    link: '/soil-test-request',
  },
  {
    url: 'https://img.freepik.com/free-photo/circular-black-alarm-clock-against-gray-background_23-2147943400.jpg?t=st=1714887395~exp=1714890995~hmac=bc213b823e944991a1ed138e11f6992c472704605c69d4dd90411b96ff625789&w=1380',
    title: 'Pending Requests',
    link: '/pending-requests',
  },
  {
    url: 'https://img.freepik.com/free-photo/3d-render-paper-clipboard-with-green-tick_107791-15840.jpg?t=st=1714887471~exp=1714891071~hmac=a402ba796519138952763b29308ec5905246c8e86d5e12df4495090aa78ece6a&w=900',
    title: 'Resolved Requests',
    link: '/resolved-requests',
  },
  {
    url: 'https://img.freepik.com/free-vector/gradient-realistic-science-laboratory-background_513217-81.jpg?t=st=1714887528~exp=1714891128~hmac=8b059222d99b06b99f25ca6b9c8bee7770656513699c5b181a4ab96acc31c9de&w=996',
    title: 'Soil Test Types',
    link: '/test-types',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 250,
  width: '400px',
  margin: '10px',
  marginBottom: '10px', // Adjust marginBottom for space between buttons
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', 
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
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
  opacity: 0.4,
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

const TestServices = () => {
  return (
    <Box mt={15}>
      <Sidebar />
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        {images.map((image, index) => (
          <Grid item xs={4} key={index} sx={{ textAlign: 'center', marginLeft: index % 2 === 0 ? 15 : 5 }}> 
            <ImageButton
              component={Link}
              to={image.link}
              focusRipple
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="h5"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestServices;
