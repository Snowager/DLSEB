import React, { useState } from 'react'
import { Slider } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';


const BudgetSlider = (props) => {

    const useStyles = makeStyles({
        root: {
            "&>.MuiSlider-markLabel": {
                color: "white !important"
            }
        }
    });

    const marks = [
        {
            value: 1,
            scaledValue: 1,
            label: '$',
        },
        {
            value: 2,
            scaledValue: 2,
            label: '$$',
        },
        {
            value: 3,
            scaledValue: 3,
            label: '$$$',
        },
    ];


    const valuetext = (value) => {
        return `${value}`;
    }

    const handleChange = (event, newValue) => {
        props.setBudget(newValue)
        console.log(newValue)
    }
    const styles = useStyles()

    return (
        <>
            <h2 className='text-center'>Budget</h2>

            <Box sx={{ display: "flex", margin: "20px", color: "white" }}>
                <Slider
                    aria-label="Budget"
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    onChange={handleChange}
                    step={null}
                    marks={marks}
                    max={3}
                    sx={{
                        color: 'white'
                    }}
                    className={styles.root}
                />
            </Box>
        </>
    )
}

export default BudgetSlider