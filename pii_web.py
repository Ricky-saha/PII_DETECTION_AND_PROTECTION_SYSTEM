from flask import Flask, request, jsonify
import io
import base64
from pii_list import PIIDetector
import mimetypes
from flask_cors import CORS
import os
from PIL import Image
import numpy as np
from pdf2image import convert_from_bytes

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return "You have come to the wrong place."

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        app.logger.error("No file part in the request.")
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        app.logger.error("No selected file.")
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        mime_type, _ = mimetypes.guess_type(file.filename)
        results = {}

        if mime_type == 'application/pdf':
            file_content = file.read()
            pdf_images = convert_from_bytes(file_content)
            for image in pdf_images:
                image_bytes = io.BytesIO()
                image.save(image_bytes, format='PNG')
                image_bytes.seek(0)
                pii_info = PIIDetector().detect_pii_info(image_bytes.read())
                results.update(pii_info)
        else:
            file.seek(0)
            pii_info = PIIDetector().detect_pii_info(file.read())
            results.update(pii_info)
            print(pii_info)

            

        if results:
            return jsonify(results)
            print(results)
        else:
            return jsonify({'No PII detected. Please upload a properly scanned image.'})

    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({'error': 'An error occurred during file processing'}), 500

@app.route('/blur', methods=['POST'])
def blur_options():
    try:
        data = request.json
        app.logger.info("Received blur options: %s", data['blurOptions'])

        if not data or 'image' not in data or 'blurOptions' not in data:
            return jsonify({'error': 'No data or missing fields provided'}), 400

        image_data = data['image']
        blur_options = data['blurOptions']

        if not blur_options:
            return jsonify({'error': 'No blur options provided'}), 400

        try:
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
        except Exception as e:
            app.logger.error(f"Error processing image: {e}")
            return jsonify({'error': 'Invalid image data'}), 400

        image_np = np.array(image)

        # Calculate PII positions and blur
        pii_positions = PIIDetector().calculate_pii_positions(image_np, blur_options)
        blurred_image = PIIDetector().blur_pii(image, pii_positions)
        
        # Save blurred image to an in-memory buffer
        buffered = io.BytesIO()
        blurred_image.save(buffered, format="PNG")
        blurred_image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

        # Return the blurred image as a base64 string
        return jsonify({'status': 'success', 'blurredImage': blurred_image_base64, 'received': blur_options})
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({'error': 'An error occurred while processing blur options'}), 500

if __name__ == '__main__':
    app.run(port=8081, debug=True)