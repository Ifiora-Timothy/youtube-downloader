// utils/progressEmitter.js
import EventEmitter from 'events';

class ProgressEmitter extends EventEmitter {}

export default new ProgressEmitter();