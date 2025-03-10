# text-enhancement-api
# AI-Powered Text Enhancement API

This API enhances text using the Google Gemini API. It provides endpoints to refine grammar, improve clarity, and modify tone and length.

## 🚀 Setup Instructions

### Prerequisites
- Install [Node.js](https://nodejs.org/) (LTS version recommended)
- Get API credentials for Google Gemini API

### Installation
```sh
# Clone the repository
git clone https://github.com/your-repo/text-enhancement-api.git
cd text-enhancement-api

# Install dependencies
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add:
```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=3000  # Change if needed
```

### Run the Server
```sh
npm start
```
The API will be available at `http://localhost:3000`.

---

## 📌 API Documentation

### 1️⃣ **Enhance Text**
**Endpoint:** `POST /api/enhance`

**Request Body:**
```json
{
  "text": "This are a bad gramar sentence which need improve."
}
```

**Response:**
```json
{
  "enhanced_text": "This is a sentence with poor grammar that requires improvement.",
  "changes": "Corrected grammatical errors and improved sentence structure for clarity."
}
```

### 2️⃣ **Modify Text (Tone & Length)**
**Endpoint:** `POST /api/modify`

**Request Body:**
```json
{
  "text": "Yesterday we was go to the park and it was very fun. The kids play with they toys and we eat lot of foods. It was many peoples there and everybody was happy. I think we should go park again because it nice place to enjoy and relax.",
  "length": "longer",
  "tone": "formal"
}
```

**Response:**
```json
{
    "enhancedText": "Yesterday, we visited the park, and it proved to be a very enjoyable experience. The children played with their toys, and we consumed a considerable amount of food. There were many people present, and everyone appeared to be in good spirits. I believe we should revisit the park in the future, as it is a pleasant location to unwind and find respite from the demands of daily life.",
    "changes": "Corrected grammatical errors (e.g., 'was go' to 'visited'), improved sentence structure, replaced informal language with more formal vocabulary (e.g., 'fun' to 'enjoyable experience', 'lot of foods' to 'considerable amount of food'), and lengthened sentences to achieve a more formal tone."
}
```

---

## 📋 Example API Requests

### cURL Request (Enhance Text)
```sh
curl -X POST "http://localhost:3000/api/enhance" \
     -H "Content-Type: application/json" \
     -d '{"text": "This are a bad gramar sentence which need improve."}'
```

### Postman Example
1. Open Postman
2. Set **Method** to `POST`
3. Use URL `http://localhost:3000/api/enhance`
4. Select **Body** → **raw** → **JSON**
5. Paste:
```json
{
  "text": "This are a bad gramar sentence which need improve."
}
```
6. Click **Send**

---

## 🔧 Error Handling
| Status Code | Meaning |
|------------|---------|
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Invalid route |
| 500 | Internal Server Error |

---

## 📌 License
This project is licensed under the MIT License.

