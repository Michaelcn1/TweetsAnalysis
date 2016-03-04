import tweepy
from tweepy.streaming import StreamListener
from tweepy import Stream, OAuthHandler
import couchdb
from couchdb.design import ViewDefinition
from fun_oauth_login import oauth_login
from fun_make_twitter_request import make_twitter_request
import settings
import json
import time

class MyModelParser(tweepy.parsers.ModelParser):
    def parse(self, method, payload):
        result = super(MyModelParser, self).parse(method, payload)
        result._payload = json.loads(payload)
        return result

if __name__ == "__main__":

    import sys

    if len(sys.argv) != 2:
        # user handle input file
        sys.stderr.write("USAGE: %s <pol-file>\n" % sys.argv[0])
        sys.exit()

    # user key
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth,parser=tweepy.parsers.JSONParser())

    poli_id =[]
    poli_names =[]
    for line in open(sys.argv[1]):
        line = line.strip()
        (pname,pid) = line.split()
        if (pid != 'N/A'):
            poli_names.append(pname)
            poli_id.append(pid)

    # couchdb config
    server = couchdb.Server('http://localhost:5984')
    DB = 'pol_info'
    try:
        db = server.create(DB)
    except couchdb.http.PreconditionFailed, e:
        db=server[DB]
    for pid in poli_id:
        results={}
        user = api.get_user(screen_name = pid,count=1)
        print user
        db.save(user)
