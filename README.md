
---

# API Documentation

## Quiz
### Get Quiz for Single Player

#### Endpoint
**`GET /geh/api/v1/quiz?rubric=Afrique`**

#### Description
This endpoint is used to fetch a quiz for a single player.

#### Request
- **Headers**
  - `Content-Type`: application/json
  - 
- **Query Parameters**
  - params :
    - rubric : name of rubric whose want get quiz

### Response

- **Success Response**
  - **Status Code**: 200 OK
  - **Body**:
    ```json
        {
            "success": true,
            "result": 
            {
                "rubric": "Afrique",
                "quiz": 
                [
                
                {
                    "id": 2,
                    "question": "Quelle est la langue la plus largement parlée en Afrique, avec plus de 200 millions de locuteurs ?",
                    "answer": "Le swahili",
                    "otheranswers": null
                }, 
                ... ]
                }
        }
    ```

- **Error Responses**

  - **Status Code**: 400 Bad Request
  - **Body**:
    ```json
    {
        "success": true,
        "result": 
        {
            "rubric": "Afriqu",
            "quiz": 
            [
            
            ]
        }
    }
    ```

  - **Status Code**: 500 Internal Server Error
  - **Body**:
    ```json
        {
        "success": false,
        "result": "Internal server error. Please try again later.
    }
    ```

### Example Usage

```bash
curl -X GET http://api.example.com/quiz
```

---

## Get All Rubrics

### Endpoint

`GET /quiz/allRubrics`

### Description

This endpoint is used to retrieve all distinct rubrics.

### Request

- **Headers**
  - `Content-Type`: application/json

- **Query Parameters**
  - None

### Request Body Example

```json
{
  // Your request body here (if required)
}
```

### Response

- **Success Response**

  - **Status Code**: 200 OK
  - **Body**:
    ```json
    {
      "rubrics": ["a", "b", "c"]
    }
    ```

- **Error Responses**

  - **Status Code**: 500 Internal Server Error
  - **Body**:
    ```json
    {
      "error": "Internal server error. Please try again later."
    }
    ```

### Example Usage

```bash
curl -X GET http://api.example.com/quiz/allRubrics
```

---

Feel free to customize this documentation based on the actual functionality and requirements of your API. Include any additional details, such as authentication requirements or specific use cases.