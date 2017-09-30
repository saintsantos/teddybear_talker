from flask import Flask, request, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from flask_potion import Api, ModelResource
from flask_marshmallow import Marshmallow
from werkzeug.utils import secure_filename
from flask_cors import CORS
from subprocess import call
import os

ALLOWED_EXTENSIONS = set(['mp3', 'wma', 'wav'])
UPLOAD_DIR = '/Users/edwinsantos/Music/audio/'

app = Flask(__name__)
#sqlite_db.create_tables([Jingle, Voice, Events, Active])
app.debug = True
app.config['UPLOAD_FOLDER'] = UPLOAD_DIR
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///python.db'
app.config['SQLALCHEMY_ECHO'] = False
CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)

# app.register_blueprint(events)
# app.register_blueprint(audiofiles)

def allowed_file(filename):
    # check if our filetype is allowed
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Creates all the tables for the application
class Audio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    path = db.Column(db.String(250), nullable=False)
    form = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Integer, nullable=False)

    def __init__(self, name, path, form, status):
        self.name = name
        self.path = path
        self.form = form
        self.status = status

class Events(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String, nullable=False)
    voice = db.Column(db.Integer, nullable=False)
    jingle = db.Column(db.Integer, nullable=False)
    day = db.Column(db.String(10), nullable=False)
    status = db.Column(db.String(10), nullable=False)

    def __init__(self, time, voice, jingle, day, status):
        self.time = time
        self.voice = voice
        self.jingle = jingle
        self.day = day
        self.status = status

db.create_all()

class EventSchema(ma.ModelSchema):
    class Meta:
        model = Events

event_schema = EventSchema()
events_schema = EventSchema(many=True)

class AudioSchema(ma.ModelSchema):
    class Meta:
        model = Audio
audio_schema = AudioSchema()
audios_schema = AudioSchema(many=True)

@app.route('/events/<day>', methods=['GET'])
def get_day(day):
    # print(day)
    return jsonify(events=events_schema.dump(Events.query.filter_by(day=day)).data)

@app.route('/events/<id>', methods=['DELETE', 'PATCH'])
def update_event(id):
    if request.method == 'PATCH':
        update_data = request.get_json()
        errors = event_schema.validate(update_data, partial=True)
        if errors:
            return jsonify(errors), 400
        event = Events.query.get(id).update(update_data)
        db.session.commit()
        return jsonify({'success': True}), 200, {'ContentType': 'application/json'}
    else:
        event = Events.query.get(id)
        db.session.delete(event)
        db.session.commit()
        return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/events/', methods=['POST'])
def create_events():
    event_data = request.get_json()
    print(event_data)
    error = event_schema.validate(event_data, partial=True)
    event = Events(
        time=event_data['time'],
        voice=event_data['voice'],
        jingle=event_data['jingle'],
        day=event_data['day'],
        status=event_data['status']
        )
    db.session.add(event)
    db.session.commit()
    return jsonify(event_schema.dump(event).data)

@app.route('/audio/<id>', methods=['DELETE', 'PATCH'])
def modify_audio(id):
    if request.method == 'PATCH':
        update_data = request.get_json()
        error = audio_schema.validate(update_data, partial=True)
        if error:
            return jsonify(error), 400
        audio = Audio.query.filter_by(id=id).update(update_data)
        db.session.commit()
        return jsonify({'success': True}), 200, {'ContentType': 'application/json'}
    else:
        audio = Audio.query.filter_by(id=id)
        db.session.delete(audio)
        db.session.commit()
        return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/audio/', methods=['GET', 'POST'])
def audio_handler():
    # TODO - Add capabilities to rename files when they are uploaded.
    if request.method == 'POST':
        if 'file' not in request.files:
            return({'No file': 'No file uploaded'})
        file = request.files['file']
        # print(file.filename)
        if file.filename == '':
            return ({'No file': 'No file chosen'})
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        audio = Audio(
            name = filename,
            path = os.path.join(app.config['UPLOAD_FOLDER'], filename),
            form = 0,
            status = 'active'
        )
        db.session.add(audio)
        db.session.commit()
        return jsonify(audio_schema.dump(audio).data)
    else:
        return jsonify(audio=audios_schema.dump(Audio.query.all()).data)

@app.route('/system/reboot', methods=['POST'])
def reboot():
    call(["echo", "Make the bear reboot"])
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/date', methods=['POST'])
def date_update():
    call(["echo", "Update the date and time of the bear"])
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/clean', methods=['POST'])
def clean():
    call(["echo", "Reset the bear"])
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/test/audio/<id>', methods=['POST'])
def test_audio(id):
    call(["echo", "test audio file"])
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/test/event/<id>', methods=['POST'])
def test_event(id):
    call(["echo", "test event"])
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

if __name__ == '__main__':
    app.run()
