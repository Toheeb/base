
// export function matchContainer(component, query, callback) {
//   // query in rem for relativeness, but calculation in pixels for fine grain checks

//   let matching = null;
//   let matches = false;
//   const range_query = query.replace(/\s+/g, '').match(/^([\d.]+)rem<=(width)<=([\d.]+)rem$/);
//   const single_query = query.replace(/\s+/g, '').match(/^width(>=|<=)([\d.]+)rem$/);
//   const root_font_size = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;

//   const observer = new ResizeObserver((entries) => {

//     for (let entry of entries) {
//       const current_width = entry.contentBoxSize[0]
//         ? entry.contentBoxSize[0].inlineSize
//         : entry.contentRect.width;

//       if (range_query) {
//         const min_width = parseFloat(range_query[1]) * root_font_size;
//         const max_width = parseFloat(range_query[3]) * root_font_size;

//         matches = current_width >= min_width && current_width <= max_width;

//       } else if (single_query) {
//         const operator = single_query[1];
//         const bound = parseFloat(single_query[2]) * root_font_size;

//         matches = operator === '>=' ? current_width >= bound : current_width <= bound;

//       } else {
//         console.warn(`invalid query syntaxL "${query}"`);
//         return;
//       }

//       if (matches !== matching) {
//         matching = matches;
//         callback({matches, current_width});
//       }
//     }
//   });

//   observer.observe(component);
//   return () => observer.unobserve(element);
// }

export function matchContainer(element, remValue, callback) {
        let wasMatching = null;

      const observer = new ResizeObserver((entries) => {
        // 1. Query the live computed pixel size of 1rem from the html root element
        const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);

        // 2. Convert your target rem value into a relative pixel threshold
        const pixelThreshold = remValue * rootFontSize;

        for (let entry of entries) {
          // 3. Read the current internal layout width of the container
          const currentWidth = entry.contentBoxSize[0] 
            ? entry.contentBoxSize[0].inlineSize 
            : entry.contentRect.width;

          // 4. Evaluate the match condition against the dynamic pixel line
          const matches = currentWidth <= pixelThreshold;

          // 5. Fire the callback only when the boolean state flips
          if (matches !== wasMatching) {
            wasMatching = matches;
            callback({ matches, currentPixelThreshold: pixelThreshold });
          }
        }
      });

      observer.observe(element);
      return () => observer.unobserve(element);

}
