#!/bin/bash
case $1 in
    "build")
        echo "Building composable-ui..."
        docker build -t composable-ui -f Dockerfile .
        echo
    ;;
    "run")
        echo "Running composable-ui..."
        docker run --mount type=bind,source=`pwd`/composable-ui,target=/composable-ui -p 3000:3000 composable-ui
        echo
    ;;
    *)
        echo "Not a valid argument. Please specify build or run."
        echo
esac
