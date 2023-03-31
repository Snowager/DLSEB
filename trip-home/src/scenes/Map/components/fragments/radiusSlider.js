import React, { useState } from 'react'
import { Slider } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const RadiusSlider = (props) => {

    const marks = [
        {
            value: 1,
            scaledValue: 30,
            label: '1',
        },
        {
            value: 2,
            scaledValue: 40,
            label: '2',
        },
        {
            value: 5,
            scaledValue: 50,
            label: '5',
        },
        {
            value: 10,
            scaledValue: 60,
            label: '10',
        },
        {
            value: 15,
            scaledValue: 70,
            label: '15',
        },
        {
            value: 20,
            scaledValue: 80,
            label: '20',
        },
        {
            value: 25,
            scaledValue: 90,
            label: '25',
        },
        {
            value: 30,
            scaledValue: 100,
            label: '30',
        }
    ];


    const valuetext = (value) => {
        return `${value}`;
    }

    const handleChange = (event, newValue) => {
        props.setRadius(newValue)
        console.log(newValue)
    }

    return (
        <>
            <Box sx={{ display: "flex", margin: "40px" }}>
                <Slider
                    aria-label="Radius"
                    defaultValue={5}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    onChange={handleChange}
                    step={null}
                    marks={marks}
                    max={30}
                />
            </Box>
        </>
    )
}

export default RadiusSlider