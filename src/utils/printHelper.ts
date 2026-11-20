/**
 * Production-grade Print and PDF generation utility for JIGSY INDIA.
 * Features:
 * 1. Direct PDF Generation (.pdf) using html2canvas & jsPDF with single-page fitting option.
 * 2. In-browser Direct Printing preserving all exact styles, colors, letterheads, and margins without printing blank sheets.
 * 3. Native fallback window printing if iframes are restricted by browser policy.
 */
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PrintDocOptions {
  title: string;
  filename: string;
  contentHtml: string;
  element?: HTMLElement | null;
  orientation?: 'portrait' | 'landscape';
  autoPrint?: boolean;
}

/**
 * Replaces CSS function calls (like color-mix(...), oklch(...), oklab(...))
 * handling nested parentheses accurately.
 */
export function replaceCssFunctionCalls(
  input: string,
  fnNames: string[],
  replacer: (fullMatch: string, fnName: string) => string
): string {
  if (!input) return input;
  const pattern = new RegExp(`\\b(${fnNames.join('|')})\\(`, 'gi');
  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    const startIdx = match.index;
    const fnName = match[1].toLowerCase();
    let depth = 1;
    let cursor = pattern.lastIndex;

    while (cursor < input.length && depth > 0) {
      const ch = input[cursor];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      cursor++;
    }

    if (depth === 0) {
      result += input.slice(lastIndex, startIdx);
      const fullCall = input.slice(startIdx, cursor);
      result += replacer(fullCall, fnName);
      lastIndex = cursor;
      pattern.lastIndex = cursor;
    } else {
      break;
    }
  }

  result += input.slice(lastIndex);
  return result;
}

/**
 * Normalizes modern CSS gradient color-space interpolation hints (e.g. "to right in oklab")
 * that html2canvas's CSS parser does not understand.
 */
export function stripGradientColorSpaceHints(cssText: string): string {
  if (!cssText) return cssText;
  return cssText.replace(/\s+in\s+(?:oklab|oklch|lab|lch|srgb-linear|srgb|hsl|hwb)\b/gi, '');
}

/**
 * Collects all current document stylesheets (Tailwind Vite styles, fonts, index.css)
 * so they can be injected into any standalone document or hidden printing iframe.
 */
export function getDocumentStyleTags(): string {
  if (typeof document === 'undefined') return '';
  const styles: string[] = [];

  // Collect all style tags
  document.querySelectorAll('style').forEach((el) => {
    styles.push(el.outerHTML);
  });

  // Collect all link stylesheets
  document.querySelectorAll('link[rel="stylesheet"]').forEach((el) => {
    styles.push(el.outerHTML);
  });

  return styles.join('\n');
}

/**
 * Builds a standalone, fully styled HTML document that retains 100% of the
 * page styling, typography, colors, borders, and watermarks even when opened offline.
 */
