# Events

## Get active or passed event

### Endpoint

`GET /geh/api/v1/events/active/:isActive`

### Description

This endpoint is used to retrieve all active or passed event

### Request

- **Headers**
  - `Content-Type`: application/json

- **Query Parameters**
  - params : *isActive* it is int, must be one of [0, 1], 0 (inactive) or 1 (active)

### Response

- **Success Response**

  - **Status Code**: 200 OK
  - **Body**:
  ```json
    {
        "success": true,
        "result": 
        [
            
            {
            "id": 1,
            "name": "The Evil Tournament",
            "__id": "jHL8lsC6rf1TdI5qpFxy",
            "image": "https://images.app.goo.gl/xkji1Q8fJykeDjBT9",
            "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis nunc eu tortor facilisis ultricies. Nulla sagittis sed arcu at malesuada. Phasellus vel mi et massa congue dictum. Suspendisse posuere nibh et sagittis euismod. Sed consectetur arcu vel gravida fermentum. Nulla non urna iaculis, eleifend lacus sit amet, semper justo.",
            "createdAt": "2023-09-21T08:25:10.748Z",
            "expireAt": "2023-11-03T07:34:49.000Z",
            "quiz": []
            }
        ]
        }
  ```

- **Error Responses**

  - **Status Code**: 404 Not found
  - **Body**:
    ```json
        {
        "success": false,
        "error": 
            {
                "status": 400,
                "message": "\"isActive\" must be one of [0, 1]"
            }
        }
    ```

### Example Usage

```bash
curl -X GET http://localhost:3001/geh/api/v1/events/active/0
```

---

