from flask import Flask
from flask_cors import CORS
from routes.analytics_route import analytics_bp

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*":{
            "origins":"*"
        }
    }
)

app.register_blueprint(
    analytics_bp,
    url_prefix='/api'
)

@app.route('/')
def health_check():
    return {
        'status': 'healthy',
        'service': 'lead-quality-dashboard'
    }


