# angular-nest

## How To use

### angular-auth (Frontend)
install angular latest
install angular CLI
```
npm i
```

### nest-auth
install nestJS latest
install mySQL

```
npm i
```

## REST API


_Registrasi User_

```
http://localhost:8000/api/register

_Request Body_

Metod: POST

Input:
{
    "fullname": req.body
    "email" : req.body
    "password" : req.body
}

Output:
_Response ( 201 )_
{
    "fullname" : "fullname",
    "email": "email",
    "password": hashed password,
    "id": id
}
```

_Login_

```
http://localhost:8000/api/login

_Request Body_

Metod: POST

Input:
{
    "email" : 
    "password" : 
}

Output:
_Response ( 200 )_
{
    accessToken : jwt
}
```

_Update User_

```
http://localhost:8000/api/:id

Metod: PUT

Input:
{
    "fullname": req.body
    "email" : req.body
    "password" : req.body
}

Output:
_Response ( 201 )_
{
    "generatedMaps": [],
    "raw": [],
    "affected": 1
}
```

_Delete User_

```
http://localhost:8000/api/:id

Metod: DELETE

Output:
_Response ( 201 )_
{
    "User Deleted"
}
```