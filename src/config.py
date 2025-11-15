from authx import AuthX, AuthXConfig

# --- Ініціалізація AuthX ---
config = AuthXConfig()
config.JWT_SECRET_KEY = "your_secret_key"
config.JWT_ACCESS_COOKIE_NAME = "access_token"
config.JWT_TOKEN_LOCATION = ["cookies"]
security = AuthX(config=config)