export function buildStandalonePrintHtml(options: PrintDocOptions): string {
  const { title, contentHtml, autoPrint = false } = options;
  const collectedStyles = getDocumentStyleTags();

  const isLandscape = options.orientation === 'landscape';
  const maxWidth = isLandscape ? '1100px' : '820px';
  const pageSize = isLandscape ? 'A4 landscape' : 'A4 portrait';

  const autoPrintScript = autoPrint
    ? `<script>
    (function() {
      var didPrint = false;
      function triggerOnce() {
        if (didPrint) return;
        didPrint = true;
        try { window.print(); } catch(e) { console.warn(e); }
      }
      window.addEventListener('load', function() {
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(function() {
            setTimeout(triggerOnce, 350);
          });
        } else {
          setTimeout(triggerOnce, 450);
        }
      });
    })();
  </script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  
  <!-- Web Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap" rel="stylesheet">
  
  <!-- Injected Host Application Stylesheets (Includes compiled Tailwind 4 rules) -->
  ${collectedStyles}

  <style>
    @page {
      size: ${pageSize};
      margin: ${isLandscape ? '0' : '6mm 8mm'};
    }
    *, *::before, *::after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #0f172a;
      background: #ffffff !important;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      width: 100%;
    }
    .signature-font {
      font-family: 'Playfair Display', 'Brush Script MT', cursive, Georgia, serif;
    }
    .print-wrapper {
      max-width: ${maxWidth};
      margin: 0 auto;
      background: #ffffff;
    }
    .offer-letter-sheet {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 279mm;
      width: 100%;
      position: relative;
      background: #ffffff;
    }
    .standalone-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e3a8a;
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 8px;
      margin: 12px auto;
      max-width: ${maxWidth};
      font-size: 13px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }
    .standalone-toolbar button {
      background: #ffffff;
      color: #1e3a8a;
      border: none;
      padding: 7px 16px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      transition: background 0.2s;
    }
    .standalone-toolbar button:hover {
      background: #f1f5f9;
    }
    @media print {
      @page {
        size: ${pageSize} !important;
        margin: ${isLandscape ? '0 !important' : '6mm 8mm !important'};
      }
      .standalone-toolbar, .no-print {
        display: none !important;
        visibility: hidden !important;
      }
      html, body {
        padding: 0 !important;
        margin: 0 !important;
        background: #ffffff !important;
        width: ${isLandscape ? '297mm !important' : '100% !important'};
        height: ${isLandscape ? '210mm !important' : 'auto !important'};
        overflow: ${isLandscape ? 'hidden !important' : 'visible !important'};
      }
      .print-wrapper {
        width: 100% !important;
        max-width: ${isLandscape ? '297mm !important' : '100% !important'};
        height: ${isLandscape ? '210mm !important' : 'auto !important'};
        margin: 0 auto !important;
        padding: ${isLandscape ? '6mm 8mm !important' : '0 !important'};
        box-sizing: border-box !important;
        display: ${isLandscape ? 'flex !important' : 'block !important'};
        ${isLandscape ? 'align-items: center !important; justify-content: center !important;' : ''}
      }
      .offer-letter-sheet {
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        min-height: 279mm !important;
        height: 279mm !important;
        width: 100% !important;
        box-sizing: border-box !important;
        page-break-inside: avoid !important;
      }
      #printableCertificate {
        width: 100% !important;
        max-width: 281mm !important;
        height: 100% !important;
        max-height: 196mm !important;
        box-sizing: border-box !important;
        margin: 0 auto !important;
      }
    }
  </style>
</head>
<body>
  <div class="standalone-toolbar no-print">
    <div>
      <strong>JIGSY INDIA Corporate Document</strong> &nbsp;·&nbsp; Official Verifiable Record
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="window.print()">🖨️ Print / Save as PDF</button>
      <button onclick="window.close()">✕ Close</button>
    </div>
  </div>

  <div class="print-wrapper">
    ${contentHtml}
  </div>

  ${autoPrintScript}
</body>
</html>`;
}

/**
 * Generates an actual genuine .pdf file from the target DOM element
 * using html2canvas (at 2x retina DPI) and jsPDF.
 * Maintains 100% of formatting, watermarks, fonts, tables, and colors.
 * 
 * @param forceSinglePage If true, scales the document proportionally to fit strictly into 1 single A4 page.
 */
