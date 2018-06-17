# Video tooltip for video.js

Introduction
------------

HTML5 video tooltip for video.js. Hovering seek bar displays looping [Media Fragment](https://www.w3.org/TR/media-frags/).

Note: for looping functionality is required server side [partial content capability](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests) 
in certain browsers(Chrome)

Requirements
------------

- [videojs](https://github.com/videojs/video.js) >= v6 loaded (inc v7)

Installation
--------------

```
npm install videojs-video-tooltip
```

Simple example
--------------

```html
<html>
  <head>
    <!-- Load dependent stylesheets. -->
    <link href="path/to/video-js.css" rel="stylesheet">
    <link rel="stylesheet" href="path/to/videojs.video.tooltip.css" />
  </head>

  <body>
    <video id="content_video" class="video-js vjs-default-skin"
        controls preload="auto" width="YOUR_VIDEO_WIDTH" height="YOUR_VIDEO_HEIGHT">
      <source src="PATH_TO_YOUR_CONTENT_VIDEO" type="YOUR_CONTENT_VIDEO_TYPE" />
    </video>
    <script src="/path/to/video.v6.and.newer.js"></script>
    <script src="/path/to/videojs.video.tooltip.js"></script>
    <script>
      var player = videojs("content_video");
    </script>
  </body>
</html>
```

Settings
--------

**`height`** *(number)*  
height of video thumbnail element in px. Width is calculated via aspect ratio. Default: 90

**`duration`** *(number)*  
media fragment duration in seconds. Default: 5
