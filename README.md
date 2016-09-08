# dapper-clan

Edit your .git/config to be this:

[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = https://github.com/dallasbpeters/dapper-clan.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[remote "cloudnode"]
	url = cloudnode@git.cloudno.de:/git/mark.bradshaw/2874-4239cddf57e071cdfd3b3498fbee2599.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
