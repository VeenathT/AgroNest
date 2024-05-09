import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

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
  height: 250,
  margin: '0 10px 20px', 
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', 
    height: 250,
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
      border: '10px solid currentColor',
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

const InquiryCategory = () => {
  return (
    <div style={{ padding: '100px', marginTop: '40px' }}>
      <Stack sx={{ width: '100%', alignItems: 'center' }} spacing={4}>
        <Typography variant="h4">Select Your Category</Typography>
        <CustomizedSteppers />
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px',marginBottom: '100px' }}>
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

const CustomizedSteppers = () => {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={0} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

const steps = ['Select Category', 'Fill the Inquiry Form', 'Submit to the system'];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${StepConnector.defaultProps?.classes?.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${StepConnector.defaultProps?.classes?.active}`]: {
    [`& .${StepConnector.defaultProps?.classes?.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${StepConnector.defaultProps?.classes?.completed}`]: {
    [`& .${StepConnector.defaultProps?.classes?.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${StepConnector.defaultProps?.classes?.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const CustomStepIcon = ({ active, completed, icon }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {completed ? <CheckCircleIcon /> : active ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
      <Typography sx={{ ml: 1, color: active ? 'text.primary' : 'text.secondary', fontWeight: 'bold' }}>{icon}</Typography>
    </Box>
  );
}

export default InquiryCategory;
