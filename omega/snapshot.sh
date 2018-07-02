#!/bin/sh

DIR="/tmp"
RES="1280x720"

usage () {
    echo "Functionality:"
    echo "    Take a photo from USB camera using fswebcam utility"
    echo "    Photo will be named based on system time"
    echo ""
    echo "Default Usage:"
    echo "$0 [OPTIONS]"
    echo "    Will take a $RES photo and store it in the $DIR directory"
    echo ""
    echo "Options:"
    echo "$0 [--dir <DIRECTORY>] [--res <WIDTHxHEIGHT>]"
    echo ""
    echo "--dir <DIRECTORY>"
    echo "    Output photo will be stored in the specified directory"
    echo "     Default directory is $DIR"
    echo "--res <WIDTHxHEIGHT>"
    echo "    Photo will be specified resolution. Must be WIDTHxHEIGHT format, ie 320x240"
    echo "     Default resolution is $RES"
}

while [ "$1" != "" ]
do 
    case "$1" in
        -r|--r|res|-res|--res)
            shift
            RES="$1"
            shift
        ;;
        -d|--d|dir|-dir|--dir)
            shift
            DIR="$1"
            shift
        ;;
        *)
            echo "ERROR: Invalid Argument: $1"
            usage
            exit
        ;;
    esac
done

fswebcam --no-banner -r $RES $DIR/`date +"%Y-%m-%d_%H%M%S"`.jpg


