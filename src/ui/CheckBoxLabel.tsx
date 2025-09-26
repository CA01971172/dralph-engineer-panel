import { Checkbox, FormControlLabel } from "@mui/material";

type Props = {
    label: string;
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CheckBoxLabel( props: Props ){
    const { label, isChecked, setIsChecked } = props;
    return (
        <FormControlLabel
            className=".draggable-disable"
            label={label}
            control={
                <Checkbox
                    checked={isChecked}
                    onChange={() => setIsChecked(prev => !prev)}
                />
            }
        />
    )
}
