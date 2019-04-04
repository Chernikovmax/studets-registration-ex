class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  sortedAdd(student) {
    let node = new Node(student);

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.length++;
      return this;
    }

    let current = this.head;

    while (current) {
      if (current.value.fullName >= student.fullName && current.value.groupNumber >= student.groupNumber) {
        if (current.prev === null) {
          node.next = current;
          current.prev = node;
          this.head = node;
          this.length++;
          return this;
        }
        current.prev.next = node;
        node.prev = current.prev;
        node.next = current;
        current.prev = node;
        this.length++;
        return this;
      }

      if (current.next === null) {
        node.prev = current;
        current.next = node;
        this.tail = node;
        this.length++;
        return this;
      }

      current = current.next;
    }
  }

  removeAt(position) {
    if (position === 0 && this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length--;
      return this;
    }
    if (position === 0 && this.length > 1) {
      this.head.next.prev = null;
      this.head = this.head.next;
      this.length--;
      return this;
    }
    if (position === this.length - 1) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
      this.length--;
      return this;
    }

    let current = this.head;
    let counter = 1;

    if (position <= (this.length-1 / 2)) {

      while (current) {
        current = current.next;
        if (counter === position) {
          current.prev.next = current.next;
          current.next.prev = current.prev;
          this.length--;
          return this;
        }
        counter++;
      }
    }

    if (position > (this.length-1 / 2)) {
      current = this.tail.prev;
      while (current) {
        current = current.prev;
        if (counter === position) {
          current.next.prev = current.prev;
          current.prev.next = current.next;
          this.length--;
          return this;
        }
        counter++;
      }
    }
  }
}
