import React, { useState } from 'react'
import { Slider } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const BudgetSlider = (props) => {

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

    return (
        <>
            <Box sx={{ display: "flex", margin: "40px" }}>
                <Slider
                    aria-label="Budget"
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    onChange={handleChange}
                    step={null}
                    marks={marks}
                    max={3}
                />
            </Box>
        </>
    )
}

export default BudgetSlider