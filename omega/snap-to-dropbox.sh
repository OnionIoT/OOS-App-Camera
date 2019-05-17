
#!/bin/sh

#DATE=`date +"%Y-%m-%d_%H%M%S"`
DATE=`date +"%s"`
TOKEN=`cat /www/apps/oos-app-timelapse-camera/token.txt`


FNAME=$DATE.jpg
FPATH=/tmp/$FNAME

wget http://localhost:8080/?action=snapshot -O /tmp/snapshot.jpg

mv /tmp/snapshot.jpg $FPATH



curl -X POST https://content.dropboxapi.com/2/files/upload \
    --header "Authorization: Bearer $TOKEN" \
    --header "Dropbox-API-Arg: {\"path\": \"/$FNAME\",\"mode\": \"add\",\"autorename\": true,\"mute\": false}" \
    --header "Content-Type: application/octet-stream" \
    --data-binary @$FPATH


rm $FPATH
