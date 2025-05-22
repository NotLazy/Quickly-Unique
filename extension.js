// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const uuid = require('uuid');
const nanoId = require('nanoid');
const clipboard = require('copy-paste');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "quicklyunique" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	vscode.commands.registerCommand('quicklyunique.insert.uuid', function () {
		// The code you place here will be executed every time your command is executed
		let activeEditor = vscode.window.activeTextEditor;
		if (activeEditor && activeEditor.selection && activeEditor.selection.active) {
			activeEditor.edit((editor) => {
				editor.insert(activeEditor.selection.active, uuid.v4());
			});
		}else{
			// If there is no active editor, show an error message
			vscode.window.showErrorMessage('No active editor found to insert into.');
			return;
		}

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from Quickly Unique!');
	});

	vscode.commands.registerCommand('quicklyunique.insert.nanoid', function () {
		// The code you place here will be executed every time your command is executed
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor && activeEditor.selection && activeEditor.selection.active) {
			activeEditor.edit((editor) => {
				editor.insert(activeEditor.selection.active, nanoId.nanoid());
			});
		}else{
			// If there is no active editor, show an error message
			vscode.window.showErrorMessage('No active editor found to insert into.');
			return;
		}
	});

	vscode.commands.registerCommand('quicklyunique.copy.uuid', function () {
		const result = uuid.v4();
		clipboard.copy(result, function() {
			vscode.window.showInformationMessage('A new GUID "' + result + '" has been copied to your clipboard.');
		});
	});

	vscode.commands.registerCommand('quicklyunique.copy.nanoid', function () {
		const result = nanoId.nanoid();
		clipboard.copy(result, function() {
			vscode.window.showInformationMessage('A new short code "' + result + '" has been copied to your clipboard.');
		});
	});
}

// This method is called when your extension is deactivated
// function deactivate() {}

module.exports = {
	activate,
	// deactivate
}
