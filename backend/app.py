# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import qrcode
# from io import BytesIO
# import base64

# app = Flask(__name__)
# CORS(app)

# @app.route('/scan', methods=['POST'])
# def scan_url():
#     data = request.get_json()
#     url = data.get('url')
#     if not url:
#         return jsonify({"error": "URL is required"}), 400

#     try:
#         # Generate a QR code for the URL
#         qr = qrcode.QRCode(
#             version=1,
#             error_correction=qrcode.constants.ERROR_CORRECT_L,
#             box_size=10,
#             border=4,
#         )
#         qr.add_data(url)
#         qr.make(fit=True)
        
#         # Create an image from the QR Code instance
#         img = qr.make_image(fill_color="black", back_color="white")
        
#         # Convert the QR code image to a byte stream
#         buffer = BytesIO()
#         img.save(buffer, "PNG")  # Remove format parameter, just specify format in method name
#         buffer.seek(0)
        
#         # Return the QR code as base64
#         return jsonify({
#             "qr_code_url": "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode('utf-8')
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode
from io import BytesIO
import base64
import os

app = Flask(__name__)

# Configure CORS for production
CORS(app, origins=[
    "http://localhost:3000",
    "https://your-vercel-app.vercel.app",  
    "https://*.vercel.app"
])

@app.route('/scan', methods=['POST'])
def scan_url():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        # Generate a QR code for the URL
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill='black', back_color='white')

        # Convert the QR code image to a byte stream
        buffer = BytesIO()
        img.save(buffer, "PNG")
        buffer.seek(0)

        # Return only the QR code URL
        return jsonify({
            "qr_code_url": "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode('utf-8')
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "QR Code Generator API is running"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)