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
    const draggableRef = useRef<HTMLDivElement>(null); // Create a ref for the draggable element

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    const width: number = 340;
    const height: number = 138.576;

    // wキーで開く・閉じる
    function handleKeyDown(event: KeyboardEvent){
        if (event.altKey && event.key === "w") {
            setVisible((prev) => !prev);
        }
    };

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

    return (
        <div>
            {visible && (
                <ThemeProvider theme={theme}>
                    <Draggable
                        nodeRef={draggableRef as React.RefObject<HTMLElement>} // Pass the ref to Draggable with type assertion
                        defaultPosition={{
                            x: (windowWidth - width) / 2,
                            y: -(windowHeight + (height + 16 * 3)) / 2
                        }}
                        bounds={{
                            top: -windowHeight,
                            right: (windowWidth - width),
                            bottom: -(height + 16 * 3),
                            left: 0
                        }}
                        cancel=".draggable-disable"
                    >
                        <Paper
                            ref={draggableRef} // Pass the ref to the Paper component
                            style={{
                                position: "absolute",
                                color: "#fff",
                                backgroundColor: 'rgba(44, 44, 44, 0.87)',
                                borderRadius: "0",
                                minWidth: `${width}px`,
                                minHeight: `${height}px`,
                                paddingTop: "16px",
                                paddingBottom: "32px",
                                userSelect: "none"
                            }}
                            elevation={10}
                        >
                        </Paper>
                    </Draggable>
                </ThemeProvider>
            )}
        </div>
    );
};
