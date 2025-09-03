import React from 'react';
import NumericField from './NumericField';

type Props = {
    label: string;
    additionalLabel: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    min: number;
    max: number;
}

export default function NumberFieldLabel(props: Props){
    const {label, additionalLabel, value, setValue, min, max} = props;

    function setValueWithLimit(value: string){
        setValue(prev => {
            const num = Number(value);
            if( isNaN(num) ) return prev;
            if( num < min ) return String(min);
            if( num > max ) return String(max);
            return value;
        });
    }

    return (
        <span style={{display: "flex", alignItems: "center", justifyContent: "start", height: "100%"}}>
            <span style={{marginRight: "0.1rem"}}>{label}:</span>
            <NumericField
                state={value}
                setState={setValueWithLimit}
                style={{width: "3rem"}}
            />
            {additionalLabel && <span>{additionalLabel}</span>}
        </span>
    );
};
