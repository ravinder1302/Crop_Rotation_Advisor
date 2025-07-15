import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import joblib
import os

# Load dataset
df = pd.read_csv("data/crop_recommendation.csv")

# Encode categorical labels
encoder = OneHotEncoder(sparse_output=False)
labels_encoded = encoder.fit_transform(df[['label']])

# Normalize numerical features
scaler = StandardScaler()
features_scaled = scaler.fit_transform(df.drop(columns=['label']))

# Split dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features_scaled, labels_encoded, test_size=0.2, random_state=42)

# Define ANN model
model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(y_train.shape[1], activation='softmax')  # Output layer
])

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(X_train, y_train, epochs=50, batch_size=16, validation_data=(X_test, y_test), verbose=1)

# Evaluate the model
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {accuracy:.4f}")

# Ensure model directory exists
os.makedirs("models", exist_ok=True)

# Save the model and preprocessors
model.save("models/crop_ann_model.h5")
joblib.dump(scaler, "models/scaler.pkl")
joblib.dump(encoder, "models/encoder.pkl")
print("✅ Model and preprocessors saved successfully.")
