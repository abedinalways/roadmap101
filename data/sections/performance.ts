import type { Section } from "@/types";
import {
  bilingual,
  callout,
  checklist,
  code,
  heading,
  para,
  topics,
} from "../helpers";

const PERF_CODE = `// ===== LAZY LOADING COMPONENTS =====
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));
const AdminPanel = lazy(() => import('./AdminPanel'));

function Dashboard() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HeavyChart />
    </Suspense>
  );
}

// ===== VIRTUALIZATION — Long lists এর জন্য =====
// 10,000 items render করতে react-virtual/tanstack-virtual ব্যবহার করো
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // প্রতি item এর height
  });
  // শুধু visible items render হয় — super fast!
}

// ===== DEBOUNCE — Search input optimize =====
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // cleanup
  }, [value, delay]);

  return debouncedValue;
}

// Search component এ ব্যবহার:
const debouncedSearch = useDebounce(searchTerm, 300);
// প্রতি keystroke এ API call না করে 300ms পর করে

// ===== WEB WORKERS — heavy task offload =====
const worker = new Worker(new URL('./worker.js', import.meta.url));
worker.postMessage({ type: 'process', payload: bigData });
worker.onmessage = (e) => setResult(e.data);`;

export const performanceSection: Section = {
  id: "performance",
  index: "09",
  icon: "🚀",
  title: "Performance Optimization",
  titleBn: "Fast, Smooth App বানানোর Senior Techniques",
  gradient: "from-emerald-500/20 to-cyan-500/10",
  badge: "senior",
  blocks: [
    bilingual(
      "Core Web Vitals — Google এর Performance Metrics",
      "SEO + UX",
      "<strong>LCP (Largest Contentful Paint):</strong> সবচেয়ে বড় content কত দ্রুত দেখা যাচ্ছে। Target: &lt;2.5s<br/><strong>INP (Interaction to Next Paint):</strong> User এর click/input এর কত দ্রুত response হচ্ছে। Target: &lt;200ms<br/><strong>CLS (Cumulative Layout Shift):</strong> Page load এর সময় element কতটা নড়াচড়া করছে। Target: &lt;0.1<br/><br/>এই তিনটা metric — Google এর ranking factor ও। অর্থাৎ performance শুধু UX না — এটা SEO। Senior developer এর দায়িত্ব Lighthouse/PageSpeed Insights দিয়ে নিজের site নিয়মিত audit করা।",
      "Core Web Vitals are Google's user-experience metrics that directly affect SEO rankings. <strong>LCP</strong> measures loading performance (target <2.5s); <strong>INP</strong> measures interactivity (target <200ms); <strong>CLS</strong> measures visual stability (target <0.1). These are also ranking factors — performance is SEO. Senior devs audit regularly with Lighthouse, PageSpeed Insights, and Chrome DevTools."
    ),
    topics([
      {
        icon: "📦",
        title: "Code Splitting & Lazy Loading",
        bn: "Bundle size কমাও",
        desc: "Dynamic import(), React.lazy() + Suspense, Next.js dynamic() দিয়ে components on-demand load করো। Initial bundle ছোট হয়, app fast হয়।",
        tags: ["Lazy", "Suspense", "Dynamic"],
      },
      {
        icon: "🖼️",
        title: "Image Optimization",
        bn: "Images optimize করো",
        desc: "WebP/AVIF format, lazy loading (loading=\"lazy\"), Next.js <Image> component, proper sizing, blur placeholder দিয়ে CLS কমাও।",
        tags: ["WebP", "Lazy Load", "CLS"],
      },
      {
        icon: "💾",
        title: "Caching Strategies",
        bn: "Smart caching",
        desc: "HTTP cache headers, Service Workers, React Query staleTime, Next.js fetch cache, CDN caching। Data কে smart ভাবে cache করো।",
        tags: ["Cache", "CDN", "SW"],
      },
      {
        icon: "🔧",
        title: "Bundle Analysis",
        bn: "Bundle কী আছে দেখো",
        desc: "@next/bundle-analyzer, webpack-bundle-analyzer দিয়ে bundle analyze করো। Tree shaking, dead code elimination, দেখো কোন package বড়।",
        tags: ["Webpack", "Tree Shake"],
      },
      {
        icon: "🧮",
        title: "Avoid Layout Thrashing",
        bn: "Read/Write cycle optimize",
        desc: "Repeatedly reading offsetHeight then writing styles forces synchronous layout recalculation. Batch reads and writes, or use requestAnimationFrame.",
        tags: ["Layout", "rAF"],
      },
      {
        icon: "🖥️",
        title: "Web Workers",
        bn: "Main thread freeze এড়াও",
        desc: "Image processing, JSON parsing, large calculations — Web Worker এ move করো যেন UI কখনো block না হয়।",
        tags: ["Worker", "Thread"],
      },
    ]),
    code("performance-patterns.tsx", "React + Next.js", PERF_CODE),
    heading("✅ Performance Checklist — Production এ যাওয়ার আগে"),
    checklist([
      { text: "Bundle size < 150kb (gzip) — main bundle", bn: "bundle-analyzer দিয়ে check করো"},
      { text: "LCP < 2.5s — font, hero image, render-blocking এ দেখো", bn: "next/font ব্যবহার করো"},
      { text: "INP < 200ms — long tasks ভাগ করো", bn: "debounce, worker, code split"},
      { text: "CLS < 0.1 — image dimension, font swap ঠিক রাখো", bn: "aspect-ratio দাও"},
      { text: "Image ও video optimize — WebP/AVIF", bn: "সবচেয়ে বড় bundle hog"},
      { text: "Caching policy ঠিক আছে — immutable vs revalidate", bn: "Cache-Control headers"},
      { text: "Lighthouse score 90+ (mobile)", bn: "PageSpeed Insights এ test করো"},
      { text: "3rd-party scripts defer — analytics/ads এ সাবধান", bn: "যত দেরি তত ভালো"},
    ]),
    callout(
      "tip",
      "💡",
      "Performance optimization কখনো guess করে করো না — **profile করে করো**। Chrome DevTools Performance panel দিয়ে find করো bottleneck, তারপর fix করো। Measurement ছাড়া optimization হলো অন্ধকারে তীর ছোড়া।",
      "Measure First",
      "বাংলা: আগে measure, তারপর optimize। Lighthouse, DevTools Performance, React Profiler — এই ৩টা tool যথেষ্ট।"
    ),
  ],
};
