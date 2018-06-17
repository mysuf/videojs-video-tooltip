
import {getBoundingClientRect, debounce} from './util.js';

const Component = videojs.getComponent('Component');

class VideoTooltip extends Component {
	constructor(player, options) {
		super(player, options);

		this.height = options.height || 90;
		this.width = 160;
		this.duration = options.duration || 5;

		this.isSupported = false;
		this.currentTime = 0;
		this.video = null;
		this.debounceVideo = debounce(this.changeRange.bind(this),
			250, false, this);

		this.player_.ready(() => this.initVideo());
		this.on(this.player_, [
			'sourcechange', 
			'sourceset',
			'loadedmetadata',
			'resize',
			'fullscreenchange'
		], () => this.setSize())
	}

	initVideo() {
		this.isSupported = this.player_.techName_ === 'Html5';
		if (!this.isSupported) {
			this.hide();
			return;
		}

		this.video = document.createElement('video');
		this.video.muted = true;
		this.video.loop = true;
		this.video.autoplay = true;
		this.video.controls = false;
		if (!this.setSize()) {
			return;
		}
		this.video.setAttribute('playsinline', 'playsinline');
		this.el_.appendChild(this.video);
	}

	setSize() {
		let resizeRatio = this.height/this.player_.videoHeight();
		this.width = this.player_.videoWidth()*resizeRatio;
		this.video.height = this.height;
		this.video.width = this.width;
		if (this.width > this.player_.currentWidth()/2) {
			// screen is too small
			this.isSupported = false;
			this.video = null;
			this.hide();
			return false;
		}
		return true;
	}

	changeRange() {
		this.video.src = `${this.player_.src()}#t=${
			this.currentTime},${
			this.currentTime+this.duration}`;
	}

	createEl() {
		return super.createEl('div', {
			className: 'vjs-video-tooltip'
		});
	}
	
	update(seekBarRect, seekBarPoint) {
		if (!this.isSupported) {
			return;
		}

		var duration = this.player_.duration();
		var currentTime = (seekBarPoint * duration) | 0;

		// positioning copy/pasted from video.js TimeTooltip component
		var playerRect = getBoundingClientRect(this.player_.el());
		var seekBarPointPx = seekBarRect.width * seekBarPoint;

		if (!playerRect) {
			return;
		}

		var spaceLeftOfPoint = seekBarRect.left - playerRect.left + seekBarPointPx;
		var spaceRightOfPoint = seekBarRect.width - seekBarPointPx + (playerRect.right - seekBarRect.right);
		var pullRightBy = this.width / 2;
		var pullUpBy = this.height; // padding

		if (spaceLeftOfPoint < pullRightBy) {
			pullRightBy += pullRightBy - spaceLeftOfPoint;
		} else if (spaceRightOfPoint < pullRightBy) {
			pullRightBy = spaceRightOfPoint;
		}

		if (pullRightBy < 0) {
			pullRightBy = 0;
		} else if (pullRightBy > this.width) {
			pullRightBy = this.width;
		}

		this.el_.style.right = `-${pullRightBy}px`;
		this.el_.style.top = `-${pullUpBy}px`;

		if (((this.currentTime - 5) < currentTime && 
			(this.currentTime + this.duration) > currentTime) ||
			 !this.video) {
			return;
		}

		this.currentTime = currentTime;
		this.debounceVideo();
	}
}

videojs.registerComponent('videoTooltip', VideoTooltip);