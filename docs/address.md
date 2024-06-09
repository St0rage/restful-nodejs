# Address API Spec

## Create Address API

Endpoint : POST /api/contact/:contactId/addresses

Headers :

- Authorization

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Reponse Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contact/:contactId/addresses/:addressId

Headers :

- Authorization

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Reponse Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Endpoint : GET /api/contact/:contactId/addresses/:addressId

Headers :

- Authorization

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Reponse Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## List Addresses API

Endpoint : GET /api/contact/:contactId/addresses

Headers :

- Authorization

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Negara apa",
      "postal_code": "Kode pos"
    },
    {
      "id": 2,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Negara apa",
      "postal_code": "Kode pos"
    }
  ]
}
```

Reponse Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contact/:contactId/addresses/:addressId

Headers :

- Authorization

Response Body Success :

```json
{
  "data": "OK"
}
```

Reponse Body Error :

```json
{
  "errors": "Address is not found"
}
```
