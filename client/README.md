## Endpoints
- ### GET /api/projects/:userId
    Returns the list of projects of the user.The endpoint accepts ObjectId as params userId:

    `/api/projects/65f8af219dc70e58fef84af3`

    Returns an the list of projects with the following structure:

    ```
    {
	"projects": [
            {
                "projectName": "project1Fortest",
                "_id": "65f8af229dc70e58fef84af9",
                "createdAt": "2024-03-18T21:16:18.004Z",
                "updatedAt": "2024-03-18T21:16:18.004Z",
                "columns": [
                    {
                        "columnName": "column1ForProject1Fortest",
                        "_id": "65f8af229dc70e58fef84b09",
                        "cards": [
                            {
                                "cardName": "P1C1",
                                "_id": "65f8af229dc70e58fef84b26"
                            },
                            {
                                "cardName": "P1C1",
                                "_id": "65f8af229dc70e58fef84b28"
                            }
                        ]
                    }
                ]
            },
            {
                "projectName": "project2For1",
                "_id": "65f8af229dc70e58fef84afb",
                "createdAt": "2024-03-18T21:16:18.004Z",
                "updatedAt": "2024-03-18T21:16:18.004Z",
                "columns": []
            }
        ]
    }
    ```

- ### POST /api/projects
    Adds a project for a user that requires the following key-value pairs:
    ```
    {
        "userId": "65f8af219dc70e58fef84af3",
        "projectName": "testPostNewProject"
    }
    ```
    Returns the updated list of projects of the user:
    ```
    {
	"projects": [
            {
                "projectName": "project1Fortest",
                "_id": "65f8af229dc70e58fef84af9",
                "createdAt": "2024-03-18T21:16:18.004Z",
                "updatedAt": "2024-03-18T21:20:34.563Z",
                "columns": [
                    {
                        "columnName": "column1ForProject1Fortest",
                        "_id": "65f8af229dc70e58fef84b09",
                        "cards": [
                            {
                                "cardName": "P1C1",
                                "_id": "65f8af229dc70e58fef84b26",
                                "createdAt": "2024-03-18T21:20:34.562Z",
                                "updatedAt": "2024-03-18T21:20:34.562Z"
                            },
                            {
                                "cardName": "P1C1",
                                "_id": "65f8af229dc70e58fef84b28",
                                "createdAt": "2024-03-18T21:20:34.563Z",
                                "updatedAt": "2024-03-18T21:20:34.563Z"
                            }
                        ],
                        "createdAt": "2024-03-18T21:20:34.563Z",
                        "updatedAt": "2024-03-18T21:20:34.563Z"
                    }
                ]
            },
            {
                "projectName": "project2For1",
                "_id": "65f8af229dc70e58fef84afb",
                "createdAt": "2024-03-18T21:16:18.004Z",
                "updatedAt": "2024-03-18T21:16:18.004Z",
                "columns": []
            },
            {
                "projectName": "testPostNewProject",
                "_id": "65f8b02257f2006ecc679fb5",
                "columns": [],
                "createdAt": "2024-03-18T21:20:34.563Z",
                "updatedAt": "2024-03-18T21:20:34.563Z"
            }
        ]
    }
    ```

- ### DELETE /api/projects/:userId/:projectId
    Deletes a project of a user. It accepts ObjectId for userId and projectId params:

    `http://localhost:9090/api/projects/65f8af219dc70e58fef84af3/65f8b02257f2006ecc679fb5`

    Returns an updated list of projects of the user:
    ```
    {
	"projects": [
            {
                "projectName": "project1Fortest",
                "_id": "65f8af229dc70e58fef84af9",
                "createdAt": "2024-03-18T21:16:18.004Z",
                "updatedAt": "2024-03-18T21:20:34.563Z",
                "columns": [
                    {
                        "columnName": "column1ForProject1Fortest",
                        "_id": "65f8af229dc70e58fef84b09",
                        "cards": [
                            {
                                "cardName": "P1C1",
                                "_id": "65f8af229dc70e58fef84b26",
                                "createdAt": "2024-03-18T21:20:34.562Z",
                                "updatedAt": "2024-03-18T21:20:34.562Z"
                            },
                            {
                                "cardName": "P1C1",
                                "_id": "65f8af229dc70e58fef84b28",
                                "createdAt": "2024-03-18T21:20:34.563Z",
                                "updatedAt": "2024-03-18T21:20:34.563Z"
                            }
                        ],
                        "createdAt": "2024-03-18T21:20:34.563Z",
                        "updatedAt": "2024-03-18T21:20:34.563Z"
                    }
                ]
            },
            {
                "projectName": "project2For1",
                "_id": "65f8af229dc70e58fef84afb",
                "createdAt": "2024-03-18T21:16:18.004Z",
                "updatedAt": "2024-03-18T21:16:18.004Z",
                "columns": []
            }
        ]
    }
    ```