from authx import AuthX, AuthXConfig

config = AuthXConfig()

config.JWT_SECRET_KEY = "SUPER_SECRET_KEY"
config.JWT_ACCESS_COOKIE_NAME = "access_token"
config.JWT_TOKEN_LOCATION = ["cookies"]
config.JWT_COOKIE_SECURE = False  

security = AuthX(config=config)
