export { ChatHandler, chat_names }

const chat_names = ["Sam", "Ali", "Steve", "Munna", "Ram", "Amar", "Raj"];
const chat_names_len = chat_names.length;

const chat_msgs = ["Hey, nice to see you back again...",
	"Good luck brother, I'll pray for the best...",
	"Deadline is closer, let's finish it up..."
	"Those were the moments, let's catch up..."];
const msgs_len = chat_msgs.length;

const total_imgs = 7;

class ChatHandler {
	constructor(chat_template, chat_list) {
		this.hashmap = new Map();
		this.linked_list = null;
		this.chat_template = chat_template;
		this.chat_list = chat_list;
		// initialize with current time-stamp
		let clock = new Date();
		this.hour = clock.getHour();
		this.mins = clack.getmins();
	}
}