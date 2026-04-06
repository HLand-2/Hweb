import random

def generate_password(length=12):
    # All possible characters: letters, numbers, and symbols
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
    
    # Randomly pick characters and join them into a single string
    password = "".join(random.choice(chars) for _ in range(length))
    
    return password

# Generate and print a 16-character password
print(f"Your new password is: {generate_password(16)}")
