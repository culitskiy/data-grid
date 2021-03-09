export default {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "code": {
            "type": "string"
        },
        "colums": {
            "type": "array",
            "items": [
                {
                    "type": "object",
                    "properties": {
                        "dataField": 'CompanyName',
                        "caption": 'Company Name',
                        "dataType": {
                            "type": "string"
                        },
                        "format": {
                            "type": "string"
                        },
                        "alignment": {
                            "type": "string"
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "dataField": 'City',
                        "caption": 'City',
                        "dataType": {
                            "type": "string"
                        },
                        "format": {
                            "type": "string"
                        },
                        "alignment": {
                            "type": "string"
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "dataField": 'State',
                        "caption": 'State',
                        "dataType": {
                            "type": "string"
                        },
                        "format": {
                            "type": "string"
                        },
                        "alignment": {
                            "type": "string"
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "dataField": 'Phone',
                        "caption": 'Phone',
                        "dataType": {
                            "type": "string"
                        },
                        "format": {
                            "type": "string"
                        },
                        "alignment": {
                            "type": "string"
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "dataField": 'Fax',
                        "caption": 'Fax',
                        "dataType": {
                            "type": "string"
                        },
                        "format": {
                            "type": "string"
                        },
                        "alignment": {
                            "type": "string"
                        }
                    }
                }
            ]
        }
    }
}