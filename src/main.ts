import { Plugin, MarkdownRenderer, Component } from 'obsidian';
import { parseInput, treeView } from './util';

export default class MyPlugin extends Plugin {
	component: Component;

	async onload() {
		console.log("tree load");
		this.component = new Component();

		this.registerMarkdownCodeBlockProcessor("tree", async (source, el, ctx) => {
			let root;
			let output: string[] = [];
			let markdown: string;

			root = parseInput(source);
			if (root != null) {
				output = treeView(root);
			}
			markdown = ["```", "\n", output.join("\n").trim(), "\n```"].join("");

			await MarkdownRenderer.render(this.app, markdown, el, ctx.sourcePath, this.component);
		});
	}

	onunload() {
		console.log("tree unload");
	}
}
