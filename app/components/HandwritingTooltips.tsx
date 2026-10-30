'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/** Native title popups use the operating system's font, so render those in-page.
 * Observe attributes only; React retains complete ownership of its text nodes. */
export default function HandwritingTooltips() {
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null);

  useEffect(() => {
    let active: Element | null = null;
    const convert = (root: Element) => {
      const elements = [...(root.hasAttribute('title') ? [root] : []), ...Array.from(root.querySelectorAll('[title]'))];
      for (const element of elements) {
        const text = element.getAttribute('title');
        if (text) {
          element.setAttribute('data-rk-title', text);
          if (!element.textContent?.trim() && !element.hasAttribute('aria-label')) {
            element.setAttribute('aria-label', text);
          }
        } else element.removeAttribute('data-rk-title');
        element.removeAttribute('title');
      }
    };
    convert(document.body);
    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'attributes' && (record.target as Element).hasAttribute('title')) convert(record.target as Element);
        for (const node of Array.from(record.addedNodes)) if (node instanceof Element) convert(node);
      }
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['title'] });
    const hide = () => { active = null; setTip(null); };
    const show = (event: Event) => {
      const element = event.target instanceof Element ? event.target.closest('[data-rk-title]') : null;
      if (!element) { hide(); return; }
      if (active === element) return;
      active = element;
      const rect = element.getBoundingClientRect();
      setTip({ text: element.getAttribute('data-rk-title') || '', x: Math.max(8, Math.min(rect.left, window.innerWidth - 160)), y: rect.bottom + 6 });
    };
    const leave = (event: MouseEvent) => {
      if (active && (!(event.relatedTarget instanceof Node) || !active.contains(event.relatedTarget))) hide();
    };
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') hide(); };
    document.addEventListener('mouseover', show);
    document.addEventListener('mouseout', leave);
    document.addEventListener('focusin', show);
    document.addEventListener('focusout', hide);
    document.addEventListener('keydown', key);
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
    return () => {
      observer.disconnect();
      document.removeEventListener('mouseover', show);
      document.removeEventListener('mouseout', leave);
      document.removeEventListener('focusin', show);
      document.removeEventListener('focusout', hide);
      document.removeEventListener('keydown', key);
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
    };
  }, []);

  return tip ? createPortal(<div className="rk-tooltip" role="tooltip" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>, document.body) : null;
}
