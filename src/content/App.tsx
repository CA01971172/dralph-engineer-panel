import { useState, useEffect, useRef, use } from 'react';
import { Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import DamageReceived from "./damageReceived/DamageReceived"
import Header from './Header';

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
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
                    '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                    '& .MuiInput-input': { color: 'white' }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    backgroundColor: "rgba(44, 44, 44, 0.87)"
                }
            }
        }
    }
});

export default function App(){
    const [visible, setVisible] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const draggableRef = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState<{ width: number, height: number }>({ width: 400, height: 150 });
    const [windowSize, setWindowSize] = useState<{ width: number, height: number }>({ width: window.innerWidth, height: window.innerHeight });
    const [position, setPosition] = useState<{ x: number, y: number }>(getDefaultPosition());
    const [bounds, setBounds] = useState({
        top: 0,
        left: 0,
        right: windowSize.width - size.width,
        bottom: windowSize.height - size.height,
    });

    const [enableOverload, setEnableOverload] = useState<boolean>(false); // オーバーロード有効化
    const [shieldEnergy, setShieldEnergy] = useState<string>("0"); // シールドEN

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
                            <Header
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                            />
                            <Box sx={{ p: 2, pt: 0 }}>
                                <DamageReceived
                                    enableOverload={enableOverload}
                                    setEnableOverload={setEnableOverload}
                                    shieldEnergy={shieldEnergy}
                                    setShieldEnergy={setShieldEnergy}
                                />
                            </Box>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </>
    );
};
