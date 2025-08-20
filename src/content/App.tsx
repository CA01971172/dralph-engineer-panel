import React, { useState, useEffect, useRef } from 'react';
import { Paper, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff" // プライマリーカラーを白色に設定
        },
        secondary: {
            main: "rgba(0,0,0,0)" // セカンダリーカラーを無色に設定
        },
    },
    typography: {
        button: {
            textTransform: "none",
            fontWeight: 'bold'
        },
    },
    components: {
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: 'white', // 非アクティブ時のカラーを白に設定
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                markLabel: {
                    color: 'white', // カスタムテキストカラーを指定
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: 'white', // 非アクティブ時のカラーを白に設定
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: 'white', // 下線の色を白色に設定
                    },
                    '& .MuiInput-underline:before': {
                      borderBottomColor: 'white', // 下線の色を白色に設定
                    },
                    '& .MuiInput-input': {
                      color: 'white' // フォームの文字色を白色に設定
                    }
                }
            }
        }
    },
});

export default function App(){
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleAdditions, setVisibleAdditions] = useState<boolean>(false);
    const draggableRef = useRef<HTMLDivElement>(null);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // 要素サイズを取得
    useEffect(() => {
        if (draggableRef.current) {
        const rect = draggableRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        }
    }, [draggableRef.current]);

    // wキーで開く・閉じる
    function handleKeyDown(event: KeyboardEvent){
        if (event.altKey && event.key === "w") {
            setVisible((prev) => !prev);
        }
    };

    function handleWindowResize(){
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("resize", handleWindowResize);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <>
            {visible && dimensions && (
                <ThemeProvider theme={theme}>
                    <Draggable
                        nodeRef={draggableRef as React.RefObject<HTMLElement>} // Pass the ref to Draggable with type assertion
                        defaultPosition={{
                            x: (windowSize.width - dimensions.width) / 2,
                            y: -(windowSize.height + (dimensions.height)) / 2
                        }}
                        bounds={{
                            top: 0,
                            left: 0,
                            right: windowSize.width - dimensions.width,
                            bottom: windowSize.height - dimensions.height,
                        }}
                        // bounds="parent"
                        cancel=".draggable-disable"
                    >
                        <Paper
                            ref={draggableRef} // Pass the ref to the Paper component
                            style={{
                                position: "absolute",
                                color: "#fff",
                                backgroundColor: 'rgba(44, 44, 44, 0.87)',
                                borderRadius: "0",
                                minWidth: `${dimensions.width}px`,
                                minHeight: `${dimensions.height}px`,
                                paddingTop: "16px",
                                paddingBottom: "32px",
                                userSelect: "none"
                            }}
                            elevation={10}
                        >
                            <div style={{width: 400, height: 300, padding: "3rem"}}>text</div>
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </>
    );
};
