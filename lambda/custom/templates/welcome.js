module.exports = (url) => {
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
                    "logo": url
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
                    "items": [
                        {
                                    "type": "Image",
                                    "source": "@logo",
                                    "scale": "best-fit",
                                    "width": "100vw",
                                    "height": "100vh",
                                    "position": "absolute"
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
                                    "scale": "best-fit",
                                    "width": "95vw",
                                    "height": "100vh"
                                }
                        ]
                }
                ]
        }
    }
}