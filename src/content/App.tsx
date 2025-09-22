import { useState, useEffect, useRef, use, useContext } from 'react';
import { Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import DamageReceived from "./damageReceived/DamageReceived"
import Header from './Header';
import { getAllArmorsWithPcName, setStorage, StorageData } from '../utils/controlChromeData';
import EditModal from './EditModal/EditModal';
import { DataContext } from './DataProvider';

const theme = createTheme({
    palette: {
        primary: { main: "#fff" },
        secondary: { main: "rgba(0,0,0,0)" },
    },
    typography: { button: { textTransform: "none", fontWeight: 'bold' } },
    components: {
        MuiRadio: { styleOverrides: { root: { color: 'white' } } },
        MuiSlider: { styleOverrides: { markLabel: { color: 'white' } } },
        MuiCheckbox: { styleOverrides: { root: { color: 'white' } } },
        MuiPaper: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    backgroundColor: "rgba(44, 44, 44, 0.87)"
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    // color: "lightgray",
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
                    '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                    '& .MuiInput-input': { color: 'white' }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "gray", // フォーカスされてない時のラベル
                    "&.Mui-focused": { color: "white" }, // フォーカス時
                    "&.MuiInputLabel-shrink": { color: "gray" }, // shrink時
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    color: "lightgray", // 入力文字色
                    "&::placeholder": {
                        color: "darkgray", // placeholder
                        opacity: 1,
                    },
                },
                underline: {
                    "&:before": { borderBottomColor: "gray" }, // 未フォーカス時の下線
                    "&:hover:not(.Mui-disabled):before": { borderBottomColor: "white" }, // hover時
                    "&:after": { borderBottomColor: "white" }, // フォーカス時
                },
            },
        },
    }
});

export default function App(){
    const [visible, setVisible] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const draggableRef = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState<{ width: number, height: number }>({ width: 400, height: 365 });
    const [windowSize, setWindowSize] = useState<{ width: number, height: number }>({ width: window.innerWidth, height: window.innerHeight });
    const [position, setPosition] = useState<{ x: number, y: number }>(getDefaultPosition());
    const [bounds, setBounds] = useState({
        top: 0,
        left: 0,
        right: windowSize.width - size.width,
        bottom: windowSize.height - size.height,
    });

    const {
        data,
        setData
    } = useContext(DataContext);

    function getDefaultPosition(){
        return {
            x: (windowSize.width - size.width) / 2,
            y: (windowSize.height - size.height) / 2,
        }
    }

    // wキーで開く・閉じる
    function handleKeyDown(event: KeyboardEvent){
        if (event.altKey && event.key === "w") setVisible(prev => !prev);
    }

    // windowリサイズ時
    function handleWindowResize(){
        setWindowSize({width: window.innerWidth, height: window.innerHeight});
    }

    // キーの押下と画面のリサイズに合わせて処理する
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("resize", handleWindowResize);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    // bounds 更新
    // useEffect(() => {
    //     function updateBounds(){
    //         if (draggableRef.current){
    //             const rect = draggableRef.current.getBoundingClientRect();
    //             setBounds({
    //                 top: 0 - rect.top,
    //                 left: 0 - rect.left,
    //                 right: window.innerWidth - rect.right,
    //                 bottom: window.innerHeight - rect.bottom,
    //             });
    //         }
    //     }

    //     updateBounds(); // 初期計算

    //     // 要素サイズ変化を監視
    //     const observer = new ResizeObserver(updateBounds);
    //     if (draggableRef.current) observer.observe(draggableRef.current);

    //     return () => { if (draggableRef.current) observer.unobserve(draggableRef.current); };
    // }, [width, height, windowWidth, windowHeight]);

    // 拡張機能読み込み時、Chromeのローカルストレージを読み込んで初期化する
    useEffect(() => {
        getAllArmorsWithPcName().then(data => setData(data));
    }, []);

    return (
        <>
            {visible && (
                <ThemeProvider theme={theme}>
                    <Draggable
                        nodeRef={draggableRef as React.RefObject<HTMLDivElement>}
                        defaultPosition={getDefaultPosition()}
                        bounds={bounds}
                        cancel=".draggable-disable"
                    >
                        <Paper
                            ref={draggableRef}
                            style={{
                                position: "absolute",
                                borderRadius: 0,
                                width: `${size.width}px`,
                                minWidth: `${size.width}px`,
                                minHeight: `${size.height}px`,
                                userSelect: "none",
                                pointerEvents: "auto"
                            }}
                            elevation={10}
                        >
                            <Header setIsModalOpen={setIsModalOpen}/>
                            <Box sx={{ p: 2, pt: 0, pb: 4 }}>
                                <DamageReceived/>
                            </Box>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
            <EditModal
                theme={theme}
                isOpen={isModalOpen}
                closeModal={() => {
                    setStorage("characterName", data.characterName);
                    setStorage("powerArmors", data.powerArmors);
                    setIsModalOpen(false);
                }}
            />
        </>
    );
};
