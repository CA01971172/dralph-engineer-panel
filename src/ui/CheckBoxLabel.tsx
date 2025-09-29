import { Checkbox, FormControlLabel } from "@mui/material";

type Props = {
    label: string;
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default";
}

export default function CheckBoxLabel( props: Props ){
    const { label, isChecked, setIsChecked } = props;
    return (
        <FormControlLabel
            className="draggable-disable"
            style={{userSelect: "none"}}
            label={label}
            control={
                <Checkbox
                    color={props.color || "primary"}
                    checked={isChecked}
                    onChange={() => setIsChecked(prev => !prev)}
                />
            }
        />
    )
}
