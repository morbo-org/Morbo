import { ref, shallowReactive } from "vue";

import { API_URL } from "./globals";

type FeedItemType = "directory" | "feed";

export class Feed {
  id = crypto.randomUUID();
  label: string;
  type: FeedItemType;
  counter: number;

  constructor(label: Feed["label"], type: Feed["type"], counter: Feed["counter"]) {
    this.label = label;
    this.type = type;
    this.counter = counter;
  }
}

class Feeds {
  value: Feed[] = [];

  constructor() {
    return shallowReactive(this);
  }

  add(label: string, type: FeedItemType, counter: number) {
    this.value = [...this.value, new Feed(label, type, counter)];
  }
}

class State {
  apiURL = ref(API_URL);

  username = ref("");
  isLoggedIn = ref(false);

  feeds = new Feeds();

  * [Symbol.iterator]() {
    for (const property in this) {
      const ref = this[property as keyof this];
      if (ref && typeof ref === "object" && "value" in ref) {
        yield [ref, property] as const;
      }
    }
  }
}

export const state = new State();
