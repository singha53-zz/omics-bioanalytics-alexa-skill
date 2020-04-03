module.exports = (id) => {
    return {
    "type": "APL",
    "version": "1.1",
    "settings": {},
    "theme": "light",
    "import": [],
    "resources": [
        {
            "description": "Images",
            "strings": {
                "logo": "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1284&q=80"
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
                        "scale": "best-fill",
                        "width": "100vw",
                        "height": "100vh"
                    },
                    {
                        "type": "Text",
                        "width": "70vw",
                        "position": "absolute",
                        "textAlign": "left",
                        "color": "black",
                        "fontSize": "8vh",
                        "text": "Say one of:",
                        "fontWeight": "900",
                        "top": "20vh",
                        "left": "60vw"
                    },
                    {
                        "type": "Text",
                        "width": "90vw",
                        "position": "absolute",
                        "textAlign": "left",
                        "color": "black",
                        "fontSize": "7vh",
                        "text": "1) Analyze Metadata",
                        "fontWeight": "400",
                        "top": "45vh",
                        "left": "59vw"
                    },
                    {
                        "type": "Text",
                        "width": "90vw",
                        "position": "absolute",
                        "textAlign": "left",
                        "color": "black",
                        "fontSize": "7vh",
                        "text": "2) EDA",
                        "fontWeight": "400",
                        "top": "58vh",
                        "left": "59vw"
                    },
                    {
                        "type": "Text",
                        "width": "90vw",
                        "position": "absolute",
                        "textAlign": "left",
                        "color": "black",
                        "fontSize": "7vh",
                        "text": "3) DE",
                        "fontWeight": "400",
                        "top": "71vh",
                        "left": "59vw"
                    },
                    {
                        "type": "Text",
                        "width": "90vw",
                        "position": "absolute",
                        "textAlign": "right",
                        "color": "black",
                        "fontSize": "4vh",
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
                        "scale": "best-fill",
                        "width": "100vw",
                        "height": "100vh"
                    },
                    {
                        "type": "Text",
                        "width": "70vw",
                        "position": "absolute",
                        "textAlign": "right",
                        "color": "black",
                        "fontSize": "5vh",
                        "text": "Say one of:",
                        "fontWeight": "600",
                        "top": "30vh"
                    },
                    {
                        "type": "Text",
                        "width": "90vw",
                        "position": "absolute",
                        "textAlign": "left",
                        "color": "black",
                        "fontSize": "5vh",
                        "text": "1) Analyze Metadata",
                        "fontWeight": "400",
                        "top": "50vh",
                        "left": "50vw"
                    },
                    {
                        "type": "Text",
                        "width": "90vw",
                        "position": "absolute",
                        "textAlign": "left",
                        "color": "black",
                        "fontSize": "5vh",
                        "text": "2) EDA",
                        "fontWeight": "400",
                        "top": "58vh",
                        "left": "50vw"
                    },
                    {
                        "type": "Text",
                        "width": "90vw",
                        "position": "absolute",
                        "textAlign": "left",
                        "color": "black",
                        "fontSize": "5vh",
                        "text": "3) DE",
                        "fontWeight": "400",
                        "top": "66vh",
                        "left": "50vw"
                    },
                    {
                        "type": "Text",
                        "width": "90vw",
                        "position": "absolute",
                        "textAlign": "left",
                        "color": "black",
                        "fontSize": "4vh",
                        "text": "ID: 1234567",
                        "fontWeight": "400",
                        "top": "82vh",
                        "left": "60vw"
                    }
                ]
            }
        ]
    }
}
}