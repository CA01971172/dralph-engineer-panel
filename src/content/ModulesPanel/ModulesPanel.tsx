import EnergyBladePanel from "./EnergyBladePanel";
import EnergyShieldPanel from "./EnergyShieldPanel";

export default function ModulesPanel({armorIndex}: {armorIndex: number}){
    return(
        <div>
            <EnergyShieldPanel armorIndex={armorIndex}/>
            <EnergyBladePanel armorIndex={armorIndex}/>
        </div>
    )
}
