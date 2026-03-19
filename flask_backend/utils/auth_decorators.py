from functools import wraps
from flask import request, jsonify
import jwt
import os

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            token = token.split(" ")[1] # format: Bearer <token>
            secret = os.environ.get('SECRET_KEY', 'super-secret-key-123')
            data = jwt.decode(token, secret, algorithms=["HS256"])
            current_user = data
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401
        return f(current_user, *args, **kwargs)
    return decorated

def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(current_user, *args, **kwargs):
            if current_user.get('role') != role and current_user.get('role') != 'admin':
                return jsonify({'message': 'Permission denied! Requires {} role'.format(role)}), 403
            return f(current_user, *args, **kwargs)
        return decorated_function
    return decorator