export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
  forceSinglePage: boolean = true,
  orientation: 'p' | 'l' = 'p'
): Promise<boolean> {
  try {
    // 1. Ensure images are loaded with safe timeout
    const imgElements = element.querySelectorAll('img');
    await Promise.race([
      Promise.all(
        Array.from(imgElements).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      ),
      new Promise((resolve) => setTimeout(resolve, 1500))
    ]);

    // 2. Wait for web fonts
    if (document.fonts && document.fonts.ready) {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 1200))
      ]);
    }

    // 3. Capture at high resolution (scale: 2 = crisp vector-like output)
    const isLandscape = orientation === 'l';
    const targetWidth = element.offsetWidth || element.scrollWidth || (isLandscape ? 1020 : 800);
    const targetHeight = element.offsetHeight || element.scrollHeight || (isLandscape ? 710 : 1080);

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      scrollY: 0,
      scrollX: 0,
      width: targetWidth,
      height: targetHeight,
      windowWidth: Math.max(targetWidth, window.innerWidth),
      windowHeight: Math.max(targetHeight, window.innerHeight),
      imageTimeout: 5000,
      ignoreElements: (node) => {
        if (!node || node.nodeType !== 1) return false;
        const el = node as Element;
        const tag = el.tagName.toUpperCase();
        if (tag === 'HTML' || tag === 'HEAD' || tag === 'BODY' || tag === 'STYLE' || tag === 'LINK') {
          return false;
        }
        if (el.closest && el.closest('head')) return false;
        return !element.contains(el) && !el.contains(element);
      },
      onclone: (clonedDoc, clonedEl) => {
        // Shared 1x1 canvas + cache for fast browser-native modern color -> sRGB conversion
        const cvs = document.createElement('canvas');
        cvs.width = 1;
        cvs.height = 1;
        const ctx = cvs.getContext('2d', { willReadFrequently: true });
        const rgbCache = new Map<string, string>();

        const modernColorFns = ['color-mix', 'oklch', 'oklab', 'lch', 'lab', 'color'];
        const hasModernColor = (val: string): boolean =>
          val.includes('oklab') ||
          val.includes('oklch') ||
          val.includes('color-mix') ||
          val.includes('lch(') ||
          val.includes('lab(') ||
          val.includes('color(');

        const toRgb = (colorVal: string): string => {
          if (!colorVal) return colorVal;
          const cached = rgbCache.get(colorVal);
          if (cached !== undefined) return cached;

          if (colorVal.includes('var(')) {
            const fallback = 'rgba(15, 23, 42, 0.15)';
            rgbCache.set(colorVal, fallback);
            return fallback;
          }
          try {
            if (!ctx) return '#0f172a';
            ctx.clearRect(0, 0, 1, 1);
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fillStyle = colorVal;
            ctx.fillRect(0, 0, 1, 1);
            const d = ctx.getImageData(0, 0, 1, 1).data;
            const converted =
              d[3] < 255
                ? `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${(d[3] / 255).toFixed(3)})`
                : `rgb(${d[0]}, ${d[1]}, ${d[2]})`;
            rgbCache.set(colorVal, converted);
            return converted;
          } catch {
            rgbCache.set(colorVal, '#0f172a');
            return '#0f172a';
          }
        };

        const sanitizeCssString = (raw: string): string => {
          if (!raw) return raw;
          // Resolve color-mix(...) and oklch/oklab calls first while "in <colorspace>" syntax inside color-mix is still intact
          let out = replaceCssFunctionCalls(raw, modernColorFns, (fullCall) => toRgb(fullCall));
          // Strip remaining gradient interpolation hints like "to right in oklab"
          out = stripGradientColorSpaceHints(out);
          return out;
        };

        // 1. Materialize readable <link rel="stylesheet"> sheets into sanitized <style> tags
        clonedDoc.querySelectorAll('link[rel="stylesheet"]').forEach((linkEl) => {
          const href = linkEl.getAttribute('href') || '';
          if (href.startsWith('http') && !href.includes(window.location.host)) return;
          try {
            const matchedSheet = Array.from(document.styleSheets).find(
              (s) => s.href && linkEl instanceof HTMLLinkElement && s.href === linkEl.href
            );
            if (matchedSheet && matchedSheet.cssRules) {
              const cssRulesText = Array.from(matchedSheet.cssRules)
                .map((r) => r.cssText)
                .join('\n');
              const styleReplacement = clonedDoc.createElement('style');
              styleReplacement.textContent = sanitizeCssString(cssRulesText);
              linkEl.parentNode?.replaceChild(styleReplacement, linkEl);
            }
          } catch {
            // Skip cross-origin sheets safely
          }
        });

        // 2. Sanitize all <style> tags in clonedDoc so html2canvas CSS parser never encounters oklab/oklch/color-mix
        clonedDoc.querySelectorAll('style').forEach((styleTag) => {
          if (styleTag.textContent && hasModernColor(styleTag.textContent)) {
            styleTag.textContent = sanitizeCssString(styleTag.textContent);
          }
        });

        // 3. Scrub copied inline styles (critical for SVG nodes where html2canvas runs copyCSSStyles)
        //    and explicitly inline computed sRGB colors for all CSSParsedDeclaration properties.
        const colorCssProps = [
          'color',
          'background-color',
          'border-top-color',
          'border-right-color',
          'border-bottom-color',
          'border-left-color',
          'outline-color',
          'text-decoration-color',
          '-webkit-text-stroke-color',
          '-webkit-text-fill-color',
          'caret-color',
          'fill',
          'stroke',
        ];

        const clonedDescendants = Array.from(clonedEl.querySelectorAll<HTMLElement>('*')).filter(
          (n) => n.tagName.toUpperCase() !== 'HTML2CANVASPSEUDOELEMENT'
        );
        const allCloned = [clonedEl, ...clonedDescendants];
        const allOriginal = [element, ...Array.from(element.querySelectorAll<HTMLElement>('*'))];

        // Also sanitize any injected html2canvas pseudo-elements independently
        clonedEl.querySelectorAll<HTMLElement>('html2canvaspseudoelement').forEach((pseudoNode) => {
          if (pseudoNode.style && pseudoNode.style.cssText && hasModernColor(pseudoNode.style.cssText)) {
            pseudoNode.style.cssText = sanitizeCssString(pseudoNode.style.cssText);
          }
        });

        allCloned.forEach((node, idx) => {
          // 3a. Single-pass scrub of inline cssText (covers all 300+ properties copied onto SVG nodes)
          if (node.style && node.style.cssText && hasModernColor(node.style.cssText)) {
            node.style.cssText = sanitizeCssString(node.style.cssText);
          }

          // 3b. Override computed colors from the matching live element into sRGB
          const orig = allOriginal[idx];
          if (!orig) return;
          const comp = window.getComputedStyle(orig);
          for (const cssProp of colorCssProps) {
            const rawVal = comp.getPropertyValue(cssProp);
            if (rawVal && hasModernColor(rawVal)) {
              node.style.setProperty(cssProp, toRgb(rawVal), 'important');
            }
          }
          if (comp.boxShadow && comp.boxShadow !== 'none' && hasModernColor(comp.boxShadow)) {
            node.style.setProperty('box-shadow', sanitizeCssString(comp.boxShadow), 'important');
          }
          if (comp.textShadow && comp.textShadow !== 'none' && hasModernColor(comp.textShadow)) {
            node.style.setProperty('text-shadow', sanitizeCssString(comp.textShadow), 'important');
          }
          if (comp.backgroundImage && comp.backgroundImage !== 'none' && hasModernColor(comp.backgroundImage)) {
            node.style.setProperty('background-image', sanitizeCssString(comp.backgroundImage), 'important');
          }
        });
      },
    });

    const imgData = canvas.toDataURL('image/png');

    // Standard A4 dimensions in mm (Portrait: 210 x 297 mm, Landscape: 297 x 210 mm)
    const pdfWidth = isLandscape ? 297 : 210;
    const pdfHeight = isLandscape ? 210 : 297;
    const margin = 6; // 6mm margin
    const maxContentWidth = pdfWidth - margin * 2;
    const maxContentHeight = pdfHeight - margin * 2;

    const pdf = new jsPDF(orientation, 'mm', 'a4');

    if (forceSinglePage) {
      let renderWidth = maxContentWidth;
      let renderHeight = (canvas.height * renderWidth) / canvas.width;

      if (renderHeight > maxContentHeight) {
        renderHeight = maxContentHeight;
        renderWidth = (canvas.width * renderHeight) / canvas.height;
      }

      const xPos = (pdfWidth - renderWidth) / 2;
      const yPos = (pdfHeight - renderHeight) / 2;

      pdf.addImage(imgData, 'PNG', xPos, yPos, renderWidth, renderHeight, undefined, 'FAST');
    } else {
      const contentHeight = (canvas.height * maxContentWidth) / canvas.width;
      if (contentHeight <= maxContentHeight) {
        pdf.addImage(imgData, 'PNG', margin, margin, maxContentWidth, contentHeight, undefined, 'FAST');
      } else {
        let heightLeft = contentHeight;
        let position = margin;
        const pageHeight = maxContentHeight;

        pdf.addImage(imgData, 'PNG', margin, position, maxContentWidth, contentHeight, undefined, 'FAST');
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, maxContentWidth, contentHeight, undefined, 'FAST');
          heightLeft -= pageHeight;
        }
      }
    }

    const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(cleanFilename);
    return true;
  } catch (err) {
    console.error('Error generating PDF with jsPDF:', err);
    return false;
  }
}

