/*jslint devel: true, node: true*/
var express = require('express');
var story = require('story');

function analyze(docs) {
    for(var doc in docs) {
        story.storyStudy(doc);
    }
}