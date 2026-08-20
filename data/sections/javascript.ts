import type { Section } from "@/types";
import {
  bilingual,
  callout,
  checklist,
  code,
  heading,
  interview,
  para,
} from "../helpers";

const JS_CODE = `// ===== CLOSURES — সবচেয়ে জরুরি concept =====
// Closure: একটি function যেটি তার outer scope এর variables মনে রাখে

function createCounter() {
  let count = 0; // private variable — বাইরে access নেই

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count   // closure এর মাধ্যমে count access
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getCount()); // 2

// ===== EVENT LOOP — JS single-threaded কিন্তু async কীভাবে? =====
console.log('1');          // Synchronous → Call Stack

setTimeout(() => {
  console.log('2');       // Macrotask queue → পরে execute
}, 0);

Promise.resolve().then(() => {
  console.log('3');       // Microtask queue → setTimeout এর আগে!
});

console.log('4');          // Synchronous
// Output: 1, 4, 3, 2  ← Event Loop এর কারণে

// ===== PROTOTYPE CHAIN =====
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() {
  return \`\${this.name} makes a sound\`;
};

const dog = new Animal('Rex');
dog.speak(); // dog নিজে speak নেই, prototype chain এ খোঁজে

// ===== ADVANCED ASYNC PATTERNS =====
// Promise.all — সব parallel run করো
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]); // সবচেয়ে fast — সব একসাথে চলে

// Promise.allSettled — একটা fail করলেও বাকিগুলো নেওয়া যায়
const results = await Promise.allSettled([api1(), api2(), api3()]);
results.forEach(result => {
  if (result.status === 'fulfilled') console.log(result.value);
  else console.error(result.reason);
});

// Promise.race — যেটা আগে finish করে সেটা নাও (timeout এর জন্য)
const withTimeout = Promise.race([
  fetchData(),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 3000)
  )
]);`;

const THIS_CODE = `const user = {
  name: 'Rahim',
  greet: function() {
    console.log(\`Hello, \${this.name}\`); // this = user ✅
  },
  greetArrow: () => {
    console.log(\`Hello, \${this.name}\`); // this = global/undefined ❌
  }
};

// call() — this manually set, arguments individually
function introduce(greeting, punctuation) {
  return \`\${greeting}, I am \${this.name}\${punctuation}\`;
}
introduce.call({ name: 'Karim' }, 'Hello', '!');

// apply() — same কিন্তু arguments array হিসেবে
introduce.apply({ name: 'Salam' }, ['Hi', '.']);

// bind() — new function return করে, this permanently বাঁধা
const boundFn = introduce.bind({ name: 'Nadia' });
boundFn('Hey', '!'); // this সবসময় Nadia হবে`;

const PERF_CODE = `// ===== DEBOUNCE — search input এর জন্য =====
// User typing বন্ধ করার 300ms পরে function চালায়
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const onSearch = debounce((query) => {
  console.log('API call:', query);
}, 300);

// ===== THROTTLE — scroll/resize এর জন্য =====
// নির্দিষ্ট interval এ maximum একবার চালায়
function throttle(fn, limit = 200) {
  let waiting = false;
  return (...args) => {
    if (waiting) return;
    fn(...args);
    waiting = true;
    setTimeout(() => (waiting = false), limit);
  };
}

// ===== MODULES — scope isolation =====
// math.js
export const add = (a, b) => a + b;
export default { add };

// app.js
import math, { add } from './math.js';
console.log(add(2, 3));

// ===== MEMORY LEAK এড়ানো =====
// 1. Global variables — window এ attach করো না
// 2. Event listeners — cleanup করো
// 3. Timers — clearTimeout করো
// 4. WeakMap/WeakSet — object reference হালকা রাখে`;

