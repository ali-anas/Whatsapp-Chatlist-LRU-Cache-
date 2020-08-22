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

	createNode(id) {
		// create node element and set pointers to prev and next
		let node = {};
		node['next'] = null;
		node['prev'] = null;
		// create copy of chat template
		let chat_item = this.chat_template.cloneNode(true);

		// set name, message, image to chat_item
		chat_item.querySelector("#Name").innerText = chat_names[id % chat_names_len];
		chat_item.querySelector("#Message").innerText = chat_msgs[id % msgs_len];
		chat_item.querySelector("#Image").src = "./images/avatar" + eval(1+(id % total_imgs)) + ".png";

		node['chat_item'] = chat_item;
		return node;
	}

	newMsg(id) {
		let node = null;
		if((id in this.hashmap) === false) {
			// i.e node with id-'id' is not present in linked list
			node = this.createNode(id);
			this.hashmap[id] = node;
		} else {
			// node is already present in linked list
			node = this.getNodeFromList(id);
		}

		// linked-list might be empty
		if(this.linked_list === null) {
			// set head
			this.linked_list = node;
		} else {
			// add node to top of list i.e head of linked_list
			node['next'] = this.linked_list;
			if(this.linked_list !== null) {
				this.linked_list['prev'] = node;
			}
			this.linked_list = node;
		}
		this.updateList();
	}

	deleteMsg() {
		let node = this.getNodeFromList(id);
		// now node is already isolated
		// it's pointers are released, see getNodeFromList

		// delete it's entry from hashmap
		delete this.hashmap[id];

		this.updateList();
	}

	getNodeFromList(id) {
		let node = this.hashmap[id];
		let prevNode = node['prev'];
		let nextNode = node['next'];

		// update prev and next pointers
		if(prevNode !== null) {
			prevNode['next'] = nextNode;
		}

		if(nextNode !== null) {
			nextNode['prev'] = prevNode;
		}

		// update head of linked list if node is head of linked_list
		if(node === this.linked_list) {
			this.linked_list = nextNode;
		}
		// release prev and next pointers of node
		node['next'] = null;
		node['prev'] = null;
		return node;
	}

	updateList() {
		// update the LAYOUT & contents of the list

		let innerHTML = '';
		let head = this.linked_list;
		while(head !== null) {
			let element = head['chat_item'];
			if(head === this.linked_list) {
				// style head(or most recent chat) differnently
				element.className = "ks-item ks-active";
				element.querySelector('#Time').innerHTML = this.getTime();
			} else {
				element.className = "ks-item";
			}

			innerHTML += element.outerHTML;
			head = head['next'];
		}
		this.chat_list.innerHTML = innerHTML;
	}

	getTime() {
		// create time-stamp for messages
		this.mins += 1;
		if(this.mins === 60) {
			this.hour += 1;
			this.mins = 0;
		}

		if(this.hour === 24) {
			this.hour = 0;
		}

		return ("0" + this.hour).slice(-2) + ":" + ("0" + this.mins).slice(-2);
	}
}