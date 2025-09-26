import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { Box } from "@mui/material";

type Props = {
    armorIndex: number;
    moduleName: string;
};

export default function ModuleSettings(props: Props){
    const {
        armorIndex,
        moduleName
    } = props;

    const {
        data,
        setData
    } = useContext(DataContext);

    return (
        <Box>
            <></>
        </Box>
    );
}