export const javascriptSection: Section = {
  id: "javascript",
  index: "03",
  icon: "⚡",
  title: "Advanced JavaScript",
  titleBn: "JavaScript এর গভীরে — Senior এর জন্য অবশ্যই জানতে হবে",
  gradient: "from-amber-500/20 to-red-500/10",
  badge: "med",
  blocks: [
    bilingual(
      "JavaScript Core Concepts",
      "Must Know",
      "Senior developer হতে হলে JavaScript এর ভেতরের mechanics বুঝতে হবে। শুধু syntax জানলেই হবে না। Event Loop কীভাবে কাজ করে, Closure কেন হয়, Prototype chain কী, Async/Await এর পেছনে Promise কীভাবে কাজ করে — এই সব জানতে হবে। Interview তে এগুলো সবচেয়ে বেশি জিজ্ঞেস করা হয়। একজন senior জানে যে setState এর মতো library function গুলোও এদের উপর ভিত্তি করেই বানানো।",
      "JavaScript mastery at a senior level means understanding the runtime — how the Call Stack, Web APIs, Callback Queue, and Event Loop work together. It means knowing why closures work, how prototypal inheritance differs from class-based inheritance, and deeply understanding asynchrony patterns. Frameworks come and go; this runtime knowledge never expires."
    ),
    code("closures-and-scope.js", "JavaScript", JS_CODE),
    bilingual(
      "this, bind, call, apply — Senior Trap!",
      "Interview Hot",
      "<code>this</code> keyword JavaScript এর সবচেয়ে confusing জিনিসগুলোর একটি। <code>this</code> এর value নির্ভর করে function কীভাবে call হয়েছে তার উপর। Arrow function এ <code>this</code> lexically bind হয় — মানে outer context থেকে নেয়। Regular function এ <code>this</code> call-site দেখে। React এ class component এর event handler এ এই problem টা সবচেয়ে বেশি দেখা যেত — তাই সবাই এখন arrow function / hooks use করে।",
      "<code>this</code> is one of the most misunderstood concepts. In regular functions, <code>this</code> depends on how the function is invoked. Arrow functions don't have their own <code>this</code> — they inherit it from the enclosing lexical scope. <code>bind()</code> permanently sets <code>this</code>, <code>call()</code> and <code>apply()</code> set it temporarily."
    ),
    code("this-keyword.js", "JavaScript", THIS_CODE),
    callout(
      "info",
      "💡",
      "Event Loop সম্পর্কে জিজ্ঞেস করলে বলো: Call Stack → Web APIs → Callback Queue (Macrotask) এবং Microtask Queue → Event Loop সিদ্ধান্ত নেয় কোনটা আগে execute হবে। Microtasks (Promises) সবসময় Macrotasks (setTimeout) এর আগে চলে।",
      "Interview Tip",
      "বাংলা: এই answer টা দিলে interviewer impressed হবেই। এটা মুখস্থ না রেখে বুঝে রাখো। console.log দিয়ে নিজে test করো।"
    ),
    heading("⏱️ Debounce vs Throttle — কখন কোনটা?"),
    para(
      "এই দুইটা concept প্রতিটা frontend interview এ আসে। **Debounce** মানে — একটা কাজ শুধু execute হবে যখন একটা নির্দিষ্ট silence পাবে (যেমন search box এ typing শেষ হলেই API call)। **Throttle** মানে — একটা নির্দিষ্ট সময়ের মধ্যে maximum একবারই execute হবে (যেমন scroll event এ প্রতি 200ms এ একবার)। ভুলবশত এগুলো ব্যবহার না করলে scroll/resize event এ শত শত function call হয় আর app laggy হয়ে যায়।",
      "বাংলা: Debounce = last এ দেরি শেষে একবার। Throttle = নির্দিষ্ট gap এ বারবার কিন্তু সীমিত। Search → debounce, scroll/resize → throttle।"
    ),
    code("debounce-throttle.js", "JavaScript", PERF_CODE),
    heading("🧠 Senior JavaScript — আর যা যা জানা দরকার"),
    checklist([
      { text: "Event Loop — Call Stack, Microtask, Macrotask order", bn: "setTimeout vs Promise order"},
      { text: "Prototypal inheritance vs class-based", bn: "Object.create(), __proto__"},
      { text: "Strict mode — 'use strict' কেন, কী করে", bn: "undefined this, silent errors"},
      { text: "Symbol, WeakMap, WeakSet — কখন use করবে", bn: "memory leak prevention"},
      { text: "Generator functions — lazy iteration", bn: "function* , yield"},
      { text: "Proxy & Reflect — meta programming", bn: "Vue 3 reactivity এর ভিত্তি"},
      { text: "Module system — ESM vs CommonJS", bn: "import/export vs require"},
      { text: "Web Workers — CPU-heavy কাজ offload", bn: "main thread freeze এড়াও"},
    ]),
    interview("💬 JavaScript Interview Questions (Senior)", [
      {
        q: "What is the output of `1`, `4`, `3`, `2` and why?",
        a: "Synchronous code runs first (1, 4). Microtasks (Promise callbacks) run before macrotasks (setTimeout callbacks) — so 3 then 2. The Event Loop processes the microtask queue to completion after each task before moving to the macrotask queue.",
        bn: "বাংলা: Sync code আগে (1,4), তারপর microtask (Promise = 3), তারপর macrotask (setTimeout = 2)। Event Loop প্রতিবার microtask queue পুরো empty করে তারপর macrotask নেয়।",
      },
      {
        q: "Explain closures with a real-world example.",
        a: "A closure is a function that remembers its lexical scope even after the outer function returns. Real examples: `useState` (state persists across renders via closure), debounce (timer variable persists), private variables in module patterns, and event handlers that capture values in loops.",
        bn: "বাংলা: Closure = function যেটা তার parent scope মনে রাখে। React এর useState, event listener, module pattern — সব কোথাও closure ব্যবহার হয়।",
      },
      {
        q: "Debounce vs Throttle — when would you use each?",
        a: "Debounce delays execution until a pause (search input — API call only after user stops typing). Throttle limits execution to once per interval (scroll/resize/mousemove). Search = debounce, infinite scroll = throttle.",
        bn: "বাংলা: Debounce = typing stop এর পর API call। Throttle = scroll এ নির্দিষ্ট interval এ একবার।",
      },
      {
        q: "`==` vs `===` — and what about `Object.is()`?",
        a: "`==` performs type coercion. `===` compares value and type (no coercion). `Object.is()` is like `===` but treats `NaN === NaN` as true and distinguishes `+0` vs `-0`. Always use `===` (or `Object.is` for NaN checks).",
        bn: "বাংলা: == দিলে JS type convert করে। === strict compare করে। Object.is() দিয়ে NaN check করা যায়। Production code এ always === ।",
      },
      {
        q: "What is hoisting and how does it affect `var`, `let`, and `function`?",
        a: "Hoisting moves declarations to the top of scope. Function declarations are fully hoisted (callable before definition). `var` is hoisted as `undefined` (no TDZ). `let`/`const` are hoisted but in the Temporal Dead Zone — accessing before declaration throws ReferenceError.",
        bn: "বাংলা: Function declaration পুরোটা উপরে চলে যায়। var hoist হয় undefined হিসেবে। let/const TDZ এ থাকে — declaration এর আগে access করলে error।",
      },
    ]),
  ],
};
