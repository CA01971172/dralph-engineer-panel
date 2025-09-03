import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import EditModal from "./EditModal/EditModal";
import { setStorage, StorageData } from "../utils/controlChromeData";

type Props = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: StorageData;
    setData: React.Dispatch<React.SetStateAction<StorageData>>;
};

// 編集ボタンがあるヘッダー
export default function Header(props: Props){
    const { isModalOpen, setIsModalOpen, data } = props;

    return (
        <>
            <div
                style={{
                    height: "48px",
                    padding: "0 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>機械技師パネル</div>
                <IconButton
                    className="draggable-disable"
                    color="primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    <EditIcon/>
                </IconButton>
            </div>
            <EditModal
                isOpen={isModalOpen}
                closeModal={() => {
                    setStorage("characterName", data.characterName);
                    setStorage("powerArmors", data.powerArmors);
                    setIsModalOpen(false);
                }}
                data={data}
            />
        </>
    );
};