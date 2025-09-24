import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { Tab, Tabs } from "@mui/material";

export default function EditTabs(){
    const {
        tabIndex,
        setTabIndex,
        data
    } = useContext(DataContext);

    return (
        <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)}>
            <Tab label="基本情報"/>
            {(data.powerArmors || []).map((armor, index) => (
                <Tab
                    key={index}
                    label={armor.armorName || `アーマー${index + 1}`}
                />
            ))}
        </Tabs>
    )
}
