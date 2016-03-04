import sys
import time
from tweepy.streaming import StreamListener
from tweepy import Stream, OAuthHandler
import couchdb
from couchdb.design import ViewDefinition
from fun_oauth_login import oauth_login
from fun_make_twitter_request import make_twitter_request
import settings

def harvest_data(p_type,page_no,p_id):

	TIMELINE_NAME = p_type
	MAX_PAGES = int(page_no)
	USER = None
	KW = { # For the Twitter API call
		'count': 200,
		'skip_users': 'true',
		'include_entities': 'true',
		'since_id': 1,
		}

	if TIMELINE_NAME == 'user':
		USER = p_id
		KW['screen_name'] = USER
	if TIMELINE_NAME == 'home' and MAX_PAGES > 4:
		MAX_PAGES = 4
	if TIMELINE_NAME == 'user' and MAX_PAGES > 16:
		MAX_PAGES = 16
	if TIMELINE_NAME == 'public':
		MAX_PAGES = 1

	# Authentication is needed for harvesting home timelines.
	# Don't forget to add keyword parameters to the oauth_login call below
	# if you don't have a token file on disk.

	t = oauth_login()

	# Establish a connection to a CouchDB database.

	server = couchdb.Server('http://localhost:5984')
	DB = 'poli'

	try:
		db = server.create(DB)
	except couchdb.http.PreconditionFailed, e:
		
		# Already exists, so append to it, keeping in mind that duplicates could occur.
		
		db = server[DB]


	print >> sys.stderr, 'Done fetching tweets'

if __name__ == "__main__":

    import sys

    if len(sys.argv) != 2:
        sys.stderr.write("USAGE: %s <politician-file>\n" % sys.argv[0])
        sys.exit()

    poli_id =[]
    poli_names =[]
    for line in open(sys.argv[1]):
        line = line.strip()
        (pname,pid) = line.split()
        if (pid != 'N/A'):
        	poli_names.append(pname)
        	poli_id.append(pid)

    for pid in poli_id:
    	print "%s" % pid
        harvest_data('user',17,pid)