/**
 * Triggers printing ONCE using an isolated rendered iframe with positive dimensions
 * so Chromium never renders a blank white page and never opens duplicate print dialogs.
 */
export function printDocument(options: PrintDocOptions): void {
  const fullHtml = buildStandalonePrintHtml({ ...options, autoPrint: false });
  const isLandscape = options.orientation === 'landscape';

  try {
    let iframe = document.getElementById('jigsy-print-iframe') as HTMLIFrameElement | null;
    if (iframe && iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }

    iframe = document.createElement('iframe');
    iframe.id = 'jigsy-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = isLandscape ? '1120px' : '820px';
    iframe.style.height = isLandscape ? '820px' : '1120px';
    iframe.style.border = '0';
    iframe.style.opacity = '0.01';
    iframe.style.pointerEvents = 'none';
    iframe.style.zIndex = '-9999';
    document.body.appendChild(iframe);

    const win = iframe.contentWindow;
    const doc = win?.document;
    if (doc && win) {
      let hasScheduledPrint = false;
      let hasTriggeredPrint = false;

      const runPrintOnce = () => {
        if (hasTriggeredPrint) return;
        hasTriggeredPrint = true;
        try {
          win.focus();
          win.print();
        } catch (printErr) {
          console.warn('Iframe print blocked, opening standalone print window:', printErr);
          openPrintWindow(options);
        }

        setTimeout(() => {
          if (iframe && document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 5000);
      };

      const schedulePrint = () => {
        if (hasScheduledPrint) return;
        hasScheduledPrint = true;
        const fonts = (doc as any).fonts;
        const fontsPromise =
          fonts && fonts.ready
            ? Promise.race([fonts.ready, new Promise((resolve) => setTimeout(resolve, 800))])
            : Promise.resolve();
        fontsPromise.then(() => setTimeout(runPrintOnce, 180));
      };

      doc.open();
      doc.write(fullHtml);
      doc.close();

      // Attach listeners AFTER doc.open()/doc.close() because doc.open() resets window handlers
      if (iframe.contentWindow) {
        iframe.contentWindow.addEventListener('load', schedulePrint, { once: true });
      }
      iframe.addEventListener('load', schedulePrint, { once: true });

      if (doc.readyState === 'complete') {
        schedulePrint();
      } else {
        // Safety fallback if load event already fired synchronously during doc.close()
        setTimeout(schedulePrint, 1200);
      }
      return;
    }
  } catch (err) {
    console.warn('Hidden iframe print error, using fallback print window:', err);
  }

  openPrintWindow(options);
}

function openPrintWindow(options: PrintDocOptions) {
  const isLandscape = options.orientation === 'landscape';
  const fullHtml = buildStandalonePrintHtml({ ...options, autoPrint: true });
  try {
    const windowFeatures = isLandscape ? 'width=1140,height=840' : 'width=860,height=1000';
    const printWin = window.open('', '_blank', windowFeatures);
    if (printWin) {
      printWin.document.open();
      printWin.document.write(fullHtml);
      printWin.document.close();
      return;
    }
  } catch (e) {
    console.warn('Popup window blocked, triggering direct window.print()', e);
  }

  try {
    window.print();
  } catch (e) {
    console.error('Direct window.print() failed:', e);
  }
}
