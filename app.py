from flask import Flask, request, jsonify, render_template
import numpy as np
import tensorflow as tf
import joblib
import os

app = Flask(__name__, template_folder="views")  # Corrected double underscores

# Load the trained ANN model and preprocessors
model = tf.keras.models.load_model("models/crop_ann_model.h5")
scaler = joblib.load("models/scaler.pkl")
encoder = joblib.load("models/encoder.pkl")

@app.route('/')
def home():
    return render_template('inputs1.html')  # Serve the inputs page

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Extract input values in correct order
        features = np.array([
            data['N'], data['P'], data['K'], 
            data['temperature'], data['humidity'], 
            data['ph'], data['rainfall']
        ]).reshape(1, -1)
        
        # Normalize input features
        features_scaled = scaler.transform(features)
        
        # Predict crop
        predictions = model.predict(features_scaled)
        crop_index = np.argmax(predictions, axis=1)[0]
        
        # Decode label back to crop name
        predicted_crop = encoder.categories_[0][crop_index]
        
        return jsonify({'predicted_crop': predicted_crop})
    except Exception as e:
        return jsonify({'error': str(e)})

# Corrected entry point
if __name__ == '__main__':
    app.run(debug=True)
