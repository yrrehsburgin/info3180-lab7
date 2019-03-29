from flask import Flask
from flask_wtf.csrf import CSRFProtect 

UPLOAD_FOLDER = './app/static/uploads'
ALLOWED_IMAGES = set(['jpg', 'png', 'JPG','jpeg'])
app = Flask(__name__)
csrf = CSRFProtect(app)

app.config['SECRET_KEY'] = 'v\xf9\xf7\x11\x13\x18\xfaMYp\xed_\xe8\xc9w\x06\x8e\xf0f\xd2\xba\xfd\x8c\xda'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_IMAGES'] = ALLOWED_IMAGES

from app import views
