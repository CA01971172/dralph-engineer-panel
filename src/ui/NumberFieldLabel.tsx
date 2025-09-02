import React from 'react';

type Props = {
    label: string;
    additionalLabel: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    emptyValue: number;
}

export default function NumberFieldLabel({label, additionalLabel, value, setValue, emptyValue}: Props){
    return (
        <span style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <span>{label}&nbsp;</span>
            <input
                type="number"
                value={value}
                onChange={(e) => {
                    const val = e.target.value;
                    setValue(val === "" ? emptyValue : Number(val));
                }}
                    placeholder=""
                />
            {additionalLabel && <span>{additionalLabel}</span>}
        </span>
    );
};
