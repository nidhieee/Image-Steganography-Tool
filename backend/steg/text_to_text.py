import re

# ==========================================
# 1. PLAYFAIR CIPHER LOGIC (CRYPTOGRAPHY)
# ==========================================

def create_playfair_matrix(key):
    # Remove duplicates, replace J with I, and append remaining alphabet
    key = "".join(dict.fromkeys(key.upper().replace("J", "I") + "ABCDEFGHIKLMNOPQRSTUVWXYZ"))
    return [list(key[i:i+5]) for i in range(0, 25, 5)]

def find_position(matrix, char):
    for r in range(5):
        for c in range(5):
            if matrix[r][c] == char:
                return r, c
    return -1, -1

def prepare_text(text):
    # Playfair only uses letters (no spaces/numbers) and replaces J with I
    text = re.sub(r'[^A-Z]', '', text.upper().replace("J", "I"))
    prepared = ""
    i = 0
    while i < len(text):
        a = text[i]
        if i + 1 < len(text):
            b = text[i+1]
            if a == b: # Insert 'X' between duplicate letters in a pair
                prepared += a + 'X'
                i += 1
            else:
                prepared += a + b
                i += 2
        else:
            prepared += a + 'X' # Pad with 'X' if odd length
            i += 1
    return prepared

def playfair_process(text, key, encrypt=True):
    matrix = create_playfair_matrix(key)
    prepared = prepare_text(text) if encrypt else text
    result = ""
    shift = 1 if encrypt else -1

    for i in range(0, len(prepared), 2):
        r1, c1 = find_position(matrix, prepared[i])
        r2, c2 = find_position(matrix, prepared[i+1])

        if r1 == r2: # Same row
            result += matrix[r1][(c1 + shift) % 5] + matrix[r2][(c2 + shift) % 5]
        elif c1 == c2: # Same column
            result += matrix[(r1 + shift) % 5][c1] + matrix[(r2 + shift) % 5][c2]
        else: # Rectangle
            result += matrix[r1][c2] + matrix[r2][c1]
            
    return result

# ==========================================
# 2. ZERO-WIDTH LOGIC (STEGANOGRAPHY)
# ==========================================

def hide_payload(cover_text, payload):
    binary_message = ''.join(format(ord(char), '08b') for char in payload)
    hidden_payload = ""
    for bit in binary_message:
        hidden_payload += '\u200B' if bit == '0' else '\u200C'
    return cover_text[:1] + hidden_payload + cover_text[1:]

def extract_payload(stego_text):
    binary_message = ""
    for char in stego_text:
        if char == '\u200B': binary_message += '0'
        elif char == '\u200C': binary_message += '1'
            
    if not binary_message: return ""
        
    all_bytes = [binary_message[i: i+8] for i in range(0, len(binary_message), 8)]
    decoded_message = ""
    for byte in all_bytes:
        if len(byte) == 8: 
            decoded_message += chr(int(byte, 2))
    return decoded_message

# ==========================================
# 3. MAIN ENDPOINT FUNCTIONS
# ==========================================

def encode_text(cover_text, secret_message):
    if not cover_text: return "Cover text required"
    if not secret_message: return cover_text 
    
    # Step 1: Encrypt the secret message
    secret_key = "STEGOVAULT" # Hardcoded key for now
    encrypted_secret = playfair_process(secret_message, secret_key, encrypt=True)
    
    # Step 2: Hide the encrypted text inside the cover text
    final_stego_text = hide_payload(cover_text, encrypted_secret)
    
    return final_stego_text

def decode_text(encoded_text):
    if not encoded_text: return "No text provided"
    
    # Step 1: Extract the hidden encrypted payload
    encrypted_secret = extract_payload(encoded_text)
    
    if not encrypted_secret: return "No hidden message found."
    
    # Step 2: Decrypt the payload back to readable text
    secret_key = "STEGOVAULT"
    decrypted_secret = playfair_process(encrypted_secret, secret_key, encrypt=False)
    
    return f"DECRYPTED: {decrypted_secret}"