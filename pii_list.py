import easyocr
import numpy as np
import io
from PIL import Image, ImageDraw, ImageFilter
import re
from fuzzywuzzy import fuzz
import cv2
import warnings

class PIIDetector:
    PII_PATTERNS = {
        "Permanent Account Number": r'\b[A-Z]{5}[0-9]{4}[A-Z]\b',
        "Aadhaar Number": r'\b\d{12}\b|\b\d{4}\s\d{4}\s\d{4}\b',
        "Driving License Number": r'\b[A-Za-z0-9]{4}[- ]?\d{9,13}\b',
        "Passport Number": r'\b[A-Z]{1}[0-9]{7,9}\b',
        "Voter ID": r'[A-Z]{2,3}[0-9]{7,8}',
        "Credit Card": r'\b\d{4}\s\d{4}\s\d{4}\s\d{4}\b' # we can add more depending on the need 
    }

    def __init__(self):
        warnings.filterwarnings("ignore", category=FutureWarning, module="easyocr")
        warnings.filterwarnings("ignore", category=DeprecationWarning, module="PIL")
        self.reader = easyocr.Reader(['en'], gpu=True)

    def extract_text_from_image(self, image):
        try:
            data = self.reader.readtext(np.array(image))
            #print(data)
            text = ' '.join([text for _, text, _ in data])
            #print("Extracted Text:", text)  # Log the extracted text
            return text
        except Exception as e:
            print(f"Error extracting text from image: {e}")
            return None
    def detect_pii(self, text):
        detected_pii = {}
        for pii_type, pattern in self.PII_PATTERNS.items():
            matches = re.findall(pattern, text)
            if matches:
                detected_pii[pii_type] = True
        return detected_pii
    def detect_pii_info(self, image_bytes):
        try:
            image = Image.open(io.BytesIO(image_bytes))
            extracted_text = self.extract_text_from_image(image)
            if extracted_text is None:
                return {}

            pii_info = {}
            for label, pattern in self.PII_PATTERNS.items():
                matches = re.findall(pattern, extracted_text)
                if matches:
                    pii_info[label] = matches
            return pii_info
        except Exception as e:
            print(f"Error detecting PII: {e}")
            return {}

    def calculate_pii_positions(self, image_np, blur_options):
        positions = []
        try :
            data = self.reader.readtext(image_np)
            word_boxes = {}

            for bbox, word, _ in data:
                x1, y1 = int(bbox[0][0]), int(bbox[0][1])
                x2, y2 = int(bbox[2][0]), int(bbox[2][1])
                word = word.strip()
                if word:
                    word_boxes[word] = word_boxes.get(word, []) + [(x1, y1, x2, y2)]
                for pii_type, values in blur_options.items():
                    for value in values:
                        for word, boxes in word_boxes.items():
                            if fuzz.partial_ratio(value, word) > 80:
                                #print(fuzz.partial_ratio(value, word))
                                positions.extend(boxes)
        except Exception as e:
            print(f"Error calculating positions: {e}")
        return positions

    def blur_pii(self, image, positions):
        try:
            num_blur_passes = 5
            image = np.array(image)
            for (x1, y1, x2, y2) in positions:
                x1, y1 = max(0, x1), max(0, y1)
                x2, y2 = min(image.shape[1], x2), min(image.shape[0],y2)
                if x2 > x1 and y2 > y1:
                    kernel_size = (max(1, 75 | 1), max(1, 75 | 1))
                    roi = image[y1:y2, x1:x2]
                    for _ in range(num_blur_passes):
                        roi = cv2.GaussianBlur(roi, kernel_size, 0)
                    dilated_roi = cv2.dilate(roi, None, iterations =1)
                    image[y1:y2, x1:x2] = dilated_roi
            return Image.fromarray(np.uint8(image))
        except Exception as e:
            print(f"Error blurring PII regions : {e}")
            return image