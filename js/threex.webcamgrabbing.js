var THREEx = THREEx || {}

// shim
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;

/**
 * Grab camera
 */
THREEx.WebcamGrabbing = function(){

	//////////////////////////////////////////////////////////////////////////////////
	//		Comments
	//////////////////////////////////////////////////////////////////////////////////
        // create video element
        var domElement        = document.createElement('video')
        domElement.setAttribute('autoplay', true)

	// window.domElement = video
	domElement.style.zIndex = -1;
    domElement.style.position = 'absolute'

	// domElement.style.top = '50%'
	// domElement.style.left = '50%'
	// domElement.style.marginRight = '50%'
	// domElement.style.transform = 'translate(-50%, -50%)'
	// domElement.style.minWidth = '100%'

	domElement.style.top = '0px'
	domElement.style.left = '0px'
	domElement.style.width = '100%'
	domElement.style.height = '100%'

		function videoAspect(){
				if( domElement.videoHeight === 0 )   return

                var asp = domElement.videoWidth / domElement.videoHeight;
				return asp;
		}
        /**
         * Resize video element.
         * - Made complex to handle the aspect change
         * - it is frequently when the mobile is changing orientation
         * - after a search on the internet, it seems hard/impossible to prevent browser from changing orientation
         */
        function onResize(){
                // is the size of the video available ?
                if( domElement.videoHeight === 0 )   return

                var videoAspect = domElement.videoWidth / domElement.videoHeight;
                var windowAspect = videoAspect;//window.innerWidth / window.innerHeight;
				
				//domElement.style.width = window.innerWidth;
				//domElement.style.height = window.innerHeight;

                // var video = document.querySelector('video')
//                 if( videoAspect < windowAspect ){
//                         domElement.style.left        = '0%'
//                         domElement.style.width       = window.innerWidth + 'px'
//                         domElement.style.marginLeft  = '0px'
//
//                         domElement.style.top         = '50%'
//                         domElement.style.height      =  (window.innerWidth/videoAspect) + 'px'
//                         domElement.style.marginTop   = -(window.innerWidth/videoAspect) /2 + 'px'
// console.log('videoAspect <<<<< windowAspect')
//                 }else{
//                         domElement.style.top         = '0%'
//                         domElement.style.height      = window.innerHeight+'px'
//                         domElement.style.marginTop   =  '0px'
//
//                         domElement.style.left        = '50%'
//                         domElement.style.width       =  (window.innerHeight*videoAspect) + 'px'
//                         domElement.style.marginLeft  = -(window.innerHeight*videoAspect)/2 + 'px'
// console.log('videoAspect >>>> windowAspect')
//                 }
        }

        window.addEventListener('resize', function(event){
                onResize()
        })

        // just to be sure - resize on mobile is funky to say the least
        setInterval(function(){
                onResize()
        }, 500)

        // get the media sources
		if (navigator.mediaDevices)
		{
			navigator.mediaDevices.enumerateDevices()
			.then(function(devices){
				var constraints = {
						video: true,
						audio: false,
				}
				devices.forEach(function(device) {
					if(device.kind  == 'videoinput'){
						constraints.video = {
								optional: [{sourceId: device.deviceId}]
						}
						//console.log("device.kind = " + device.kind + ", " + device.deviceId);
					}					
				});
				navigator.mediaDevices.getUserMedia(constraints)
				.then(function(stream) {
				  domElement.srcObject = stream;
				})
				.catch(function(err) {
				  console.error("Cant getUserMedia()! due to ", err);
				});
				/*navigator.mediaDevices.getUserMedia(constraints, function(stream){
						domElement.src = URL.createObjectURL(stream);
				}, function(error) {
						console.error("Cant getUserMedia()! due to ", error);
				});	*/			
			})
			.catch(function(err) {
			  console.log(err.name + ": " + err.message);
			});
		}else{
			MediaStreamTrack.getSources(function(sourceInfos) {
					// define getUserMedia() constraints
					var constraints = {
							video: true,
							audio: false,
					}
					// to mirror the video element when it isnt 'environment'
					// domElement.style.transform   = 'scaleX(-1)'

					// it it finds the videoSource 'environment', modify constraints.video
					for (var i = 0; i != sourceInfos.length; ++i) {
							var sourceInfo = sourceInfos[i];
							if(sourceInfo.kind == "video" && sourceInfo.facing == "environment") {
									constraints.video = {
											optional: [{sourceId: sourceInfo.id}]
									}
									// not to mirror the video element when it is 'environment'
									// domElement.style.transform   = ''
							}
					}

					// try to get user media
					//navigator.webkitGetUserMedia( constraints, function(stream){
					//navigator.getUserMedia( constraints, function(stream){
					navigator.mediaDevices.getUserMedia(constraints, function(stream){
							domElement.src = URL.createObjectURL(stream);
					}, function(error) {
							console.error("Cant getUserMedia()! due to ", error);
					});
			});			
		}
		

	this.domElement = domElement
}
