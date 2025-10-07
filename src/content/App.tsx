import { useState, useEffect, useRef, use, useContext } from 'react';
import { Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import DamageReceived from "./DamageReceived/DamageReceived"
import Header from './Header';
import EditModal from './EditModal/EditModal';
import { DataContext } from './DataProvider';
import TabContent from '../ui/TabContent';
import ModulesPanel from './ModulesPanel/ModulesPanel';

const theme = createTheme({
    palette: {
        primary: { main: "#fff",  },
        secondary: { main: "rgba(0,0,0,0)" },
        info: { main: "rgb(33, 150, 243)" },
        action: {
            disabled: "gray"
        }
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
                    "&.Mui-focused.MuiInputLabel-shrink": { color: "rgb(33, 150, 243)" }, // shrink時
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
                    "&:after": { borderBottomColor: "rgb(33, 150, 243)" }, // フォーカス時
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: "#bdbdbd", // 非アクティブなタブの文字色を指定
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: "#f50057", // 下線の色を赤に設定
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    color: "#fff",
                    backgroundColor: "rgba(44, 44, 44, 0.87)" // Menuコンポーネントの背景色を設定
                }
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
        tabIndex,
        saveData
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
                            <Box sx={{ p: 2, pb: 4 }}>
                                <TabContent value={tabIndex} index={0}>
                                    <DamageReceived/>
                                </TabContent>
                                <TabContent value={tabIndex} index={1}>
                                    <ModulesPanel/>
                                </TabContent>
                            </Box>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
            <EditModal
                theme={theme}
                isOpen={isModalOpen}
                closeModal={() => {
                    saveData();
                    setIsModalOpen(false);
                }}
            />
        </>
    );
};
