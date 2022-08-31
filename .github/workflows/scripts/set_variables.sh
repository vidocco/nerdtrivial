#!/usr/bin/env bash

echo "DATE=$(date +'%Y/%m/%d')" >> "$GITHUB_ENV"
echo "BRANCH_DATE=$(date +'%Y-%m-%d')" >> "$GITHUB_ENV"
TARGET_BRANCH=""
TITLE=""

BRANCH=$(echo "$GITHUB_REF" | cut -d'/' -f 3)
if [[ $BRANCH == "staging" ]]; then
  TARGET_BRANCH=main
  TITLE=Production
else
  print "Unexpected source branch for release"
  exit 0
fi

PRS=$(git tag -l --no-merged origin/$TARGET_BRANCH | grep -o "[0-9]\+")

GITHUB_LINKS="<ul>"
AUTHORS=""
SLACK_MESSAGE=""

gen_emoji() {
  case $1 in
    feature) echo ":sparkles:" ;;
    fix) echo ":bug:" ;;
    experiment) echo ":alembic:" ;;
    improvement) echo ":art:" ;;
    refactor) echo ":recycle:" ;;
    dx) echo ":technologist:" ;;
    ops) echo ":technologist:" ;;
    *) echo ":sparkles:" ;;
  esac
}

gen_section() {
  echo "{\
    \"type\": \"mrkdwn\",\
    \"text\": \"$1 <$3| *$2*>\"\
  }"
}

CHANGE_COUNT=0

for pr_number in $PRS
do
  url=https://api.github.com/repos/vidocco/nerdtrivial/pulls/$pr_number
  link_url=https://github.com/vidocco/nerdtrivial/pull/$pr_number
  res=$(curl "$url" -H 'Content-Type: application/json' -H "Authorization: Bearer $GITHUB_TOKEN")
  owner="$(echo "$res" | jq --raw-output '.user.login')"
  pr_title="$(echo "$res" | jq --raw-output '.title' | sed 's/\\/\\\\/g' | sed 's/"/\\"/g')"
  label="$(echo "$res" | jq --raw-output '[.labels[]] | .[0] | .name')"
  emoji="$(gen_emoji "$label")"

  echo "$label"

  AUTHORS="$AUTHORS${owner:+$owner\n}"
  SLACK_MESSAGE="$SLACK_MESSAGE$(if [[ $CHANGE_COUNT -lt 10 ]]; then gen_section "$emoji" "$pr_title" "$link_url";fi)$(if [[ $CHANGE_COUNT -lt 9 ]]; then echo ",";fi)"
  GITHUB_LINKS="$GITHUB_LINKS<li>vidocco/nerdtrivial/pull/$pr_number</li>"
  CHANGE_COUNT=$((CHANGE_COUNT+1))
done

GITHUB_LINKS="$GITHUB_LINKS</ul>"
SLACK_MESSAGE="$SLACK_MESSAGE ]"

AUTHORS="$(echo -e "$AUTHORS" | sort --unique | sed -z 's/\n/,/g')"
AUTHORS="${AUTHORS:1:-1}"

{
  echo "LINKS=$GITHUB_LINKS";
  echo "TARGET_BRANCH=$TARGET_BRANCH";
  echo "TITLE=$TITLE";
  echo "AUTHORS=$AUTHORS";
  echo "SLACK_MESSAGE=$SLACK_MESSAGE";
  echo "CHANGE_COUNT=$CHANGE_COUNT";
} >> "$GITHUB_ENV"
