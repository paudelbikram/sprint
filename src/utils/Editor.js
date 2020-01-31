
import * as monaco from 'monaco-editor';
import fs from 'fs';

export default class Editor {

    constructor() {
        this._editor = monaco.editor.create(
            document.getElementById("editor"),
            {
                theme: 'vs-dark',
                automaticLayout: true,
                model: null,
                minimap: {
                    enabled: false,
                }
            });

    }


    newFile(path) {

        if (!fs.existsSync(path)) {
            var content = `/*\n* Author: bitbeast18\n* Created On: ${new Date().toLocaleString()}\n*/`
            fs.writeFileSync(path, content);
        }

        var data = fs.readFileSync(path, 'utf-8');

        var lang = null;

        if (path.endsWith('cpp')) {
            lang = 'cpp';
        } else if (path.endsWith('py')) {
            lang = 'python';
        } else if (path.endsWith('java')) {
            lang = 'java';
        } else {
            lang = 'c';
        }

        var model = monaco.editor.createModel(data, lang);
        
        this._editor.setModel(model);

        return { model, lang };
    }

    changeModel(model) {
        this._editor.setModel(model);
    }
}
