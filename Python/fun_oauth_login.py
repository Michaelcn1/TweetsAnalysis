import os
import sys
import twitter
import settings

from twitter.oauth import write_token_file, read_token_file
from twitter.oauth_dance import oauth_dance

def oauth_login():

	return twitter.Twitter(domain='api.twitter.com', api_version='1.1',auth=twitter.oauth.OAuth(settings.access_token, settings.access_secret,settings.consumer_key, settings.consumer_secret))

if __name__ == '__main__':

	oauth_login()
