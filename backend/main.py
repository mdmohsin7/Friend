import json
import os

import firebase_admin
from fastapi import FastAPI

from modal import Image, App, asgi_app, Secret
from routers import workflow, chat, firmware, plugins, memories, transcribe_v2, notifications, \
    speech_profile, agents, facts, users, processing_memories, trends, sdcard, sync, apps, custom_auth, payment
from utils.other.timeout import TimeoutMiddleware

if os.environ.get('SERVICE_ACCOUNT_JSON'):
    service_account_info = json.loads(os.environ["SERVICE_ACCOUNT_JSON"])
    credentials = firebase_admin.credentials.Certificate(service_account_info)
    firebase_admin.initialize_app(credentials)
else:
    firebase_admin.initialize_app()

app = FastAPI()
app.include_router(transcribe_v2.router)
app.include_router(memories.router)
app.include_router(facts.router)
app.include_router(chat.router)
app.include_router(plugins.router)
app.include_router(speech_profile.router)
# app.include_router(screenpipe.router)
app.include_router(workflow.router)
app.include_router(notifications.router)
app.include_router(workflow.router)
app.include_router(agents.router)
app.include_router(users.router)
app.include_router(processing_memories.router)
app.include_router(trends.router)

app.include_router(firmware.router)
app.include_router(sdcard.router)
app.include_router(sync.router)

app.include_router(apps.router)
app.include_router(custom_auth.router)

app.include_router(payment.router)


methods_timeout = {
        "GET": os.environ.get('HTTP_GET_TIMEOUT'),
        "PUT": os.environ.get('HTTP_PUT_TIMEOUT'),
        "PATCH": os.environ.get('HTTP_PATCH_TIMEOUT'),
        "DELETE": os.environ.get('HTTP_DELETE_TIMEOUT'),
        }

app.add_middleware(TimeoutMiddleware,methods_timeout=methods_timeout)

modal_app = App(
    name='backend',
    secrets=[Secret.from_name("gcp-credentials"), Secret.from_name('envs')],
)
image = (
    Image.debian_slim()
    .apt_install('ffmpeg', 'git', 'unzip')
    .pip_install_from_requirements('requirements.txt')
)


@modal_app.function(
    image=image,
    keep_warm=0,
    memory=(512, 1024),
    cpu=2,
    allow_concurrent_inputs=10,
    timeout=60 * 10,
)
@asgi_app()
def api():
    return app


paths = ['_temp', '_samples', '_segments', '_speech_profiles']
for path in paths:
    if not os.path.exists(path):
        os.makedirs(path)


# @deprecated("use modal/job_modal.py")
# @modal_app.function(image=image, schedule=Cron('* * * * *'))
# async def notifications_cronjob():
#     await start_cron_job()


# @app.post('/webhook')
# async def webhook(data: dict):
#     diarization = data['output']['diarization']
#     joined = []
#     for speaker in diarization:
#         if not joined:
#             joined.append(speaker)
#         else:
#             if speaker['speaker'] == joined[-1]['speaker']:
#                 joined[-1]['end'] = speaker['end']
#             else:
#                 joined.append(speaker)
#
#     print(data['jobId'], json.dumps(joined))
#     # openn scripts/stt/diarization.json, get jobId=memoryId, delete but get memoryId, and save memoryId=joined
#     with open('scripts/stt/diarization.json', 'r') as f:
#         diarization_data = json.loads(f.read())
#
#     memory_id = diarization_data.get(data['jobId'])
#     if memory_id:
#         diarization_data[memory_id] = joined
#         del diarization_data[data['jobId']]
#         with open('scripts/stt/diarization.json', 'w') as f:
#             json.dump(diarization_data, f, indent=2)
#     return 'ok'

# opuslib not found? brew install opus &
# DYLD_LIBRARY_PATH=/opt/homebrew/lib:$DYLD_LIBRARY_PATH
