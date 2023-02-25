import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Tooltip from '@mui/material/Tooltip';

const CourseCard = (props) => {
  const [openTip, setOpenTip] = useState(false);

  const handleCloseTip = () => {
    setOpenTip(false);
  };

  const handleClickButton = () => {
    navigator.clipboard.writeText(props.text);
    setOpenTip(true);
  };

  return (
    <FormControl variant="outlined">
      <OutlinedInput
        type='text'
        value={props.text}
        endAdornment={
          <InputAdornment position="end" >
            <Tooltip
              arrow
              open={openTip}
              onClose={handleCloseTip}
              disableHoverListener
              placement='top'
              title='Copied!'
            >
              <IconButton
                onClick={handleClickButton}
              >
                <AssignmentIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default CourseCard;