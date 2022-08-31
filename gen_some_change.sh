#!/bin/zsh

git checkout -b $1
touch $1
git add $1
git commit -m "Added a new file $1"
git push -u origin $1
git checkout staging
