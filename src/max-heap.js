const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.sizeCount = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.isEmpty()) {
			//nothing
		} else {
			if (this.size() === 3) {
				this.parentNodes[this.parentNodes.length - 1] = this.root.right;
			};
			let root = this.detachRoot();
			this.restoreRootFromLastInsertedNode(root);

			if (this.root) {
				this.shiftNodeDown(this.root);
			};
			this.sizeCount--;
			return root.data;
		};
	}

	detachRoot() {
		let root = this.root;
		if (this.root === this.parentNodes[0]) {
			this.parentNodes.shift();
		};
		this.root = null;
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes[this.parentNodes.length - 1]) {
			let last = this.parentNodes.pop();
			if (last.left = detached.left) {
				detached.left.parent = last;
			};
			if (last.right = detached.right) {
				detached.right.parent = last;
			};
			this.parentNodes.unshift(last);
			last.remove();
			this.root = last;
		};
	}

	size() {
		return this.sizeCount;
	}

	isEmpty() {
		return(!this.root || !this.parentNodes);
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.sizeCount = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes[0] = node;
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right) {
				this.parentNodes.shift();
			};
		};
		this.sizeCount++;
	}

	shiftNodeUp(node) {
		if (node.parent) {
			if (node.priority > node.parent.priority) {
				let nodeParentIndex = this.parentNodes.indexOf(node.parent);
				let nodeIndex = this.parentNodes.indexOf(node);

				if (nodeParentIndex > -1) {
					this.parentNodes[nodeParentIndex] = node;
				};
				if (nodeIndex > -1) {
					this.parentNodes[nodeIndex] = node.parent;
				};

				node.swapWithParent();
				this.shiftNodeUp(node);
			};
		} else {
			this.root = node;
		};
	}

	shiftNodeDown(node) {
		let temp = this;
		if (node.left) {
			if (!node.right || node.left.priority > node.right.priority) {
				if (node.left.priority > node.priority) {

					let nodeIndex = this.parentNodes.indexOf(node);
					let nodeLeftIndex = this.parentNodes.indexOf(node.left);

					if (nodeIndex > -1) {
						temp.parentNodes[nodeIndex] = node.left;
					};
					if (nodeLeftIndex > -1) {
						temp.parentNodes[nodeLeftIndex] = node;
					};

					if (this.root === node) {
						this.root = node.left;
					};

					node.left.swapWithParent();
					this.shiftNodeDown(node);
				};

			} else if (node.left && node.left.priority < node.right.priority) {
				if (node.right.priority > node.priority) {

					let nodeIndex = this.parentNodes.indexOf(node);
					let nodeRightIndex = this.parentNodes.indexOf(node.right);

					if (nodeRightIndex > -1) {
						temp.parentNodes[nodeRightIndex] = node;
					};
					if (nodeIndex > -1) {
						temp.parentNodes[nodeIndex] = node.left;
					};

					if (this.root === node) {
						this.root = node.right;
					};

					node.right.swapWithParent();
					this.shiftNodeDown(node);
				};
			};

		} else if (node.right && !node.left) {
		 if (node.right.priority > node.priority) {
			 let nodeIndex = this.parentNodes.indexOf(node);
			 let nodeRightIndex = this.parentNodes.indexOf(node.right);

			 this.parentNodes.push(node);

			 if (nodeRightIndex > -1) {
				 temp.parentNodes[nodeRightIndex] = node;
			 };
			 if (nodeIndex > -1) {
				 temp.parentNodes[nodeIndex] = node.left;
			 };

			 if (this.root === node) {
				 this.root = node.right;
			 };

			 node.right.swapWithParent();
			 this.shiftNodeDown(node);
		 };
	 };
 }
}

module.exports = MaxHeap;
