import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const images = [
  {
    url: 'https://as2.ftcdn.net/v2/jpg/02/99/14/71/1000_F_299147134_m5TaoaJ0iwfT0sDDAuvHfGUqdCQ8m5yO.jpg',
    title: 'Farmer',
    width: '40%',
    link: '/formPage?category=Farmer',
  },
  {
    url: 'https://img.freepik.com/premium-vector/farmer-man-hold-tablet-online-buy-fresh-vegetable-grocery_48369-5371.jpg?w=1060',
    title: 'Dealer',
    width: '40%',
    link: '/formPage?category=Dealer',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
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
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';

// const buttonStyle = {
//   backgroundColor: 'green',
//   color: 'white',
//   padding: '8px 20px',
//   margin: '0 10px',
//   '&:hover': {
//     backgroundColor: 'darkgreen',
//   },
// };

const InquiryCategory = () => {
  return (
    <div style={{ padding: '100px', marginTop: '20px' }}>
      <h1>Select Category</h1>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '80px',marginBottom: '100px' }}>
        {images.map((image) => (
          <ImageButton
            key={image.title}
            style={{
              width: image.width,
            }}
            component={Link}
            to={image.link}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="h4"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 10px)`,
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
    </div>
  );
}
// const InquiryCategory = () => {
//   return (
//     <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '64px' }}>
//       <h1>Select Category</h1>
//       <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//         <Link to="/formPage?category=Farmer" style={{ textDecoration: 'none' }}>
//           <Button variant="contained" sx={buttonStyle}>
//             Farmer
//           </Button>
//         </Link>
//         <Link to="/formPage?category=Dealer" style={{ textDecoration: 'none' }}>
//           <Button variant="contained" sx={buttonStyle}>
//             Dealer
//           </Button>
//         </Link>
//       </Box>
//     </div>
//   );
// }

// export default InquiryCategory;
