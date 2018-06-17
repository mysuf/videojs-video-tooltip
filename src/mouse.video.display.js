
import './video.tooltip.js';
import {formatTime} from 'video.js';

const MouseTimeDisplay = videojs.getComponent('MouseTimeDisplay');

class MouseVideoDisplay extends MouseTimeDisplay {

	update(seekBarRect, seekBarPoint) {

		// If there is an existing rAF ID, cancel it so we don't over-queue.
		if (this.rafId_) {
			this.cancelAnimationFrame(this.rafId_);
		}

		this.rafId_ = this.requestAnimationFrame(() => {
			var duration = this.player_.duration();
			var content = formatTime(seekBarPoint * duration, duration);
			this.el_.style.left = seekBarRect.width * seekBarPoint + 'px';

			this.getChild('timeTooltip').update(seekBarRect, seekBarPoint, content);
			this.getChild('videoTooltip').update(seekBarRect, seekBarPoint);
		});    
	}
}

MouseVideoDisplay.prototype.options_ = {
    children: ['videoTooltip', 'timeTooltip']
};

// replaces built-in mouseTimeDisplay
videojs.registerComponent('mouseTimeDisplay', MouseVideoDisplay);