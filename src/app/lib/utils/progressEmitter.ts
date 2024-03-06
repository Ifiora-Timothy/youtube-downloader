// utils/progressEmitter.js
import EventEmitter from 'events';

class ProgressEmitter extends EventEmitter {}
class PlaylistEmitter extends EventEmitter {}

export const PlaylistProgressEmitter= new PlaylistEmitter();
export default new ProgressEmitter();