// const HTML_CHARS = {'"': '&quot;', '<': '&lt;', '>': '&gt;', '\'': '&apos;', '&': '&amp;'};
export function *getDescendants(el, filterFunc) {
	if (filterFunc instanceof Function) {
		for (const child of getDescendants(el)) {
			if (filterFunc(child)) {
				yield child;
			}
		}
	} else if (el.childElementCount !== 0) {
		for (const child of el.children) {
			yield child;

			if (child.childElementCount !== 0) {
				for (const descendant of getDescendants(child)) {
					yield descendant;
				}
			}
		}
	}
}

export const HTML_CHAR_MAP = new Map([['"', '&quot;'], ['<', '&lt;'], ['>', '&gt;'], ['\'', '&apos;'], ['&', '&amp;']]);
export const spinalCase = str => str.replace(/[\w]([A-Z])/g, ([a, b]) => `${a}-${b.toLowerCase()}`);
export const camelCase = str => str.replace(/[\W]([\w])/g, ([,b])=> b.toUpperCase());
export const htmlEscape = str => str.toString().replaceAll(/[<>&'"]{1}/g, char => HTML_CHAR_MAP.get(char) || char);
