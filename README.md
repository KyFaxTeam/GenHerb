# ***API-DOC***
This is a API for `Genie en Herbe` game
## API CONST

```javascript
 rubrics = ['africa', 'canada', 'cinema', 'dysnatie', 'geographie', 'geopolitique', 'musique', 'news', 'sport']
```


## SOLO QUESTIONNAIRE
- GET `/geh/api/v1/questionnaire` take two parameters.
    - **`rubric`** : is String tring whose value must be in const `rubric` or equal `General`
    - **`user_mail`** : is String, valid mail and it must be register for login by user <br>
    
    **Exemple** : [https://geh-aviy-jude200.vercel.app/geh/api/v1/questionnaire?rubric=Sport&user_mail=johndoe@geh.com](https://geh-aviy-jude200.vercel.app/geh/api/v1/questionnaire?rubric=Sport&user_mail=johndoe@geh.com)
    
    **Response**
    ```json
    {
        "status": {
            "ok": true,
            "message": null
        },
        "data": [
            {
                "rubric": "sport",
                "quiz": [
                    {
                        "question": "Qui détient le record du monde du saut à la perche féminin ?",
                        "answer": " Yelena Isinbayeva.\n",
                        "others": null
                    },
                    ...
                ]
            }
        ]
    }
    ```

## EVENT QUIZ
- GET `/geh/api/v1/event/active/<isActive>` : get all event. If `isActive` is equal to `1`, you receive a list of all `active event`, or if it is equal to `0` you receive a list of all `pass event`. <br>

    - **`user_mail`** : is String, valid mail and it must be register for login by user <br>

        **Exemple** : [https://geh-aviy-jude200.vercel.app/geh/api/v1/event/active/1?user_mail=johndoe@geh.com](https://geh-aviy-jude200.vercel.app/geh/api/v1/event/active/1?user_mail=johndoe@geh.com)

        **OUTPUT** : 
        ```json
        {
        "status": {
            "ok": true,
            "message": null
        },
        "data": [
            {
                "id": "XWvEA9jT4Sw5KL0pyIz1",
                "name": "The Word Tournament"
            },
            {
                "id": "jHL8lsC6rf1TdI5qpFxy",
                "name": "The Evil Tournament"
            },
            ...
        ]
        }
        ```

- GET `/geh/api/v1/event` : send the questionnaire of the event whose id is \<id> pass by query
    - **`id`** : is String whose value is knew by the `GET` request for have a active or pass event
    - **`user_mail`** : is String, valid mail and it must be register for login by user <br>

    **Exemple** : [https://geh-aviy-jude200.vercel.app/geh/api/v1/event?user_mail=johndoe@geh.com&id=XWvEA9jT4Sw5KL0pyIz1](https://geh-aviy-jude200.vercel.app/geh/api/v1/event?user_mail=johndoe@geh.com&id=XWvEA9jT4Sw5KL0pyIz1)

    **Response**
     ```json
        {
        "status": {
            "ok": true,
            "message": null
        },
        "data": {
            "id": "XWvEA9jT4Sw5KL0pyIz1",
            "name": "The Word Tournament",
            "details": "",
            "quiz": [...]
        }
    }
     ```
- GET `/geh/api/v1/event/statistic` : give the statistic of event whose `id` is \<id> pass by `query`
    - **`id`** : is String whose value is knew by the `GET` request for have a active or pass event
    - **`user_mail`** : is String, valid mail and it must be register for login by user <br>

- POST `/geh/api/v1/event/` : the user put these answer of event : 
    - Query
        - **`id`** : is String whose value is knew by the `GET` request for have a active or pass event
        - **`user_mail`** : is String, valid mail and it must be register for login by user <br>
    - Body : The body must be JSON form


- GET `/geh/api/v1/event/userResponse` : give user response of event whose `id` is \<id> pass by `query` and user mail is `user_mail`
    - **`id`** : is String whose value is knew by the `GET` request for have a active or pass event
    - **`user_mail`** : is String, valid mail and it must be register for login by user <br>

    **Exemple** : [https://geh-aviy-jude200.vercel.app/geh/api/v1/event/userResponse?user_mail=johndoe@geh.com&id=XWvEA9jT4Sw5KL0pyIz1](https://geh-aviy-jude200.vercel.app/geh/api/v1/event/userResponse?user_mail=johndoe@geh.com&id=XWvEA9jT4Sw5KL0pyIz1)

    **Response** : 
    ```json
    { 
        "status": {
            "ok": true,
            "message": null
        },
        "data": {
            "user_mail": "judeseruch@yahoo.com",
            "date": "Monday, 24th December 2023",
            "score": 344,
            "data": [
                ...
            ]
        }
    }
    ```





