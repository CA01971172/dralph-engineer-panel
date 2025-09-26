import { Box, Modal, Paper, Tab, Theme, ThemeProvider } from "@mui/material";
import NamesField from "./NamesField";
import EditHeader from "./EditHeader";
import EditTabs from "./EditTabs";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import TabContent from "../../ui/TabContent";
import ModuleSettings from "./ModuleSettings";
import { ModuleName } from "../../utils/getPowerArmorData";

type Props = {
    theme: Theme;
    isOpen: boolean;
    closeModal: () => void;
};

export default function EditModal(props: Props){
    const {
        theme,
        isOpen,
        closeModal
    } = props;

    const {
        data,
        tabIndex
    } = useContext(DataContext);

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 4, 
            }}
        >
            <ThemeProvider theme={theme}>
                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: 1,
                        width: 600,
                        height: "100%",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Paper elevation={4} sx={{ backgroundColor: "#212121" }}>
                        <EditHeader closeModal={closeModal}/>
                        <EditTabs/>
                    </Paper>
                    <Box
                        sx={{
                            p: 3,
                            flex: 1,
                            overflowY: "auto"
                        }}>
                        <TabContent
                            value={tabIndex}
                            index={0}
                        >
                            <NamesField/>
                        </TabContent>
                        {
                            (data.powerArmors || []).map((_armor, index) => (
                                <TabContent
                                    key={index}
                                    value={tabIndex}
                                    index={index + 1}
                                >
                                    {(data.powerArmors[index].modules || []).map((module) => (
                                        <ModuleSettings
                                            armorIndex={index}
                                            moduleName={module.name as ModuleName}
                                        />
                                    ))}
                                </TabContent>
                        ))}
                    </Box>
                </Paper>
            </ThemeProvider>
        </Modal>
    );
}
