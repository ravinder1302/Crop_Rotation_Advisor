# Crop Rotation System

## Overview

The Crop Rotation System is an integrated web platform that leverages machine learning and modern web technologies to recommend optimal crop rotations for farmers. It combines a user-friendly frontend, a robust backend, and a trained AI model to provide personalized crop suggestions, resource guides, and agricultural insights.

## Features
- **User Registration & Login:** Secure authentication with password hashing and Google OAuth support.
- **AI-Powered Crop Recommendation:** Predicts the best crop to plant based on soil and weather parameters using a trained neural network.
- **Interactive Dashboard:** Track recommendations, view stats, and access resources.
- **Resource Guides:** Educational content on soil, weather, pests, fertilizers, and market information.
- **Roadmap & Timeline:** Visual guides for crop rotation planning.
- **Modern UI/UX:** Responsive, animated, and accessible design.
  
## Architecture

- **Frontend:** HTML, CSS, JavaScript (with GSAP, AOS for animations)
- **Backend:**
  - Node.js/Express (user management, API gateway)
  - Python/Flask (machine learning model serving)
- **Database:** MongoDB (user data)
- **Machine Learning:** TensorFlow, scikit-learn (model training and inference)

```
[User] ⇄ [Frontend (HTML/CSS/JS)] ⇄ [Express.js API] ⇄ [Flask ML API] ⇄ [ML Model]
                                   ⇄ [MongoDB]
```

## Folder Structure

```
├── app.py                # Flask API for crop prediction
├── server.js             # Node.js/Express backend
├── train_model.py        # ML model training script
├── requirements.txt      # Python dependencies
├── package.json          # Node.js dependencies
├── models/               # ML models and user schema
│   ├── crop_ann_model.h5
│   ├── scaler.pkl
│   ├── encoder.pkl
│   └── User.js
├── data/
│   └── crop_recommendation.csv
├── views/                # Frontend HTML/CSS/JS and assets
│   ├── *.html
│   ├── style.css
│   ├── script.js
│   └── images, logos, etc.
├── index.html            # Main landing page
└── README.md
```

## Setup & Installation

### Prerequisites
- Node.js (v14+ recommended)
- Python 3.7+
- MongoDB (local or cloud instance)

### 1. Clone the Repository
```bash
git clone <repo-url>
cd Crop-Rotation-System-main
```

### 2. Install Backend Dependencies
#### Node.js/Express
```bash
npm install
```
#### Python/Flask
```bash
pip install -r requirements.txt
```

### 3. Prepare the Database
- Ensure MongoDB is running locally at `mongodb://127.0.0.1:27017/project_1` or update the connection string in `server.js`.

### 4. Train the Machine Learning Model (Optional)
If you want to retrain the model:
```bash
python train_model.py
```
This will generate `crop_ann_model.h5`, `scaler.pkl`, and `encoder.pkl` in the `models/` directory.

### 5. Start the Backend Servers
#### Start Flask (ML API)
```bash
python app.py
```
#### Start Node.js/Express (Main API)
```bash
node server.js
```

### 6. Access the Application
Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Usage
- Register or log in as a user.
- Navigate to the dashboard for crop recommendations.
- Enter soil and weather parameters to get AI-powered suggestions.
- Explore resources and guides for best agricultural practices.

## Machine Learning Model
- **Data:** `data/crop_recommendation.csv` (nutrient, weather, and crop label data)
- **Model:** Artificial Neural Network (TensorFlow/Keras)
- **Preprocessing:** StandardScaler for features, OneHotEncoder for labels
- **Training Script:** `train_model.py`
- **Serving:** Flask API (`app.py`)

## API Endpoints

### Express.js (Node Backend)
- `POST /signup-form` — Register a new user
- `POST /login` — User login
- `POST /predict` — Proxy to Flask ML API for crop prediction

### Flask (Python ML Backend)
- `POST /predict` — Accepts JSON with soil/weather parameters, returns predicted crop

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License
[MIT](LICENSE)

## Credits
- Developed by [Your Name/Team]
- Special thanks to open-source contributors and the agricultural data community

---

For questions or support, please open an issue or contact the maintainer.
