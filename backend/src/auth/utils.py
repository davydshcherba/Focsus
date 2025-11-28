import bcrypt


def hash_password(password: str) -> str:
    """
    Хешує пароль за допомогою bcrypt
    
    Args:
        password: Пароль у відкритому вигляді
        
    Returns:
        Хешований пароль
    """
    # Генеруємо salt і хешуємо пароль
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Перевіряє чи відповідає пароль хешу
    
    Args:
        plain_password: Пароль у відкритому вигляді
        hashed_password: Хешований пароль з бази даних
        
    Returns:
        True якщо пароль правильний, False в іншому випадку
    """
    try:
        return bcrypt.checkpw(
            plain_password.encode('utf-8'), 
            hashed_password.encode('utf-8')
        )
    except Exception as e:
        print(f"Error verifying password: {str(e)}")
        return False