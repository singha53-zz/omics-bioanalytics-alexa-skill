module.exports = (list_of_elements, title) => {
  return {
    "listTemplate1Metadata": {
        "type": "object",
        "objectId": "lt1Metadata",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://d2o906d8ln7ui1.cloudfront.net/images/LT1_Background.png",
                    "size": "small",
                    "widthPixels": 0,
                    "heightPixels": 0
                },
                {
                    "url": "https://d2o906d8ln7ui1.cloudfront.net/images/LT1_Background.png",
                    "size": "large",
                    "widthPixels": 0,
                    "heightPixels": 0
                }
            ]
        },
        "title": title,
        "logoUrl": ""
    },
    "listTemplate1ListData": {
        "type": "list",
        "listId": "lt1Sample",
        "totalNumberOfItems": list_of_elements.length,
        "listPage": {
            "listItems": list_of_elements.map((e, ind) => {
              return {
                    "listItemIdentifier": e,
                    "ordinalNumber": ind+1,
                    "textContent": {
                        "primaryText": {
                            "type": "PlainText",
                            "text": e,
                            "maxLines": 5
                        }
                    },
                    "token": e
                }
            })
        }
    }
}
}