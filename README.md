# TweetsAnalysis
Analyse tweets from Victoria area
**To deploy correctly, pls keep the directory structure and working in the deployment directory


a.Download personal key
	chmod 600 [YOUR KEY PAIR](with extension)


b.Download ec2 credential 
	
open 'ec2rc.sh' in ec2 credential directory
	
	EC2_ACCESS_KEY -> aws_access_key_id (input with single quotes)
	
	EC2_SECRET_KEY -> aws_secret_access_key (input with single quotes)


c.Put [YOUR KEY PAIR] in the deployment directory with 'fabfile.py'. 


1. On the tweets collection server, upload following source files and run: 
	
	friendship.py                (users follow each other infor)
	
	harvest_data.py              (collect each user's tweet)
	
	harvest_plinfo.py            (collect one tweet for each user)
	
	fun_make_twitter_request.py  (call twitter API sub function)
	
	fun_oauth_login.py           (twitter API call)
	
	settings.py                  (need to provide one's own credentials)
	
2. On the other Victorian public tweets collection server, upload following source file and run:
	
harvest_vic.py               (using tweepy to collect tweets from all over Victoria)


