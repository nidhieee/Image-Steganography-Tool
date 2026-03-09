from flask import Flask, request, jsonify
from flask_cors import CORS

from steg.text_to_text import encode_text, decode_text

app = Flask(__name__)
CORS(app) 

@app.route('/api/encode', methods=['POST'])
def api_encode():
    data = request.json
    cover = data.get('cover_text', '')
    secret = data.get('secret_message', '')
    
    result = encode_text(cover, secret)
    return jsonify({"encoded_text": result})

@app.route('/api/decode', methods=['POST'])
def api_decode():
    data = request.json
    encoded = data.get('encoded_text', '')
    
    result = decode_text(encoded)
    return jsonify({"decoded_message": result})

if __name__ == '__main__':
    app.run(port=5000, debug=True)