#!/usr/bin/env python
import sys
import time
from datetime import datetime
import tweepy
import json
import couchdb
import settings

@classmethod
def parse(cls, api, raw):   
    status = cls.first_parse(api, raw)
    setattr(status, '_json', json)
    setattr(status, 'json', json.dumps(raw))
    return status

tweepy.models.Status.first_parse = tweepy.models.Status.parse
tweepy.models.Status.parse = parse

SERVER_URL = 'http://localhost:5984' 
DB = 'melbournetweets'

auth = tweepy.OAuthHandler(settings.consumer_key, settings.consumer_secret)
auth.set_access_token(settings.access_token, settings.access_secret)

server = couchdb.Server(SERVER_URL)

try:
    db = server.create(DB)

except couchdb.http.PreconditionFailed, e:
    db = server[DB]

class CustomStreamListener(tweepy.StreamListener):
    def __init__(self):
        tweepy.StreamListener.__init__(self)
        self.i = 0

streaming_api = tweepy.streaming.Stream(auth,CustomStreamListener(),timeout=60,secure=True)

try: 
    streaming_api.filter(follow=None, locations=[140.96,-39.16,149.98,-33.98])

except Exception, e:
    print >> sys.stderr, "Error: '%s' '%s'" % (str(datetime.now()), str(e))

finally:
    print >> sys.stderr, "disconnecting..."
    streaming_api.disconnect()