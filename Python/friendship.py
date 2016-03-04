import twitter
import settings
import couchdb
from couchdb.design import ViewDefinition
from twitter.oauth import write_token_file, read_token_file
from twitter.oauth_dance import oauth_dance

pid =[];

# create twitter API object
twit = twitter.Twitter(domain='api.twitter.com', api_version='1.1',auth=twitter.oauth.OAuth())
server = couchdb.Server('http://localhost:5984')
DB = 'relationship'
try:
    db = server.create(DB)
except couchdb.http.PreconditionFailed, e:
    db=server[DB]
# the usernames whose relationship we want to examine
i = 0
j = 0
k = 0 
for i in range(5,6):
	source = pid[i]
	for j in range(i+1,len(pid)-1):
	# for j in range(0,len(pid)-1):
		target = pid[j]

		if (source <> target):
			k += 1
			print " %s: %s" % (source, target)
# print "%d" % k

# perform the API query
# twitter API docs: https://dev.twitter.com/docs/api/1/get/friendships/show
			result = twit.friendships.show(source_screen_name = source,
				target_screen_name = target)
			if (source in pid):
				result['relationship']='other'

			db.save(result['relationship'])

# # extract the relevant properties
			follows = result["relationship"]["target"]["followed_by"]
			print "%s following %s: %s" % (source, target, follows)
