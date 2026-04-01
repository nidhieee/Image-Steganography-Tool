# A unique binary delimiter to separate the GIF data from our secret data
DELIMITER = b"====STEGOVAULT===="

def encode_text_in_gif(gif_file, secret_text):
    # Read the raw binary data of the original GIF
    gif_bytes = gif_file.read()
    
    # Convert the secret text into binary bytes
    secret_bytes = secret_text.encode('utf-8')
    
    # Append the delimiter and the secret text directly to the end of the file
    new_gif_bytes = gif_bytes + DELIMITER + secret_bytes
    
    return new_gif_bytes

def decode_text_from_gif(gif_file):
    # Read the raw binary data of the uploaded GIF
    gif_bytes = gif_file.read()
    
    # Check if our unique delimiter exists in the binary data
    if DELIMITER in gif_bytes:
        # Split the binary data at the delimiter and grab everything after it
        parts = gif_bytes.split(DELIMITER)
        secret_bytes = parts[-1]
        
        # Convert those bytes back into a readable string
        return secret_bytes.decode('utf-8')
    else:
        return "No hidden message found."