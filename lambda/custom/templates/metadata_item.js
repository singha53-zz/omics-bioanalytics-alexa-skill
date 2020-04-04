module.exports = (primary, secondary, tertiary, quaternary, fig, id) => {
    return {
        "type": "APL",
        "version": "1.1",
        "settings": {},
        "theme": "dark",
        "import": [],
        "resources": [
            {
                "description": "Images",
                "strings": {
                    "logo": fig
                }
            }
        ],
        "styles": {},
        "onMount": [],
        "graphics": {},
        "commands": {},
        "layouts": {},
        "mainTemplate": {
            "parameters": [
                "payload"
            ],
            "items": [
                {
                    "type": "Container",
                    "when": "${viewport.shape != 'round'}",
                    "width": "100vw",
                    "height": "100vh",
                    "alignItems": "center",
                    "items": [
                        {
                            "type": "Image",
                            "source": "@logo",
                            "left": "0vw",
                            "align": "left",
                            "position": "absolute",
                            "width": "70vw",
                            "height": "60vh",
                            "top": "20vh"
                        },
                        {
                            "type": "Text",
                            "width": "70vw",
                            "position": "absolute",
                            "textAlign": "left",
                            "color": "white",
                            "fontSize": "7vh",
                            "text": primary,
                            "fontWeight": "900",
                            "top": "10vh",
                            "left": "10vw"
                        },
                        {
                            "type": "Text",
                            "width": "39vw",
                            "position": "absolute",
                            "textAlign": "left",
                            "color": "white",
                            "fontSize": "5vh",
                            "text": secondary,
                            "fontWeight": "400",
                            "top": "25vh",
                            "left": "55vw",
                            "maxLines": 4
                        },
                        {
                            "type": "Text",
                            "width": "90vw",
                            "position": "absolute",
                            "textAlign": "left",
                            "color": "white",
                            "fontSize": "5vh",
                            "text": tertiary,
                            "fontWeight": "400",
                            "top": "50vh",
                            "left": "55vw"
                        },
                        {
                            "type": "Text",
                            "width": "90vw",
                            "position": "absolute",
                            "textAlign": "left",
                            "color": "white",
                            "fontSize": "5vh",
                            "text": quaternary,
                            "fontWeight": "400",
                            "top": "65vh",
                            "left": "55vw"
                        },
                        {
                            "type": "Text",
                            "width": "90vw",
                            "position": "absolute",
                            "textAlign": "right",
                            "color": "white",
                            "fontSize": "5vh",
                            "text": `ID: ${id}`,
                            "fontWeight": "400",
                            "top": "88vh"
                        }
                    ]
                },
                {
                    "type": "Container",
                    "when": "${viewport.shape == 'round'}",
                    "width": "100vw",
                    "height": "100vh",
                    "alignItems": "center",
                    "items": [
                        {
                            "type": "Image",
                            "source": "@logo",
                            "align": "center",
                            "position": "absolute",
                            "width": "50vw",
                            "left": "5vw",
                            "height": "60vh",
                            "top": "20vh"
                        },
                        {
                            "type": "Text",
                            "width": "70vw",
                            "position": "absolute",
                            "textAlign": "center",
                            "color": "white",
                            "fontSize": "5vh",
                            "text": primary,
                            "fontWeight": "900",
                            "top": "5vh",
                            "left": "10vw"
                        },
                        {
                            "type": "Text",
                            "width": "34vw",
                            "position": "absolute",
                            "textAlign": "left",
                            "color": "white",
                            "fontSize": "3vh",
                            "text": secondary,
                            "fontWeight": "300",
                            "top": "30vh",
                            "left": "58vw",
                            "maxLines": 4
                        },
                        {
                            "type": "Text",
                            "width": "30vw",
                            "position": "absolute",
                            "textAlign": "left",
                            "color": "white",
                            "fontSize": "4vh",
                            "text": tertiary,
                            "fontWeight": "300",
                            "top": "45vh",
                            "left": "58vw"
                        },
                        {
                            "type": "Text",
                            "width": "40vw",
                            "position": "absolute",
                            "textAlign": "left",
                            "color": "white",
                            "fontSize": "4vh",
                            "text": quaternary,
                            "fontWeight": "300",
                            "top": "60vh",
                            "left": "58vw",
                            "maxLines": 2
                        },
                        {
                            "type": "Text",
                            "width": "100vw",
                            "position": "absolute",
                            "textAlign": "center",
                            "color": "white",
                            "fontSize": "4vh",
                            "text": `ID: ${id}`,
                            "fontWeight": "400",
                            "top": "82vh"
                        }
                    ]
                }
            ]
        }
    }
}