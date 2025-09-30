import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton } from '@mui/material';

type Prop = {
    incrementNumber: () => void;
    decrementNumber: () => void;
}

export default function ArrowNumberControl(props: Prop) {
    const {
        incrementNumber,
        decrementNumber
    } = props;

    return (
            <div
                className="draggable-disable"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <IconButton
                    color="primary"
                    style={{padding: 0}}
                    onClick={incrementNumber}
                >
                    <ArrowDropUpIcon />
                </IconButton>
                <IconButton
                    color="primary"
                    style={{padding: 0}}
                    onClick={decrementNumber}
                >
                    <ArrowDropDownIcon />
                </IconButton>
            </div>
    );
}
