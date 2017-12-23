from flask import Flask, request, jsonify, render_template
from peewee import SqliteDatabase, Model, PrimaryKeyField, CharField, ForeignKeyField, IntegerField, DoesNotExist
from playhouse.shortcuts import model_to_dict, dict_to_model
from werkzeug.utils import secure_filename
from marshmallow import Schema, fields, ValidationError, validate
from flask_cors import CORS
from subprocess import call
import os

# Allowed file extensions and the directory to upload our audio files to (changes on the raspberry pi)
ALLOWED_EXTENSIONS = set(['mp3', 'wma', 'wav', 'm4a'])
UPLOAD_DIR = '/Users/edwinsantos/Music/audio'

# Globals for our API
app = Flask(__name__, static_folder='./build/static', template_folder='./build')
app.config['DEBUG'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_DIR
app.config['DATABASE_NAME'] = 'tabil.db'
db = SqliteDatabase(app.config['DATABASE_NAME'])
CORS(app)

# Check our list of allowed files to see if our uploaded file is acceptable
def allowed_file(filename):
    # check if our filetype is allowed
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Creates all the tables for the application
class BaseModel(Model):
    class Meta:
        database = db

class Audio(BaseModel):
    id = PrimaryKeyField()
    name = CharField(max_length=100, null=False)
    path = CharField(max_length=250, null=False)
    form = IntegerField(null=False)

class Events(BaseModel):
    id = PrimaryKeyField()
    time = CharField(max_length=5, null=False)
    voice = ForeignKeyField(Audio, related_name='event_voice')
    music = ForeignKeyField(Audio, related_name='event_music')
    day = CharField(max_length=10, null=False)
    
# This table stores the currently active event in the application
class Active(BaseModel):
    id = PrimaryKeyField()
    event_id = ForeignKeyField(Events, related_name='active_event')

def create_db():
    db.connect()
    db.create_tables([Audio, Events, Active])
    db.close()

def must_not_be_blank(data):
    if not data:
        raise ValidationError('Data not provided')

class AudioSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.String(
        validate=must_not_be_blank
    )
    form = fields.Int()

class AudioEventSchema(AudioSchema):
    # Override audio schema to make id an accepted field
    id = fields.Int()

class EventSchema(Schema):
    id = fields.Int(dump_only=True)
    time = fields.String()
    voice = fields.Nested(
        AudioEventSchema,
        validate=must_not_be_blank
    )
    music = fields.Nested(
        AudioEventSchema,
        validate=must_not_be_blank
    )
    day = fields.String(
        validate=validate.OneOf(
            choices=[
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
            ]
        )
    )
    class Meta:
        model = Events

audio_schema = AudioSchema()
event_schema = EventSchema()


# Event endpoints
@app.route('/api/events/<day>', methods=['GET'])
def get_day(day):
    # Returns an array of events specified by the <day> string sent to the endpoint
    events = []
    for event in Events.select().where(Events.day == day):
        events.append(model_to_dict(event))
    return jsonify({'data': events}), 200


@app.route('/api/events/<id>', methods=['DELETE', 'PATCH'])
def update_event(id):
    if request.method == 'PATCH':
        update_data = request.get_json()
        errors = event_schema.validate(update_data, partial=True)
        if errors:
            return jsonify(errors), 400
        try:
            db.connect()
            Events.get(Events.time == update_data['time'], Events.day == update_data['day'])
        except DoesNotExist:
            Events.update(**update_data).where(Events.id == id).execute()
            event = Events.get(Events.id == id)
            event_response = model_to_dict(event)
            db.close()
            return jsonify({'data': event_response}), 200, {'ContentType': 'application/json'}
        return jsonify({'error': 'Event already exists'}), 400, {'ContentType': 'application/json'}
        # Validation and event similarity checking complete, move onto update
        
    else:
        # Delete an event
        db.connect()
        Events.get(Events.id == id)
        event.delete_instance()
        db.close()
        return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

# TODO - Check if an event already exists for the bear before adding a new event
@app.route('/api/events/', methods=['POST'])
def create_events():
    event_data = request.get_json()
    db.connect()
    music = Audio.get(Audio.id == event_data['music']['id'])
    voice = Audio.get(Audio.id == event_data['voice']['id'])
    if (music.form != 1 and music.form != -1):
        return jsonify({'error': 'Audio chosen for music is not the correct form'}), 400, {'ContentType': 'application/json'} 
    if (voice.form != 0 and voice.form != -1):
        return jsonify({'error': 'Audio chosen for voice is not the correct form'}), 400, {'ContentType': 'application/json'}

    error = event_schema.validate(event_data, partial=True)
    if error:
       return jsonify(error), 400
    
    try:
        Events.get(Events.time == event_data['time'], Events.day == event_data['day'])
    except DoesNotExist:
        event = Events(
            time=event_data['time'],
            voice=event_data['voice']['id'],
            music=event_data['music']['id'],
            day=event_data['day'],
        )
        event.save()
        event_response = model_to_dict(event)
        db.close()
        return jsonify({'data': event_response}), 201
    db.close()
    return jsonify({'error': 'Event already exists'}), 400, {'ContentType': 'application/json'}


# Audio endpoints
@app.route('/api/audio/<id>', methods=['DELETE', 'PATCH'])
def modify_audio(id):
    if request.method == 'PATCH':
        # Change the name of the audio file (only on db for display. Not actual file)
        update_data = request.get_json()
        error = audio_schema.validate(update_data, partial=True)
        if error:
            return jsonify(error), 400
        # Check if we have an audio file in our DB with the same name we want to update to
        try:
            db.connect()
            Audio.get(Audio.name == update_data['name'])
        except DoesNotExist:
            Audio.update(**update_data).where(Audio.id == id).execute()
            audio = Audio.get(Audio.id == id)
            audio_response = model_to_dict(audio)
            db.close()
            return jsonify({'data': audio_response}), 200, {'ContentType': 'application/json'}
        return jsonify({'error': 'Audio file with that name already exists'}), 400
        
    else:
        # Delete an audio file from both the db and the actual filesystem
        db.connect()
        audio = Audio.get(Audio.id == id)
        os.remove(audio.path)
        if audio.form == 1:
            Events.delete().where(Audio.id == audio.id)
        else:
            Events.delete().where(Audio.id == audio.id)
        audio.delete_instance()
        db.close()
        return jsonify({'success': True}), 200, {'ContentType': 'application/json'}

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
            try:
                db.connect()
                Audio.get(Audio.name == filename)
            except DoesNotExist:
                # TODO - Rethink this a bit
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                update_data = request.get_json()
                audio = Audio(
                    name=update_data['name'],
                    path=os.path.join(app.config['UPLOAD_FOLDER'], update_data['name']),
                    form=0,
                )
                audio.save()
                audio_response = model_to_dict(audio)
                db.close()
                return jsonify({'data': audio_response}), 201
            return jsonify({'error': 'File with this name already exists on bear'}), 400
    else:
        # Get the list of all audio files on the bear
        db.connect()
        audios = []
        for audio in Audio.select():
            audios.append(model_to_dict(audio))
        db.close()
        return jsonify({'data': audios}), 200


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
    date_format = date_comps[2] + " " + date_comps[1] + " " + date_comps[4] + " " + date_comps[3]
    call(["sudo", "date", "-s", date_format])
    call(["echo", "Update the date and time of the bear"])
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/api/clean', methods=['POST'])
def clean():
    # Drop all the tables and recreate for a clean installation
    db.connect()
    weekdays = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ]
    db.drop_tables([Events, Audio, Active])
    db.create_tables([Events, Audio, Active])
    call(["/bin/echo", "Reset the bear"])
    audio = Audio(
        name='none',
        path='none',
        form=-1,
    )
    audio.save()
    for day in weekdays:
        event = Events(
            time="00:00",
            voice=1,
            music=1,
            day=day
        )
        event.save()
    db.close()
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
    event = Events.get(Events.id == id)
    voice = event.voice
    music = event.music
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
