import { useState, useEffect, useRef } from 'react';
import { Paper } from '@mui/material';
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
        }
    },
});

export default function App(){
    const [visible, setVisible] = useState<boolean>(false);
    const draggableRef = useRef<HTMLDivElement>(null);

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    const [width, setWidth] = useState<number>(500);
    const [height, setHeight] = useState<number>(150);

    const [bounds, setBounds] = useState({
        top: 0,
        left: 0,
        right: windowWidth - width,
        bottom: windowHeight - height,
    });

    // wキーで開く・閉じる
    function handleKeyDown(event: KeyboardEvent){
        if (event.altKey && event.key === "w") setVisible(prev => !prev);
    }

    // windowリサイズ時
    function handleWindowResize(){
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
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
    useEffect(() => {
        function updateBounds(){
            if (draggableRef.current){
                const rect = draggableRef.current.getBoundingClientRect();
                setBounds({
                    top: 0 - rect.top,
                    left: 0 - rect.left,
                    right: window.innerWidth - rect.right,
                    bottom: window.innerHeight - rect.bottom,
                });
            }
        }

        updateBounds(); // 初期計算

        // 要素サイズ変化を監視
        const observer = new ResizeObserver(updateBounds);
        if (draggableRef.current) observer.observe(draggableRef.current);

        return () => { if (draggableRef.current) observer.unobserve(draggableRef.current); };
    }, [width, height, windowWidth, windowHeight]);

    return (
        <>
            {visible && (
                <ThemeProvider theme={theme}>
                    <Draggable
                        nodeRef={draggableRef as React.RefObject<HTMLDivElement>}
                        defaultPosition={{ x: (windowWidth - width) / 2, y: (windowHeight - height) / 2 }}
                        bounds={bounds}
                        cancel=".draggable-disable"
                    >
                        <Paper
                            ref={draggableRef}
                            style={{
                                position: "absolute",
                                color: "#fff",
                                backgroundColor: 'rgba(44, 44, 44, 0.87)',
                                borderRadius: 0,
                                minWidth: `${width}px`,
                                minHeight: `${height}px`,
                                userSelect: "none",
                                pointerEvents: "auto"
                            }}
                            elevation={10}
                        >
                            <Header openSettings={() => console.log("openEditSettings")}/>
                            <DamageReceived/>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </>
    );
};
