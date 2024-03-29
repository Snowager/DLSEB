import React from 'react';

import { Box } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "../styles/map.css"

const TravelMode = (props) => {
  const size = props.size

  const handleChange = (event) => {
    props.setMode(event.target.value)
    console.log(event.target.value)

  }
  return (
    <Box sx={{ display: "flex", margin: "2px", color: 'white' }} className="text-center display-flex">
      <FormControl>
        <h2 className='text-center'>Travel Mode</h2>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={props.option[0]}
          name="radio-buttons-group"
          row={true}
          onChange={handleChange}
          className='travel-mode'
        >
          <FormControlLabel value={props.value[0]} control={<Radio sx={{
            '& .MuiSvgIcon-root': {
              fontSize: size,
            },
            color: 'white',
          }} />} label={props.option[0]} labelPlacement="top" />
          <FormControlLabel value={props.value[1]} control={<Radio sx={{
            '& .MuiSvgIcon-root': {
              fontSize: size,
              color: 'white',
            },
          }} />} label={props.option[1]} labelPlacement="top" />
          <FormControlLabel value={props.value[2]} control={<Radio sx={{
            '& .MuiSvgIcon-root': {
              fontSize: size,
              color: 'white',
            },
          }} />} label={props.option[2]} labelPlacement="top" />
          <FormControlLabel value={props.value[3]} control={<Radio sx={{
            '& .MuiSvgIcon-root': {
              fontSize: size,
              color: 'white',
            },
          }} />} label={props.option[3]} labelPlacement="top" />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}
export default TravelMode