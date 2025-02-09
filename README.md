## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# API Documentation

### Документацію зробив як на постмені так і в README.md

# Postman
```
https://github.com/ipzk241voo/api/blob/v1/API.postman_collection.json
```

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### Get Product List

```
GET /api/products
```

#### Query Parameters:

| Parameter | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| limit     | number | (Optional) Number of products per page |
| page      | number | (Optional) Page number                 |

### Body

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| selects   | string[] | (Selected) element of products |

#### Request Example:

```
GET /api/products?limit=10&page=2
```

#### Response Example:

```json
[
  {
    "title": "Product 1",
    "image": "image_url",
    "price": 100,
    "discount": 10,
    "description": "Detailed description of product 1",
    "short_description": "Short description of product 1"
  },
  {
    "title": "Product 2",
    "image": "image_url",
    "price": 200,
    "discount": 15,
    "description": "Detailed description of product 2",
    "short_description": "Short description of product 2"
  }
]
```

---

### Get a Single Product

```
GET /api/products/:productId
```

#### Path Parameters:

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| productId | string | ID of the product |

#### Request Example:

```
GET /api/products/123
```

#### Response Example:

```json
{
  "title": "Product 1",
  "image": "image_url",
  "price": 100,
  "discount": 10,
  "description": "Detailed description of product 1",
  "short_description": "Short description of product 1"
}
```

---

### Create a Product

```
POST /api/products
```

#### Request Body:

```json
{
  "title": "New Product",
  "image": "image_url",
  "price": 150,
  "discount": 5,
  "description": "Detailed description of new product",
  "short_description": "Short description of new product"
}
```

#### Response Example:

```json
{
  "title": "New Product",
  "image": "image_url",
  "price": 150,
  "discount": 5,
  "description": "Detailed description of new product",
  "short_description": "Short description of new product"
}
```

---

### Update a Product

```
PATCH /api/products/:productId
```

#### Path Parameters:

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| productId | string | ID of the product to update |

#### Request Body:

```json
{
  "title": "Updated Product Name",
  "image": "image_url",
  "price": 180,
  "discount": 8,
  "description": "Updated detailed description",
  "short_description": "Updated short description"
}
```

#### Response Example:

```json
{
  "title": "Updated Product Name",
  "image": "image_url",
  "price": 180,
  "discount": 8,
  "description": "Updated detailed description",
  "short_description": "Updated short description"
}
```

---

### Delete a Product

```
DELETE /api/product/:productId
```

#### Path Parameters:

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| productId | string | ID of the product to delete |

#### Request Example:

```
DELETE /api/product/123
```

#### Response Example:

```json
{
  "message": "ok"
}
```

---
