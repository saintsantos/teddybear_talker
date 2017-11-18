from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.utils import secure_filename
from flask_cors import CORS
from subprocess import call
import os

# Allowed file extensions and the directory to upload our audio files to (changes on the raspberry pi)
ALLOWED_EXTENSIONS = set(['mp3', 'wma', 'wav', 'm4a'])
UPLOAD_DIR = '/home/pi/audio/'

# Globals for our API
app = Flask(__name__, static_folder='./build/static', template_folder='./build')
app.config['DEBUG'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_DIR
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///python.db'
app.config['SQLALCHEMY_ECHO'] = False
CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)


# Check our list of allowed files to see if our uploaded file is acceptable
def allowed_file(filename):
    # check if our filetype is allowed
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Creates all the tables for the application
class Audio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    path = db.Column(db.String(250), nullable=False)
    form = db.Column(db.Integer, nullable=False)

    def __init__(self, name, path, form):
        self.name = name
        self.path = path
        self.form = form


class Events(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String, nullable=False)
    voice = db.Column(db.Integer, nullable=False)
    music = db.Column(db.Integer, nullable=False)
    day = db.Column(db.String(10), nullable=False)

    def __init__(self, time, voice, music, day):
        self.time = time
        self.voice = voice
        self.music = music
        self.day = day

# This table stores the currently active event in the application
class Active(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer)

db.create_all()

# These are used for validation and converting the python data (dict) to json
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

# Event endpoints
@app.route('/api/events/<day>', methods=['GET'])
def get_day(day):
    # Returns an array of events specified by the <day> string sent to the endpoint
    return jsonify(events=events_schema.dump(Events.query.order_by(Events.time).filter_by(day=day)).data)


@app.route('/api/events/<id>', methods=['DELETE', 'PATCH'])
def update_event(id):
    if request.method == 'PATCH':
        # Update an event
        update_data = request.get_json()
        errors = event_schema.validate(update_data, partial=True)
        if errors:
            return jsonify(errors), 400
        existing_event = events_schema.dump(Events.query.filter_by(time=update_data['time'])).data
        if existing_event:
            for event in existing_event:
                if event['day'] == update_data['day'] and event['id'] != int(id):
                    return jsonify({'error': 'An event at that time already exists'}), 400, {'ContentType': 'application/json'}
        event = Events.query.filter_by(id=id).update(update_data)
        db.session.commit()
        return jsonify(event_schema.dump(event).data), 200, {'ContentType': 'application/json'}
    else:
        # Delete an event
        Events.query.filter_by(id=id).delete()
        db.session.commit()
        return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

# TODO - Check if an event already exists for the bear before adding a new event
@app.route('/api/events/', methods=['POST'])
def create_events():
    # Create a new event
    event_data = request.get_json()
    time = event_data['time']
    existing_event = events_schema.dump(Events.query.filter_by(time=time)).data
    if existing_event:
        for event in existing_event:
            if event['day'] == event_data['day']:
                return jsonify({'error': 'Event already exists'}), 400, {'ContentType': 'application/json'}
    error = event_schema.validate(event_data, partial=True)
    if error:
        return jsonify(error), 400
    event = Events(
        time=event_data['time'],
        voice=event_data['voice'],
        music=event_data['music'],
        day=event_data['day'],
        )
    db.session.add(event)
    db.session.commit()
    return jsonify(event_schema.dump(event).data)


# Audio endpoints
@app.route('/api/audio/<id>', methods=['DELETE', 'PATCH'])
def modify_audio(id):
    if request.method == 'PATCH':
        # Change the name of the audio file (only on db for display. Not actual file)
        update_data = request.get_json()
        error = audio_schema.validate(update_data, partial=True)
        if error:
            return jsonify(error), 400
        existing_name = audios_schema.dump(Audio.query.filter_by(name=update_data['name'])).data
        if len(existing_name) == 1 and existing_name[0]['id'] != int(id):
            return jsonify({'error': 'Audio file with that name already exists'}), 400
        audio = Audio.query.filter_by(id=id).update(update_data)
        db.session.commit()
        return jsonify(audio_schema.dump(audio).data), 200, {'ContentType': 'application/json'}
    else:
        # Delete an audio file from both the db and the actual filesystem
        audio = Audio.query.get(id)
        os.remove(audio.path)
        if audio.form == 1:
            Events.query.filter_by(music=audio.id).delete()
        else:
            Events.query.filter_by(voice=audio.id).delete()
        Audio.query.filter_by(id=id).delete()
        db.session.commit()
        return jsonify({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/api/audio/<form>')
def filter_audio(form):
    # Experimental filtering by audio type
    return jsonify(audio=audios_schema.dump(Audio.query.filter_by(form=form)).data)


@app.route('/api/audio/', methods=['GET', 'POST'])
def audio_handler():
    if request.method == 'POST':
        # Add a new audio file to the db
        if 'file' not in request.files:
            return jsonify({'No file': 'No file uploaded'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'No file': 'No file chosen'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            existing_audio = audios_schema.dump(Audio.query.filter_by(name=filename)).data
            existing_path = audios_schema.dump(Audio.query.filter_by(path=os.path.join(app.config['UPLOAD_FOLDER'], filename))).data
            if existing_audio or existing_path:
                return jsonify({'error': 'File with this name already exists on bear'}), 400
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            audio = Audio(
                name=filename,
                path=os.path.join(app.config['UPLOAD_FOLDER'], filename),
                form=0,
            )
            db.session.add(audio)
            db.session.commit()
            return jsonify(audio_schema.dump(audio).data), 201
        else:
            return jsonify({'error': 'This file is not allowed'}), 400
    else:
        # Get the list of all audio files on the bear
        return jsonify(audio=audios_schema.dump(Audio.query.all()).data)


# System calls for the bear
@app.route('/api/reboot', methods=['POST'])
def reboot():
    # Reboot the bear
    call(["/bin/echo", "Make the bear reboot"])
    call(["/usr/bin/sudo", "reboot"])
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/api/date', methods=['POST'])
def date_update():
    # Update the date and time of the bear
    date = request.get_json()
    date_comps = date['now'].split(" ")
    print(date_comps)
    date_format = date[2] + " " + date[1] + " " + date[4] + " " + date[3]
    # call([f'sudo date --set={date_format}'])
    call(["echo", "Update the date and time of the bear"])
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/api/clean', methods=['POST'])
def clean():
    # Drop all the tables and recreate for a clean installation
    weekdays = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ]
    db.drop_all()
    db.create_all()
    call(["/bin/echo", "Reset the bear"])
    audio = Audio(
        name='none',
        path='none',
        form=-1,
    )
    db.session.add(audio)
    for day in weekdays:
        event = Events(
            time="00:00",
            voice=1,
            music=1,
            day=day
        )
        db.session.add(event)
    db.session.commit()
    return jsonify({'successfully reset': True}), 200, {'ContentType': 'application/json'}


@app.route('/api/test/audio/<id>', methods=['POST'])
def test_audio(id):
    # Test an audio file to see how it sounds
    audio = Audio.query.get(id)
    call(["/usr/bin/omxplayer", audio.path])
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/api/test/event/<id>', methods=['POST'])
def test_event(id):
    # Test an event functions properly
    event = Events.query.get(id)
    voice = Audio.query.get(event.voice)
    music = Audio.query.get(event.music)
    call(["/usr/bin/omxplayer", voice.path])
    call(["/usr/bin/omxplayer", music.path])
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

# This endpoint is catch all for any urls in our react app. Allows for proper app refreshes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

# Actually start our app
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
