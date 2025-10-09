import ArrowNumberControl from "./ArrowNumberControl";

type Props = {
    label: string;
    value: string | number;
    incrementNumber: () => void;
    decrementNumber: () => void;
}

export default function ArrowNumberControlLabel(props: Props){
    const {label, value, incrementNumber, decrementNumber} = props;

    return (
        <span style={{display: "flex", alignItems: "center", justifyContent: "start", height: "100%"}}>
            <span style={{marginRight: "0.5rem"}}>{label}:</span>
            <span style={{width: "1.5rem"}}>{value}</span>
            <ArrowNumberControl
                incrementNumber={incrementNumber}
                decrementNumber={decrementNumber}
            />
        </span>
    );
};
