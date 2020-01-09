from flask import Flask, jsonify;
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'

socketIo = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = 'localhost'


@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None

if __name__ == '__main__':
    socketIo.run(app)