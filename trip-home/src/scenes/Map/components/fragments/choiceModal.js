import {React, useState} from "react"
import { Modal } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";


/*

The choice Modal is a popup menu that allows a user to pick a new "trip type" for the next set of markers to look at on the map

Generated using Material UI Modal component

Passed the currently selected marker, as well as handling functions from map parent to modify map's state
*/


const ChoiceModal = (props) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const [selected, setSelected] = useState(props.selected)

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Now where?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Click one of the buttons below to change your available locations.
              </Typography>
              <div style={{ display: "flex", flexDirection: "row",width:"40%" }}>
                <button className='btn--primary btn' onClick={() => props.modifyMarkers("food", selected.geometry.location)}>food</button>
                <button className='btn--primary btn' onClick={() => props.modifyMarkers("hotel", selected.geometry.location)}>hotel</button>
                <button className='btn--primary btn' onClick={() => props.modifyMarkers("fun", selected.geometry.location)}>activity</button>
              </div>

            </Box>
          </Modal>
    )

}

export default ChoiceModal