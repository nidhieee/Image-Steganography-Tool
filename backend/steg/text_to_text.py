from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS so your React frontend (localhost:5173) can communicate with this API
CORS(app) 


def encode_text(cover_text, secret_message):
    if not cover_text: return "Cover text required"
    if not secret_message: return cover_text 
    
    binary_message = ''.join(format(ord(char), '08b') for char in secret_message)
    hidden_payload = ""
    for bit in binary_message:
        hidden_payload += '\u200B' if bit == '0' else '\u200C'
            
    return cover_text[:1] + hidden_payload + cover_text[1:]

def decode_text(encoded_text):
    if not encoded_text: return "No text provided"
    
    binary_message = ""
    for char in encoded_text:
        if char == '\u200B': binary_message += '0'
        elif char == '\u200C': binary_message += '1'
            
    if not binary_message: return "No hidden message found."
        
    all_bytes = [binary_message[i: i+8] for i in range(0, len(binary_message), 8)]
    decoded_message = ""
    for byte in all_bytes:
        if len(byte) == 8: 
            decoded_message += chr(int(byte, 2))
            
    return decoded_message

# --- API Endpoints ---

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
    # Runs the server on port 5000
    app.run(port=5000, debug=True)