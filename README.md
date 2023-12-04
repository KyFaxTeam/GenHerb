
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
  
- **Query Parameters**
  - query :
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
                    "id": 1,
                    "question": "Quel pays africain a été le premier à envoyer une sonde spatiale sur la lune en 2019, marquant ainsi une avancée significative dans l'exploration spatiale du continent ?",
                    "answer": "L'Afrique du Sud",
                    "points": 2,
                    "times": 10,
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
          "success": false,
          "error": 
          {
            "status": 400,
            "message": "This rubric doesn't exist"
          }
        }
    ```

### Example Usage

```bash
http://localhost:3001/geh/api/v1/quiz?rubric=Afrique
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



### Response

- **Success Response**

  - **Status Code**: 200 OK
  - **Body**:
  ```json
    {
      "success": true,
      "result": 
      [
        "Afrique",
        "Cinéma"
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
          "status": 404,
          "message": "Request doest not exist"
        }
      }
    ```

### Example Usage

```bash
curl -X GET http://api.example.com/quiz/allRubrics
```

--

# [Event](./readme.event.md)

