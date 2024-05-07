const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  lineNumbers: true,
  mode: 'html',
  theme: 'default'
});

const runButton = document.getElementById('runButton');
const outputFrame = document.getElementById('outputFrame');

runButton.addEventListener('click', function() {
  const code = editor.getValue();

  try {
    const transpiledCode = Babel.transform(code, { presets: ['es2015'] }).code;

    const iframeContent = `
      <html>
      <head>
        <style>
          body {
            margin: 0;
          }
        </style>
      </head>
      <body>
        ${transpiledCode}
      </body>
      </html>
    `;

    const iframeDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(iframeContent);
    iframeDocument.close();
  } catch (error) {
    outputFrame.contentDocument.body.innerText = 'Error: ' + error.message;
  }
});