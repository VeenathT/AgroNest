import { Button, Grid, Input, Typography } from "@mui/material";
const RegForm = props => {
    return (
        <Grid
            container
            spacing={2}
            sx={{
                backgroundColor: '#ffffff',
                marginBottom: '30px',
                display: 'block',
            }}
        >
            <Grid item xs={12}>
                <Typography component={'h1'} sx={{color: '#000000'}}>Create Account</Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="id"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                First Name
                 </Typography>
                 <Input
                    type="text"
                    id='fName'
                    name="Fname"
                    sx={{width:'400px'}}
                    value={''}
                    onChange={e => {}}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="id"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                Last Name
                 </Typography>
                 <Input
                    type="text"
                    id='lName'
                    name="lName"
                    sx={{width:'400px'}}
                    value={''}
                    onChange={e => {}}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="id"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                Email
                 </Typography>
                 <Input
                    type="text"
                    id='email'
                    name="email"
                    sx={{width:'400px'}}
                    value={''}
                    onChange={e => {}}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="id"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                Phone
                 </Typography>
                 <Input
                    type="number"
                    id='phone'
                    name="phone"
                    sx={{width:'400px'}}
                    value={''}
                    onChange={e => {}}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="id"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                District
                 </Typography>
                 <Input
                    type="text"
                    id='district'
                    name="district"
                    sx={{width:'400px'}}
                    value={''}
                    onChange={e => {}}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="id"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                City
                 </Typography>
                 <Input
                    type="text"
                    id='city'
                    name="city"
                    sx={{width:'400px'}}
                    value={''}
                    onChange={e => {}}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="id"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                Username
                 </Typography>
                 <Input
                    type="text"
                    id='un'
                    name="un"
                    sx={{width:'400px'}}
                    value={''}
                    onChange={e => {}}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="id"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                Password
                 </Typography>
                 <Input
                    type="text"
                    id='pw'
                    name="pw"
                    sx={{width:'400px'}}
                    value={''}
                    onChange={e => {}}
                 />
            </Grid>

            <Button
                sx={{
                    margin: 'auto',
                    marginBottom: '20px',
                    backgroundColor: '#2DA771',
                    color: '#000000',
                    marginLeft: '15px',
                    marginTop: '20px',
                    '&:hover':{
                        opacity: '0.7',
                        backgroundColor: '#2DA771'
                    }
                }}
            >
                Sign Up
            </Button>
        </Grid>
    );
}

export default RegForm;