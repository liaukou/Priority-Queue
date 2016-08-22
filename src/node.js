class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (node) {
			node.parent = this;
			if (this.left && this.right) {
				//nothing
			} else if (!this.left) {
				this.left = node;
			} else if (this.left) {
				this.right = node;
			};
		};

	}

	removeChild(node) {
		node.parent = null;
		if (node === this.left) {
			this.left = null;
		} else if (node === this.right) {
			this.right = null;
		} else {
			throw "passed node is not a child of this node";
		};
	}

	remove() {
		if (!this.parent) {
			//nothing
		} else {
			this.parent.removeChild(this);
		};
	}

	swapWithParent() {
		if (!this.parent) {
			//nothing
		} else {
			let nodeRight;
			let nodeLeft;
			let nodeParent;

			if (this.left) {
				this.left.parent = this.parent;
			};
			if (this.right) {
				this.right.parent = this.parent;
			};

			if (this === this.parent.left) {
				nodeLeft = this.parent;
				if (nodeRight = this.parent.right) {
					this.parent.right.parent = this;
				}
			} else if (this === this.parent.right) {
				nodeRight = this.parent;
				if (nodeLeft = this.parent.left) {
					this.parent.left.parent = this;
				};
			};

			if (this.parent.parent) {
				nodeParent = this.parent.parent;
				if (this.parent === this.parent.parent.left) {
					this.parent.parent.left = this;
				} else {
					this.parent.parent.right = this;
				};
			};

			this.parent.parent = this;
			this.parent.left = this.left;
			this.parent.right = this.right;

			this.parent = nodeParent;
			this.left = nodeLeft;
			this.right = nodeRight;
		};
	}

}

module.exports = Node;
