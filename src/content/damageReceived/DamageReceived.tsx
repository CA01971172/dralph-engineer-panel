import { useState } from "react";
import DefenseLevelSlider from "./DefenseLevelSlider";

export default function DamageReceived(){
    const [sliderValue, setSliderValue] = useState<number>(0);

    return (
        <div>
            <DefenseLevelSlider
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
            />
        </div>
    );
};
